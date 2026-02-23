"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/shared/Button";

const navLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "#membership", label: "Membership" },
  { href: "/docs", label: "Docs" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-8 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-lg">
            Diomande<span className="text-[#00d4ff]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#b0b0c8] hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/portal">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="#join">
            <Button size="sm">Join Free</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#b0b0c8] hover:text-white py-2 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <Link href="/portal" className="block">
                  <Button variant="secondary" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="#join" className="block">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Join Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
