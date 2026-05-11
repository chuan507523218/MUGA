"use client"

import { motion } from "framer-motion"
import { Twitter, Send, Github, AlertTriangle, ExternalLink } from "lucide-react"

const socialLinks = [
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
]

const contractInfo = [
  { label: "Contract Address", value: "0x..." },
  { label: "Token Address", value: "0x..." },
  { label: "Official Pool", value: "Coming Soon" },
]

export function Footer() {
  return (
    <footer className="py-16 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-pink-500/50 blur-lg -z-10" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MUGA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Make Uni Great Again. A pink-powered mint experiment inspired by Uniswap culture.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-pink-400 hover:border-pink-500/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contract Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contracts
            </h4>
            <ul className="space-y-3">
              {contractInfo.map((item, i) => (
                <li key={i}>
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-mono text-muted-foreground/70">{item.value}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Mint", "Tokenomics", "Pool", "FAQ"].map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-pink-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Uniswap", href: "https://uniswap.org" },
                { label: "Etherscan", href: "#" },
                { label: "Documentation", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-pink-400 transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-400 mb-1">Risk Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This is an experimental token mint. Cryptocurrency investments carry significant risk, 
                including potential loss of principal. Do your own research before participating. 
                This is not financial advice. Only interact with official contracts linked on this website.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-border/30 text-center"
        >
          <p className="text-xs text-muted-foreground">
            © 2026 MUGA. Make Uni Great Again. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
