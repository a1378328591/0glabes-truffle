// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";


contract MyERC1155 is ERC1155, Ownable, ERC1155Burnable {

    // 定义三种代币的ID，方便后续调用
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;
    uint256 public constant SWORD = 3;

    // 传入ERC1155的元数据URI模板，{id}会被替换成代币ID，也就是上面的1 或2 或3
    //https://plum-familiar-dove-320.mypinata.cloud/ipfs/xxx/{id}.json 
    //上面的地址可以通过https://pinata.cloud 上传，可以上传一个文件夹，文件开下面有1.json 2.json 如目录erc_1155_json那样
    constructor() ERC1155("https://plum-familiar-dove-320.mypinata.cloud/ipfs/bafybeihr4n5fg7y5x2mvlboetreoh7wmcdx5vyardxzxkec2ig6s77i33q/{id}.json") Ownable(msg.sender){
        _mint(msg.sender, GOLD, 1000, "");
        _mint(msg.sender, SILVER, 5000, "");
        _mint(msg.sender, SWORD, 200, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(to, id, amount, data);
    }
}