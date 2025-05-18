require('dotenv').config(); // 这会加载.env文件中的变量到 process.env
const Web3 = require('web3');
const contractArtifact = require('../build/contracts/MyERC721.json');

const rpcURL = process.env.RPC_URL; //配置里的rpc
const privateKey = process.env.PRIVATE_KEY.startsWith('0x') ? process.env.PRIVATE_KEY : '0x' + process.env.PRIVATE_KEY; //配置里的私钥，还判断要不要拼接0x

const contractAddress = process.env.CONTRACT_ADDRESS_ERC721; // 部署合约后得到的地址（erc721）

async function mintNFT(toAddress, tokenURI) {
  const web3 = new Web3(rpcURL);

  // 通过私钥创建账户
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

  const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);

  // 构造mint交易数据
  const mintData = contract.methods.mint(toAddress, tokenURI).encodeABI();

  // 获取nonce
  const nonce = await web3.eth.getTransactionCount(account.address);

  // 组装交易对象
  const tx = {
    from: account.address,
    to: contractAddress,
    nonce: nonce,
    gas: 300000,  // 估计gas可以根据实际调整
    data: mintData,
  };

  // 签名并发送交易
  const receipt = await web3.eth.sendTransaction(tx);
  console.log('Mint transaction receipt:', receipt);
}

// 执行mint
//0x4f32feDeAc6e2b9743DcA76EaA4674519Cbb98d7 一直在创建合约
const to = '0x4f32feDeAc6e2b9743DcA76EaA4674519Cbb98d7';
const uri = 'https://plum-familiar-dove-320.mypinata.cloud/ipfs/bafkreifg23lorr2wr7k4aiz6omwptiaj635inmldrzr32autbxc2j73vge';  // NFT元数据URI

mintNFT(to, uri).catch(console.error);
