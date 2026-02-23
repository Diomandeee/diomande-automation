interface WebPlatformMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function WebPlatformMockup({ slug, accentColor, name }: WebPlatformMockupProps) {
  switch (slug) {
    case "linkit":
      return <LinkListUI color={accentColor} />;
    case "compass":
      return <ForceGraphUI color={accentColor} />;
    case "qr-dynamic":
      return <QRGridUI color={accentColor} />;
    default:
      return <DashboardUI color={accentColor} name={name} />;
  }
}

function LinkListUI({ color }: { color: string }) {
  return (
    <div className="p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-12 h-12 rounded-full mb-2" style={{ backgroundColor: `${color}30` }} />
        <div className="h-1.5 rounded bg-white/20 w-16 mb-1" />
        <div className="h-1 rounded bg-white/10 w-24" />
      </div>
      {/* Links */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-2 p-2.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-2"
          style={{ borderColor: i === 1 ? `${color}30` : undefined }}>
          <div className="w-5 h-5 rounded" style={{ backgroundColor: `${color}${i === 1 ? "30" : "15"}` }} />
          <div className="flex-1">
            <div className="h-1.5 rounded bg-white/15 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ForceGraphUI({ color }: { color: string }) {
  return (
    <div className="p-4 relative h-full min-h-[200px]">
      {/* Nodes */}
      {[
        { x: 50, y: 30, s: 6 }, { x: 25, y: 55, s: 4 }, { x: 70, y: 50, s: 5 },
        { x: 40, y: 70, s: 3 }, { x: 80, y: 25, s: 4 }, { x: 15, y: 35, s: 3 },
        { x: 60, y: 75, s: 4 }, { x: 35, y: 40, s: 5 },
      ].map((node, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            left: `${node.x}%`, top: `${node.y}%`,
            width: `${node.s * 4}px`, height: `${node.s * 4}px`,
            backgroundColor: `${color}${40 + node.s * 8}`,
            boxShadow: `0 0 ${node.s * 3}px ${color}30`,
          }}
        />
      ))}
      {/* Connection lines via SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        {[
          [50, 30, 25, 55], [50, 30, 70, 50], [25, 55, 40, 70],
          [70, 50, 80, 25], [35, 40, 15, 35], [60, 75, 40, 70],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
            stroke={color} strokeOpacity="0.15" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

// Deterministic pseudo-random based on seed
function seededValue(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function QRGridUI({ color }: { color: string }) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-lg border border-white/10 p-2 flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-[1px]">
              {Array.from({ length: 16 }, (_, j) => {
                const v = seededValue(i * 16 + j);
                return (
                  <div key={j} className="rounded-[1px]"
                    style={{ backgroundColor: v > 0.4 ? `${color}${20 + Math.floor(v * 30)}` : "transparent" }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="p-4">
      {/* Sidebar + content */}
      <div className="flex gap-3">
        <div className="w-1/4 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 rounded"
              style={{ backgroundColor: i === 1 ? `${color}30` : "rgba(255,255,255,0.05)", width: `${60 + i * 10}%` }} />
          ))}
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-[8px] text-white/30 font-bold">{name}</div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-white/5 border border-white/5 p-1.5">
                <div className="h-1 rounded bg-white/10 w-2/3 mb-1" />
                <div className="text-[8px] font-bold" style={{ color }}>--</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
