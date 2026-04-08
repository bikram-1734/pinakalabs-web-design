"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function MouseGlow() {
  const divRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -500, y: -500 });
  const curRef = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;
    const onMove  = (e: MouseEvent) => { posRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { posRef.current = { x: -500, y: -500 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    const animate = () => {
      curRef.current.x += (posRef.current.x - curRef.current.x) * 0.08;
      curRef.current.y += (posRef.current.y - curRef.current.y) * 0.08;
      el.style.transform = `translate(${curRef.current.x - 300}px, ${curRef.current.y - 300}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      <div
        ref={divRef}
        style={{
          position: "absolute", top: 0, left: 0, width: "600px", height: "600px",
          borderRadius: "50%",
          background: dark
            ? `radial-gradient(circle at center, rgba(79,70,229,0.22) 0%, rgba(61,98,225,0.14) 20%, rgba(6,182,212,0.08) 50%, transparent 72%)`
            : `radial-gradient(circle at center, rgba(79,70,229,0.16) 0%, rgba(61,98,225,0.10) 20%, rgba(43,126,221,0.06) 45%, rgba(6,182,212,0.04) 60%, transparent 75%)`,
          filter: "blur(1px)",
          willChange: "transform",
          transition: "background 0.5s ease",
        }}
      />
    </div>
  );
}
