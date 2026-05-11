"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles, Loader2, Dices, Shield, Zap, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SlotMachine } from "./slot-machine"
import { LotteryWheel } from "./lottery-wheel"
import { AnimatedDice } from "./animated-dice"

type MintMode = "fixed" | "random"
type MintStatus = "idle" | "minting" | "rolling" | "success" | "failed"

interface MintSectionProps {
  isConnected: boolean
  address?: string
  onConnect: () => void
}

// Mock progress data
const mockProgress = {
  minted: 3_847_500,
  total: 10_000_000,
  transactions: 7695,
  ethRaised: 19.24,
}

export function MintSection({ isConnected, address, onConnect }: MintSectionProps) {
  const [selectedMode, setSelectedMode] = useState<MintMode>("fixed")
  const [luckyPhrase, setLuckyPhrase] = useState("")
  const [mintStatus, setMintStatus] = useState<MintStatus>("idle")
  const [mintResult, setMintResult] = useState<number | null>(null)

  const progress = (mockProgress.minted / mockProgress.total) * 100

  const handleMint = async () => {
    if (!isConnected) {
      onConnect()
      return
    }

    setMintStatus(selectedMode === "random" ? "rolling" : "minting")

    // Simulate minting
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (selectedMode === "random") {
      // Simulate random result
      const rand = Math.random()
      if (rand < 0.3) setMintResult(500)
      else if (rand < 0.6) setMintResult(400)
      else setMintResult(600)
    } else {
      setMintResult(500)
    }

    setMintStatus("success")
  }

  const resetMint = () => {
    setMintStatus("idle")
    setMintResult(null)
    setLuckyPhrase("")
  }

  return (
    <section id="mint" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mint Console
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your minting strategy and claim your MUGA tokens
          </p>
        </motion.div>

        {/* Progress Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Public Mint Progress</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-pink-400 font-mono">{mockProgress.minted.toLocaleString()}</span>
                {" / "}
                <span className="font-mono">{mockProgress.total.toLocaleString()}</span> MUGA minted
              </p>
            </div>
            <div className="flex gap-6 sm:gap-10">
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-white">{mockProgress.transactions.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-pink-400">{mockProgress.ethRaised} ETH</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Raised</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 progress-glow"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Animated shine */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-80, 500] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>
          <p className="text-right mt-2 text-sm font-mono text-muted-foreground">
            {progress.toFixed(1)}% Complete
          </p>
        </motion.div>

        {/* Mint Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Fixed Mint Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setSelectedMode("fixed")}
              className={cn(
                "w-full text-left glass-card rounded-2xl p-6 sm:p-8 transition-all duration-300 border-2",
                selectedMode === "fixed"
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-transparent opacity-60 hover:opacity-80"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                  <Shield className="w-6 h-6 text-pink-400" />
                </div>
                {selectedMode === "fixed" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">FIXED MINT</h3>
              <p className="text-pink-400 font-medium mb-4">Guaranteed 500 MUGA</p>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 mb-6">
                <span className="text-lg font-mono text-muted-foreground">0.0025 ETH</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-lg font-mono font-bold text-white">500 MUGA</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Stable, predictable, guaranteed. Perfect for those who prefer certainty.
              </p>
            </motion.button>
          </motion.div>

          {/* Random Mint Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setSelectedMode("random")}
              className={cn(
                "w-full text-left glass-card rounded-2xl p-6 sm:p-8 transition-all duration-300 border-2 relative overflow-hidden",
                selectedMode === "random"
                  ? "border-pink-500 shadow-lg shadow-pink-500/20"
                  : "border-transparent opacity-60 hover:opacity-80"
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Animated neon border */}
              {selectedMode === "random" && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,0,127,0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0%", "-200% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 relative">
                    <Dices className="w-6 h-6 text-purple-400" />
                    {/* Animated sparkles */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  {selectedMode === "random" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide flex items-center gap-2">
                  RANDOM MINT
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </h3>
                <p className="text-purple-400 font-medium mb-4">Roll for 400 / 500 / 600 MUGA</p>

                {/* Mini lottery wheel preview */}
                <div className="flex items-center justify-center mb-4">
                  <div className="scale-50 -my-6">
                    <LotteryWheel size="sm" />
                  </div>
                </div>

                {/* Probability chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.span 
                    className="px-3 py-1 rounded-full text-xs font-mono bg-pink-500/20 text-pink-300 border border-pink-500/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236,72,153,0.5)" }}
                  >
                    30% → 500
                  </motion.span>
                  <motion.span 
                    className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(147,51,234,0.5)" }}
                  >
                    30% → 400
                  </motion.span>
                  <motion.span 
                    className="px-3 py-1 rounded-full text-xs font-mono bg-green-500/20 text-green-300 border border-green-500/30"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34,197,94,0.5)" }}
                  >
                    40% → 600
                  </motion.span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Feel lucky? Take a chance for higher rewards with on-chain randomness.
                </p>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Rolling Animation Panel - Shows during random mint */}
        <AnimatePresence>
          {mintStatus === "rolling" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card rounded-2xl p-8 sm:p-12 mb-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Rolling Your Luck...</h3>
                <p className="text-muted-foreground">On-chain randomness in progress</p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Slot Machine */}
                <SlotMachine isSpinning={true} result={mintResult} />
                
                {/* Lottery Wheel */}
                <div className="hidden lg:block">
                  <LotteryWheel isSpinning={true} size="md" />
                </div>
                
                {/* Animated Dice */}
                <div className="flex gap-4">
                  <AnimatedDice isRolling={true} size="md" />
                  <AnimatedDice isRolling={true} size="md" />
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="mt-8 flex justify-center gap-8">
                {["Fetching entropy", "Computing result", "Verifying on-chain"].map((status, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                    <span className="text-xs text-muted-foreground font-mono">{status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mint Panel */}
        <AnimatePresence mode="wait">
          {mintStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl p-8 sm:p-12 text-center glow-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedMode === "random" ? "Roll Complete!" : "Mint Successful!"}
              </h3>
              <p className="text-4xl font-bold font-mono text-pink-400 mb-4">
                You received {mintResult} MUGA
              </p>
              {selectedMode === "random" && luckyPhrase && (
                <p className="text-sm text-muted-foreground mb-4">
                  Lucky phrase: &quot;{luckyPhrase}&quot;
                </p>
              )}
              <p className="text-xs font-mono text-muted-foreground mb-8">
                Tx: 0x1234...5678
              </p>
              <Button
                onClick={resetMint}
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
              >
                Mint Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="mint-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              {/* Connected wallet */}
              {isConnected && address && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Connected:</span>
                  <span className="text-sm font-mono text-white">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
              )}

              {/* Mode specific content */}
              {selectedMode === "fixed" ? (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-black/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                      <p className="text-xl font-bold font-mono text-white">0.0025 ETH</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/30">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">You Will Receive</p>
                      <p className="text-xl font-bold font-mono text-pink-400">500 MUGA</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Lucky phrase input */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Enter your lucky phrase
                    </label>
                    <div className="relative">
                      <Input
                        value={luckyPhrase}
                        onChange={(e) => setLuckyPhrase(e.target.value)}
                        placeholder="Type something lucky..."
                        className="bg-black/50 border-pink-500/30 focus:border-pink-500 text-white font-mono pl-4 pr-12 py-6"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500 cursor-blink">|</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Your address + phrase will be ABI encoded as payload
                    </p>
                  </div>

                  {/* Odds display */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { chance: "30%", amount: 500, color: "pink" },
                      { chance: "30%", amount: 400, color: "purple" },
                      { chance: "40%", amount: 600, color: "green" },
                    ].map((odd, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-4 rounded-xl text-center border",
                          odd.color === "pink" && "bg-pink-500/10 border-pink-500/30",
                          odd.color === "purple" && "bg-purple-500/10 border-purple-500/30",
                          odd.color === "green" && "bg-green-500/10 border-green-500/30"
                        )}
                      >
                        <p className="text-lg font-bold font-mono text-white">{odd.chance}</p>
                        <p className={cn(
                          "text-sm font-mono",
                          odd.color === "pink" && "text-pink-400",
                          odd.color === "purple" && "text-purple-400",
                          odd.color === "green" && "text-green-400"
                        )}>
                          {odd.amount} MUGA
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mint Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-8">
                <Button
                  onClick={handleMint}
                  disabled={mintStatus === "minting" || mintStatus === "rolling"}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-6 text-lg shadow-xl shadow-pink-500/30"
                >
                  {mintStatus === "minting" || mintStatus === "rolling" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {mintStatus === "rolling" ? "Rolling..." : "Minting..."}
                    </>
                  ) : !isConnected ? (
                    "Connect Wallet to Mint"
                  ) : selectedMode === "fixed" ? (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Mint 500 MUGA
                    </>
                  ) : (
                    <>
                      <Dices className="w-5 h-5 mr-2" />
                      Try Your Luck
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
