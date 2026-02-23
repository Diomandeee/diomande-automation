interface InfrastructureMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function InfrastructureMockup({ slug, accentColor, name }: InfrastructureMockupProps) {
  switch (slug) {
    case "clawbot-daemon":
      return <DaemonUI color={accentColor} />;
    case "cc-discord-gateway":
      return <GatewayUI color={accentColor} />;
    case "comp-core":
      return <MonorepoUI color={accentColor} />;
    default:
      return <ServerUI color={accentColor} name={name} />;
  }
}

function DaemonUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line type="info" color={color}>[daemon] polling mac_tasks...</Line>
      <Line type="success" color={color}>[claim] task a3f7bc21 claimed by vm</Line>
      <Line type="output">[exec] claude --print --model sonnet</Line>
      <Line type="output">[stream] ████████░░ 80%</Line>
      <Line type="success" color={color}>[done] 47 files, 12.3s</Line>
      <br />
      <Line type="info" color={color}>[daemon] polling mac_tasks...</Line>
      <Line type="warn">[rate] 429 detected, marking account2</Line>
      <Line type="output">[fallback] switching to gemini-cli</Line>
      <Line type="success" color={color}>[done] research task, 8.1s</Line>
    </div>
  );
}

function GatewayUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line type="info" color={color}>[gateway] connected to Discord</Line>
      <Line type="output">[msg] #dev-ops: &quot;deploy staging&quot;</Line>
      <Line type="output">[route] → mac_tasks (device=vm)</Line>
      <Line type="success" color={color}>[thread] created for task e8f2a1</Line>
      <Line type="output">[progress] 1/3 subtasks complete</Line>
      <Line type="output">[progress] 2/3 subtasks complete</Line>
      <Line type="success" color={color}>[complete] all subtasks done</Line>
      <Line type="output">[reply] → #dev-ops thread</Line>
    </div>
  );
}

function MonorepoUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line type="output">comp-core/</Line>
      <Line type="folder" color={color}>├── core/runtime/       <Dim>Rust</Dim></Line>
      <Line type="folder" color={color}>├── core/motion/        <Dim>Rust</Dim></Line>
      <Line type="folder" color="#10b981">├── core/semantic/      <Dim>Python</Dim></Line>
      <Line type="folder" color="#10b981">├── core/retrieval/     <Dim>Python</Dim></Line>
      <Line type="folder" color="#06b6d4">├── core/gateways/      <Dim>TypeScript</Dim></Line>
      <Line type="folder" color="#06b6d4">├── core/agents/        <Dim>TypeScript</Dim></Line>
      <Line type="folder" color="#10b981">├── core/ml/            <Dim>Python</Dim></Line>
      <Line type="folder" color="#8b5cf6">└── core/audio-media/   <Dim>Mixed</Dim></Line>
      <br />
      <Line type="info" color={color}>73 components · 8 layers · 3 languages</Line>
    </div>
  );
}

function ServerUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="text-[11px] leading-relaxed">
      <Line type="output">$ {name.toLowerCase().replace(/[^a-z0-9]/g, "-")} serve</Line>
      <Line type="info" color={color}>[init] loading configuration...</Line>
      <Line type="success" color={color}>[ok] server started on :8000</Line>
      <Line type="output">[req] GET /health → 200 (2ms)</Line>
      <Line type="output">[req] POST /api/query → 200 (47ms)</Line>
      <Line type="output">[req] GET /api/status → 200 (1ms)</Line>
      <Line type="info" color={color}>[metrics] 3 req, avg 16.7ms</Line>
    </div>
  );
}

function Line({ children, type, color }: { children: React.ReactNode; type: string; color?: string }) {
  const textColor =
    type === "success" ? (color || "#10b981") :
    type === "info" ? (color || "#6b6b80") :
    type === "warn" ? "#f59e0b" :
    type === "folder" ? (color || "#a0a0b8") :
    "#a0a0b8";

  return (
    <div style={{ color: textColor }}>{children}</div>
  );
}

function Dim({ children }: { children: React.ReactNode }) {
  return <span className="text-white/20">{children}</span>;
}
