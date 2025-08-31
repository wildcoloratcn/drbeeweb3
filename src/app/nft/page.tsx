"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useNFT } from "@/hooks/useNFT";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { formatEther } from "viem";
import { Image, Coins, TrendingUp, AlertTriangle, ExternalLink, Palette } from "lucide-react";

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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 purple-gradient rounded-full flex items-center justify-center mx-auto">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gradient">NFT Collection</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Mint unique DrBEE NFTs and collect all 12 variants. Each NFT is stored on IPFS and costs 10 BEE tokens.
        </p>
      </div>

      {showMintSuccess && (
        <Card className="bg-green-900/20 border-green-500/20 glow-blue">
          <CardContent>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-green-400 font-semibold text-lg">NFT Minted Successfully!</p>
                <p className="text-green-300 text-sm">Your new DrBEE NFT has been added to your collection!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-6 h-6" />
            <span>Mint Your DrBEE NFT</span>
          </CardTitle>
          <CardDescription>
            Mint unique DrBEE NFTs for 10 BEE tokens each. Collect all 12 variants!
          </CardDescription>
        </CardHeader>

        {nftInfo && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{nftInfo.minted}</p>
                <p className="text-gray-400 text-sm">Total Minted</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Coins className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{formatEther(BigInt(nftInfo.mintPrice))}</p>
                <p className="text-gray-400 text-sm">BEE Price</p>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-purple-400">💰</span>
                </div>
                <p className={`text-2xl font-bold ${hasEnoughBee ? 'text-green-400' : 'text-red-400'}`}>
                  {formatEther(BigInt(nftInfo.beeBalance))}
                </p>
                <p className="text-gray-400 text-sm">Your BEE</p>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-blue-400">🐝</span>
                </div>
                <p className="text-2xl font-bold text-white">{nftInfo.userBalance}</p>
                <p className="text-gray-400 text-sm">Your NFTs</p>
              </div>
            </div>

            {!hasEnoughBee && (
              <Card className="bg-red-900/20 border-red-500/20">
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="space-y-2">
                      <p className="text-red-400 font-semibold">
                        Insufficient BEE Balance
                      </p>
                      <p className="text-red-300 text-sm">
                        You need {formatEther(BigInt(nftInfo.mintPrice))} BEE to mint an NFT.
                      </p>
                      <Link href="/vault">
                        <Button variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-500/10">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Claim 100 BEE Daily
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
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



            {/* Minting Actions */}
            <div className="space-y-4">
              {!hasEnoughBee ? (
                <Button
                  disabled={true}
                  variant="destructive"
                  className="w-full"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Insufficient BEE Balance
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {/* 1. Approve按钮 */}
                  <Button
                    onClick={handleApprove}
                    disabled={!needsApproval || isPending || isConfirming}
                    variant={!needsApproval ? "secondary" : "default"}
                    className="w-full"
                  >
                    <Coins className="w-4 h-4 mr-2" />
                    1. Approve BEE
                  </Button>

                  {/* 2. Mint按钮 */}
                  <Button
                    onClick={handleMint}
                    disabled={needsApproval || nftInfo.minted >= nftInfo.totalSupply || isPending || isConfirming}
                    variant={needsApproval ? "secondary" : "default"}
                    className="w-full"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    2. Mint NFT
                  </Button>
                </div>
              )}

              {/* Status Indicator */}
              {hasEnoughBee && (
                <div className="text-center p-3 glass-card">
                  <p className="text-sm text-gray-300">
                    {needsApproval ? (
                      <span className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        Step 1: Approve BEE tokens first
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Step 2: Ready to mint your NFT!
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {nftInfo && nftInfo.userBalance > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-6 h-6" />
              <span>Your NFT Collection</span>
            </CardTitle>
            <CardDescription>
              You own {nftInfo.userBalance} DrBEE NFT{nftInfo.userBalance > 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      <span className="text-sm font-semibold text-white">DrBEE #{i + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">NFT Collection Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Collection Progress:</span>
            <span className="font-semibold text-white">{nftInfo?.minted || 0} / {nftInfo?.totalSupply || 10000} minted</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((nftInfo?.minted || 0) / (nftInfo?.totalSupply || 10000)) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300">
            {((nftInfo?.totalSupply || 10000) - (nftInfo?.minted || 0)).toLocaleString()} NFTs remaining
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">About DrBEE NFTs</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
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