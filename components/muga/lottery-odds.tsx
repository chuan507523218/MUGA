"use client"

import { motion } from "framer-motion"
import { Dices, Sparkles, Zap, Target } from "lucide-react"
import { LotteryWheel } from "./lottery-wheel"

const odds = [
  { percentage: 30, amount: 500, color: "pink", label: "Standard", icon: Target },
  { percentage: 30, amount: 400, color: "purple", label: "Base", icon: Dices },
  { percentage: 40, amount: 600, color: "green", label: "Jackpot", icon: Sparkles },
]

export function LotteryOdds() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating dice decorations */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-lg border border-pink-500/20 flex items-center justify-center"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Dices className="w-4 h-4 text-pink-500/30" />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Dices className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 tracking-wide uppercase">
              Random Mint Mechanics
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lottery Odds
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            On-chain randomness determines your reward in Random Mint mode
          </p>
        </motion.div>

        {/* Interactive Lottery Wheel Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-green-500/5" />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Lottery Wheel */}
              <div className="relative">
                <LotteryWheel size="lg" />
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs font-mono text-pink-400">Spin to Win</span>
                </motion.div>
              </div>
              
              {/* Explanation */}
              <div className="text-center lg:text-left max-w-md">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  How Random Mint Works
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-pink-400">1</span>
                    <span>Submit 0.0025 ETH with your lucky phrase</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-purple-400">2</span>
                    <span>Contract generates on-chain randomness</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-green-400">3</span>
                    <span>Receive 400, 500, or 600 MUGA instantly</span>
                  </li>
                </ul>
                
                {/* Expected value calculation */}
                <div className="mt-6 p-4 rounded-xl bg-black/30 border border-pink-500/20">
                  <p className="text-xs text-muted-foreground mb-2">Expected Value</p>
                  <p className="text-lg font-mono text-white">
                    <span className="text-pink-400">30%</span> × 500 + <span className="text-purple-400">30%</span> × 400 + <span className="text-green-400">40%</span> × 600
                  </p>
                  <p className="text-2xl font-bold font-mono text-pink-400 mt-1">= 510 MUGA</p>
                  <p className="text-xs text-green-400 mt-1">+2% vs Fixed Mint!</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Probability Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Probability wheel background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, rgba(255,0,127,0.2) 0% 30%, rgba(147,51,234,0.2) 30% 60%, rgba(34,197,94,0.2) 60% 100%)",
                filter: "blur(60px)",
              }}
            />
          </motion.div>

          {/* Odds Cards */}
          <div className="relative grid sm:grid-cols-3 gap-6">
            {odds.map((odd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <div
                  className={`glass-card rounded-2xl p-6 sm:p-8 text-center border-2 transition-all duration-300 ${
                    odd.color === "pink"
                      ? "border-pink-500/30 hover:border-pink-500/60"
                      : odd.color === "purple"
                      ? "border-purple-500/30 hover:border-purple-500/60"
                      : "border-green-500/30 hover:border-green-500/60"
                  }`}
                >
                  {/* Percentage circle */}
                  <motion.div
                    className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6"
                    whileInView={{ rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                  >
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary"
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={
                          odd.color === "pink"
                            ? "text-pink-500"
                            : odd.color === "purple"
                            ? "text-purple-500"
                            : "text-green-500"
                        }
                        style={{
                          strokeDasharray: `${odd.percentage * 2.83} 283`,
                        }}
                        initial={{ strokeDasharray: "0 283" }}
                        whileInView={{ strokeDasharray: `${odd.percentage * 2.83} 283` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        {odd.percentage}%
                      </span>
                    </div>
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 ${
                      odd.color === "pink"
                        ? "bg-pink-500/20 text-pink-300"
                        : odd.color === "purple"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {odd.label}
                  </span>

                  {/* Amount */}
                  <p className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                    {odd.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">MUGA</p>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                      odd.color === "pink"
                        ? "shadow-[0_0_30px_rgba(255,0,127,0.3)]"
                        : odd.color === "purple"
                        ? "shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                        : "shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-10"
          >
            Results are determined by on-chain randomness during contract execution.
            <br />
            Your lucky phrase does not affect the outcome.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
