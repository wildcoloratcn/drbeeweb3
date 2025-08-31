import { useState, useEffect, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { STAKING_ABI, BEE_TOKEN_ABI, VAULT_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/utils/constants";
import { StakingInfo } from "@/types";
import { parseEther } from "viem";

export const useStaking = () => {
  const { address } = useAccount();
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Read contract states with auto-refresh every 30 seconds
  const { 
    data: stakeData, 
    isLoading: stakeDataLoading, 
    error: stakeDataError,
    refetch: refetchStakeData 
  } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'stakes',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  const { 
    data: totalStaked, 
    isLoading: totalStakedLoading,
    refetch: refetchTotalStaked 
  } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'totalStaked',
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  const { 
    data: interestEarned, 
    isLoading: interestEarnedLoading,
    refetch: refetchInterestEarned 
  } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'calculateInterest',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  // Read BEE token balance
  const { 
    data: beeBalance, 
    isLoading: beeBalanceLoading,
    refetch: refetchBeeBalance 
  } = useReadContract({
    address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
    abi: BEE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  // Read vault information
  const { data: lastClaim, isLoading: lastClaimLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'lastClaim',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  const { data: cooldown, isLoading: cooldownLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'cooldown',
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // Refresh every 5 seconds
    },
  });

  // Write contracts
  const { 
    writeContract: approveWrite, 
    isPending: approvePending,
    data: approveHash,
    error: approveError 
  } = useWriteContract();

  const {
    writeContract: stakeWrite,
    isPending: stakePending,
    data: stakeHash,
    error: stakeError
  } = useWriteContract();

  const {
    writeContract: withdrawWrite,
    isPending: withdrawPending,
    data: withdrawHash,
    error: withdrawError
  } = useWriteContract();

  // Wait for transactions
  const { isLoading: approveConfirming, isSuccess: approveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: stakeConfirming, isSuccess: stakeSuccess } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });

  const { isLoading: withdrawConfirming, isSuccess: withdrawSuccess } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

  // Calculate vault info
  const calculateVaultInfo = useCallback(() => {
    if (!lastClaim || !cooldown) return null;
    
    const lastClaimTime = Number(lastClaim) * 1000; // Convert to milliseconds
    const cooldownMs = Number(cooldown) * 1000; // Convert to milliseconds
    const nextClaimTime = lastClaimTime + cooldownMs;
    const now = Date.now();
    const canClaim = now >= nextClaimTime;
    
    return {
      lastClaimTime,
      nextClaimTime,
      canClaim,
      timeUntilNextClaim: canClaim ? 0 : Math.max(0, nextClaimTime - now),
    };
  }, [lastClaim, cooldown]);

  // Update staking info when data changes
  useEffect(() => {
    const allLoading = stakeDataLoading || totalStakedLoading || interestEarnedLoading || 
                      beeBalanceLoading || lastClaimLoading || cooldownLoading;
    
    if (!allLoading && address) {
      if (stakeDataError) {
        console.error("Error fetching staking info:", stakeDataError);
        setLoading(false);
        return;
      }

      setStakingInfo({
        stakedAmount: stakeData ? stakeData[0]?.toString() || "0" : "0",
        startTime: stakeData ? Number(stakeData[1]) : 0,
        interestEarned: interestEarned?.toString() || "0",
        totalStaked: totalStaked?.toString() || "0",
        beeBalance: beeBalance?.toString() || "0",
        vaultInfo: calculateVaultInfo(),
      });
      setLoading(false);
    } else if (!address) {
      setLoading(false);
    }
  }, [stakeData, totalStaked, interestEarned, beeBalance, lastClaim, cooldown,
      stakeDataLoading, totalStakedLoading, interestEarnedLoading, beeBalanceLoading, 
      lastClaimLoading, cooldownLoading, address, stakeDataError, calculateVaultInfo]);

  // 监听 stake 成功，立即刷新数据
  useEffect(() => {
    if (stakeSuccess) {
      console.log("🎉 Stake successful! Refreshing staking data...");
      // 立即刷新所有相关数据
      refetchStakeData();
      refetchTotalStaked();
      refetchInterestEarned();
      refetchBeeBalance();
    }
  }, [stakeSuccess, refetchStakeData, refetchTotalStaked, refetchInterestEarned, refetchBeeBalance]);

  // 监听 withdraw 成功，立即刷新数据
  useEffect(() => {
    if (withdrawSuccess) {
      console.log("💰 Withdraw successful! Refreshing staking data...");
      // 立即刷新所有相关数据
      refetchStakeData();
      refetchTotalStaked();
      refetchInterestEarned();
      refetchBeeBalance();
    }
  }, [withdrawSuccess, refetchStakeData, refetchTotalStaked, refetchInterestEarned, refetchBeeBalance]);

  const stake = (amount: string) => {
    if (!address) return;

    const amountWei = parseEther(amount);
    
    // First approve the staking contract to spend tokens
    approveWrite({
      address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
      abi: BEE_TOKEN_ABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESSES.STAKING as `0x${string}`, amountWei],
      chainId: CHAIN_ID,
    });
  };

  const executeStake = (amount: string) => {
    if (!address) return;

    const amountWei = parseEther(amount);
    
    stakeWrite({
      address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'stake',
      args: [amountWei],
      chainId: CHAIN_ID,
    });
  };

  const withdraw = () => {
    if (!address) return;

    withdrawWrite({
      address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'withdraw',
      chainId: CHAIN_ID,
    });
  };

  return { 
    stakingInfo, 
    loading,
    stake,
    executeStake,
    withdraw,
    // Manual refresh functions
    refreshStakingData: () => {
      refetchStakeData();
      refetchTotalStaked();
      refetchInterestEarned();
      refetchBeeBalance();
    },
    // Transaction states
    isPending: approvePending || stakePending || withdrawPending,
    isConfirming: approveConfirming || stakeConfirming || withdrawConfirming,
    isSuccess: stakeSuccess || withdrawSuccess,
    approveSuccess,
    error: approveError || stakeError || withdrawError,
  };
};