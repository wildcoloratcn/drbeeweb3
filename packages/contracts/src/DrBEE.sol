// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DrBEE is ERC20Burnable, Ownable {
    uint8 private constant _DECIMALS = 18;
    uint256 public constant TOTAL_SUPPLY = 10_000_000_000 * 10**18; // 100 亿 * 1e18

    constructor(address owner_) ERC20("DrBEE", "BEE") Ownable(owner_) {
        // 全部先铸给部署者（owner）
        _mint(owner_, TOTAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }
}
