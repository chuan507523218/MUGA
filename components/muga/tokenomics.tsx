"use client"

import { motion } from "framer-motion"
import { Coins, Users, Droplets, Lock } from "lucide-react"

const tokenInfo = [
  { label: "Token Name", value: "Make Uni Great Again" },
  { label: "Symbol", value: "MUGA" },
  { label: "Decimals", value: "18" },
  { label: "Mint Price", value: "0.0025 ETH" },
  { label: "Fixed Mint", value: "500 MUGA" },
  { label: "Random Mint", value: "400 / 500 / 600 MUGA" },
]

const distribution = [
  {
    icon: Users,
    label: "Public Mint Supply",
    amount: "10,000,000",
    percentage: 47.6,
    color: "pink",
  },
  {
    icon: Droplets,
    label: "Initial LP Allocation",
    amount: "10,000,000",
    percentage: 47.6,
    color: "purple",
  },
  {
    icon: Lock,
    label: "Team Allocation",
    amount: "1,000,000",
    percentage: 4.8,
    color: "blue",
  },
]

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 sm:py-32">
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
            Tokenomics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent token distribution designed for fair launch
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                <Coins className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Token Details</h3>
            </div>

            <div className="space-y-4">
              {tokenInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-black/30"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-mono font-medium text-white">{item.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Max Supply highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20"
            >
              <p className="text-sm text-muted-foreground mb-1">Max Supply</p>
              <p className="text-3xl font-bold font-mono text-white">
                21,000,000 <span className="text-lg text-pink-400">MUGA</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Distribution Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Distribution</h3>

            {/* Pie chart visualization */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {distribution.map((item, i) => {
                  const offset = distribution
                    .slice(0, i)
                    .reduce((acc, d) => acc + d.percentage, 0)
                  return (
                    <motion.circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="20"
                      className={
                        item.color === "pink"
                          ? "text-pink-500"
                          : item.color === "purple"
                          ? "text-purple-500"
                          : "text-blue-500"
                      }
                      stroke="currentColor"
                      strokeDasharray={`${item.percentage * 2.51} 251`}
                      strokeDashoffset={-offset * 2.51}
                      initial={{ strokeDasharray: "0 251" }}
                      whileInView={{ strokeDasharray: `${item.percentage * 2.51} 251` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  )
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">21M</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            {/* Distribution legend */}
            <div className="space-y-4">
              {distribution.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/30"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.color === "pink"
                        ? "bg-pink-500/20"
                        : item.color === "purple"
                        ? "bg-purple-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${
                        item.color === "pink"
                          ? "text-pink-400"
                          : item.color === "purple"
                          ? "text-purple-400"
                          : "text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-mono font-semibold text-white">{item.amount}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-mono ${
                      item.color === "pink"
                        ? "bg-pink-500/20 text-pink-300"
                        : item.color === "purple"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {item.percentage}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
