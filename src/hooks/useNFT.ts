import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFT_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/utils/constants";
import { NFTInfo } from "@/types";

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

  const { data: totalMinted, isLoading: totalMintedLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'totalMinted',
    chainId: CHAIN_ID,
  });

  const { data: mintPrice, isLoading: mintPriceLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintPrice',
    chainId: CHAIN_ID,
  });

  const { data: userBalance, isLoading: userBalanceLoading } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
  });

  // Write contract
  const {
    writeContract: mintWrite,
    isPending: mintPending,
    data: mintHash,
    error: mintError
  } = useWriteContract();

  // Wait for transaction
  const { isLoading: mintConfirming, isSuccess: mintSuccess } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  // Update NFT info when data changes
  useEffect(() => {
    const allLoading = maxSupplyLoading || totalMintedLoading || mintPriceLoading || userBalanceLoading;
    
    if (!allLoading && address) {
      setNftInfo({
        totalSupply: maxSupply ? Number(maxSupply) : 0,
        minted: totalMinted ? Number(totalMinted) : 0,
        mintPrice: mintPrice?.toString() || "0",
        userBalance: userBalance ? Number(userBalance) : 0,
      });
      setLoading(false);
    } else if (!address) {
      setLoading(false);
    }
  }, [maxSupply, totalMinted, mintPrice, userBalance, maxSupplyLoading, totalMintedLoading, mintPriceLoading, userBalanceLoading, address]);

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
    mint,
    // Transaction states
    isPending: mintPending,
    isConfirming: mintConfirming,
    isSuccess: mintSuccess,
    error: mintError,
  };
};