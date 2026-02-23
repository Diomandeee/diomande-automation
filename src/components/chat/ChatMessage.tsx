"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  projects?: string[];
}

export function ChatMessage({ text, isUser, projects }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/20 rounded-br-md"
            : "bg-white/[0.06] text-[#c0c0d8] border border-white/[0.08] rounded-bl-md"
        }`}
      >
        <p>{text}</p>
        {projects && projects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-white/[0.06]">
            {projects.slice(0, 5).map((slug) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="inline-block px-2 py-0.5 rounded-md text-xs bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors"
              >
                {slug}
              </Link>
            ))}
            {projects.length > 5 && (
              <span className="text-xs text-[#6b6b80] self-center">
                +{projects.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
