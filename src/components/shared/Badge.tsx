import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "cyan" | "purple" | "green";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-[#a0a0b8] border-white/10",
  cyan: "bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20",
  purple: "bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20",
  green: "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badgeVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
