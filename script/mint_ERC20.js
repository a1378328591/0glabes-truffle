require('dotenv').config(); // 一定要在最前面
const Web3 = require('web3');
const { abi } = require('../build/contracts/MyToken.json');
//const contractPath = path.resolve(__dirname, '../build/contracts/MyToken.json');

//console.log('📄 Contract path:', contractPath);

const web3 = new Web3(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const toAddress = process.env.RECIPIENT_ADDRESS;
const mintAmount = web3.utils.toWei('100'); // ERC20 中通常以 wei 表示最小单位

const contractAddress = process.env.CONTRACT_ADDRESS_ERC20; // 部署合约后会得到的地址（erc20）
const contract = new web3.eth.Contract(abi, contractAddress);

console.log(`🚀 开始 Mint：
👉 目标地址: ${toAddress}
🪙 Mint 数量（单位: wei）: ${mintAmount}
🧾 From: ${account.address}
📄 合约地址: ${contractAddress}
`);

(async () => {
  const tx = await contract.methods
    .mint(toAddress, mintAmount)
    .send({ from: account.address, gas: 200000 });

  console.log('✅ Mint 成功，交易哈希:', tx.transactionHash);
})();
