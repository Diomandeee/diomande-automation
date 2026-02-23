"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { scenarios } from "@/data/theater-scenarios";

interface TheaterInputProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
}

export function TheaterInput({ onSubmit, disabled }: TheaterInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className="space-y-3">
      {/* Preset pills */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 overflow-x-auto pb-1 sm:justify-center">
        {scenarios.map((s) => (
          <button
            key={s.prompt}
            onClick={() => !disabled && onSubmit(s.prompt)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-full text-xs bg-white/[0.04] text-[#8888a8] border border-white/[0.06] hover:text-[#00d4ff] hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/5 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {s.prompt}
          </button>
        ))}
      </div>

      {/* Discord-style input */}
      <div className="flex items-center gap-2 max-w-xl mx-auto">
        <div className="flex-1 flex items-center bg-[#383a40] rounded-lg border border-[#4a4c52] overflow-hidden">
          <span className="pl-3 text-[#b5bac1] text-sm select-none">#</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type a task for the mesh..."
            disabled={disabled}
            className="flex-1 bg-transparent px-2 py-2.5 text-sm text-[#dbdee1] placeholder:text-[#6d6f78] focus:outline-none disabled:opacity-50 font-[family-name:var(--font-body)]"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="w-9 h-9 rounded-lg bg-[#5865F2] flex items-center justify-center text-white hover:bg-[#4752C4] transition-colors disabled:opacity-30 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
