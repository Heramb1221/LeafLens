'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-xl text-center space-y-6 bg-white/80 dark:bg-slate-800/80 p-10 rounded-3xl shadow-2xl backdrop-blur-md border border-emerald-200 dark:border-slate-700"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Let’s Connect!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have a question, idea, or just want to say hello? I’d love to hear from you.
          Feel free to check out my projects or get in touch on GitHub.
        </p>

        <a
          href="https://github.com/heramb1221"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-300"
        >
          <Github className="w-5 h-5" />
          Visit My GitHub
        </a>
      </motion.div>
    </div>
  )
}
