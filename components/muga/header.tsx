"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isConnected: boolean
  address?: string
  onConnect: () => void
  onDisconnect: () => void
}

const navItems = [
  { name: "MINT", href: "#mint" },
  { name: "TOKENOMICS", href: "#tokenomics" },
  { name: "POOL", href: "#pool" },
  { name: "FAQ", href: "#faq" },
]

export function Header({ isConnected, address, onConnect, onDisconnect }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card mt-4 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-pink-500/50 blur-lg -z-10" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                MUGA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium tracking-wider text-muted-foreground hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Wallet Button */}
            <div className="flex items-center gap-4">
              {isConnected ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {truncateAddress(address || "")}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDisconnect}
                    className="border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/10 text-white"
                  >
                    Disconnect
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={onConnect}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium px-6 shadow-lg shadow-pink-500/25"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass-card rounded-2xl p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium tracking-wider text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
