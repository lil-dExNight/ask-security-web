"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  margin?: string;
  blur?: boolean;
  scale?: number;
  as?: "div" | "article" | "figure";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.75,
  margin = "-70px",
  blur = true,
  scale,
  as = "div",
}: RevealProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      initial={{
        opacity: 0,
        y,
        ...(scale !== undefined ? { scale } : {}),
        ...(blur ? { filter: "blur(4px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(scale !== undefined ? { scale: 1 } : {}),
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, margin: margin as `${number}px` }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
