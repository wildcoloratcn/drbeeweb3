import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFT_ABI, BEE_TOKEN_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/utils/constants";
import { NFTInfo } from "@/types";
import { parseEther } from "viem";

export const useNFT = () => {
  const { address } = useAccount();
  const [nftInfo, setNftInfo] = useState<NFTInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Read contract states
  const { data: maxSupply, isLoading: maxSupplyLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'MAX_SUPPLY',
    chainId: CHAIN_ID,
  });

  const { data: totalMinted, isLoading: totalMintedLoading, refetch: refetchTotalMinted } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'totalMinted',
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // 每5秒自动刷新
    },
  });

  const { data: mintPrice, isLoading: mintPriceLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintPrice',
    chainId: CHAIN_ID,
  });

  const { data: userBalance, isLoading: userBalanceLoading, refetch: refetchUserBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // 每5秒自动刷新
    },
  });

  // Check user's BEE token balance
  const { data: beeBalance, isLoading: beeBalanceLoading, refetch: refetchBeeBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
    abi: BEE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // 每5秒自动刷新
    },
  });

  // Check BEE token allowance for NFT contract
  const { data: allowance, isLoading: allowanceLoading, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
    abi: BEE_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESSES.NFT as `0x${string}`] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000, // 每5秒自动刷新
    },
  });

  // Write contracts
  const {
    writeContract: approveWrite,
    isPending: approvePending,
    data: approveHash,
    error: approveError,
    reset: resetApprove
  } = useWriteContract();

  const {
    writeContract: mintWrite,
    isPending: mintPending,
    data: mintHash,
    error: mintError,
    reset: resetMint
  } = useWriteContract();

  // Wait for transactions
  const { isLoading: approveConfirming, isSuccess: approveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: mintConfirming, isSuccess: mintSuccess } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  // Update NFT info when data changes
  useEffect(() => {
    const allLoading = maxSupplyLoading || totalMintedLoading || mintPriceLoading || userBalanceLoading || 
                      beeBalanceLoading || allowanceLoading;
    
    if (!allLoading && address) {
      setNftInfo({
        totalSupply: maxSupply ? Number(maxSupply) : 0,
        minted: totalMinted ? Number(totalMinted) : 0,
        mintPrice: mintPrice?.toString() || "0",
        userBalance: userBalance ? Number(userBalance) : 0,
        beeBalance: beeBalance?.toString() || "0",
        allowance: allowance?.toString() || "0",
      });
      setLoading(false);
    } else if (!address) {
      setLoading(false);
    }
  }, [maxSupply, totalMinted, mintPrice, userBalance, beeBalance, allowance, 
      maxSupplyLoading, totalMintedLoading, mintPriceLoading, userBalanceLoading, 
      beeBalanceLoading, allowanceLoading, address]);

  // 监听 mint 成功，立即刷新数据
  useEffect(() => {
    if (mintSuccess) {
      console.log("🎉 Mint successful! Refreshing NFT data and resetting approve state...");
      // 立即刷新所有相关数据
      refetchTotalMinted();
      refetchUserBalance();
      refetchBeeBalance();
      refetchAllowance();
      
      // 重置 approve 状态，为下次 mint 做准备
      // 延迟重置，确保用户能看到成功状态
      setTimeout(() => {
        resetApprove();
      }, 3000);
    }
  }, [mintSuccess, refetchTotalMinted, refetchUserBalance, refetchBeeBalance, refetchAllowance, resetApprove]);

  // 监听 approve 成功，刷新 allowance
  useEffect(() => {
    if (approveSuccess) {
      console.log("✅ Approve successful! Refreshing allowance...");
      refetchAllowance();
    }
  }, [approveSuccess, refetchAllowance]);

  // Check if user needs to approve
  const needsApproval = nftInfo && BigInt(nftInfo.allowance) < BigInt(nftInfo.mintPrice);
  
  // Check if user has enough BEE
  const hasEnoughBee = nftInfo && BigInt(nftInfo.beeBalance) >= BigInt(nftInfo.mintPrice);

  const approve = () => {
    if (!address || !nftInfo) return;

    approveWrite({
      address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
      abi: BEE_TOKEN_ABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESSES.NFT as `0x${string}`, BigInt(nftInfo.mintPrice)],
      chainId: CHAIN_ID,
    });
  };

  const mint = () => {
    if (!address) return;

    mintWrite({
      address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'mint',
      chainId: CHAIN_ID,
    });
  };

  return { 
    nftInfo, 
    loading,
    needsApproval,
    hasEnoughBee,
    approve,
    mint,
    // Transaction states
    isPending: approvePending || mintPending,
    isConfirming: approveConfirming || mintConfirming,
    isSuccess: mintSuccess,
    approveSuccess,
    error: approveError || mintError,
  };
};