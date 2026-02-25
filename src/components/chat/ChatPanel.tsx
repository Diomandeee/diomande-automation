"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { getResponse } from "@/lib/chat-engine";
import { useProjectFocus } from "@/context/ProjectFocusContext";
import { projects as allProjects } from "@/data/projects";
import { SoundEngine } from "@/lib/sound-engine";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  projects?: string[];
}

interface ChatPanelProps {
  onClose: () => void;
}

let nextId = 0;

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId++,
      text: `I'm Claw. Ask me about any of the 47 projects, the tech behind them, or how the mesh connects everything.`,
      isUser: false,
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { focusedProject, focusSource, isTransient } = useProjectFocus();

  const focusedProjectName = useMemo(() => {
    if (!focusedProject || focusSource === "chat" || isTransient) return null;
    return allProjects.find((p) => p.slug === focusedProject)?.name ?? null;
  }, [focusedProject, focusSource, isTransient]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

  const handleSend = (text: string) => {
    const userMsg: Message = { id: nextId++, text, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Simulate brief thinking delay
    setTimeout(() => {
      const response = getResponse(text);
      const botMsg: Message = {
        id: nextId++,
        text: response.text,
        isUser: false,
        projects: response.projects,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
      SoundEngine.getInstance().chatTone();
    }, 400 + Math.random() * 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[min(520px,calc(100vh-6rem))] max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:rounded-none z-[9999] flex flex-col rounded-2xl border border-white/[0.12] bg-[#0a0a18]/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(0,212,255,0.08)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center text-sm">
            <span role="img" aria-label="claw">&#x1F99E;</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Claw</p>
            <p className="text-[10px] text-[#6b6b80]">mesh assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#6b6b80] hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            text={msg.text}
            isUser={msg.isUser}
            projects={msg.projects}
          />
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion pill from cross-feature focus */}
      {focusedProjectName && (
        <div className="px-3 py-1.5 border-t border-white/[0.04]">
          <button
            onClick={() => handleSend(`Tell me about ${focusedProjectName}`)}
            disabled={isThinking}
            className="text-xs px-3 py-1.5 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 hover:bg-[#00d4ff]/20 transition-colors cursor-pointer disabled:opacity-50"
          >
            Ask about {focusedProjectName}
          </button>
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <ChatInput
          onSend={handleSend}
          disabled={isThinking}
          showSuggestions={messages.length <= 1}
        />
      </div>
    </motion.div>
  );
}
