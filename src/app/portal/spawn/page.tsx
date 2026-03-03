"use client";

import { Rocket } from "lucide-react";
import { SpawnWizard } from "@/components/portal/SpawnWizard";

export default function SpawnPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#8b5cf6]/20 border border-white/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Spawn Project</h1>
            <p className="text-sm text-[#a0a0b8]">
              Launch a new project from template via the cc-project-spawner
            </p>
          </div>
        </div>
      </div>

      <SpawnWizard />
    </div>
  );
}
