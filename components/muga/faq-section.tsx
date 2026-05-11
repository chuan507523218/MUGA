"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Fixed Mint?",
    answer: "Fixed Mint gives exactly 500 MUGA for 0.0025 ETH. It's the predictable, guaranteed option for those who prefer certainty over chance.",
  },
  {
    question: "What is Random Mint?",
    answer: "Random Mint costs 0.0025 ETH and gives 400, 500, or 600 MUGA based on on-chain randomness. The probabilities are: 30% for 500 MUGA, 30% for 400 MUGA, and 40% for 600 MUGA.",
  },
  {
    question: "Does my lucky phrase control the result?",
    answer: "No. The lucky phrase is encoded with your wallet address as part of the mint payload. The actual result is determined by on-chain randomness during contract execution, not by your phrase.",
  },
  {
    question: "Do I need pkHash, v, r, or s?",
    answer: "No. This design does not require off-chain signatures. The mint process is simplified and happens directly through the smart contract.",
  },
  {
    question: "Can someone else use my encoded payload?",
    answer: "No. The contract decodes the payload and checks that the encoded address equals msg.sender. This ensures only you can use your own payload.",
  },
  {
    question: "Which pool should I use?",
    answer: "Only use the official Uniswap V4 pool link shown on this website. Be cautious of fake pools and always verify the contract addresses.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            FAQ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Common questions about MUGA minting
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-border/50 rounded-xl px-4 data-[state=open]:border-pink-500/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-white hover:text-pink-400 hover:no-underline py-5">
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
