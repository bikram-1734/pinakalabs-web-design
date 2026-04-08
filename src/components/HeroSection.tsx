"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const gradientStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(ellipse at center, #4F46E5 0%, #3D62E1 25%, #2B7EDD 50%, #189AD8 75%, #06B6D4 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative z-10 flex flex-col items-center justify-start pointer-events-none"
      style={{ minHeight: "100vh", paddingTop: "180px", paddingLeft: "24px", paddingRight: "24px" }}
    >
      <div
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "46px",
          width: "100%", maxWidth: "681px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", width: "100%" }}>
          <h1
            style={{
              fontFamily: "Arial, sans-serif", fontWeight: 400,
              fontSize: "50px", lineHeight: "66px",
              letterSpacing: "-1px", margin: 0,
              color: dark ? "#F1F5F9" : "#0f172a",
              transition: "color 0.35s ease",
            }}
          >
            {"we're turning "}
            <span style={gradientStyle}>Nepal&apos;s</span>
            {" manual work into intelligent "}
            <span style={gradientStyle}>Automation.</span>

          </h1>

          <p
            style={{
              fontFamily: "Arial, sans-serif", fontWeight: 400,
              fontSize: "18px", lineHeight: "28px", letterSpacing: "-0.1px",
              maxWidth: "562px", margin: 0,
              color: dark ? "rgba(226,232,240,0.75)" : "#0f172a",
              transition: "color 0.35s ease",
            }}
          >
            Future-ready AI agents for Nepali enterprises automating insights,
            decisions, and protection in one powerful system.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", pointerEvents: "auto", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#"
            className="btn-glow active:scale-[0.97]"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "46px", padding: "9px 20px", background: "#4f46e5", borderRadius: "12px", fontFamily: "Arial, sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff", textDecoration: "none", whiteSpace: "nowrap", transition: "background 0.2s, transform 0.15s" }}
          >
            Schedule a demo
          </a>

          <a
            href="#"
            className="active:scale-[0.97]"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "46px", width: "238px", padding: "18px 37px",
              background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.7)"}`,
              borderRadius: "12px",
              fontFamily: "Arial, sans-serif", fontWeight: 400, fontSize: "16px",
              color: dark ? "#E2E8F0" : "#0f172a",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "background 0.2s, transform 0.15s, border-color 0.35s",
            }}
          >
            View our industry solution →
          </a>
        </div>
      </div>
    </section>
  );
}
