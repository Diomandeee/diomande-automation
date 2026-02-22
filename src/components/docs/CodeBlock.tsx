"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/8 my-6">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
          <span className="text-xs text-[#6b6b80] font-[family-name:var(--font-mono)]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-[#6b6b80] hover:text-white transition-colors cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#10b981]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-[#0d0d14]">
        <code className="text-sm text-[#a0a0b8] font-[family-name:var(--font-mono)] leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
}
