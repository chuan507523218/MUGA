"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Trophy } from "lucide-react"

const symbols = [400, 500, 600]
const allSymbols = [...symbols, ...symbols, ...symbols, ...symbols]

export function HeroSlotMachine() {
  const [isAutoSpinning, setIsAutoSpinning] = useState(true)
  const [displayValues, setDisplayValues] = useState([500, 500, 500])
  const [spinning, setSpinning] = useState([true, true, true])
  const [showWin, setShowWin] = useState(false)

  // Auto spin effect
  useEffect(() => {
    if (!isAutoSpinning) return

    const spinCycle = () => {
      setShowWin(false)
      setSpinning([true, true, true])

      // Generate random result
      const results = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]

      // Stop reels sequentially
      setTimeout(() => {
        setSpinning([false, true, true])
        setDisplayValues(prev => [results[0], prev[1], prev[2]])
      }, 800)

      setTimeout(() => {
        setSpinning([false, false, true])
        setDisplayValues(prev => [prev[0], results[1], prev[2]])
      }, 1200)

      setTimeout(() => {
        setSpinning([false, false, false])
        setDisplayValues(results)
        
        // Check for win (all same)
        if (results[0] === results[1] && results[1] === results[2]) {
          setShowWin(true)
        }
      }, 1600)
    }

    spinCycle()
    const interval = setInterval(spinCycle, 4000)

    return () => clearInterval(interval)
  }, [isAutoSpinning])

  const getValueColor = (val: number) => {
    if (val === 600) return "text-green-400"
    if (val === 400) return "text-purple-400"
    return "text-pink-400"
  }

  const getValueGlow = (val: number) => {
    if (val === 600) return "0 0 30px rgba(34, 197, 94, 0.6)"
    if (val === 400) return "0 0 30px rgba(147, 51, 234, 0.6)"
    return "0 0 30px rgba(236, 72, 153, 0.6)"
  }

  return (
    <div className="relative w-full max-w-[500px]">
      {/* Outer glow effects */}
      <motion.div
        className="absolute -inset-8 rounded-3xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main slot machine container */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a0a20 0%, #0d0015 50%, #0a000f 100%)",
          boxShadow: `
            0 0 60px rgba(236, 72, 153, 0.3),
            0 0 100px rgba(236, 72, 153, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top bar with lights */}
        <div className="relative h-12 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 flex items-center justify-center gap-4">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          
          {/* Animated lights */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? "#ff69b4" : "#ffd700",
                boxShadow: i % 2 === 0 
                  ? "0 0 10px #ff69b4, 0 0 20px #ff69b4" 
                  : "0 0 10px #ffd700, 0 0 20px #ffd700",
              }}
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Machine body */}
        <div className="p-6 sm:p-8">
          {/* Title section */}
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-3"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(236,72,153,0.3)",
                  "0 0 40px rgba(236,72,153,0.5)",
                  "0 0 20px rgba(236,72,153,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-bold tracking-widest text-pink-400">MUGA SLOTS</span>
              <Sparkles className="w-4 h-4 text-pink-400" />
            </motion.div>
            <p className="text-xs text-muted-foreground font-mono">Roll for 400 / 500 / 600 MUGA</p>
          </div>

          {/* Reels display */}
          <div className="relative bg-black/60 rounded-2xl p-4 border-2 border-pink-500/30">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            
            {/* Win line indicator */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 sm:h-20 border-y-2 border-pink-500/50 bg-pink-500/5" />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-pink-500" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-pink-500" />

            {/* Reels */}
            <div className="relative flex justify-center gap-3 sm:gap-4 py-4">
              {[0, 1, 2].map((reelIndex) => (
                <div
                  key={reelIndex}
                  className="relative w-20 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, #0a0010 0%, #150020 50%, #0a0010 100%)",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 0 10px rgba(236,72,153,0.2)",
                  }}
                >
                  {/* Reel content */}
                  <AnimatePresence mode="wait">
                    {spinning[reelIndex] ? (
                      <motion.div
                        key="spinning"
                        className="absolute inset-0"
                        initial={{ y: 0 }}
                        animate={{ y: [-200, 0] }}
                        transition={{
                          duration: 0.15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {allSymbols.map((sym, i) => (
                          <div
                            key={i}
                            className="h-14 sm:h-18 flex items-center justify-center"
                          >
                            <span className={`text-3xl sm:text-4xl font-bold font-mono ${getValueColor(sym)}`}>
                              {sym}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="stopped"
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.span
                          className={`text-4xl sm:text-5xl font-bold font-mono ${getValueColor(displayValues[reelIndex])}`}
                          style={{
                            textShadow: getValueGlow(displayValues[reelIndex]),
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          {displayValues[reelIndex]}
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reel overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: [-100, 200],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Win celebration */}
          <AnimatePresence>
            {showWin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-white" />
                    <span className="text-2xl font-bold text-white">JACKPOT!</span>
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom info */}
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-mono">On-chain RNG</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                30%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                30%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                40%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom decorative bar */}
        <div className="h-3 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600">
          <div className="h-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </motion.div>

      {/* Floating particles around the machine */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-400"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i % 3) * 30}%`,
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}
