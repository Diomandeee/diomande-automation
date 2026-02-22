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
      className={`glass-card p-6 ${hover ? "" : ""} ${glow ? "animate-pulse-glow" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
