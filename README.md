
在0G 伽利略测试网 (Chain ID: 16601)上创建ERC20 ERC721 ERC1155

## 前置条件

*   安装Node.js

## 步骤

1.  安装依赖:
    ```bash
    npm install -g truffle
    npm install
    ```
2.  复制env示例:
    ```bash
    cp .env.example .env
    ```
3.  编辑 `.env`文件，如私钥，rcp地址，合约地址（部署成功后再返回维护）等:
    ```dotenv
    PRIVATE_KEY="你的私钥（注意要去掉0x）"
    RPC_URL="替换为你的或官方rpc"
    ```
4.  编辑./contracts/MyERC1155.sol内容（这步可选，可以不用管，好奇的可以看里面注释）

## 编译

编译代码:

```bash
truffle compile
```

## 部署

部署合约到 0g 伽利略测试网上:

```bash
truffle migrate --network og_testnet_v3
```

部署成功后Truffle会打印合约地址到控制台上. 

然后再把打印的合约地址维护到.env文件里（下面有成功部署的示例，还有查询或者mint给谁的地址要维护下）

## 运行脚本
主要运行脚本要在项目根目录下，和.env平级（在里层会读不到环境）

mint ERC20代币
```bash
    node .\script\mint_ERC20.js
```
mint ERC721
```bash
    node .\script\mint_ERC721.js
```

mint ERC1155
```
node .\script\mint_ERC1155.js
```

查询 ERC1155代币余额(里面有指定token id，还发现非代码问题，等会琢磨下)
```
node .\script\query_ERC1155.js
```

销毁 代币
```
node .\script\burn_ERC1155.js 
```


## 注意：
构造函数中传入 msg.sender 给 Ownable，如：constructor() ERC721("Zer0 NFT", "Z0N") Ownable(msg.sender)

### 步骤说明：
编译：
```bash
truffle compile
```

部署中的命令解释：
og_testnet_v3是在truffle-config.js配置的

如果只想部署2_deploy_zer0_nft.js，可以这样写(之前的第一个token不做任何改变)
```
truffle migrate --network og_testnet_v3 --f 2 --to 2
```
如果只想‘重新’部署erc1155，如3_deploy_zer0_nft.js，可以这样写(之前的2个token不做任何改变)
```
truffle migrate --network og_testnet_v3 --f 3 --to 3 --reset
```

### 部署成功示例如下：
```bash
    1_deploy_token.js
    =================

    Replacing 'MyToken'
    -------------------
    > transaction hash:    0x479f7083775df51f023487a69dccdad921bee03152a8d09263247653249ff810
    > Blocks: 3            Seconds: 4
    > contract address:    0x8D569096B00Adc4e38AD7161e2e0a368D58815bc（这个就是你的合约地址）
    > block number:        430440
    > block timestamp:     1747545143
    > account:             0x2d9d48f6257B6548AE9468ce6D023330fb77E63C
    > balance:             1.09663427521246085
    > gas used:            666255 (0xa2a8f)
    > gas price:           2.500000008 gwei
    > value sent:          0 ETH
    > total cost:          0.00166563750533004 ETH

    Pausing for 2 confirmations...

    -------------------------------
    > confirmation number: 3 (block: 430444)
    > Saving artifacts
    -------------------------------------
    > Total cost:     0.00166563750533004 ETH
```
### mint ERC20成功示例如下：
```bash
    PS E:\vsCodeWorkspace\truffle> node .\script\mint_ERC20.js
    🚀 开始 Mint：
    👉 目标地址: 0x2d9d48f6257b6548ae9468ce6d023330fb77e63c
    🪙 Mint 数量（单位: wei）: 100000000000000000000
    🧾 From: 0x2d9d48f6257B6548AE9468ce6D023330fb77E63C
    📄 合约地址: 0x8D569096B00Adc4e38AD7161e2e0a368D58815bc

    ✅ Mint 成功，交易哈希: 0x8ea57685e4277ba7e31f697deba3cfe8ee3f88aa58bffdd782d603caa1a83265
```
