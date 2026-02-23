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
