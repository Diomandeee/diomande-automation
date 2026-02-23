interface IOSAppMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function IOSAppMockup({ slug, accentColor, name }: IOSAppMockupProps) {
  // Different UI patterns based on app type
  switch (slug) {
    case "securiclaw":
      return <CameraViewfinder color={accentColor} />;
    case "speakflow":
      return <WaveformUI color={accentColor} />;
    case "visionclaw":
      return <CameraViewfinder color={accentColor} />;
    case "spore":
      return <GardenUI color={accentColor} />;
    case "bwb-suite":
      return <MenuGridUI color={accentColor} />;
    case "creative-director":
      return <ContentPipelineUI color={accentColor} />;
    case "lifeos":
      return <HealthDashUI color={accentColor} />;
    case "agent-command-center":
      return <DashboardUI color={accentColor} />;
    case "serenity-soother":
      return <BreathingUI color={accentColor} />;
    case "aura":
      return <TabBarUI color={accentColor} />;
    default:
      return <GenericAppUI color={accentColor} name={name} />;
  }
}

function CameraViewfinder({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-black/50">
      {/* Viewfinder grid */}
      <div className="w-full aspect-[3/4] relative border border-white/10 rounded-lg overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="border border-white/5" />
          ))}
        </div>
        {/* Focus indicator */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 rounded-lg"
          style={{ borderColor: color }}
        />
        {/* Face detection box */}
        <div
          className="absolute top-[20%] left-[30%] w-12 h-14 border rounded-md"
          style={{ borderColor: `${color}80` }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] px-1 rounded" style={{ backgroundColor: color, color: "black" }}>
            Face
          </div>
        </div>
      </div>
      {/* Bottom controls */}
      <div className="flex items-center gap-4 mt-3">
        <div className="w-8 h-8 rounded-full border border-white/20" />
        <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color }}>
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: `${color}30` }} />
        </div>
        <div className="w-8 h-8 rounded-full border border-white/20" />
      </div>
    </div>
  );
}

function WaveformUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">LISTENING...</div>
      {/* Waveform bars */}
      <div className="flex-1 flex items-center justify-center gap-[3px]">
        {[40, 65, 45, 80, 55, 90, 50, 70, 60, 85, 45, 75, 55, 65, 40, 80, 50, 70].map((h, i) => (
          <div
            key={i}
            className="w-[4px] rounded-full"
            style={{
              height: `${h}%`,
              backgroundColor: color,
              opacity: 0.4 + (h / 200),
            }}
          />
        ))}
      </div>
      {/* Transcription area */}
      <div className="mt-3 p-2 rounded-lg bg-white/5 border border-white/5">
        <div className="h-1.5 rounded bg-white/20 w-3/4 mb-1" />
        <div className="h-1.5 rounded bg-white/10 w-1/2" />
      </div>
    </div>
  );
}

function GardenUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">MY GARDEN</div>
      <div className="flex-1 grid grid-cols-3 gap-2">
        {[
          { size: "w-6 h-8", stage: "bloom" },
          { size: "w-4 h-5", stage: "grow" },
          { size: "w-5 h-7", stage: "bud" },
          { size: "w-3 h-4", stage: "seed" },
          { size: "w-6 h-9", stage: "bloom" },
          { size: "w-4 h-6", stage: "grow" },
        ].map((plant, i) => (
          <div key={i} className="flex items-end justify-center">
            <div className="flex flex-col items-center">
              <div
                className={`${plant.size} rounded-full`}
                style={{
                  backgroundColor: `${color}${plant.stage === "bloom" ? "60" : plant.stage === "grow" ? "40" : "20"}`,
                  boxShadow: plant.stage === "bloom" ? `0 0 8px ${color}40` : "none",
                }}
              />
              <div className="w-[2px] h-3 bg-[#10b981]/40 mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuGridUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">MENU</div>
      {/* Menu items */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: `${color}20` }} />
          <div className="flex-1">
            <div className="h-1.5 rounded bg-white/20 w-2/3 mb-1" />
            <div className="h-1 rounded bg-white/10 w-1/3" />
          </div>
          <div className="text-[8px] font-bold" style={{ color }}>$--</div>
        </div>
      ))}
    </div>
  );
}

function ContentPipelineUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">BATCH PIPELINE</div>
      {[
        { label: "Generate", pct: 100 },
        { label: "Review", pct: 75 },
        { label: "Publish", pct: 30 },
      ].map((step, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[8px] text-white/40">{step.label}</span>
            <span className="text-[8px]" style={{ color }}>{step.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5">
            <div className="h-full rounded-full" style={{ width: `${step.pct}%`, backgroundColor: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HealthDashUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">TODAY</div>
      {/* Ring chart placeholder */}
      <div className="flex items-center justify-center my-2">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="3" />
            <circle cx="18" cy="18" r="14" fill="none" stroke={color} strokeWidth="3" strokeDasharray="66 22" strokeLinecap="round" />
            <circle cx="18" cy="18" r="10" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="3" />
            <circle cx="18" cy="18" r="10" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="44 19" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">75%</div>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {["Steps", "Heart", "Sleep"].map((label) => (
          <div key={label} className="text-center p-1.5 rounded-lg bg-white/5">
            <div className="text-[7px] text-white/30">{label}</div>
            <div className="text-[10px] font-bold" style={{ color }}>--</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[9px] text-white/40 mb-2">FLEET STATUS</div>
      {["vm", "mac1", "mac3", "mac4"].map((node, i) => (
        <div key={node} className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[9px] text-white/60 font-[family-name:var(--font-mono)]">{node}</span>
          <div className="flex-1 h-1 rounded bg-white/5">
            <div className="h-full rounded" style={{ width: `${[85, 72, 91, 68][i]}%`, backgroundColor: `${color}60` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BreathingUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      {/* Breathing circle */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full" style={{ backgroundColor: `${color}15`, boxShadow: `0 0 40px ${color}20` }} />
        <div className="absolute inset-3 rounded-full" style={{ backgroundColor: `${color}25` }} />
        <div className="absolute inset-6 rounded-full" style={{ backgroundColor: `${color}35` }} />
      </div>
      <div className="text-[10px] text-white/40 mt-4">Breathe in...</div>
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i <= 2 ? color : `${color}30` }} />
        ))}
      </div>
    </div>
  );
}

function TabBarUI({ color }: { color: string }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4">
        <div className="text-[9px] text-white/40 mb-2">DASHBOARD</div>
        <div className="grid grid-cols-2 gap-2">
          {["Vision", "Command", "Life", "Garden"].map((tab) => (
            <div key={tab} className="p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="text-[8px] text-white/30 mb-1">{tab}</div>
              <div className="h-1 rounded bg-white/10 w-2/3" />
            </div>
          ))}
        </div>
      </div>
      {/* Tab bar */}
      <div className="flex items-center justify-around py-2 border-t border-white/5 bg-[#0a0a14]">
        {["V", "C", "L", "G"].map((t, i) => (
          <div key={t} className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold"
            style={{ backgroundColor: i === 0 ? `${color}20` : "transparent", color: i === 0 ? color : "#6b6b80" }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericAppUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black"
        style={{ backgroundColor: `${color}20`, color: `${color}80` }}>
        {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
      </div>
      <div className="mt-3 h-1.5 rounded bg-white/10 w-20" />
      <div className="mt-1.5 h-1 rounded bg-white/5 w-14" />
    </div>
  );
}
