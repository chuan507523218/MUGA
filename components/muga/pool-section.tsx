"use client"

import { motion } from "framer-motion"
import { ExternalLink, AlertTriangle, Droplets, Link2, Hash, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const poolInfo = [
  { icon: Hash, label: "PoolKey", value: "0x1234...5678", isPlaceholder: true },
  { icon: Settings, label: "Fee Tier", value: "0.30%", isPlaceholder: true },
  { icon: Link2, label: "Hook Address", value: "0xabcd...ef01", isPlaceholder: true },
  { icon: Droplets, label: "Initial Price", value: "TBD", isPlaceholder: true },
]

export function PoolSection() {
  return (
    <section id="pool" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
            <Droplets className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-400">Uniswap V4</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Official Liquidity Pool
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trade MUGA on the official Uniswap V4 pool
          </p>
        </motion.div>

        {/* Pool Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Decorative liquidity wave */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10">
                <motion.path
                  d="M0,80 Q100,40 200,80 T400,80 T600,80 T800,80"
                  stroke="url(#poolGradient)"
                  strokeWidth="2"
                  fill="none"
                  animate={{
                    d: [
                      "M0,80 Q100,40 200,80 T400,80 T600,80 T800,80",
                      "M0,80 Q100,120 200,80 T400,80 T600,80 T800,80",
                      "M0,80 Q100,40 200,80 T400,80 T600,80 T800,80",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <defs>
                  <linearGradient id="poolGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff007f" />
                    <stop offset="50%" stopColor="#ff69b4" />
                    <stop offset="100%" stopColor="#ff007f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pool status */}
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">MUGA / ETH</h3>
                    <p className="text-sm text-muted-foreground">Uniswap V4</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs font-medium text-yellow-400">Coming Soon</span>
                </div>
              </div>

              {/* Pool info grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {poolInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-black/30"
                  >
                    <item.icon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className={`text-sm font-mono truncate ${
                        item.isPlaceholder ? "text-muted-foreground/60" : "text-white"
                      }`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Liquidity status */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Liquidity Status</span>
                  <span className="text-sm font-medium text-yellow-400">Pending Deployment</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  size="lg"
                  disabled
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-6 text-lg opacity-50 cursor-not-allowed"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open Official Pool
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-400 mb-1">Important Notice</p>
              <p className="text-sm text-muted-foreground">
                Always use the official pool link from this website. Beware of fake pools and scam tokens.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
