"use client";

import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { useVault } from "@/hooks/useVault";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { ConnectWallet } from "@/components/Common/ConnectWallet";
import { CHAIN_ID } from "@/utils/constants";

export default function VaultPage() {
  console.log("🚀 VaultPage component called");
  
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { vaultInfo, loading, claim, isPending, isSuccess, error } = useVault();

  console.log("🚀 VaultPage render:", {
    address,
    isConnected,
    chainId,
    expectedChainId: CHAIN_ID,
    loading,
    vaultInfo: !!vaultInfo,
    isPending,
    isSuccess,
    error: error?.message
  });

  // 监听交易成功状态，自动刷新页面或显示成功消息
  useEffect(() => {
    if (isSuccess) {
      // 延迟刷新，让用户看到成功状态
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isSuccess]);

  const handleClaim = () => {
    console.log("🎯 Claim button clicked!"); // 调试日志
    claim();
  };

  // 确定当前的交易状态
  const getTxStatus = () => {
    if (isPending) return "loading";
    if (isSuccess) return "success";
    if (error) return "error";
    return "idle";
  };

  const getErrorMessage = () => {
    if (error) {
      return error.message || "Failed to claim";
    }
    return "";
  };

  // 如果钱包未连接，显示连接钱包组件
  if (!isConnected) {
    console.log("🔗 Rendering wallet connect screen");
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gradient">Daily Claim</h1>
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-4">Please connect your wallet to claim your daily BEE tokens.</p>
            <ConnectWallet />
          </div>
        </Card>
      </div>
    );
  }

  // 检查网络是否正确
  if (chainId !== CHAIN_ID) {
    console.log("🌐 Wrong network, showing switch network screen");
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gradient">Daily Claim</h1>
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Wrong Network</h2>
            <p className="text-gray-300 mb-4">
              Please switch to Sepolia testnet (Chain ID: {CHAIN_ID}).
              <br />
              Current network: Chain ID {chainId}
            </p>
            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg backdrop-blur-md">
              <p className="text-sm text-yellow-200">
                To switch to Sepolia testnet in MetaMask:
                <br />
                1. Click the network dropdown
                <br />
                2. Select &ldquo;Sepolia test network&rdquo;
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) {
    console.log("⏳ Rendering loading screen");
    return (
      <div className="max-w-2xl mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  console.log("✅ Rendering main vault page");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-gradient">Daily Claim</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">Claim Your Daily BEE</h2>
        <p className="text-gray-300 mb-2">Claim 100 BEE tokens every 24 hours.</p>

        {vaultInfo ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Next Claim Available:</span>
              <span className="text-white font-semibold">
                {vaultInfo.canClaim ? (
                  <span className="text-green-400">Now</span>
                ) : (
                  new Date(vaultInfo.nextClaimTime).toLocaleString()
                )}
              </span>
            </div>

            <TransactionStatus status={getTxStatus()} message={getErrorMessage()} />

            <Button
              onClick={handleClaim}
              disabled={!vaultInfo.canClaim || isPending}
              className="w-full"
            >
              {isPending ? "Claiming..." : isSuccess ? "Claimed!" : "Claim 100 BEE"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-gray-300">
              Loading vault information...
            </div>
            
            <TransactionStatus status={getTxStatus()} message={getErrorMessage()} />

            <Button
              onClick={handleClaim}
              disabled={true}
              className="w-full"
            >
              Loading...
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">How it Works</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Claim 100 BEE tokens every 24 hours</li>
          <li>If you claim at 2:00 PM today, you can claim again at 2:00 PM tomorrow</li>
          <li>No limit on how many times you can claim</li>
        </ul>
      </Card>


    </div>
  );
}