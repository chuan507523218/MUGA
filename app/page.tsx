"use client"

import { useState } from "react"
import { AnimatedBackground } from "@/components/muga/animated-background"
import { Header } from "@/components/muga/header"
import { HeroSection } from "@/components/muga/hero-section"
import { MintSection } from "@/components/muga/mint-section"
import { HowItWorks } from "@/components/muga/how-it-works"
import { LotteryOdds } from "@/components/muga/lottery-odds"
import { Tokenomics } from "@/components/muga/tokenomics"
import { PoolSection } from "@/components/muga/pool-section"
import { FAQSection } from "@/components/muga/faq-section"
import { Footer } from "@/components/muga/footer"

// Contract addresses (placeholders)
const MINT_GATE_ADDRESS = "0x..."
const TOKEN_ADDRESS = "0x..."
const MINT_PRICE = "0.0025" // ETH

export default function MugaPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const handleConnect = async () => {
    // Mock wallet connection
    // In production, use wagmi's useConnect hook
    try {
      // Simulate connection
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsConnected(true)
      setAddress("0x1234567890123456789012345678901234567890")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress(undefined)
  }

  return (
    <main className="relative min-h-screen bg-transparent">
      <AnimatedBackground />
      
      <Header
        isConnected={isConnected}
        address={address}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <HeroSection />
      
      <MintSection
        isConnected={isConnected}
        address={address}
        onConnect={handleConnect}
      />
      
      <HowItWorks />
      
      <LotteryOdds />
      
      <Tokenomics />
      
      <PoolSection />
      
      <FAQSection />
      
      <Footer />
    </main>
  )
}

// Export contract info for use in other components
export { MINT_GATE_ADDRESS, TOKEN_ADDRESS, MINT_PRICE }
