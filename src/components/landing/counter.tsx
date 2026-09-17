"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function Counter({ value, prefix = "", suffix = "" }: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numberRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const node = numberRef.current;
    if (!inView || !node) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
      onComplete: () => {
        node.textContent = value.toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span>
      {prefix}
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  );
}
