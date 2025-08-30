import { 
  useReadContract, 
  useWriteContract, 
  useSimulateContract,
  usePublicClient, 
  useWalletClient 
} from "wagmi";
import { getContract } from "viem";

// 通用合约 hook，提供读写功能
export const useContractInteraction = (address: string, abi: any) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // 创建合约实例
  const getContractInstance = (client: any) => {
    if (!client) return null;
    return getContract({
      address: address as `0x${string}`,
      abi,
      client,
    });
  };

  return {
    // 只读合约实例
    readContract: publicClient ? getContractInstance(publicClient) : null,
    // 可写合约实例
    writeContract: walletClient ? getContractInstance(walletClient) : null,
    // 原始客户端
    publicClient,
    walletClient,
    // 地址和 ABI
    address: address as `0x${string}`,
    abi,
  };
};

// 专用的读取 hook
export const useContractRead = (
  address: string, 
  abi: any, 
  functionName: string, 
  args?: readonly any[]
) => {
  return useReadContract({
    address: address as `0x${string}`,
    abi,
    functionName,
    args: args || [],
  });
};

// 专用的写入 hook
export const useContractWrite = (address: string, abi: any) => {
  const { writeContract, writeContractAsync } = useWriteContract();
  
  const write = (functionName: string, args?: readonly any[]) => {
    return writeContract({
      address: address as `0x${string}`,
      abi,
      functionName,
      args: args || [],
    });
  };

  const writeAsync = (functionName: string, args?: readonly any[]) => {
    return writeContractAsync({
      address: address as `0x${string}`,
      abi,
      functionName,
      args: args || [],
    });
  };

  return { write, writeAsync };
};

// 向后兼容的 useContract hook
export const useContract = useContractInteraction;