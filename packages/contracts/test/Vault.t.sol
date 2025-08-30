// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DrBEE.sol";
import "../src/Vault.sol";

contract VaultTest is Test {
    DrBEE token;
    Vault vault;
    address owner = address(this);
    address user  = address(0xBEEF);

    function setUp() public {
        token = new DrBEE(owner);
        vault = new Vault(owner, IERC20Decimals(address(token)), 100e18, 1 days);
        // 给 Vault 充 1,000 BEE
        token.transfer(address(vault), 1000e18);
    }

    function testClaim() public {
        vm.prank(user);
        vault.claim();
        assertEq(token.balanceOf(user), 100e18);

        // 冷却期内再次领取应失败
        vm.expectRevert();
        vm.prank(user);
        vault.claim();

        // 跳过一天后可再次领取
        vm.warp(block.timestamp + 1 days + 1);
        vm.prank(user);
        vault.claim();
        assertEq(token.balanceOf(user), 200e18);
    }
}
