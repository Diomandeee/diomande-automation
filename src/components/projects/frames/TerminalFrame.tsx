import type { ReactNode } from "react";

interface TerminalFrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function TerminalFrame({ children, title = "terminal — bash", className = "" }: TerminalFrameProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl bg-[#05050a] border border-[#00d4ff]/20 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a14] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-[11px] text-[#6b6b80] font-[family-name:var(--font-mono)] truncate">
            {title}
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 min-h-[200px] font-[family-name:var(--font-mono)] text-sm overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
