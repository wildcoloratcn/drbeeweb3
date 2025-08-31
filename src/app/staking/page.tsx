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
    refreshStakingData,
    isPending, 
    isConfirming, 
    isSuccess, 
    approveSuccess,
    error 
  } = useStaking();
  const [stakeAmount, setStakeAmount] = useState("");
  const [step, setStep] = useState<"approve" | "stake">("approve");
  const [countdown, setCountdown] = useState(5);

  // Check if stake amount is valid and user has enough BEE
  const isValidAmount = stakeAmount && !isNaN(Number(stakeAmount)) && Number(stakeAmount) > 0;
  const hasEnoughBee = stakingInfo && isValidAmount ? 
    BigInt(stakingInfo.beeBalance) >= parseEther(stakeAmount) : false;

  const handleApprove = () => {
    if (!isValidAmount || !hasEnoughBee) return;
    stake(stakeAmount);
    setStep("stake");
  };

  const handleExecuteStake = () => {
    if (!isValidAmount || !hasEnoughBee) return;
    executeStake(stakeAmount);
  };

  const handleWithdraw = () => {
    withdraw();
  };

  // 5-second countdown and manual refresh for interest calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Trigger manual refresh when countdown reaches 0
          refreshStakingData();
          console.log("⏰ Interest calculation refreshed!");
          // Reset countdown to 5 seconds
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [refreshStakingData]);

  // Reset after successful transaction
  useEffect(() => {
    if (isSuccess) {
      setStakeAmount("");
      setStep("approve");
      // Reset countdown to show fresh interest calculation
      setCountdown(5);
      console.log("✅ Staking transaction completed! Data will refresh automatically.");
    }
  }, [isSuccess]);

  // Reset step if amount becomes invalid
  useEffect(() => {
    if (step === "stake" && (!isValidAmount || !hasEnoughBee)) {
      setStep("approve");
    }
  }, [isValidAmount, hasEnoughBee, step]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-gradient">Stake Your BEE</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">Stake Your BEE</h2>
        <p className="text-gray-300 mb-4">
          Stake your BEE tokens and earn 80% APY. Interest is <span className="font-bold text-red-500">calculated per second</span>. Withdraw anytime.
        </p>

        {stakingInfo && (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-200">Your BEE Balance:</span>
                <span className="font-bold text-lg text-white">{formatEther(BigInt(stakingInfo.beeBalance))} BEE</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-200">Your Staked Amount:</span>
                <span className="font-bold text-lg text-white">{formatEther(BigInt(stakingInfo.stakedAmount))} BEE</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-200">Interest Earned:</span>
                <span className="font-bold text-lg text-green-400">
                  +{formatEther(BigInt(stakingInfo.interestEarned))} BEE
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-300">Interest calculated in:</span>
                <span className="text-sm font-mono bg-white/20 text-white px-2 py-1 rounded">
                  {countdown}s
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-blue-400 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>


            
            <div className="flex justify-between">
              <span className="text-gray-300">Total Staked (Platform):</span>
              <span className="text-white font-semibold">{formatEther(BigInt(stakingInfo.totalStaked))} BEE</span>
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
                className={`w-full p-3 border rounded-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  stakeAmount && (!isValidAmount || !hasEnoughBee) ? 'border-red-400 bg-red-900/20' : ''
                }`}
              />

              {/* Invalid amount error */}
              {stakeAmount && !isValidAmount && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 backdrop-blur-md">
                  <p className="text-red-300 text-sm">
                    ⚠️ Invalid amount. Please enter a positive number greater than 0.
                  </p>
                </div>
              )}

              {/* Insufficient balance error */}
              {isValidAmount && !hasEnoughBee && stakingInfo && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 backdrop-blur-md">
                  <p className="text-red-300 text-sm mb-2">
                    ⚠️ Insufficient BEE balance. You need {stakeAmount} BEE but only have {formatEther(BigInt(stakingInfo.beeBalance))} BEE.
                  </p>
                  <p className="text-red-200 text-sm">
                    💡 Get free BEE tokens: {" "}
                    <Link 
                      href="/vault" 
                      className="underline font-semibold hover:text-red-100 transition-colors text-red-200"
                    >
                      Claim 100 BEE daily →
                    </Link>
                  </p>
                </div>
              )}
              
              {step === "approve" && isValidAmount && hasEnoughBee && (
                <Button 
                  onClick={handleApprove} 
                  disabled={isPending || isConfirming} 
                  className="w-full"
                >
                  {isPending ? "Approving..." : "1. Approve BEE"}
                </Button>
              )}

              {step === "approve" && stakeAmount && (!isValidAmount || !hasEnoughBee) && (
                <Button 
                  disabled={true}
                  className="w-full opacity-50 cursor-not-allowed"
                >
                  {!isValidAmount ? "Invalid Amount" : "Insufficient BEE Balance"}
                </Button>
              )}

              {step === "stake" && approveSuccess && isValidAmount && hasEnoughBee && (
                <Button 
                  onClick={handleExecuteStake} 
                  disabled={isPending || isConfirming} 
                  className="w-full"
                >
                  {isPending ? "Staking..." : "2. Stake BEE"}
                </Button>
              )}
              
              {step === "stake" && !approveSuccess && isValidAmount && hasEnoughBee && (
                <div className="text-sm text-gray-300 text-center">
                  ✅ Please confirm approval using your wallet. Click &ldquo;Stake BEE&rdquo; to complete.
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
        <h2 className="text-xl font-semibold mb-4 text-white">Staking Details</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>80% APY, calculated per second</li>
          <li>No lock-up period, withdraw anytime</li>
          <li>Interest is compounded automatically when you stake more</li>
        </ul>
      </Card>
    </div>
  );
}