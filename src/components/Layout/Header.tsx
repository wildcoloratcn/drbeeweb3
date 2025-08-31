import React from "react";
import Link from "next/link";
import { ConnectWallet } from "../Common/ConnectWallet";
import { Coins, Gift, Image, TrendingUp, Info } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="glass-card mx-4 mt-4 mb-8 glow-purple">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="./logo.png" 
                alt="DrBEE Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold text-gradient">AIBEE</span>
        </Link>
        
        <nav className="hidden md:flex space-x-2">
          <Link 
            href="/vault" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <Gift className="w-4 h-4" />
            <span>Daily Claim</span>
          </Link>
          <Link 
            href="/nft" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <Image className="w-4 h-4" />
            <span>NFT Minting</span>
          </Link>
          <Link 
            href="/staking" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Staking</span>
          </Link>
          <Link 
            href="/about" 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
        </nav>
        
        <ConnectWallet />
      </div>
    </header>
  );
};