"use client";

import * as React from "react";
import { WagmiProvider, createConfig, http, fallback } from "wagmi";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMaskWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // 如果是网络错误或超时错误，重试最多3次
        if (error?.message?.includes('timeout') || error?.message?.includes('network')) {
          return failureCount < 3;
        }
        // 其他错误不重试
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数退避，最多30秒
      staleTime: 30_000, // 30秒内数据不会过期
      gcTime: 5 * 60 * 1000, // 5分钟后清理缓存
    },
  },
});

// 简化的钱包配置，避免 WalletConnect 错误
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: "DrBEE DApp",
    projectId: "0", // 禁用 WalletConnect
  }
);

// 创建简化的 wagmi 配置，使用多个RPC端点作为备份
const config = createConfig({
  connectors,
  chains: [sepolia],
  transports: {
    [sepolia.id]: fallback([
      http("https://ethereum-sepolia-rpc.publicnode.com", {
        timeout: 30_000, // 30 seconds timeout
        retryCount: 2,
        retryDelay: 1000,
      }),
      http("https://sepolia.gateway.tenderly.co", {
        timeout: 25_000,
        retryCount: 2,
        retryDelay: 1000,
      }),
      http("https://rpc.sepolia.ethpandaops.io", {
        timeout: 20_000,
        retryCount: 2,
        retryDelay: 1000,
      }),
      http(), // 默认的公共RPC作为最后备用
    ]),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={sepolia}
        >
          {mounted ? children : null}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
