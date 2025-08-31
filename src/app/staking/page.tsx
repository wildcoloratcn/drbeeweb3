"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStaking } from "@/hooks/useStaking";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { formatEther, parseEther } from "viem";

export default function StakingPage() {
  const { 
    stakingInfo, 
    loading, 
    stake, 
    executeStake, 
    withdraw, 
    isPending, 
    isConfirming, 
    isSuccess, 
    approveSuccess,
    error 
  } = useStaking();
  const [stakeAmount, setStakeAmount] = useState("");
  const [step, setStep] = useState<"approve" | "stake">("approve");
  const [countdown, setCountdown] = useState(30);

  // Check if user has enough BEE for staking
  const hasEnoughBee = stakingInfo && stakeAmount ? 
    BigInt(stakingInfo.beeBalance) >= parseEther(stakeAmount) : true;

  const handleApprove = () => {
    if (!stakeAmount) return;
    stake(stakeAmount);
    setStep("stake");
  };

  const handleExecuteStake = () => {
    if (!stakeAmount) return;
    executeStake(stakeAmount);
  };

  const handleWithdraw = () => {
    withdraw();
  };

  // 30-second countdown and auto-refresh for interest calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Reset countdown (wagmi will auto-refresh based on refetchInterval)
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset after successful transaction
  useEffect(() => {
    if (isSuccess) {
      setStakeAmount("");
      setStep("approve");
      // Reset countdown to show fresh interest calculation
      setCountdown(30);
      console.log("✅ Staking transaction completed! Data will refresh automatically.");
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
      <h1 className="text-3xl font-bold text-center">Staking</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Stake Your BEE</h2>
        <p className="text-gray-600 mb-4">
          Stake your BEE tokens and earn 80% APY. Interest is calculated per second.
        </p>

        {stakingInfo && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Your BEE Balance:</span>
                <span className="font-bold text-lg">{formatEther(BigInt(stakingInfo.beeBalance))} BEE</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Your Staked Amount:</span>
                <span className="font-bold text-lg">{formatEther(BigInt(stakingInfo.stakedAmount))} BEE</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Interest Earned:</span>
                <span className="font-bold text-lg text-green-600">
                  +{formatEther(BigInt(stakingInfo.interestEarned))} BEE
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Interest calculated in:</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {countdown}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${((30 - countdown) / 30) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Vault Information */}
            {stakingInfo.vaultInfo && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border">
                <h3 className="font-semibold text-blue-800 mb-2">💰 Daily Claim Status</h3>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Last Claim:</span>
                  <span className="text-sm font-mono">
                    {stakingInfo.vaultInfo.lastClaimTime > 0 ? 
                      new Date(stakingInfo.vaultInfo.lastClaimTime).toLocaleString() : 
                      "Never"
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next Claim:</span>
                  <span className="text-sm font-mono">
                    {stakingInfo.vaultInfo.canClaim ? (
                      <span className="text-green-600 font-semibold">Available Now!</span>
                    ) : (
                      <span>
                        {new Date(stakingInfo.vaultInfo.nextClaimTime).toLocaleString()}
                        <br />
                        <span className="text-xs text-gray-500">
                          ({Math.ceil(stakingInfo.vaultInfo.timeUntilNextClaim / (1000 * 60 * 60))} hours left)
                        </span>
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Total Staked (Platform):</span>
              <span>{formatEther(BigInt(stakingInfo.totalStaked))} BEE</span>
            </div>

            <TransactionStatus 
              status={
                isPending || isConfirming ? "loading" : 
                isSuccess ? "success" : 
                error ? "error" : "idle"
              } 
              message={
                isSuccess ? "Transaction successful! Your staked amount and interest are updating..." :
                error?.message || ""
              } 
            />

            <div className="space-y-2">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Amount to stake"
                className={`w-full p-2 border rounded ${!hasEnoughBee && stakeAmount ? 'border-red-300 bg-red-50' : ''}`}
              />

              {!hasEnoughBee && stakeAmount && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm mb-2">
                    ⚠️ Insufficient BEE balance. You need {stakeAmount} BEE but only have {formatEther(BigInt(stakingInfo?.beeBalance || "0"))} BEE.
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
              
              {step === "approve" && hasEnoughBee && (
                <Button 
                  onClick={handleApprove} 
                  disabled={!stakeAmount || isPending || isConfirming} 
                  className="w-full"
                >
                  {isPending ? "Approving..." : "1. Approve BEE"}
                </Button>
              )}

              {step === "approve" && !hasEnoughBee && stakeAmount && (
                <Button 
                  disabled={true}
                  className="w-full opacity-50 cursor-not-allowed"
                >
                  Insufficient BEE Balance
                </Button>
              )}

              {step === "stake" && approveSuccess && hasEnoughBee && (
                <Button 
                  onClick={handleExecuteStake} 
                  disabled={!stakeAmount || isPending || isConfirming} 
                  className="w-full"
                >
                  {isPending ? "Staking..." : "2. Stake BEE"}
                </Button>
              )}
              
              {step === "stake" && !approveSuccess && (
                <div className="text-sm text-gray-600 text-center">
                  ✅ Approval transaction confirmed. Click &ldquo;Stake BEE&rdquo; to complete.
                </div>
              )}
            </div>

            {stakingInfo.stakedAmount !== "0" && (
              <Button 
                onClick={handleWithdraw} 
                disabled={isPending || isConfirming} 
                variant="secondary" 
                className="w-full"
              >
                {isPending ? "Withdrawing..." : "Withdraw All"}
              </Button>
            )}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Staking Details</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>80% APY, calculated per second</li>
          <li>No lock-up period, withdraw anytime</li>
          <li>Interest is compounded automatically when you stake more</li>
        </ul>
      </Card>
    </div>
  );
}