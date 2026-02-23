import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Platform: [
    { href: "#gallery", label: "Gallery" },
    { href: "#membership", label: "Membership" },
    { href: "#community", label: "What You Get" },
    { href: "/docs", label: "Documentation" },
  ],
  Community: [
    { href: "https://discord.gg/diomande", label: "Discord", external: true },
    { href: "#join", label: "Join Free" },
    { href: "#gallery", label: "Project Showcase" },
  ],
  Resources: [
    { href: "/docs/getting-started", label: "Getting Started" },
    { href: "/docs/architecture", label: "Architecture" },
    { href: "/docs/integrations/discord", label: "Discord Setup" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Diomande</span>
            </Link>
            <p className="text-sm text-[#6b6b80] leading-relaxed">
              Production AI infrastructure. Join the community and build
              anything you want.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#6b6b80] hover:text-[#a0a0b8] transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#6b6b80] hover:text-[#a0a0b8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6b6b80]">
            &copy; {new Date().getFullYear()} Diomande Automation. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[#6b6b80] hover:text-[#a0a0b8] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#6b6b80] hover:text-[#a0a0b8] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
