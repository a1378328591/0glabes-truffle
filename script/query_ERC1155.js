require("dotenv").config();
const Web3 = require("web3");

// 加载合约 ABI
const contractJson = require("../build/contracts/MyERC1155.json");
const abi = contractJson.abi;

// 初始化 web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// 合约地址和实例
const contractAddress = process.env.CONTRACT_ADDRESS_ERC1155;
const contract = new web3.eth.Contract(abi, contractAddress);

// 查询参数
const owner = process.env.QUERY_ADDRESS; // 查询该地址余额
const tokenId = 2; // 查询的token id，比如 SILVER = 2

async function getBalance() {
  try {
    const balance = await contract.methods.balanceOf(owner, tokenId).call();
    console.log(`✅ 查询结果：查询地址=${owner}，tokenId=${tokenId}，余额=${balance}，合约地址=${contractAddress}`);
  } catch (error) {
    console.error("❌ 查询余额失败：", error);
  }
}

getBalance();
