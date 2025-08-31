import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Badge } from "@/components/UI/Badge";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Star, 
  Shield, 
  Zap, 
  Image, 
  Gift,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  Globe,
  Lock,
  Database,
  Code2
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gradient">About DrBEE</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A comprehensive Web3 ecosystem built around a bee-themed decentralized application platform, 
          integrating DeFi, NFT, DAO governance, and gaming functionalities.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Vision & Mission</CardTitle>
            <CardDescription className="text-lg">
              Building the future of decentralized finance and community governance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-6 h-6 text-purple-400 mr-2" />
                  Our Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  To establish a self-sustaining blockchain ecosystem where users can participate and earn rewards through multiple pathways, 
                  while pioneering the integration of Zero-Knowledge Proof technology and AI capabilities.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Empowering everyone through blockchain technology by providing automated token acquisition, 
                  high-yield staking, unique NFT collections, decentralized governance, and immersive gaming experiences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Complete Ecosystem */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Complete Web3 Ecosystem</CardTitle>
            <CardDescription className="text-lg">
              Built on Ethereum with advanced features and future-ready technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Coins className="w-6 h-6 text-yellow-400" />
                  <div>
                    <h4 className="font-semibold text-white">10B BEE Tokens</h4>
                    <p className="text-gray-300 text-sm">Deflationary mechanism through NFT burns</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">Real-Time Interest</h4>
                    <p className="text-gray-300 text-sm">Per-second APY calculation & compound</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Image className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">12 Unique NFTs</h4>
                    <p className="text-gray-300 text-sm">IPFS storage with rarity mechanics</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">DAO Ready</h4>
                    <p className="text-gray-300 text-sm">ZKP anonymous voting & governance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-white">Gaming & AI</h4>
                    <p className="text-gray-300 text-sm">On-chain games & AI-driven content</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-pink-400" />
                  <div>
                    <h4 className="font-semibold text-white">Daily Rewards</h4>
                    <p className="text-gray-300 text-sm">100 BEE tokens every 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology Stack */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Shield className="w-6 h-6 text-green-400 mr-2" />
                  Smart Contract Layer
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Solidity 0.8.24 + Foundry framework</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />OpenZeppelin security standards</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Sepolia Testnet deployment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Reentrancy attack protection</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Code2 className="w-6 h-6 text-blue-400 mr-2" />
                  Frontend Application
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />Next.js 15 + TypeScript</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />TailwindCSS 4.0 - Modern UI</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />RainbowKit + Wagmi - Web3 integration</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />Viem - Ethereum interaction</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contract Addresses */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Deployed Contracts</CardTitle>
            <CardDescription>
              All contracts deployed on Ethereum Sepolia Testnet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">BEE Token</h4>
                    <Badge variant="secondary">ERC-20</Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono break-all">
                    0x2011551065B37D6762D7401ebBaa39adc4eED0e7
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">DrBEE NFT</h4>
                    <Badge variant="secondary">ERC-721</Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono break-all">
                    0xA6C0E968cCF8DB76eEDe84Bf3d62151c999208BD
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">Vault (Faucet)</h4>
                    <Badge variant="secondary">Contract</Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono break-all">
                    0x1c852498880ff2711a62541C4A36AE8dDEC6dfE9
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">BeeStaking</h4>
                    <Badge variant="secondary">Contract</Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono break-all">
                    0x7C12D5a404867F9E265FbB6947aC46592B226451
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Development Roadmap */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Development Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 1: Core Infrastructure (Completed)</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>✅ ERC20 token contract implementation</li>
                    <li>✅ Faucet system with time-lock mechanisms</li>
                    <li>✅ NFT minting and collection features</li>
                    <li>✅ Staking mining system with compound interest</li>
                    <li>✅ Modern frontend interface with Web3 integration</li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 2: Automation & Enhancement (In Development)</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>🔄 Automated Claim Mechanism - Scheduled automatic BEE distribution</li>
                    <li>🔄 Premium NFT Collections - Rarity systems and special attributes</li>
                    <li>🔄 Advanced Staking Features - Lock period options with reward multipliers</li>
                    <li>🔄 Mobile Optimization - Progressive Web App (PWA) support</li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 3: DAO Governance (Planning Phase)</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>🎯 Governance Token System - Voting weight based on BEE and NFT holdings</li>
                    <li>🎯 Proposal & Voting Framework - Community-driven decision mechanisms</li>
                    <li>🎯 <span className="text-purple-400 font-semibold">Zero-Knowledge Proof Voting</span> - Anonymous voting with privacy protection</li>
                    <li>🎯 Multi-Signature Treasury - Community fund management</li>
                  </ul>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 4: Gaming & Social Features (Future Development)</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>🎮 On-Chain Mini Games - Bee-themed casual gaming experiences</li>
                    <li>🎮 Event Management System - Create activities using tokens and NFTs</li>
                    <li>🎮 Leaderboards & Achievements - Gamified incentive mechanisms</li>
                    <li>🎮 Social Interaction Features - User engagement and community building</li>
                  </ul>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 5: Advanced Technologies (Long-term Vision)</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>🔮 Cross-Chain Bridge - Multi-chain ecosystem expansion</li>
                    <li>🔮 <span className="text-pink-400 font-semibold">AI-Driven Content</span> - Intelligent NFT generation and curation</li>
                    <li>🔮 Metaverse Integration - VR/AR immersive experiences</li>
                    <li>🔮 Enterprise Solutions - Institutional-grade features and APIs</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technical Specifications */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gradient">Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Network
                  </span>
                  <span className="text-white font-semibold">Ethereum Sepolia</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <Code2 className="w-4 h-4 mr-2" />
                    Standards
                  </span>
                  <span className="text-white font-semibold">ERC-20 & ERC-721</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Storage
                  </span>
                  <span className="text-white font-semibold">IPFS Decentralized</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    APY
                  </span>
                  <span className="text-green-400 font-semibold">80% Annual</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <Coins className="w-4 h-4 mr-2" />
                    Total Supply
                  </span>
                  <span className="text-yellow-400 font-semibold">10 Billion BEE</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Security
                  </span>
                  <span className="text-white font-semibold">OpenZeppelin</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
