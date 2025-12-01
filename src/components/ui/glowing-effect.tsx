"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
  className?: string;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 3,
  className,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  if (disabled) return null;

  const glowStyle = isHovering && glow
    ? {
        background: `radial-gradient(${spread}px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--fortt-yellow) / 0.4), transparent ${proximity}%)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
        isHovering && "opacity-100",
        className
      )}
      style={{
        ...glowStyle,
        maskImage: `radial-gradient(${proximity}px circle at ${mousePosition.x}px ${mousePosition.y}px, black ${inactiveZone}%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(${proximity}px circle at ${mousePosition.x}px ${mousePosition.y}px, black ${inactiveZone}%, transparent 100%)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: `${borderWidth}px solid hsl(var(--fortt-yellow))`,
        }}
      />
    </div>
  );
}
