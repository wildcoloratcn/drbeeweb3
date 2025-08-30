import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { STAKING_ABI, BEE_TOKEN_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/utils/constants";
import { StakingInfo } from "@/types";
import { parseEther } from "viem";

export const useStaking = () => {
  const { address } = useAccount();
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Read contract states with auto-refresh every 30 seconds
  const { data: stakeData, isLoading: stakeDataLoading, error: stakeDataError } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'stakes',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  const { data: totalStaked, isLoading: totalStakedLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'totalStaked',
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  const { data: interestEarned, isLoading: interestEarnedLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING as `0x${string}`,
    abi: STAKING_ABI,
    functionName: 'calculateInterest',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 30000, // Refresh every 30 seconds
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

  // Update staking info when data changes
  useEffect(() => {
    const allLoading = stakeDataLoading || totalStakedLoading || interestEarnedLoading;
    
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
      });
      setLoading(false);
    } else if (!address) {
      setLoading(false);
    }
  }, [stakeData, totalStaked, interestEarned, stakeDataLoading, totalStakedLoading, interestEarnedLoading, address, stakeDataError]);

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
    // Transaction states
    isPending: approvePending || stakePending || withdrawPending,
    isConfirming: approveConfirming || stakeConfirming || withdrawConfirming,
    isSuccess: stakeSuccess || withdrawSuccess,
    approveSuccess,
    error: approveError || stakeError || withdrawError,
  };
};