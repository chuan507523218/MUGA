"use client"

import { motion } from "framer-motion"

interface LotteryWheelProps {
  isSpinning?: boolean
  size?: "sm" | "md" | "lg"
}

export function LotteryWheel({ isSpinning = false, size = "md" }: LotteryWheelProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  }

  const segments = [
    { value: 400, color: "#a855f7", angle: 0 },
    { value: 500, color: "#ec4899", angle: 108 },
    { value: 600, color: "#22c55e", angle: 216 },
  ]

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-green-500/20 blur-xl" />
      
      {/* Wheel container */}
      <motion.div
        className="relative w-full h-full"
        animate={isSpinning ? { rotate: 360 * 5 } : {}}
        transition={{
          duration: 3,
          ease: [0.2, 0.8, 0.3, 1],
        }}
      >
        {/* Wheel SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background circle */}
          <circle cx="50" cy="50" r="48" fill="#0d0012" stroke="rgba(236,72,153,0.3)" strokeWidth="1" />
          
          {/* Segments */}
          {segments.map((segment, i) => {
            const startAngle = (i * 120 - 90) * (Math.PI / 180)
            const endAngle = ((i + 1) * 120 - 90) * (Math.PI / 180)
            const x1 = 50 + 45 * Math.cos(startAngle)
            const y1 = 50 + 45 * Math.sin(startAngle)
            const x2 = 50 + 45 * Math.cos(endAngle)
            const y2 = 50 + 45 * Math.sin(endAngle)
            
            return (
              <g key={i}>
                <path
                  d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`}
                  fill={segment.color}
                  opacity={0.3}
                  stroke={segment.color}
                  strokeWidth="0.5"
                />
                {/* Segment text */}
                <text
                  x={50 + 28 * Math.cos((startAngle + endAngle) / 2)}
                  y={50 + 28 * Math.sin((startAngle + endAngle) / 2)}
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="monospace"
                >
                  {segment.value}
                </text>
              </g>
            )
          })}
          
          {/* Center circle */}
          <circle cx="50" cy="50" r="12" fill="#1a0a1f" stroke="rgba(236,72,153,0.5)" strokeWidth="1" />
          <circle cx="50" cy="50" r="8" fill="url(#centerGradient)" />
          
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="centerGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff69b4" />
              <stop offset="100%" stopColor="#ff007f" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-l-transparent border-r-transparent border-t-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
      </div>
      
      {/* Decorative dots around wheel */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180)
        const x = 50 + 52 * Math.cos(angle)
        const y = 50 + 52 * Math.sin(angle)
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/50"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        )
      })}
    </div>
  )
}
