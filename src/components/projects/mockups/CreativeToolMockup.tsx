interface CreativeToolMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function CreativeToolMockup({ slug, accentColor, name }: CreativeToolMockupProps) {
  switch (slug) {
    case "sound-sigils":
      return <WaveformDisplay color={accentColor} />;
    case "aesthetic-dna":
      return <DNAStrandUI color={accentColor} />;
    case "dream-weaver-engine":
      return <DreamStagesUI color={accentColor} />;
    case "evoflow":
      return <FrameworkGridUI color={accentColor} />;
    case "spatial-git":
      return <Git3DUI color={accentColor} />;
    default:
      return <PipelineUI color={accentColor} name={name} />;
  }
}

function WaveformDisplay({ color }: { color: string }) {
  return (
    <div className="p-4">
      <div className="text-[8px] text-white/30 mb-3 font-[family-name:var(--font-mono)]">SIGIL: &quot;convergence&quot;</div>
      {/* Waveform */}
      <div className="h-20 flex items-center gap-[1px]">
        {Array.from({ length: 40 }, (_, i) => {
          const t = i / 40;
          const h = Math.sin(t * Math.PI * 3) * 40 + Math.sin(t * Math.PI * 7) * 20 + 50;
          return (
            <div key={i} className="flex-1 rounded-full"
              style={{ height: `${Math.max(5, h)}%`, backgroundColor: color, opacity: 0.3 + t * 0.5 }} />
          );
        })}
      </div>
      {/* Info */}
      <div className="flex justify-between mt-3 text-[8px] text-white/30 font-[family-name:var(--font-mono)]">
        <span>44.1kHz</span>
        <span>2.4s</span>
        <span>WAV</span>
      </div>
    </div>
  );
}

function DNAStrandUI({ color }: { color: string }) {
  return (
    <div className="p-4">
      <div className="text-[8px] text-white/30 mb-2">VISUAL GENOME</div>
      {/* DNA strands */}
      {["Chromatic", "Structural", "Textural", "Typographic", "Motion"].map((strand, i) => (
        <div key={strand} className="flex items-center gap-2 mb-1.5">
          <span className="text-[7px] text-white/30 w-14 truncate">{strand}</span>
          <div className="flex-1 h-3 flex gap-[1px]">
            {Array.from({ length: 8 }, (_, j) => (
              <div key={j} className="flex-1 rounded-[1px]"
                style={{
                  backgroundColor: color,
                  opacity: 0.1 + (Math.sin((i + j) * 0.8) * 0.3 + 0.3),
                }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DreamStagesUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line color={color}>🌱 SEED → dream_a7f2c1</Line>
      <Line color="#6b6b80">   &quot;Haptic intervention for habits&quot;</Line>
      <Line color={color}>🌿 GERMINATING → dream_b8e3d2</Line>
      <Line color="#6b6b80">   &quot;Context-aware notifications&quot;</Line>
      <Line color="#10b981">🌸 BLOOM → dream_c9f4e3</Line>
      <Line color="#6b6b80">   &quot;Cross-pollinated with Spore engine&quot;</Line>
      <Line color="#f59e0b">🦋 METAMORPHOSED → dream_d0a5f4</Line>
      <Line color="#6b6b80">   &quot;Ready for implementation&quot;</Line>
      <br />
      <Line color={color}>27 gestating · 18 emerged · 20 metamorphosed</Line>
    </div>
  );
}

function FrameworkGridUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line color={color}>&gt; evoflow list --category=generation</Line>
      <br />
      <Line color="#a0a0b8">G01  Random Word Catalyst     [spf, art:creative]</Line>
      <Line color="#a0a0b8">G03  Free Association          [spf, thk:chaos]</Line>
      <Line color="#a0a0b8">G07  Perspective Shift         [art:divergent]</Line>
      <Line color="#a0a0b8">G15  Contradiction Embrace     [phi:paradox]</Line>
      <br />
      <Line color={color}>54 techniques · 300+ frameworks</Line>
    </div>
  );
}

function Git3DUI({ color }: { color: string }) {
  return (
    <div className="p-4 relative min-h-[200px]">
      {/* 3D-ish git graph */}
      <svg className="w-full h-full" viewBox="0 0 200 150">
        {/* Branch lines */}
        <path d="M 30 120 L 80 80 L 140 60 L 180 30" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.4" />
        <path d="M 80 80 L 120 100 L 160 90" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.3" />
        <path d="M 140 60 L 150 80" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />

        {/* Commit nodes */}
        {[
          { x: 30, y: 120, c: color, r: 5 },
          { x: 80, y: 80, c: color, r: 6 },
          { x: 120, y: 100, c: "#10b981", r: 4 },
          { x: 140, y: 60, c: color, r: 6 },
          { x: 150, y: 80, c: "#f59e0b", r: 4 },
          { x: 160, y: 90, c: "#10b981", r: 4 },
          { x: 180, y: 30, c: color, r: 7 },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r + 4} fill={node.c} fillOpacity="0.1" />
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.c} fillOpacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function PipelineUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line color={color}>&gt; {name.toLowerCase().replace(/\s+/g, "-")} run</Line>
      <Line color="#a0a0b8">[1/3] Processing input...</Line>
      <Line color="#a0a0b8">[2/3] Transforming...</Line>
      <Line color="#a0a0b8">[3/3] Generating output...</Line>
      <Line color={color}>✓ Pipeline complete</Line>
    </div>
  );
}

function Line({ children, color }: { children: React.ReactNode; color: string }) {
  return <div style={{ color }}>{children}</div>;
}
