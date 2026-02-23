"use client";

import { categories } from "@/data/projects";
import { categoryColors } from "@/lib/project-graph";

interface GraphLegendProps {
  activeCategories: Set<string>;
  onToggle: (category: string) => void;
}

export function GraphLegend({ activeCategories, onToggle }: GraphLegendProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => {
        const active = activeCategories.has(cat);
        const color = categoryColors[cat];
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              active
                ? "bg-white/[0.06] text-white border border-white/[0.1]"
                : "bg-transparent text-[#6b6b80] border border-transparent opacity-50"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: color, opacity: active ? 1 : 0.3 }}
            />
            {cat}
          </button>
        );
      })}
    </div>
  );
}
