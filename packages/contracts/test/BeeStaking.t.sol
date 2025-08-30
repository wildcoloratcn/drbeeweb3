// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/BeeStaking.sol";
import "../src/DrBEE.sol";

contract BeeStakingTest is Test {
    DrBEE bee;
    BeeStaking staking;
    address owner = address(0xABCD);
    address user = address(0xBEEF);

    function setUp() public {
        // 部署 BEE 代币并 mint 给 owner 和 user
        vm.startPrank(owner);
        bee = new DrBEE(owner);
        bee.transfer(user, 1_000_000 * 1e18);
        bee.transfer(address(user), 1_000_000 * 1e18);
        vm.stopPrank();

        // vm.startPrank(user);
        // // 给用户一些 BEE
        // bee.transfer(user, 1_000 * 1e18);
        // vm.stopPrank();

        // 部署 staking 合约
        vm.startPrank(owner);
        staking = new BeeStaking(address(bee));
        // Owner 给 staking 合约充值利息池
        bee.approve(address(staking), 10_000 * 1e18);
        staking.depositBee(10_000 * 1e18);
        vm.stopPrank();
    }

    function testStakeAndWithdraw() public {
        vm.startPrank(user);

        // approve staking 合约
        bee.approve(address(staking), 100 * 1e18);

        // 用户 stake 100 BEE
        staking.stake(100 * 1e18);

        // 快进 1 天
        vm.warp(block.timestamp + 1 days);

        // 计算利息
        uint256 interest = staking.calculateInterest(user);
        console.log("Interest after 1 day:", interest / 1e18); // 输出 BEE 数量（可选）

        // withdraw
        uint256 userBalanceBefore = bee.balanceOf(user);
        staking.withdraw();
        uint256 userBalanceAfter = bee.balanceOf(user);

        // 本金 + 利息应该到账
        assertGt(userBalanceAfter, userBalanceBefore);

        vm.stopPrank();
    }

    function testMultipleStake() public {
        vm.startPrank(user);

        bee.approve(address(staking), 200 * 1e18);

        staking.stake(50 * 1e18);
        vm.warp(block.timestamp + 3600); // 快进 1 小时
        staking.stake(50 * 1e18);

        // 再快进一小时
        vm.warp(block.timestamp + 3600);

        uint256 interest = staking.calculateInterest(user);
        assertGt(interest, 0);


        // withdraw
        staking.withdraw();

        vm.stopPrank();
    }

    function testDepositBee() public {
        vm.startPrank(owner);

        uint256 before = bee.balanceOf(address(staking));
        bee.approve(address(staking), 500 * 1e18);
        staking.depositBee(500 * 1e18);
        uint256 amountAfter = bee.balanceOf(address(staking));

        assertEq(amountAfter - before, 500 * 1e18);

        vm.stopPrank();
    }
}
