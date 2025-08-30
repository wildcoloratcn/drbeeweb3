// 这里需要导入各个合约的ABI
// 由于ABI较长，建议从外部文件导入或使用简化版本

export const BEE_TOKEN_ABI = [
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{"name": "account", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint8", "internalType": "uint8"}],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [{"name": "to", "type": "address", "internalType": "address"}, {"name": "value", "type": "uint256", "internalType": "uint256"}],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [{"name": "spender", "type": "address", "internalType": "address"}, {"name": "value", "type": "uint256", "internalType": "uint256"}],
      "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [{"name": "owner", "type": "address", "internalType": "address"}, {"name": "spender", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "TOTAL_SUPPLY",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    }
  ] as const;
  
  export const VAULT_ABI = [
    {
      "type": "function",
      "name": "claim",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "claimAmount",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "cooldown",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lastClaim",
      "inputs": [{"name": "", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    }
  ] as const;
  
  export const NFT_ABI = [
    {
      "type": "function",
      "name": "mint",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "totalMinted",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{"name": "owner", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "mintPrice",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "MAX_SUPPLY",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    }
  ] as const;
  
  export const STAKING_ABI = [
    {
      "type": "function",
      "name": "stake",
      "inputs": [{"name": "amount", "type": "uint256", "internalType": "uint256"}],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "interestRatePerSecond",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalStaked",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "stakes",
      "inputs": [{"name": "", "type": "address", "internalType": "address"}],
      "outputs": [
        {"name": "amount", "type": "uint256", "internalType": "uint256"},
        {"name": "startTime", "type": "uint256", "internalType": "uint256"},
        {"name": "principal", "type": "uint256", "internalType": "uint256"}
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "calculateInterest",
      "inputs": [{"name": "user", "type": "address", "internalType": "address"}],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "contractBalance",
      "inputs": [],
      "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
      "stateMutability": "view"
    }
  ] as const;