require('dotenv').config(); // 一定要在最前面
const Web3 = require('web3');
const { abi } = require('../build/contracts/MyToken.json');
//const contractPath = path.resolve(__dirname, '../build/contracts/MyToken.json');

//console.log('📄 Contract path:', contractPath);

const web3 = new Web3(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
console.log('🔑 PRIVATE_KEY length:', privateKey?.length);
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

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
    .mint('0x4f32feDeAc6e2b9743DcA76EaA4674519Cbb98d7', web3.utils.toWei('100'))
    .send({ from: account.address, gas: 200000 });

  console.log('✅ Mint 成功，交易哈希:', tx.transactionHash);
})();
