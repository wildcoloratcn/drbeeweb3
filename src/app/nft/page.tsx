"use client";

import { useEffect } from "react";
import { useNFT } from "@/hooks/useNFT";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { formatEther } from "viem";

export default function NFTPage() {
  const { nftInfo, loading, mint, isPending, isConfirming, isSuccess, error } = useNFT();

  const handleMint = () => {
    mint();
  };

  // Reset any local state after successful transaction
  useEffect(() => {
    if (isSuccess) {
      // Transaction successful, data will auto-refresh
    }
  }, [isSuccess]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">NFT Minting</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Mint Your DrBEE NFT</h2>
        <p className="text-gray-600 mb-4">
          Mint a unique DrBEE NFT for 10 BEE. Collect all 12 variants!
        </p>

        {nftInfo && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Minted:</span>
              <span>{nftInfo.minted} / {nftInfo.totalSupply}</span>
            </div>
            <div className="flex justify-between">
              <span>Mint Price:</span>
              <span>{formatEther(BigInt(nftInfo.mintPrice))} BEE</span>
            </div>
            <div className="flex justify-between">
              <span>Your NFTs:</span>
              <span>{nftInfo.userBalance}</span>
            </div>

            <TransactionStatus 
              status={
                isPending || isConfirming ? "loading" : 
                isSuccess ? "success" : 
                error ? "error" : "idle"
              } 
              message={error?.message || ""} 
            />

            <Button
              onClick={handleMint}
              disabled={nftInfo.minted >= nftInfo.totalSupply || isPending || isConfirming}
              className="w-full"
            >
              {isPending ? "Confirming..." : isConfirming ? "Minting..." : "Mint NFT"}
            </Button>
          </div>
        )}
      </Card>

      {nftInfo && nftInfo.userBalance > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Your NFT Collection</h2>
          <p className="text-gray-600 mb-4">
            You own {nftInfo.userBalance} DrBEE NFT{nftInfo.userBalance > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: nftInfo.userBalance }, (_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-lg">
                  🐝 #{i + 1}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-4">NFT Collection Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Collection Progress:</span>
            <span className="font-semibold">{nftInfo?.minted || 0} / {nftInfo?.totalSupply || 10000} minted</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((nftInfo?.minted || 0) / (nftInfo?.totalSupply || 10000)) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {((nftInfo?.totalSupply || 10000) - (nftInfo?.minted || 0)).toLocaleString()} NFTs remaining
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">About DrBEE NFTs</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>12 unique variants with different rarities</li>
          <li>Stored on-chain with IPFS metadata</li>
          <li>Each NFT costs 10 BEE tokens to mint</li>
          <li>BEE tokens are burned during minting (deflationary)</li>
          <li>Maximum supply: 10,000 NFTs</li>
        </ul>
      </Card>
    </div>
  );
}