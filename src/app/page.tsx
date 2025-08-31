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
            🐝 DrBEE Ecosystem
          </h1>
          <p className="text-2xl text-purple-300 font-semibold">
            Complete Web3 Platform
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            DeFi • NFT • DAO Governance • Gaming<br/>
            <span className="text-yellow-400 font-semibold">Earn 80% APY</span> with per-second interest calculation
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Real-Time Rewards</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Deflationary Token</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span>ZKP & AI Ready</span>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gradient mb-4">Core Features</h2>
          <p className="text-gray-300 text-lg">Start earning immediately with our DeFi ecosystem</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Claim Card */}
          <Card className="group hover:glow-blue transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 purple-gradient rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Free Daily BEE</CardTitle>
              <CardDescription>
                <span className="text-yellow-400 font-semibold">100 BEE tokens</span> every 24 hours<br/>
                No cost • Just connect wallet
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

          {/* Staking Card - Put staking in middle to highlight */}
          <Card className="group hover:glow-purple transition-all duration-300 border-purple-500/30">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">
                <span className="text-yellow-400">80% APY</span> Staking
              </CardTitle>
              <CardDescription>
                <span className="text-green-400 font-semibold">Per-second interest</span> calculation<br/>
                Flexible withdrawal • Auto-compound
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/staking">
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                  Start Staking
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
              <CardTitle className="text-xl">Unique NFTs</CardTitle>
              <CardDescription>
                <span className="text-purple-400 font-semibold">12 variants</span> • IPFS storage<br/>
                Burns BEE • Deflationary
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
        </div>
      </section>



      {/* Key Stats */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-yellow-400">80%</div>
            <div className="text-gray-300 text-sm">APY Staking</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-400">10B</div>
            <div className="text-gray-300 text-sm">BEE Supply</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-purple-400">12</div>
            <div className="text-gray-300 text-sm">NFT Variants</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-blue-400">24/7</div>
            <div className="text-gray-300 text-sm">Live Rewards</div>
          </div>
        </div>
      </section>
    </div>
  );
}