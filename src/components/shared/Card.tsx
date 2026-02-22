import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  hover = true,
  glow = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`glass-card p-6 ${hover ? "hover:border-[#00d4ff]/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]" : ""} ${glow ? "animate-pulse-glow" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
