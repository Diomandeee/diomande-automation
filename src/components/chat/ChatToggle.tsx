"use client";

import { motion } from "framer-motion";

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggle({ isOpen, onClick }: ChatToggleProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-4 right-4 sm:right-6 sm:bottom-6 z-[9998] w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(0,212,255,0.15)] cursor-pointer transition-colors ${
        isOpen
          ? "bg-white/[0.08] border border-white/[0.12]"
          : "bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] border border-white/[0.15]"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-xl sm:text-2xl"
        role="img"
        aria-hidden
      >
        {isOpen ? "\u2715" : "\u{1F99E}"}
      </motion.span>
    </motion.button>
  );
}
