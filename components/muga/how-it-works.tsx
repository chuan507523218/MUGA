"use client"

import { motion } from "framer-motion"
import { Wallet, MousePointer, MessageSquare, Coins, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your Ethereum wallet to get started",
  },
  {
    icon: MousePointer,
    title: "Choose Fixed or Random",
    description: "Select your preferred minting strategy",
  },
  {
    icon: MessageSquare,
    title: "Enter Lucky Phrase",
    description: "For Random Mode, enter a phrase for the payload",
  },
  {
    icon: Coins,
    title: "Mint MUGA",
    description: "Confirm transaction and receive your tokens",
  },
]

const features = [
  "No pkHash required",
  "No v/r/s signature required",
  "No off-chain attestation",
  "Open mint through contract logic",
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32">
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
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, on-chain minting in four easy steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-pink-500/30">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-pink-400" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 sm:p-10"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Simplified Minting Process
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-black/30"
              >
                <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
