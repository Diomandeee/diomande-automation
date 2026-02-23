"use client";

import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface GraphControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function GraphControls({ onZoomIn, onZoomOut, onReset }: GraphControlsProps) {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-1">
      {[
        { icon: ZoomIn, action: onZoomIn, label: "Zoom in" },
        { icon: ZoomOut, action: onZoomOut, label: "Zoom out" },
        { icon: Maximize2, action: onReset, label: "Reset view" },
      ].map(({ icon: Icon, action, label }) => (
        <button
          key={label}
          onClick={action}
          className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#7a7a95] hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
          aria-label={label}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}
