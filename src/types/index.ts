export interface VaultInfo {
    claimAmount: string;
    cooldown: number;
    lastClaim: number;
    canClaim: boolean;
    nextClaimTime: number;
    lastClaimTime: number; // 毫秒时间戳，用于显示
    timeUntilNextClaim: number; // 距离下次领取的毫秒数
  }
  
  export interface StakingInfo {
    stakedAmount: string;
    startTime: number;
    interestEarned: string;
    totalStaked: string;
    beeBalance: string;
    vaultInfo: {
      lastClaimTime: number;
      nextClaimTime: number;
      canClaim: boolean;
      timeUntilNextClaim: number;
    } | null;
  }
  
  export interface NFTInfo {
    totalSupply: number;
    minted: number;
    mintPrice: string;
    userBalance: number;
    beeBalance: string;
    allowance: string;
  }