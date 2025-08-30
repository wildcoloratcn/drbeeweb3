// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DrBEE.sol";

contract DrBEETest is Test {
    DrBEE token;
    address owner = address(0xA11CE);

    function setUp() public {
        token = new DrBEE(owner);
    }

    function testTotalSupply() public {
        assertEq(token.totalSupply(), 10_000_000_000 * 1e18);
        assertEq(token.balanceOf(owner), 10_000_000_000 * 1e18);
    }
}
