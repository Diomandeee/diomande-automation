import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({ children, url = "https://app.example.com", className = "" }: BrowserFrameProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-xl bg-[#0e0e1e] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161628] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 ml-2">
            <div className="flex-1 flex items-center gap-1.5 bg-[#0a0a1a] rounded-md px-3 py-1 border border-white/5">
              <svg className="w-3 h-3 text-[#28c840] shrink-0" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zm3.5 5.5l-4 4a.5.5 0 0 1-.7 0l-2-2a.5.5 0 0 1 .7-.7L7.1 9.4l3.6-3.6a.5.5 0 0 1 .7.7z"/>
              </svg>
              <span className="text-[10px] text-[#6b6b80] font-[family-name:var(--font-mono)] truncate">
                {url}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="min-h-[200px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
