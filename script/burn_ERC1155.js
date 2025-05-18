require("dotenv").config();
const Web3 = require("web3");

// 加载合约 ABI
const contractJson = require("../build/contracts/MyERC1155.json");
const abi = contractJson.abi;

// 初始化 web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// 钱包设置
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// 合约地址和实例
const contractAddress = process.env.CONTRACT_ADDRESS_ERC1155;
const contract = new web3.eth.Contract(abi, contractAddress);

// burn 参数
const owner = account.address; // 持币者地址，销毁自己的代币所以是自己
const tokenId = 2; // 要销毁的代币ID，比如SILVER = 2
const amount = 1; // 销毁数量

async function burn() {
    //console.log(`🔥 开始销毁：地址=${owner}，tokenId=${tokenId}，数量=${amount}，合约地址=${contractAddress}`);
  try {
    const tx = contract.methods.burn(owner, tokenId, amount);

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const receipt = await tx.send({
      from: account.address,
      gas,
      gasPrice,
    });
    console.log(`✅ Burn 成功：地址=${owner}，tokenId=${tokenId}，数量=${amount}，合约地址=${contractAddress}，交易哈希=${receipt.transactionHash}`);
  } catch (error) {
    console.error("❌ Burn 失败：", error);
  }
}

burn();
