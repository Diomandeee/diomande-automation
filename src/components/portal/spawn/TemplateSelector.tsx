"use client";

import { motion } from "framer-motion";
import {
  Library,
  Terminal,
  Braces,
  Code2,
  Smartphone,
  Globe,
} from "lucide-react";
import { spawnTemplates, type SpawnTemplate } from "@/data/spawn-templates";

const iconMap: Record<string, React.ElementType> = {
  Library,
  Terminal,
  Braces,
  Code2,
  Smartphone,
  Globe,
};

interface TemplateSelectorProps {
  selected: SpawnTemplate | null;
  onSelect: (template: SpawnTemplate) => void;
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Choose a Template</h3>
      <p className="text-sm text-[#a0a0b8]">
        Select the project type to scaffold.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spawnTemplates.map((template, i) => {
          const Icon = iconMap[template.icon] || Code2;
          const isSelected = selected?.id === template.id;

          return (
            <motion.button
              key={template.id}
              onClick={() => onSelect(template)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-xl text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#00d4ff]/10 border-2 border-[#00d4ff]/40 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                  : "glass-card hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-[#00d4ff]/20"
                      : "bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isSelected ? "text-[#00d4ff]" : "text-[#a0a0b8]"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">
                    {template.name}
                  </div>
                  <div className="text-xs text-[#6b6b80] font-mono mt-0.5">
                    {template.language}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#a0a0b8] mt-3">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {template.includes.slice(0, 3).map((file) => (
                  <span
                    key={file}
                    className="text-[10px] font-mono text-[#6b6b80] bg-white/5 px-1.5 py-0.5 rounded"
                  >
                    {file}
                  </span>
                ))}
                {template.includes.length > 3 && (
                  <span className="text-[10px] text-[#6b6b80]">
                    +{template.includes.length - 3}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
