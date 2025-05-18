// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("MyERC721", "MERC721") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    function mint(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter += 1;
    }
}
