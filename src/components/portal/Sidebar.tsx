"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListTodo,
  Settings,
  CreditCard,
  Rocket,
  BarChart3,
  Zap,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/portal", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/portal/tasks", icon: ListTodo, label: "Tasks" },
  { href: "/portal/setup", icon: Rocket, label: "Setup" },
  { href: "/portal/billing", icon: CreditCard, label: "Billing" },
  { href: "/portal/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/portal/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 bg-[#0a0a0f] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-white">Portal</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/portal" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "text-[#00d4ff] bg-[#00d4ff]/10"
                  : "text-[#a0a0b8] hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6b6b80] hover:text-white hover:bg-white/5 w-full transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
