"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

const RADIUS = 88;   // lens radius in px
const SCALE  = 2.2;  // magnification factor
const EASE   = 0.13; // lerp factor — smooth lag

const GRAD: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse at center,#4F46E5 0%,#3D62E1 25%,#2B7EDD 50%,#189AD8 75%,#06B6D4 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function TextLens() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const lensRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -1000, y: -1000 });
  const cur = useRef({ x: -1000, y: -1000 });
  const raf = useRef(0);
  const [visible, setVisible] = useState(false);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      // smooth lerp toward real cursor
      cur.current.x += (pos.current.x - cur.current.x) * EASE;
      cur.current.y += (pos.current.y - cur.current.y) * EASE;

      const { x, y } = cur.current;
      const px = pos.current.x;
      const py = pos.current.y;

      // --- lens (lags behind) ---
      if (lensRef.current)
        lensRef.current.style.transform = `translate(${x - RADIUS}px,${y - RADIUS}px)`;

      // --- magnified inner content ---
      // formula: to show page point (x,y) at lens center,
      // inner content offset = (RADIUS - x*SCALE, RADIUS - y*SCALE)
      if (innerRef.current) {
        const tx = RADIUS - x * SCALE;
        const ty = RADIUS - y * SCALE;
        innerRef.current.style.transform = `translate(${tx}px,${ty}px)`;
      }

      // --- precise dot exactly at real cursor (no lag) ---
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${px - 4}px,${py - 4}px)`;

      // --- outer ring with slight lag ---
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${x - 22}px,${y - 22}px)`;

      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // hero h1 params (must match HeroSection exactly)
  const headingMaxW = Math.min(681, vw - 48);
  const headingLeft = (vw - headingMaxW) / 2;
  const headingTop  = 180; // paddingTop of HeroSection
  const fontSize    = Math.min(50, Math.max(32, vw * 0.035));

  const bg = dark ? "#0D0B1A" : "#F0EDFB";
  const textColor = dark ? "#F1F5F9" : "#0f172a";

  return (
    <>
      {/* Hide system cursor everywhere */}
      <style>{`* { cursor: none !important; }`}</style>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 999, opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        {/* ── Magnification lens ── */}
        <div
          ref={lensRef}
          style={{
            position: "absolute",
            width:  RADIUS * 2,
            height: RADIUS * 2,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(79,70,229,0.4)",
            boxShadow: [
              "0 0 0 0.5px rgba(79,70,229,0.1)",
              "0 8px 40px rgba(79,70,229,0.18)",
              "inset 0 0 24px rgba(79,70,229,0.04)",
            ].join(","),
            willChange: "transform",
          }}
        >
          {/* ── Reproduced page content at SCALE ── */}
          <div
            ref={innerRef}
            style={{
              position:  "absolute",
              top:       0,
              left:      0,
              width:     `${vw * SCALE}px`,
              minHeight: `${900 * SCALE}px`,
              background: bg,
              willChange: "transform",
            }}
          >
            {/* Radial gradient blobs (simplified match of GridBackground) */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: dark
                ? `radial-gradient(ellipse ${1008*SCALE/2}px ${379*SCALE/2}px at ${216*SCALE}px ${276*SCALE}px, rgba(79,70,229,0.3) 0%, transparent 60%),
                   radial-gradient(ellipse ${864*SCALE/2}px ${344*SCALE/2}px at ${1224*SCALE}px ${207*SCALE}px, rgba(6,182,212,0.18) 0%, transparent 55%),
                   linear-gradient(135deg,#0D0B1A,#120F24)`
                : `radial-gradient(ellipse ${1008*SCALE/2}px ${379*SCALE/2}px at ${216*SCALE}px ${276*SCALE}px, rgba(200,185,255,0.55) 0%, transparent 60%),
                   radial-gradient(ellipse ${864*SCALE/2}px ${344*SCALE/2}px at ${1224*SCALE}px ${207*SCALE}px, rgba(223,250,255,0.5) 0%, transparent 55%),
                   linear-gradient(90deg,#EDE8FA,#EDE8FA)`,
            }} />

            {/* Hero heading at SCALE */}
            <div style={{
              position:   "absolute",
              left:       headingLeft * SCALE,
              top:        headingTop  * SCALE,
              width:      headingMaxW * SCALE,
              textAlign:  "center",
            }}>
              <h1 style={{
                fontFamily:     "Arial, sans-serif",
                fontWeight:     400,
                fontSize:       fontSize * SCALE,
                lineHeight:     1.32,
                letterSpacing:  -1.8 * SCALE,
                textTransform:  "lowercase",
                color:          textColor,
                margin:         0,
                whiteSpace:     "normal",
              }}>
                {"we're turning "}
                <span style={GRAD}>Nepal&apos;s</span>
                {" manual work into intelligent "}
                <span style={GRAD}>Automation.</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontFamily:    "Arial, sans-serif",
                fontWeight:    400,
                fontSize:      20 * SCALE,
                lineHeight:    1.4,
                letterSpacing: -0.1 * SCALE,
                color:         dark ? "rgba(226,232,240,0.7)" : "rgba(15,23,42,0.75)",
                maxWidth:      562 * SCALE,
                margin:        `${24 * SCALE}px auto 0`,
              }}>
                Future-ready AI agents for Nepali enterprises automating
                insights, decisions, and protection in one powerful system.
              </p>
            </div>
          </div>

          {/* ── Lens optical effects ── */}
          {/* Edge vignette */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle, transparent 55%, rgba(79,70,229,0.08) 80%, rgba(79,70,229,0.18) 100%)",
            pointerEvents: "none",
          }} />
          {/* Top-left shine */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(ellipse 60% 40% at 32% 28%, rgba(255,255,255,0.28) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          {/* Bottom-right subtle shadow */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(ellipse 50% 35% at 68% 72%, rgba(79,70,229,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* ── Outer trailing ring ── */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            width:  44,
            height: 44,
            borderRadius: "50%",
            border: "1.5px solid rgba(79,70,229,0.35)",
            willChange: "transform",
          }}
        />

        {/* ── Inner precise dot ── */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width:  8,
            height: 8,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4F46E5,#06B6D4)",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}
