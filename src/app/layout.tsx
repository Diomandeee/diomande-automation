import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { lazy, Suspense } from "react";
import "../styles/globals.css";
import { ProjectFocusProvider } from "@/context/ProjectFocusContext";
import { SiteJsonLd } from "@/components/shared/JsonLd";

const ClawChat = lazy(() =>
  import("@/components/chat/ClawChat").then((m) => ({ default: m.ClawChat }))
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diomande-automation.vercel.app"),
  title: {
    default: "Diomande — Production AI Infrastructure",
    template: "%s | Diomande",
  },
  description:
    "Build anything with production AI infrastructure. Join the community or partner with Mo for enterprise AI consulting.",
  keywords: [
    "AI infrastructure",
    "AI community",
    "multi-agent",
    "AI consulting",
    "distributed execution",
    "mesh network",
    "Claude",
    "Diomande",
    "build with AI",
  ],
  authors: [{ name: "Mohamed Diomande" }],
  openGraph: {
    title: "Diomande — Production AI Infrastructure",
    description:
      "Build anything with production AI infrastructure. Join the community or partner with Mo for enterprise AI consulting.",
    images: ["/og-image.png"],
    type: "website",
    siteName: "Diomande",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diomande — Production AI Infrastructure",
    description:
      "Build anything with production AI. Community access + enterprise consulting.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <SiteJsonLd />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-body)] antialiased bg-[#020205]`}
      >
        {/* Deep visual background stack */}
        <div className="fixed inset-0 bg-[#020205] pointer-events-none" />
        <div className="fixed inset-0 gradient-mesh-dark pointer-events-none opacity-80" />
        <div className="fixed inset-0 grid-pattern pointer-events-none mix-blend-overlay" />

        <ProjectFocusProvider>
          {/* Main Content */}
          <div className="relative z-10">{children}</div>

          {/* Chat Companion */}
          <Suspense fallback={null}>
            <ClawChat />
          </Suspense>
        </ProjectFocusProvider>
      </body>
    </html>
  );
}
