import type { ReactNode } from "react";

interface IPhoneFrameProps {
  children: ReactNode;
  className?: string;
  scale?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { w: "w-[180px]", h: "h-[360px]" },
  md: { w: "w-[240px]", h: "h-[480px]" },
  lg: { w: "w-[300px]", h: "h-[600px]" },
};

export function IPhoneFrame({ children, className = "", scale = "md" }: IPhoneFrameProps) {
  const size = sizes[scale];

  return (
    <div className={`relative ${size.w} ${size.h} ${className}`}>
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-[#1a1a2e] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-black rounded-full z-20" />

        {/* Status bar */}
        <div className="absolute top-1 left-6 right-6 flex items-center justify-between z-10 px-1 pt-1">
          <span className="text-[8px] text-white/60 font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              <div className="w-[3px] h-[4px] bg-white/50 rounded-[0.5px]" />
              <div className="w-[3px] h-[6px] bg-white/50 rounded-[0.5px]" />
              <div className="w-[3px] h-[8px] bg-white/50 rounded-[0.5px]" />
              <div className="w-[3px] h-[10px] bg-white/40 rounded-[0.5px]" />
            </div>
            <div className="w-5 h-[9px] border border-white/50 rounded-[2px] relative">
              <div className="absolute inset-[1px] right-[3px] bg-white/50 rounded-[1px]" />
              <div className="absolute right-[-2px] top-[2px] w-[1px] h-[4px] bg-white/40 rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[2.3rem] overflow-hidden bg-[#0a0a1a]">
          <div className="pt-12 h-full overflow-hidden">
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90px] h-[4px] bg-white/20 rounded-full z-20" />
      </div>
    </div>
  );
}
