import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { VAULT_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES } from "@/utils/constants";
import { VaultInfo } from "@/types";

export const useVault = () => {
  console.log("🔥 useVault hook called");
  
  const { address } = useAccount();
  const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("🔥 useVault hook initialized, address:", address);

  // 读取合约数据
  const { data: claimAmount, error: claimAmountError, isLoading: claimAmountLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'claimAmount',
  });

  const { data: cooldown, error: cooldownError, isLoading: cooldownLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'cooldown',
  });

  const { data: lastClaim, error: lastClaimError, isLoading: lastClaimLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'lastClaim',
    args: address ? [address] : undefined,
  });

  // 调试合约读取状态
  console.log("📊 Contract read states:", {
    claimAmount: { data: claimAmount, error: claimAmountError?.message, loading: claimAmountLoading },
    cooldown: { data: cooldown, error: cooldownError?.message, loading: cooldownLoading },
    lastClaim: { data: lastClaim, error: lastClaimError?.message, loading: lastClaimLoading }
  });

  // 详细检查数据
  console.log("🔍 Detailed contract data:", {
    claimAmount: claimAmount,
    cooldown: cooldown,
    lastClaim: lastClaim,
    address: address,
    allLoaded: claimAmount !== undefined && cooldown !== undefined && lastClaim !== undefined && address
  });

  // 写入合约
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const allLoading = claimAmountLoading || cooldownLoading || lastClaimLoading;
    const hasErrors = claimAmountError || cooldownError || lastClaimError;
    
    console.log("🔄 useEffect triggered with:", {
      claimAmount: claimAmount,
      cooldown: cooldown,
      lastClaim: lastClaim,
      address: address,
      allLoading: allLoading,
      hasErrors: !!hasErrors,
      condition: claimAmount !== undefined && cooldown !== undefined && lastClaim !== undefined && address
    });

    // 如果还在加载中，就不更新
    if (allLoading) {
      console.log("⏳ Still loading contract data, waiting...");
      return;
    }

    // 如果有错误，设置loading为false但不更新vault信息
    if (hasErrors) {
      console.log("❌ Contract read errors:", {
        claimAmountError: claimAmountError?.message,
        cooldownError: cooldownError?.message,
        lastClaimError: lastClaimError?.message
      });
      setLoading(false);
      return;
    }

    if (claimAmount !== undefined && cooldown !== undefined && lastClaim !== undefined && address) {
      console.log("✅ All conditions met, updating vault info");
      
      const lastClaimTime = Number(lastClaim) * 1000;
      const nextClaimTime = lastClaimTime + Number(cooldown) * 1000;
      const canClaim = lastClaimTime === 0 || Date.now() >= nextClaimTime;
      const timeUntilNextClaim = canClaim ? 0 : Math.max(0, nextClaimTime - Date.now());

      console.log("💰 Vault info updated:", {
        claimAmount: claimAmount?.toString() || "0",
        cooldown: Number(cooldown),
        lastClaim: Number(lastClaim),
        canClaim,
        nextClaimTime,
        lastClaimTime,
        timeUntilNextClaim,
      });

      setVaultInfo({
        claimAmount: claimAmount?.toString() || "0",
        cooldown: Number(cooldown),
        lastClaim: Number(lastClaim),
        canClaim,
        nextClaimTime,
        lastClaimTime,
        timeUntilNextClaim,
      });
      setLoading(false);
      console.log("🚫 Loading set to false");
    } else {
      console.log("⚠️  Not all conditions met for vault info update");
      // 如果没有地址，也要设置loading为false
      if (!address) {
        setLoading(false);
        console.log("🚫 No address, loading set to false");
      }
    }
  }, [claimAmount, cooldown, lastClaim, address, claimAmountLoading, cooldownLoading, lastClaimLoading, claimAmountError, cooldownError, lastClaimError]);

  // 监控交易状态变化
  useEffect(() => {
    console.log("Transaction state changed:", {
      isPending,
      isConfirming,
      isConfirmed,
      error: error?.message,
      hash
    });
  }, [isPending, isConfirming, isConfirmed, error, hash]);

  const claim = () => {
    console.log("🎯 claim function called");
    console.log("🎯 address:", address);
    console.log("🎯 CONTRACT_ADDRESSES.VAULT:", CONTRACT_ADDRESSES.VAULT);
    
    if (!address) {
      console.error("❌ Please connect your wallet");
      return;
    }

    try {
      console.log("🎯 Calling writeContract...");
      writeContract({
        address: CONTRACT_ADDRESSES.VAULT as `0x${string}`,
        abi: VAULT_ABI,
        functionName: 'claim',
      });
      console.log("✅ writeContract called successfully");
    } catch (error) {
      console.error("❌ Error claiming:", error);
    }
  };

  return { 
    vaultInfo, 
    loading, 
    claim,
    isPending: isPending || isConfirming,
    isSuccess: isConfirmed,
    error
  };
};