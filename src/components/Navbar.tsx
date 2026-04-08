"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const industries = [
  { label: "Tours and Travel", href: "#tours-and-travel" },
  { label: "Construction",     href: "#construction"     },
];

export default function Navbar() {
  const [mobileOpen,          setMobileOpen]          = useState(false);
  const [industriesOpen,      setIndustriesOpen]      = useState(false);
  const [mobileIndustriesOpen,setMobileIndustriesOpen]= useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pillStyle: React.CSSProperties = {
    background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.55)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.7)"}`,
    transition: "background 0.35s, border-color 0.35s",
  };

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 px-4 py-[19px] lg:px-20"
    >
      {/* ── DESKTOP — 3-col grid so pill is always perfectly centred ── */}
      <div
        className="hidden lg:grid w-full max-w-[1440px] mx-auto"
        style={{ gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: "52px" }}
      >
        {/* col 1 — Logo */}
        <div className="flex items-center">
          <a href="#" className="group flex items-baseline select-none" style={{ textDecoration: "none" }}>
            <span
              className="transition-opacity duration-200 group-hover:opacity-75"
              style={{ fontFamily: "'Gilroy','Inter',Arial,sans-serif", fontWeight: 600, fontSize: "31.261px", lineHeight: "40.639px", color: "#4f46e5", letterSpacing: "-0.5px" }}
            >
              Pinaka
            </span>
            <span
              className="transition-opacity duration-200 group-hover:opacity-75"
              style={{ fontFamily: "'Gilroy','Inter',Arial,sans-serif", fontWeight: 600, fontSize: "31.261px", lineHeight: "40.639px", color: "#06b6d4", letterSpacing: "-0.5px" }}
            >
              Labs
            </span>
          </a>
        </div>

        {/* col 2 — Pill (auto width, centred) */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{ ...pillStyle, height: "50px", padding: "0 37px", gap: "32px" }}
        >
          {/* Home — active */}
          <a href="#" className="nav-link nav-link--active" style={{ color: "#4f46e5" }}>
            Home
          </a>

          {/* Industries */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIndustriesOpen(!industriesOpen)}
              className="nav-link flex items-center"
              style={{ gap: "4px", background: "none", border: "none", padding: 0, cursor: "pointer", color: dark ? "#CBD5E1" : "#0f172a", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px" }}
            >
              Industries
              <Image
                src="/images/chevron-down.svg"
                alt=""
                width={16}
                height={16}
                style={{ opacity: 0.5, transform: industriesOpen ? "rotate(180deg)" : "none", transition: "transform 0.22s ease" }}
              />
            </button>

            {industriesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 overflow-hidden rounded-xl"
                style={{ width: "210px", background: dark ? "rgba(18,15,36,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.85)"}`, boxShadow: "0 8px 28px rgba(79,70,229,0.1)" }}
              >
                {industries.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIndustriesOpen(false)}
                    className="dropdown-item block"
                    style={{ padding: "11px 18px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: dark ? "#CBD5E1" : "#0f172a", textDecoration: "none" }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {(["About", "Service", "Contact"] as const).map((label) => (
            <a
              key={label}
              href="#"
              className="nav-link"
              style={{ color: dark ? "#CBD5E1" : "#0f172a" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* col 3 — Toggle + CTA */}
        <div className="flex items-center justify-end" style={{ gap: "12px" }}>
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hover:scale-105 active:scale-95 transition-transform"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(79,70,229,0.18)"}`, background: dark ? "rgba(255,255,255,0.07)" : "rgba(79,70,229,0.05)", cursor: "pointer", flexShrink: 0, transition: "all 0.25s" }}
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="#"
            className="cta-btn"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "46px", padding: "0 22px", background: "#4f46e5", borderRadius: "12px", boxShadow: "0 2px 12px rgba(100,80,180,0.12)", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Book a Demo
          </a>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "48px" }}>
          <a href="#" style={{ display: "flex", alignItems: "baseline", textDecoration: "none" }}>
            <span style={{ fontFamily: "'Gilroy','Inter',Arial,sans-serif", fontWeight: 600, fontSize: "26px", color: "#4f46e5" }}>Pinaka</span>
            <span style={{ fontFamily: "'Gilroy','Inter',Arial,sans-serif", fontWeight: 600, fontSize: "26px", color: "#06b6d4" }}>Labs</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={toggle} aria-label="Toggle dark mode"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(79,70,229,0.18)"}`, background: dark ? "rgba(255,255,255,0.07)" : "rgba(79,70,229,0.05)", cursor: "pointer" }}>
              {dark
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: "22px", height: "2px", background: dark ? "#CBD5E1" : "#0f172a", borderRadius: "2px", transition: "all 0.2s",
                  transform: i === 0 && mobileOpen ? "rotate(45deg) translate(4px,4px)" : i === 2 && mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "none",
                  opacity: i === 1 && mobileOpen ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>

        <div style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "520px" : "0",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          marginTop: mobileOpen ? "10px" : "0",
        }}>
          {/* ── Liquid glass card ── */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "22px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            background: dark
              ? "linear-gradient(145deg, rgba(18,12,42,0.82) 0%, rgba(30,18,58,0.75) 55%, rgba(12,22,50,0.78) 100%)"
              : "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(243,239,255,0.72) 45%, rgba(232,243,255,0.68) 100%)",
            backdropFilter: "blur(28px) saturate(200%)",
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.92)"}`,
            boxShadow: dark
              ? "0 12px 40px rgba(0,0,0,0.40), 0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 0.5px rgba(79,70,229,0.18)"
              : "0 12px 40px rgba(79,70,229,0.10), 0 3px 14px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 0.5px rgba(79,70,229,0.07)",
          }}>

            {/* Lavender blob — top right */}
            <div style={{
              position: "absolute", top: "-40px", right: "-24px",
              width: "140px", height: "140px", borderRadius: "50%",
              background: dark ? "rgba(99,70,229,0.18)" : "rgba(200,185,255,0.42)",
              filter: "blur(28px)", pointerEvents: "none",
            }} />
            {/* Cyan blob — bottom left */}
            <div style={{
              position: "absolute", bottom: "-28px", left: "-16px",
              width: "110px", height: "110px", borderRadius: "50%",
              background: dark ? "rgba(6,182,212,0.14)" : "rgba(186,232,255,0.45)",
              filter: "blur(22px)", pointerEvents: "none",
            }} />

            <MobileLink label="Home" href="#" active dark={dark} />

            <div>
              <button onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="mobile-nav-btn w-full text-left rounded-xl transition-all"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: dark ? "#CBD5E1" : "#0f172a", background: "none", border: "none", cursor: "pointer", width: "100%", borderRadius: "10px" }}>
                Industries
                <Image src="/images/chevron-down.svg" alt="" width={14} height={14}
                  style={{ opacity: 0.45, transform: mobileIndustriesOpen ? "rotate(180deg)" : "none", transition: "transform 0.22s" }} />
              </button>
              <div style={{ maxHeight: mobileIndustriesOpen ? "150px" : "0", overflow: "hidden", transition: "max-height 0.22s ease" }}>
                {industries.map((item) => (
                  <a key={item.label} href={item.href}
                    className="mobile-sub-link"
                    style={{ display: "block", padding: "8px 14px 8px 28px", fontFamily: "'Inter',Arial,sans-serif", fontSize: "13px", color: dark ? "rgba(203,213,225,0.7)" : "rgba(15,23,42,0.6)", textDecoration: "none", borderRadius: "8px", transition: "color 0.15s, background 0.15s" }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {(["About", "Service", "Contact"] as const).map((l) => <MobileLink key={l} label={l} href="#" dark={dark} />)}

            {/* CTA — gradient glass button */}
            <a href="#"
              className="mobile-cta"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "44px", background: "linear-gradient(135deg, #4f46e5 0%, #6d58f0 50%, #3b82f6 100%)", backgroundSize: "200% 200%", borderRadius: "12px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: "#fff", textDecoration: "none", marginTop: "4px", boxShadow: "0 2px 14px rgba(79,70,229,0.28), inset 0 1px 0 rgba(255,255,255,0.18)", transition: "opacity 0.2s, transform 0.15s" }}>
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* ── Shared styles ── */}
      <style>{`
        .nav-link {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: #4f46e5; }
        .nav-link--active { color: #4f46e5 !important; }
        .dropdown-item { transition: background 0.15s, color 0.15s; }
        .dropdown-item:hover { background: rgba(79,70,229,0.05); color: #4f46e5; }
        .cta-btn { transition: background 0.2s, box-shadow 0.2s, transform 0.15s; }
        .cta-btn:hover { background: #4338ca !important; box-shadow: 0 4px 20px rgba(79,70,229,0.28) !important; transform: translateY(-1px); }
        .cta-btn:active { transform: scale(0.97); }
        /* ── iOS liquid glass hover ── */
        .mobile-nav-link, .mobile-nav-btn, .mobile-sub-link {
          position: relative;
          transition: background 0.22s ease, color 0.18s ease,
                      border-color 0.22s ease, box-shadow 0.22s ease,
                      transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
                      backdrop-filter 0.22s ease !important;
        }

        /* Light mode hover */
        .mobile-nav-link:hover {
          background: rgba(255,255,255,0.72) !important;
          border-color: rgba(255,255,255,0.92) !important;
          color: #4f46e5 !important;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.04),
            0 2px 10px rgba(79,70,229,0.08),
            0 1px 3px rgba(0,0,0,0.05) !important;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          transform: scale(1.012);
        }
        .mobile-nav-btn:hover {
          background: rgba(255,255,255,0.72) !important;
          border-radius: 10px;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.04),
            0 2px 10px rgba(79,70,229,0.08) !important;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          transform: scale(1.012);
        }
        .mobile-sub-link:hover {
          background: rgba(255,255,255,0.65) !important;
          color: #4f46e5 !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            0 1px 6px rgba(79,70,229,0.06) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: scale(1.01);
        }

        /* Dark mode overrides */
        .dark .mobile-nav-link:hover {
          background: rgba(255,255,255,0.10) !important;
          border-color: rgba(255,255,255,0.18) !important;
          color: #a5b4fc !important;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            0 2px 12px rgba(0,0,0,0.22) !important;
        }
        .dark .mobile-nav-btn:hover {
          background: rgba(255,255,255,0.10) !important;
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            0 2px 10px rgba(0,0,0,0.20) !important;
        }
        .dark .mobile-sub-link:hover {
          background: rgba(255,255,255,0.08) !important;
          color: #a5b4fc !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10) !important;
        }

        .mobile-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .mobile-cta:active { transform: scale(0.97); }
      `}</style>
    </nav>
  );
}

function MobileLink({ label, href, active, dark }: { label: string; href: string; active?: boolean; dark?: boolean }) {
  return (
    <a href={href}
      className={active ? "" : "mobile-nav-link"}
      style={{
        display: "block", padding: "10px 14px",
        fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px",
        color: active ? "#4f46e5" : (dark ? "#CBD5E1" : "#0f172a"),
        background: active
          ? (dark ? "rgba(79,70,229,0.14)" : "rgba(79,70,229,0.07)")
          : "transparent",
        borderRadius: "10px",
        border: active ? `1px solid ${dark ? "rgba(79,70,229,0.25)" : "rgba(79,70,229,0.14)"}` : "1px solid transparent",
        textDecoration: "none",
        transition: "background 0.22s ease, color 0.18s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
      {label}
    </a>
  );
}
