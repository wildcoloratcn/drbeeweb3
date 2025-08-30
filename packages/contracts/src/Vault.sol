// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Decimals is IERC20 {
    function decimals() external view returns (uint8);
}

contract Vault is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20Decimals;

    IERC20Decimals public immutable token;
    uint256 public claimAmount;       // 每次领取数量（含精度）
    uint256 public cooldown;          // 领取冷却（秒）

    mapping(address => uint256) public lastClaim;

    event Claimed(address indexed user, uint256 amount);

    constructor(address owner_, IERC20Decimals token_, uint256 claimAmount_, uint256 cooldown_) Ownable(owner_) {
        token = token_;
        claimAmount = claimAmount_;
        cooldown = cooldown_;
    }

    function setClaimAmount(uint256 newAmount) external onlyOwner {
        claimAmount = newAmount;
    }

    function setCooldown(uint256 newCooldown) external onlyOwner {
        cooldown = newCooldown;
    }

    function claim() external nonReentrant {
        uint256 last = lastClaim[msg.sender];

        // 如果是第一次领，就允许；否则需要等冷却
        if (last != 0) {
            require(block.timestamp >= last + cooldown, "Claim: cooldown");
        }

        // 保证金库余额足够
        require(token.balanceOf(address(this)) >= claimAmount, "Vault: insufficient balance");

        lastClaim[msg.sender] = block.timestamp;
        token.safeTransfer(msg.sender, claimAmount);
        emit Claimed(msg.sender, claimAmount);
    }
}
