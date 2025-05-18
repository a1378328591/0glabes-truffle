
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
3.  编辑 `.env`文件，如私钥，rcp地址，合约地址等:
    ```dotenv
    PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"
    RPC_URL="https://rpc-testnet.0g.ai"
    ```

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


### 注意：
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


