import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllSlugs } from "@/lib/projects";
import { maturityConfig } from "@/data/projects";

export const alt = "Project Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a12",
            color: "#ffffff",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          Project Not Found
        </div>
      ),
      size
    );
  }

  const maturity = maturityConfig[project.maturity];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          background: `linear-gradient(135deg, #0a0a12 0%, ${project.accentColor}15 50%, #0a0a12 100%)`,
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 6,
            borderRadius: 3,
            background: project.accentColor,
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Maturity badge */}
            <div
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
                color: project.accentColor,
                background: `${project.accentColor}20`,
                border: `1px solid ${project.accentColor}40`,
              }}
            >
              {maturity.label}
            </div>
            {/* Category */}
            <div
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 500,
                color: "#a0a0b8",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {project.category}
            </div>
          </div>

          {/* Project name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            {project.name}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 30,
              color: "#b0b0c8",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              DA
            </div>
            <div style={{ display: "flex", fontSize: 20, color: "#7a7a95" }}>diomande.com/projects/{project.slug}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {project.tech.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: 14,
                  color: "#a0a0b8",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
