import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Gift, Image, TrendingUp, Zap, Shield, Users, Coins, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gradient leading-tight">
            Immutable. Transparent. Decentralized.
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            DrBEE enables censorship-resistant earning through blockchain technology.
            Perfect for staking, minting, and transparent community rewards
            where permanence and authenticity matter.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Immutable Records</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-400" />
            <span>No Central Authority</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-green-400" />
            <span>Cryptographically Verified</span>
          </div>
        </div>
      </section>

      {/* Main Action Card */}
      <section className="max-w-2xl mx-auto">
        <Card className="text-center space-y-6">
          <div className="w-16 h-16 purple-gradient rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          <CardHeader>
            <CardTitle className="text-3xl">Connect Your Wallet</CardTitle>
            <CardDescription className="text-lg">
              Join the decentralized ecosystem by connecting your Web3 wallet
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Button size="lg" className="w-full">
              <Zap className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gradient mb-4">Platform Features</h2>
          <p className="text-gray-300 text-lg">Experience the power of decentralized finance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Claim Card */}
          <Card className="group hover:glow-blue transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Daily Claim</CardTitle>
              <CardDescription>
                Claim 100 BEE tokens every 24 hours from our community vault
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/vault">
                <Button variant="outline" className="w-full group-hover:purple-gradient-hover group-hover:text-white transition-all">
                  Claim Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* NFT Minting Card */}
          <Card className="group hover:glow-blue transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">NFT Collection</CardTitle>
              <CardDescription>
                Mint unique DrBEE NFTs and collect all 12 variants with IPFS storage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/nft">
                <Button variant="outline" className="w-full group-hover:purple-gradient-hover group-hover:text-white transition-all">
                  Mint NFT
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Staking Card */}
          <Card className="group hover:glow-blue transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">High-Yield Staking</CardTitle>
              <CardDescription>
                Stake BEE tokens and earn 80% APY with per-second interest calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/staking">
                <Button variant="outline" className="w-full group-hover:purple-gradient-hover group-hover:text-white transition-all">
                  Stake Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">About DrBEE</CardTitle>
            <CardDescription className="text-lg">
              A decentralized platform built on Ethereum Sepolia, designed for:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Coins className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Token Economics</h4>
                    <p className="text-gray-300 text-sm">Deflationary BEE token with burning mechanism during NFT minting</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Security & Transparency</h4>
                    <p className="text-gray-300 text-sm">Open-source smart contracts with verified authenticity</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Community Driven</h4>
                    <p className="text-gray-300 text-sm">No central authority, community messaging without censorship risks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Transparent Operations</h4>
                    <p className="text-gray-300 text-sm">All transactions and operations are publicly verifiable</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technical Details */}
      <section className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Technical Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-center">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Network:</span>
                <span className="text-white font-semibold">Ethereum Sepolia</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Contract Standard:</span>
                <span className="text-white font-semibold">ERC-20 & ERC-721</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Storage:</span>
                <span className="text-white font-semibold">IPFS Decentralized</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">APY:</span>
                <span className="text-green-400 font-semibold">80% Annual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}