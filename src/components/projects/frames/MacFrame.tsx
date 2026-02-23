import type { ReactNode } from "react";

interface MacFrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function MacFrame({ children, title = "Untitled", className = "" }: MacFrameProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl bg-[#0e0e1e] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161628] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-[11px] text-[#6b6b80] font-[family-name:var(--font-mono)] truncate">
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="min-h-[200px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
