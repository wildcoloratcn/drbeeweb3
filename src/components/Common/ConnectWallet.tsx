"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { BEE_TOKEN_ABI } from "@/utils/contracts";
import { CONTRACT_ADDRESSES, CHAIN_ID } from "@/utils/constants";

export const ConnectWallet = () => {
  const { address } = useAccount();

  // 获取ETH余额
  const { data: ethBalance } = useBalance({
    address: address,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 10000, // 每10秒刷新一次
    },
  });

  // 获取BEE余额
  const { data: beeBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BEE_TOKEN as `0x${string}`,
    abi: BEE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 10000, // 每10秒刷新一次
    },
  });

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-3">
                  {/* 余额显示 */}
                  <div className="hidden sm:flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                    {/* ETH余额 */}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">ETH</div>
                      <div className="text-sm font-semibold text-white">
                        {ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : '0.0000'}
                      </div>
                    </div>
                    
                    {/* 分隔线 */}
                    <div className="w-px h-8 bg-white/20"></div>
                    
                    {/* BEE余额 */}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">BEE</div>
                      <div className="text-sm font-semibold text-yellow-400">
                        {beeBalance ? parseFloat(formatEther(BigInt(beeBalance.toString()))).toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </div>

                  {/* 账户按钮 */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">
                      {account.displayName}
                    </span>
                    <span className="sm:hidden">
                      {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};