import type { ReactNode } from "react";

interface CodeEditorFrameProps {
  children: ReactNode;
  filename?: string;
  className?: string;
}

export function CodeEditorFrame({ children, filename = "main.ts", className = "" }: CodeEditorFrameProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl bg-[#0e0e1e] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Editor title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161628] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-0.5">
            <svg className="w-3.5 h-3.5 text-[#6b6b80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            <span className="text-[11px] text-[#a0a0b8] font-[family-name:var(--font-mono)]">
              {filename}
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center bg-[#0e0e1e] border-b border-white/5">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#0a0a1a] border-r border-white/5 border-b-2 border-b-[#00d4ff]">
            <span className="text-[10px] text-[#c0c0d8] font-[family-name:var(--font-mono)]">
              {filename}
            </span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 border-r border-white/5">
            <span className="text-[10px] text-[#6b6b80] font-[family-name:var(--font-mono)]">
              types.ts
            </span>
          </div>
        </div>

        {/* Editor content with line numbers */}
        <div className="flex min-h-[200px] overflow-hidden">
          {/* Line number gutter */}
          <div className="flex flex-col items-end px-3 py-3 bg-[#0a0a14] border-r border-white/5 select-none">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="text-[10px] text-[#4a4a5a] font-[family-name:var(--font-mono)] leading-[1.6]">
                {i + 1}
              </span>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 p-3 font-[family-name:var(--font-mono)] text-sm overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
