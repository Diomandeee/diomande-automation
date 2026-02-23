interface AgentSystemMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function AgentSystemMockup({ slug, accentColor, name }: AgentSystemMockupProps) {
  switch (slug) {
    case "emergent-protocols":
      return <ProtocolFlowUI color={accentColor} />;
    case "thought-mesh":
      return <ThoughtGraphUI color={accentColor} />;
    case "cognitive-twin":
      return <PatternLearningUI color={accentColor} />;
    default:
      return <NodeGraphUI color={accentColor} name={name} />;
  }
}

function ProtocolFlowUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-[1.6]">
      <div style={{ color }}>[protocol] negotiation started</div>
      <br />
      <div className="text-white/60">Agent-A → Agent-B: <span className="text-[#f59e0b]">PROPOSE</span> format=json</div>
      <div className="text-white/60">Agent-B → Agent-A: <span style={{ color }}>ACCEPT</span> format=json</div>
      <div className="text-white/60">Agent-A → Agent-B: <span className="text-[#f59e0b]">PROPOSE</span> compress=true</div>
      <div className="text-white/60">Agent-B → Agent-A: <span className="text-[#ef4444]">COUNTER</span> compress=gzip</div>
      <div className="text-white/60">Agent-A → Agent-B: <span style={{ color }}>ACCEPT</span> compress=gzip</div>
      <br />
      <div style={{ color }}>✓ Protocol emerged: json+gzip (3 rounds)</div>
    </div>
  );
}

function ThoughtGraphUI({ color }: { color: string }) {
  return (
    <div className="p-4 relative min-h-[200px]">
      <svg className="w-full h-full" viewBox="0 0 200 160">
        {/* Connections */}
        {[
          [60, 40, 140, 50], [60, 40, 90, 110], [140, 50, 160, 120],
          [90, 110, 160, 120], [140, 50, 40, 100], [40, 100, 90, 110],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeOpacity="0.15" strokeWidth="1" />
        ))}

        {/* Thought nodes */}
        {[
          { x: 60, y: 40, r: 12, label: "A" },
          { x: 140, y: 50, r: 10, label: "B" },
          { x: 90, y: 110, r: 8, label: "C" },
          { x: 160, y: 120, r: 9, label: "D" },
          { x: 40, y: 100, r: 7, label: "E" },
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={node.r + 6} fill={color} fillOpacity="0.08" />
            <circle cx={node.x} cy={node.y} r={node.r} fill={color} fillOpacity="0.3" />
            <text x={node.x} y={node.y + 3} textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="8">{node.label}</text>
          </g>
        ))}

        {/* "Gravity" indicator */}
        <text x="100" y="150" textAnchor="middle" fill={color} fillOpacity="0.4" fontSize="7">attention flow active</text>
      </svg>
    </div>
  );
}

function PatternLearningUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-[1.6]">
      <div style={{ color }}>[twin] learning from interaction #847</div>
      <br />
      <div className="text-white/60">Style:   <span style={{ color }}>direct, technical</span></div>
      <div className="text-white/60">Prefer:  <span className="text-[#10b981]">code over pseudocode</span></div>
      <div className="text-white/60">Avoid:   <span className="text-[#ef4444]">verbose explanations</span></div>
      <div className="text-white/60">Tone:    <span className="text-[#f59e0b]">slightly snarky</span></div>
      <br />
      <div className="text-white/40">DPO score: 0.89 (+0.02)</div>
      <div style={{ color }}>✓ Pattern stored in knowledge graph</div>
    </div>
  );
}

function NodeGraphUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="p-4 relative min-h-[200px]">
      <div className="text-[8px] text-white/30 mb-2">{name.toUpperCase()}</div>
      <svg className="w-full h-full" viewBox="0 0 200 130">
        {[
          [50, 30, 100, 60], [100, 60, 150, 30], [100, 60, 100, 110],
          [50, 30, 50, 90], [150, 30, 150, 90],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeOpacity="0.2" strokeWidth="1" />
        ))}
        {[
          { x: 50, y: 30 }, { x: 100, y: 60 }, { x: 150, y: 30 },
          { x: 50, y: 90 }, { x: 100, y: 110 }, { x: 150, y: 90 },
        ].map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="8" fill={color} fillOpacity={0.2 + i * 0.05} />
        ))}
      </svg>
    </div>
  );
}
