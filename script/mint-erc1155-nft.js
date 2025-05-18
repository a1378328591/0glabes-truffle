require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");

// 加载合约 ABI
const contractJson = require("../build/contracts/Zer0ERC1155.json");
const abi = contractJson.abi;

// 初始化 web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// 钱包设置
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// 合约地址和实例
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS_ERC1155);

// mint 参数
const recipient = process.env.RECIPIENT_ADDRESS; // 替换成你自己接受nft的地址
const tokenId = 2; // GOLD
const amount = 2;
const data = "0x"; // 通常留空

async function mint() {
    console.log(
  `📤 Mint 参数 => 发起人: ${account.address} | 接收人: ${recipient} | Token ID: ${tokenId} | 数量: ${amount}`
);

  try {
    const tx = contract.methods.mint(recipient, tokenId, amount, data);

    const gas = await tx.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();

    const result = await tx.send({
      from: account.address,
      gas,
      gasPrice,
    });

    console.log("✅ Mint 成功：", result.transactionHash);
  } catch (error) {
    console.error("❌ Mint 失败：", error);
  }
}

mint();
