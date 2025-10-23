"use client";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

export function FadeIn({
  children,
  vars = {},
  className,
  start = "top 50%",
  targetChildren = false,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetChildren
      ? containerRef.current?.children
      : containerRef.current;

    if (!target) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(target, { y: 60, opacity: 0 });

      gsap.to(target, {
        y: 0,
        duration: 0.8,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.2,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
        },
      });
    });
  });
  return (
    <div ref={containerRef} className={clsx(className)}>
      {children}
    </div>
  );
}
