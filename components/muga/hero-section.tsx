"use client"

import { motion } from "framer-motion"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSlotMachine } from "./hero-slot-machine"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-sm font-medium text-pink-400 tracking-wide uppercase">
                Live on Mainnet
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance"
            >
              <span className="text-white">MUGA</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2 text-glow"
              style={{
                background: "linear-gradient(135deg, #ff007f, #ff69b4, #ff1493)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Make Uni Great Again
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              A pink-powered mint experiment inspired by Uniswap culture.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-base text-muted-foreground/80 max-w-lg mx-auto lg:mx-0"
            >
              Choose fixed certainty or random upside. Mint MUGA for{" "}
              <span className="text-pink-400 font-mono font-semibold">0.0025 ETH</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-pink-500/30 glow-border"
                  asChild
                >
                  <a href="#mint">
                    <ArrowDown className="w-5 h-5 mr-2" />
                    Start Minting
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/10 text-white font-semibold px-8 py-6 text-lg"
                  asChild
                >
                  <a href="#pool" className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    View Official Pool
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { label: "MINT PRICE", value: "0.0025", unit: "ETH" },
                { label: "FIXED MINT", value: "500", unit: "MUGA" },
                { label: "MAX RANDOM", value: "600", unit: "MUGA" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold font-mono text-white">
                    {stat.value}
                    <span className="text-sm text-pink-400 ml-1">{stat.unit}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - Slot Machine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <HeroSlotMachine />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-pink-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
