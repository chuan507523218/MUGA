"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SlotMachineProps {
  isSpinning: boolean
  result?: number | null
  onComplete?: () => void
}

const symbols = [400, 500, 600, 400, 500, 600, 400, 500, 600]

export function SlotMachine({ isSpinning, result, onComplete }: SlotMachineProps) {
  const [displayValues, setDisplayValues] = useState([500, 500, 500])
  const [spinning, setSpinning] = useState([false, false, false])

  useEffect(() => {
    if (isSpinning) {
      // Start all reels spinning
      setSpinning([true, true, true])
      
      // Stop reels one by one
      const stopReel = (index: number, delay: number) => {
        setTimeout(() => {
          setSpinning(prev => {
            const next = [...prev]
            next[index] = false
            return next
          })
          setDisplayValues(prev => {
            const next = [...prev]
            next[index] = result || 500
            return next
          })
          if (index === 2 && onComplete) {
            setTimeout(onComplete, 300)
          }
        }, delay)
      }

      stopReel(0, 1000)
      stopReel(1, 1500)
      stopReel(2, 2000)
    }
  }, [isSpinning, result, onComplete])

  return (
    <div className="relative">
      {/* Slot machine frame */}
      <div className="relative bg-gradient-to-b from-[#1a0a1f] to-[#0d0012] rounded-2xl p-6 border border-pink-500/30 shadow-2xl overflow-hidden">
        {/* Top decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />
        
        {/* Title */}
        <div className="text-center mb-4">
          <span className="text-xs font-mono text-pink-400 tracking-widest uppercase">Random Mint Roller</span>
        </div>

        {/* Reels container */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {[0, 1, 2].map((reelIndex) => (
            <div
              key={reelIndex}
              className="relative w-20 h-24 sm:w-24 sm:h-28 bg-black/60 rounded-xl border border-pink-500/20 overflow-hidden"
            >
              {/* Reel window highlight */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-pink-500/10 border-y border-pink-500/30" />
              
              {/* Spinning reel */}
              <AnimatePresence mode="wait">
                {spinning[reelIndex] ? (
                  <motion.div
                    key="spinning"
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    animate={{ y: [0, -100, 0] }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {symbols.map((sym, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 h-12 flex items-center justify-center text-2xl font-bold font-mono text-pink-400"
                      >
                        {sym}
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="stopped"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      className={`text-3xl sm:text-4xl font-bold font-mono ${
                        displayValues[reelIndex] === 600
                          ? "text-green-400"
                          : displayValues[reelIndex] === 400
                          ? "text-purple-400"
                          : "text-pink-400"
                      }`}
                    >
                      {displayValues[reelIndex]}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Reel shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <div className="text-center mt-4">
          <span className="text-xs text-muted-foreground">
            {isSpinning ? "Rolling..." : "MUGA Rewards"}
          </span>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
      </div>
    </div>
  )
}
