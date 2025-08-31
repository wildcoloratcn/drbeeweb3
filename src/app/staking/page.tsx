"use client";

import { useState, useEffect } from "react";
import { useStaking } from "@/hooks/useStaking";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";
import { TransactionStatus } from "@/components/Common/TransactionStatus";
import { formatEther } from "viem";

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
      // Reset countdown
      setCountdown(30);
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
                <span className="text-sm text-gray-600">Next refresh in:</span>
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
              message={error?.message || ""} 
            />

            <div className="space-y-2">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Amount to stake"
                className="w-full p-2 border rounded"
              />
              
              {step === "approve" && (
                <Button 
                  onClick={handleApprove} 
                  disabled={!stakeAmount || isPending || isConfirming} 
                  className="w-full"
                >
                  {isPending ? "Approving..." : "1. Approve BEE"}
                </Button>
              )}

              {step === "stake" && approveSuccess && (
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