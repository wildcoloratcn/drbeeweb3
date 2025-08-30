// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DrBEE.sol";
import "../src/Vault.sol";
import "../src/DrBEENFT.sol";
import "../src/BeeStaking.sol";

contract DeployAll is Script {
    function run() external {
        // 从 .env 读取部署者私钥
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        // 创建包含多个 URI 的数组
        string[] memory tokenURIs = new string[](12);
        for (uint i = 0; i < 12; i++) {
            tokenURIs[i] = string(abi.encodePacked("ipfs://bafybeieybptsoxucz2vuyexskm633tisxekkauvxpcl2v5fvn3r7dwu3za/", vm.toString(i + 1), ".json"));
        }

        vm.startBroadcast(deployerPrivateKey);

        // 1. 部署 BEE 代币
        DrBEE bee = new DrBEE(deployer);
        console.log("BEE token deployed at:", address(bee));

        // 2. 部署 Vault（金库）
        uint256 claimAmount = 100 * 1e18; // 每次领取 100 BEE
        uint256 cooldown = 1 days;        // 每 24 小时可领一次
        Vault vault = new Vault(deployer, IERC20Decimals(address(bee)), claimAmount, cooldown);
        console.log("Vault deployed at:", address(vault));

        // 3. 部署 Staking 合约
        BeeStaking staking = new BeeStaking(address(bee));
        console.log("BeeStaking deployed at:", address(staking));

        // 4. 部署 NFT 合约
        DrBEENFT nft = new DrBEENFT(address(bee), tokenURIs);
        console.log("NFT contract deployed at:", address(nft));

        // 5. 分配代币
        // uint256 totalSupply = bee.TOTAL_SUPPLY();
        uint256 vaultAmount = 6_000_000_000 * 1e18; // 60亿
        uint256 stakingAmount = 3_000_000_000 * 1e18; // 30亿
        uint256 deployerAmount = 1_000_000_000 * 1e18; // 10亿

        // 转移代币到 Vault
        bee.transfer(address(vault), vaultAmount);
        console.log("Transferred to Vault:", vaultAmount);
        
        // 转移代币到 Staking 合约
        bee.transfer(address(staking), stakingAmount);
        console.log("Transferred to Staking:", stakingAmount);
        
        // 部署者保留 10亿
        console.log("Deployer keeps:", deployerAmount);

        // 6. 部署者先批准 NFT 合约能消费 BEE
        uint256 approveAmount = 1000 * 1e18; // 提前批量批准
        bee.approve(address(nft), approveAmount);

        // 7. 部署者 Mint 一个 NFT
        nft.mint();
        console.log("Minted first NFT to deployer");

        vm.stopBroadcast();
    }
}
