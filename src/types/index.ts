export interface VaultInfo {
    claimAmount: string;
    cooldown: number;
    lastClaim: number;
    canClaim: boolean;
    nextClaimTime: number;
  }
  
  export interface StakingInfo {
    stakedAmount: string;
    startTime: number;
    interestEarned: string;
    totalStaked: string;
  }
  
  export interface NFTInfo {
    totalSupply: number;
    minted: number;
    mintPrice: string;
    userBalance: number;
  }