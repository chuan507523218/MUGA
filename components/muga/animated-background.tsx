"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  hue: number
  opacity: number
  wobbleSpeed: number
  wobbleOffset: number
}

interface LightBeam {
  x: number
  width: number
  speed: number
  opacity: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const lightBeamsRef = useRef<LightBeam[]>([])
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize 60 particles - falling from top to bottom
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: -Math.random() * 200, // Start above the screen
          size: Math.random() * 1.5 + 0.5, // Smaller size (was 3+1)
          speedY: Math.random() * 1.2 + 0.5, // Falling speed
          hue: 310 + Math.random() * 30, // Pink range (310-340)
          opacity: Math.random() * 0.3 + 0.1, // Lower opacity (was 0.6+0.2)
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Initialize 8 light beams
    const initLightBeams = () => {
      lightBeamsRef.current = []
      for (let i = 0; i < 8; i++) {
        lightBeamsRef.current.push({
          x: (canvas.width / 8) * i + Math.random() * 100,
          width: Math.random() * 80 + 40,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.08 + 0.02,
        })
      }
    }

    initParticles()
    initLightBeams()

    // Draw subtle grid
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 0, 127, 0.03)"
      ctx.lineWidth = 1

      const gridSize = 60

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Draw light beams
    const drawLightBeams = () => {
      lightBeamsRef.current.forEach((beam) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(255, 0, 127, 0)`)
        gradient.addColorStop(0.3, `rgba(255, 0, 127, ${beam.opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 20, 147, ${beam.opacity * 1.5})`)
        gradient.addColorStop(0.7, `rgba(255, 0, 127, ${beam.opacity})`)
        gradient.addColorStop(1, `rgba(255, 0, 127, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(beam.x, 0, beam.width, canvas.height)

        // Move beam
        beam.x += beam.speed
        if (beam.x > canvas.width) {
          beam.x = -beam.width
        }
      })
    }

    // Draw particles with glow
    const drawParticles = (time: number) => {
      particlesRef.current.forEach((particle) => {
        // Calculate wobble (sine wave motion)
        const wobbleX = Math.sin(time * particle.wobbleSpeed + particle.wobbleOffset) * 30

        // Draw glow (radial gradient) - reduced size
        const glowRadius = particle.size * 4 // Smaller glow (was *8)
        const glowGradient = ctx.createRadialGradient(
          particle.x + wobbleX,
          particle.y,
          0,
          particle.x + wobbleX,
          particle.y,
          glowRadius
        )
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity * 0.6})`)
        glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, ${particle.opacity * 0.2})`)
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)

        ctx.beginPath()
        ctx.arc(particle.x + wobbleX, particle.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Draw core - smaller and dimmer
        ctx.beginPath()
        ctx.arc(particle.x + wobbleX, particle.y, particle.size * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * 0.8})`
        ctx.fill()

        // Move particle down (falling effect)
        particle.y += particle.speedY

        // Reset particle when it goes off screen (bottom)
        if (particle.y > canvas.height + 20) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
        }
      })
    }

    // Animation loop
    const animate = (time: number) => {
      // Motion blur effect - don't fully clear canvas
      ctx.fillStyle = "rgba(10, 0, 18, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid()
      drawLightBeams()
      drawParticles(time * 0.001)

      frameRef.current = requestAnimationFrame(animate)
    }

    // Initial clear
    ctx.fillStyle = "rgba(10, 0, 18, 1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient - solid dark background */}
      <div className="absolute inset-0 bg-[#0a0012]" />

      {/* Canvas for particles, beams, and grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated gradient orbs (additional layer) */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,0,127,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(148,0,211,0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 1.3, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,20,147,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: [0, 60, 30, 0],
          y: [0, -60, -30, 0],
          scale: [1, 1.15, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Liquidity wave lines */}
      <svg className="absolute bottom-0 left-0 w-full h-[400px] opacity-15">
        <motion.path
          d="M0,200 Q200,150 400,200 T800,200 T1200,200 T1600,200 T2000,200"
          stroke="url(#pinkGradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,200 Q200,150 400,200 T800,200 T1200,200 T1600,200 T2000,200",
              "M0,200 Q200,250 400,200 T800,200 T1200,200 T1600,200 T2000,200",
              "M0,200 Q200,150 400,200 T800,200 T1200,200 T1600,200 T2000,200",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,220 Q200,180 400,220 T800,220 T1200,220 T1600,220 T2000,220"
          stroke="url(#pinkGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          animate={{
            d: [
              "M0,220 Q200,180 400,220 T800,220 T1200,220 T1600,220 T2000,220",
              "M0,220 Q200,260 400,220 T800,220 T1200,220 T1600,220 T2000,220",
              "M0,220 Q200,180 400,220 T800,220 T1200,220 T1600,220 T2000,220",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,0,127,0)" />
            <stop offset="50%" stopColor="rgba(255,0,127,0.8)" />
            <stop offset="100%" stopColor="rgba(255,0,127,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  )
}
