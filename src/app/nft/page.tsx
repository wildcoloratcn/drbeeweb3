"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useNFT } from "@/hooks/useNFT";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { formatEther } from "viem";

export default function NFTPage() {
  const { 
    nftInfo, 
    loading, 
    needsApproval,
    hasEnoughBee,
    approve,
    mint, 
    isPending, 
    isConfirming, 
    isSuccess, 
    approveSuccess,
    error 
  } = useNFT();

  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const [previousUserBalance, setPreviousUserBalance] = useState(0);
  const [lastMintSuccess, setLastMintSuccess] = useState(false);

  const handleApprove = () => {
    console.log("🔄 User clicked Approve");
    approve();
  };

  const handleMint = () => {
    console.log("🔄 User clicked Mint");
    mint();
  };

  // 监听NFT余额变化，显示成功消息
  useEffect(() => {
    if (nftInfo && nftInfo.userBalance > 0) {
      // 只有当之前记录的余额 >= 0 且当前余额大于之前余额时才显示成功消息
      if (previousUserBalance >= 0 && nftInfo.userBalance > previousUserBalance) {
        setShowMintSuccess(true);
        // 3秒后隐藏成功消息
        setTimeout(() => setShowMintSuccess(false), 3000);
      }
      setPreviousUserBalance(nftInfo.userBalance);
    } else if (nftInfo && nftInfo.userBalance === 0 && previousUserBalance === 0) {
      // 初始化时记录余额
      setPreviousUserBalance(0);
    }
  }, [nftInfo?.userBalance]);

  // 监听 mint 成功状态
  useEffect(() => {
    if (isSuccess && !lastMintSuccess) {
      console.log("🎉 NFT Mint transaction successful!");
      setLastMintSuccess(true);
      
      // 2秒后重置状态，为下次操作做准备
      setTimeout(() => {
        setLastMintSuccess(false);
      }, 2000);
    }
  }, [isSuccess, lastMintSuccess]);

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

      {showMintSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-green-800 font-semibold">NFT Minted Successfully!</p>
              <p className="text-green-600 text-sm">Your new DrBEE NFT has been added to your collection!</p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-4">Mint Your DrBEE NFT</h2>
        <p className="text-gray-600 mb-4">
          Mint a unique DrBEE NFT for 10 BEE. Collect all 12 variants!
        </p>

        {nftInfo && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border">
              <div className="flex justify-between mb-2">
                <span>Total Minted:</span>
                <span>{nftInfo.minted} / {nftInfo.totalSupply}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Mint Price:</span>
                <span className="font-semibold">{formatEther(BigInt(nftInfo.mintPrice))} BEE</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Your BEE Balance:</span>
                <span className={`font-semibold ${hasEnoughBee ? 'text-green-600' : 'text-red-600'}`}>
                  {formatEther(BigInt(nftInfo.beeBalance))} BEE
                </span>
              </div>
              <div className="flex justify-between">
                <span>Your NFTs:</span>
                <span className="font-semibold">{nftInfo.userBalance}</span>
              </div>
            </div>

            {!hasEnoughBee && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm mb-2">
                  ⚠️ Insufficient BEE balance. You need {formatEther(BigInt(nftInfo.mintPrice))} BEE to mint.
                </p>
                <p className="text-red-600 text-sm">
                  💡 Get free BEE tokens: {" "}
                  <Link 
                    href="/vault" 
                    className="underline font-semibold hover:text-red-800 transition-colors"
                  >
                    Claim 100 BEE daily →
                  </Link>
                </p>
              </div>
            )}

            <TransactionStatus 
              status={
                isPending || isConfirming ? "loading" : 
                isSuccess ? "success" : 
                error ? "error" : "idle"
              } 
              message={
                isPending ? "Processing approval..." :
                isConfirming ? "Minting NFT..." :
                isSuccess && lastMintSuccess ? "🎉 NFT minted successfully!" :
                isSuccess && approveSuccess ? "✅ BEE approval confirmed! You can now mint your NFT." :
                error?.message || ""
              } 
            />



            {/* 余额不足的情况 */}
            {!hasEnoughBee && (
              <Button
                disabled={true}
                className="w-full opacity-50 cursor-not-allowed"
              >
                Insufficient BEE Balance
              </Button>
            )}

            {/* 有足够余额的情况 - 始终显示两个按钮 */}
            {hasEnoughBee && (
              <div className="space-y-2">
                {/* 1. Approve按钮 - 始终显示 */}
                <Button
                  onClick={handleApprove}
                  disabled={!needsApproval || isPending || isConfirming}
                  className={`w-full ${!needsApproval ? 'opacity-50' : ''}`}
                >
                  1. Approve BEE
                </Button>

                {/* 2. Mint按钮 - 始终显示 */}
                <Button
                  onClick={handleMint}
                  disabled={needsApproval || nftInfo.minted >= nftInfo.totalSupply || isPending || isConfirming}
                  className={`w-full ${needsApproval ? 'opacity-50' : ''}`}
                >
                  2. Mint NFT
                </Button>

                {/* 简单的状态提示 */}
                <div className="text-center text-sm text-gray-600">
                  {needsApproval ? (
                    "Step 1: Approve BEE tokens first"
                  ) : (
                    "Step 2: Ready to mint your NFT!"
                  )}
                </div>
              </div>
            )}
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
            {Array.from({ length: nftInfo.userBalance }, (_, i) => {
              // 根据合约逻辑 (tokenId - 1) % 12 + 1 来计算图片编号
              // 假设用户的 NFT 是按顺序分配的
              const imageNumber = (i % 12) + 1;
              // 使用真实的 IPFS 地址 - 根据你的 metadata 文件中的地址
              const ipfsHash = "bafybeiclc5um24aicehsk6wm4gz5v3poklsmf5bo6ffdubarrp6aebhps4";
              const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}/${imageNumber}.png`;
              
              return (
                <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg border-2 border-yellow-300">
                  <div className="relative w-full h-full">
                    <img 
                      src={ipfsUrl}
                      alt={`DrBEE NFT #${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // 如果 IPFS 图片加载失败，显示备用的渐变背景
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                              <div class="text-white font-bold text-lg">
                                🐝 #${i + 1}
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1">
                      <span className="text-sm font-semibold">DrBEE #{i + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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