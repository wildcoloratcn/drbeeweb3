// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";  

/// @title BeeStaking - 简单安全的 BEE staking 合约
contract BeeStaking is Ownable, ReentrancyGuard {
    IERC20 public immutable BEE;  // BEE 代币

    struct StakeInfo {
        uint256 amount;      // 用户存入的 BEE
        uint256 startTime;   // 存入时间
        uint256 principal;   // 用户本金，不算利息
    }

    mapping(address => StakeInfo) public stakes;

    /// 每秒利率，单位 1e18。年利率80%， 80%/365/24/3600 = 0.00000002537 (/second)
    uint256 public interestRatePerSecond = 25370000000;
    uint256 public totalStaked; // total amount staked. interests are not included.

    /// Events
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 principal, uint256 interest);

    constructor(address beeToken) Ownable(msg.sender) {
        require(beeToken != address(0), "Invalid token address");
        BEE = IERC20(beeToken);
    }

    /// @notice Owner 可以调整每秒利率
    function setInterestRate(uint256 newRatePerSecond) external onlyOwner {
        interestRatePerSecond = newRatePerSecond;
    }

    /// @notice 用户存入 BEE
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");

        // 转入合约
        ERC20Burnable(address(BEE)).transferFrom(msg.sender, address(this), amount);

        StakeInfo storage userStake = stakes[msg.sender];

        // 如果已有 stake，先结算利息累加到本金
        if (userStake.amount > 0) {
            uint256 pendingInterest = calculateInterest(msg.sender);
            userStake.amount += pendingInterest;
        }

        userStake.amount += amount;
        userStake.principal += amount;
        totalStaked += amount;
        userStake.startTime = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    /// @notice 用户随时取回本金+利息
    function withdraw() external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake");

        uint256 principal = userStake.amount;
        uint256 interest = calculateInterest(msg.sender);

        // 重置用户 stake 信息
        userStake.amount = 0;
        userStake.startTime = 0;

        uint256 total = principal + interest;
        require(BEE.balanceOf(address(this)) >= total, "Insufficient contract balance");

        ERC20Burnable(address(BEE)).transfer(msg.sender, total);

        totalStaked -= userStake.principal;
        userStake.principal = 0;
        emit Withdrawn(msg.sender, principal, interest);
    }

    /// @notice 查看用户利息
    function calculateInterest(address user) public view returns (uint256) {
        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) return 0;

        uint256 elapsed = block.timestamp - userStake.startTime;
        uint256 interest = userStake.amount * elapsed * interestRatePerSecond / 1e18;
        return interest;
    }

    /// @notice Owner 可给合约充值 BEE 作为利息池
    function depositBee(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        ERC20Burnable(address(BEE)).transferFrom(msg.sender, address(this), amount);
    }

    /// @notice 查看合约当前余额
    function contractBalance() external view returns (uint256) {
        return BEE.balanceOf(address(this));
    }
}
