import Link from "next/link";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">Welcome to DrBEE</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          DrBEE is a decentralized platform where you can earn, stake, and collect unique NFTs. 
          Join our hive and start earning sweet rewards today!
        </p>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Claim Card */}
          <Card className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Daily Claim</h3>
            <p className="text-gray-600 mb-4">Claim free BEE tokens every 24 hours from our vault.</p>
            <Link href="/vault">
              <Button>Claim Now</Button>
            </Link>
          </Card>

          {/* NFT Minting Card */}
          <Card className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">NFT Minting</h3>
            <p className="text-gray-600 mb-4">Mint unique DrBEE NFTs and collect all 12 variants.</p>
            <Link href="/nft">
              <Button>Mint NFT</Button>
            </Link>
          </Card>

          {/* Staking Card */}
          <Card className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Staking</h3>
            <p className="text-gray-600 mb-4">Stake your BEE tokens and earn high interest rewards.</p>
            <Link href="/staking">
              <Button>Stake Now</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Platform Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Staked */}
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">30B</h3>
            <p className="text-gray-600">Total BEE Staked</p>
          </Card>

          {/* NFTs Minted */}
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">1/10000</h3>
            <p className="text-gray-600">NFTs Minted</p>
          </Card>

          {/* Daily Claims */}
          <Card className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">100 BEE</h3>
            <p className="text-gray-600">Daily Claim Amount</p>
          </Card>
        </div>
      </section>
    </div>
  );
}