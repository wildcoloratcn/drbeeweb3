import React from "react";
import Link from "next/link";
import { ConnectWallet } from "../Common/ConnectWallet";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-600">
          DrBEE
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/vault" className="text-gray-700 hover:text-yellow-600">
            Daily Claim
          </Link>
          <Link href="/nft" className="text-gray-700 hover:text-yellow-600">
            NFT Minting
          </Link>
          <Link href="/staking" className="text-gray-700 hover:text-yellow-600">
            Staking
          </Link>
        </nav>
        
        <ConnectWallet />
      </div>
    </header>
  );
};