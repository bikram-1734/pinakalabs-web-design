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

        <div style={{ overflow: "hidden", maxHeight: mobileOpen ? "460px" : "0", opacity: mobileOpen ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.25s", marginTop: mobileOpen ? "10px" : "0" }}>
          <div style={{ ...pillStyle, borderRadius: "16px", padding: "10px", boxShadow: "0 8px 30px rgba(79,70,229,0.1)", display: "flex", flexDirection: "column", gap: "2px" }}>
            <MobileLink label="Home" href="#" active dark={dark} />
            <div>
              <button onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="w-full text-left hover:bg-[rgba(79,70,229,0.05)] rounded-lg transition-colors"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: dark ? "#CBD5E1" : "#0f172a", background: "none", border: "none", cursor: "pointer" }}>
                Industries
                <Image src="/images/chevron-down.svg" alt="" width={14} height={14}
                  style={{ opacity: 0.45, transform: mobileIndustriesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              <div style={{ maxHeight: mobileIndustriesOpen ? "150px" : "0", overflow: "hidden", transition: "max-height 0.2s ease" }}>
                {industries.map((item) => (
                  <a key={item.label} href={item.href}
                    className="hover:text-[#4f46e5] hover:bg-[rgba(79,70,229,0.04)]"
                    style={{ display: "block", padding: "8px 14px 8px 28px", fontFamily: "Arial,sans-serif", fontSize: "13px", color: dark ? "rgba(203,213,225,0.7)" : "rgba(15,23,42,0.6)", textDecoration: "none", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            {(["About", "Service", "Contact"] as const).map((l) => <MobileLink key={l} label={l} href="#" dark={dark} />)}
            <a href="#" className="hover:bg-[#4338ca]"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "44px", background: "#4f46e5", borderRadius: "10px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: "#fff", textDecoration: "none", marginTop: "6px", transition: "background 0.2s" }}>
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
      `}</style>
    </nav>
  );
}

function MobileLink({ label, href, active, dark }: { label: string; href: string; active?: boolean; dark?: boolean }) {
  return (
    <a href={href}
      className={active ? "" : "hover:bg-[rgba(79,70,229,0.05)] hover:text-[#4f46e5]"}
      style={{ display: "block", padding: "10px 14px", fontFamily: "'Inter',Arial,sans-serif", fontWeight: 500, fontSize: "14px", color: active ? "#4f46e5" : (dark ? "#CBD5E1" : "#0f172a"), background: active ? "rgba(79,70,229,0.06)" : "transparent", borderRadius: "8px", textDecoration: "none", transition: "background 0.15s, color 0.15s" }}>
      {label}
    </a>
  );
}
