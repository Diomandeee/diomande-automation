interface DevToolMockupProps {
  slug: string;
  accentColor: string;
  name: string;
}

export function DevToolMockup({ slug, accentColor, name }: DevToolMockupProps) {
  switch (slug) {
    case "self-healing-code":
      return <SelfHealUI color={accentColor} />;
    case "dependency-oracle":
      return <DepTreeUI color={accentColor} />;
    default:
      return <CodeOutputUI color={accentColor} name={name} />;
  }
}

function SelfHealUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-[1.6]">
      <span className="text-[#8b5cf6]">def</span> <span className="text-[#00d4ff]">process_data</span>
      <span className="text-white/60">(items):</span>
      <br />
      <span className="text-white/30">    </span>
      <span className="text-[#8b5cf6]">for</span> <span className="text-white/60">item</span>
      <span className="text-[#8b5cf6]"> in </span><span className="text-white/60">items:</span>
      <br />
      <span className="text-white/30">        </span>
      <span className="text-white/60">result = item[</span>
      <span className="text-[#f59e0b]">&quot;value&quot;</span>
      <span className="text-white/60">] / item[</span>
      <span className="text-[#f59e0b]">&quot;count&quot;</span>
      <span className="text-white/60">]</span>
      <br /><br />
      <span className="text-[#ef4444]">⚠ ZeroDivisionError detected</span>
      <br />
      <span style={{ color }}>✓ Auto-fix: added guard clause</span>
      <br />
      <span style={{ color }}>✓ Immune memory: pattern stored</span>
    </div>
  );
}

function DepTreeUI({ color }: { color: string }) {
  return (
    <div className="text-[11px] leading-[1.6]">
      <div style={{ color }}>&gt; dep-oracle check package.json</div>
      <br />
      <div className="text-white/60">
        <span className="text-white/30">├── </span>react@18.3.0
      </div>
      <div className="text-white/60">
        <span className="text-white/30">│   ├── </span>react-dom@18.3.0
      </div>
      <div className="text-white/60">
        <span className="text-white/30">│   └── </span>scheduler@0.23.0
      </div>
      <div className="text-[#f59e0b]">
        <span className="text-white/30">├── </span>⚠ next@14.0.0 → 15.1.0 available
      </div>
      <div className="text-[#ef4444]">
        <span className="text-white/30">└── </span>✗ lodash@4.17.15 (CVE-2024-xxxx)
      </div>
      <br />
      <div style={{ color }}>2 warnings · 1 vulnerability</div>
    </div>
  );
}

function CodeOutputUI({ color, name }: { color: string; name: string }) {
  return (
    <div className="text-[11px] leading-[1.6]">
      <div style={{ color }}>&gt; {name.toLowerCase().replace(/\s+/g, "-")} analyze</div>
      <br />
      <div className="text-white/60">Scanning project structure...</div>
      <div className="text-white/60">Found 24 files, 1,847 lines</div>
      <br />
      <div style={{ color }}>✓ Analysis complete</div>
      <div className="text-white/40">  Coverage: 87%</div>
      <div className="text-white/40">  Issues: 0 critical, 2 minor</div>
    </div>
  );
}
