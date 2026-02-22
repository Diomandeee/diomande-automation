import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

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
  metadataBase: new URL("https://diomandeautomation.com"),
  title: {
    default: "Diomande Automation — AI-Powered Task Automation for Your Team",
    template: "%s | Diomande Automation",
  },
  description:
    "Distributed AI task execution with multi-agent decomposition, intelligent model routing, and mesh device orchestration. Deployed for your infrastructure.",
  keywords: [
    "AI automation",
    "task automation",
    "multi-agent",
    "distributed execution",
    "mesh network",
    "Claude",
    "AI infrastructure",
    "Diomande Automation",
  ],
  authors: [{ name: "Mohamed Diomande" }],
  openGraph: {
    title: "Diomande Automation — AI-Powered Task Automation for Your Team",
    description:
      "Distributed AI task execution with multi-agent decomposition, intelligent model routing, and mesh device orchestration.",
    images: ["/og-image.png"],
    type: "website",
    siteName: "Diomande Automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diomande Automation — AI-Powered Task Automation",
    description:
      "Distributed execution. Multi-agent decomposition. Deployed for your infrastructure.",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        <div className="fixed inset-0 gradient-mesh-dark pointer-events-none" />
        <div className="fixed inset-0 grid-pattern pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
