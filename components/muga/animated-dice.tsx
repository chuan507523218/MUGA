"use client"

import { motion } from "framer-motion"

interface AnimatedDiceProps {
  isRolling?: boolean
  size?: "sm" | "md" | "lg"
}

export function AnimatedDice({ isRolling = false, size = "md" }: AnimatedDiceProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} relative perspective-1000`}
      animate={isRolling ? {
        rotateX: [0, 360, 720, 1080],
        rotateY: [0, 360, 720, 1080],
        rotateZ: [0, 180, 360, 540],
      } : {
        rotateX: [0, 10, 0, -10, 0],
        rotateY: [0, 10, 0, -10, 0],
      }}
      transition={isRolling ? {
        duration: 2,
        ease: "easeOut",
      } : {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dice faces */}
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500 to-pink-700 border border-pink-400/50 flex items-center justify-center"
        style={{
          transform: "translateZ(2rem)",
          boxShadow: "0 0 20px rgba(236,72,153,0.5), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        {/* Dots for 6 */}
        <div className="grid grid-cols-2 gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            "0 0 20px rgba(236,72,153,0.3)",
            "0 0 40px rgba(236,72,153,0.6)",
            "0 0 20px rgba(236,72,153,0.3)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
