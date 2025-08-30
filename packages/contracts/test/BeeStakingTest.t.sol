// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DrBEE.sol";
import "../src/BeeStaking.sol";

contract BeeStakingTest is Test {
    DrBEE bee;
    BeeStaking staking;

    address owner = address(0xABCD);
    address user1 = address(0x1111);
    address user2 = address(0x2222);
    address user3 = address(0x3333);

    function setUp() public {
        // 部署代币合约
        vm.startPrank(owner);
        bee = new DrBEE(owner);
        staking = new BeeStaking(address(bee));

        // 给合约充值一些 BEE 作为利息池
        bee.approve(address(staking), type(uint256).max);
        staking.depositBee(1_000_000 * 1e18); // 100万 BEE
        vm.stopPrank();

        // 给三个用户一些 BEE
        deal(address(bee), user1, 100 ether);
        deal(address(bee), user2, 100 ether);
        deal(address(bee), user3, 100 ether);
    }

    function testUser1_Stake_1min() public {
        vm.startPrank(user1);
        bee.approve(address(staking), type(uint256).max);
        staking.stake(100 ether);

        // 时间前进 1分钟
        vm.warp(block.timestamp + 60);

        staking.withdraw();
        uint256 balance = bee.balanceOf(user1);
        emit log_named_uint("User1 balance after 1min stake", balance);
        vm.stopPrank();
    }

    function testUser2_Stake_1day() public {
        vm.startPrank(user2);
        bee.approve(address(staking), type(uint256).max);
        staking.stake(100 ether);

        // 时间前进 1天
        vm.warp(block.timestamp + 1 days);

        staking.withdraw();
        uint256 balance = bee.balanceOf(user2);
        emit log_named_uint("User2 balance after 1day stake", balance);
        vm.stopPrank();
    }

    function testUser3_Stake_1year() public {
        uint256 balance = bee.balanceOf(user3);
        emit log_named_uint("User3 before 1year stake", balance);
        vm.startPrank(user3);
        bee.approve(address(staking), type(uint256).max);
        staking.stake(100 ether);
        

        // 时间前进 365天
        vm.warp(block.timestamp + 365 days);

        staking.withdraw();
        balance = bee.balanceOf(user3);
        emit log_named_uint("User3 balance after 1year stake", balance);
        vm.stopPrank();
    }
}
