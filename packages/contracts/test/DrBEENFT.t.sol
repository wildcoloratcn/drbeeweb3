// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol"; // 记得 import console
import "../src/DrBEE.sol";
import "../src/DrBEENFT.sol";

contract DrBEENFTTest is Test {
    DrBEE bee;
    DrBEENFT nft;
    address owner = address(0xABCD);
    address user = address(0xBEEF);

    string[] uris;

    function setUp() public {
        // 部署 BEE 代币
        bee = new DrBEE(owner);

        // 给 user 转一点 BEE
        vm.prank(owner);
        bee.transfer(user, 1000 * 1e18);

        // 12 个测试 URI
        uris = new string[](12);
        for (uint i = 0; i < 12; i++) {
            uris[i] = string(abi.encodePacked("ipfs://QmAAA/", vm.toString(i+1), ".json"));
        }

        // 部署 NFT 合约
        nft = new DrBEENFT(address(bee), uris);
    }

    function testMintAndPrintURIs() public {
        // user 授权 NFT 合约
        vm.prank(user);
        bee.approve(address(nft), 150 * 1e18); // 授权足够多

        // mint 15 个 NFT
        for (uint i = 0; i < 15; i++) {
            vm.prank(user);
            nft.mint();

            uint256 tokenId = i + 1;
            string memory uri = nft.tokenURI(tokenId);

            // 打印 tokenId 和对应 URI
            console.log(string.concat("NFT #", vm.toString(tokenId), " URI: ", uri));
        }
    }
}
