"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { suggestedQuestions } from "@/data/chat-responses";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  showSuggestions?: boolean;
}

export function ChatInput({ onSend, disabled, showSuggestions }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      {showSuggestions && (
        <div className="flex flex-wrap gap-1.5 px-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => onSend(q)}
              className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.05] text-[#8888a8] border border-white/[0.06] hover:text-[#00d4ff] hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/5 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Ask about any project..."
          disabled={disabled}
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b6b80] focus:outline-none focus:border-[#00d4ff]/30 transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="w-9 h-9 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors disabled:opacity-30 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
