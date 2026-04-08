"use client";

import { useTheme } from "./ThemeProvider";

function Block({ l, t, w, h, o }: { l: number; t: number; w: number; h: number; o: number }) {
  return (
    <div style={{ position: "absolute", left: l, top: t, width: w, height: h, backgroundColor: `rgba(255,255,255,${o})` }} />
  );
}

export default function GridBackground() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  /* ── Radial gradient layers (light and dark variants) ── */
  const gradBg = dark
    ? [
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g1)'/%3E%3Cdefs%3E%3CradialGradient id='g1' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(100.8 0 0 37.888 216 275.55)'%3E%3Cstop stop-color='rgba(79%2C70%2C229%2C0.35)' offset='0'/%3E%3Cstop stop-color='rgba(79%2C70%2C229%2C0)' offset='0.6'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g2)'/%3E%3Cdefs%3E%3CradialGradient id='g2' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(86.4 0 0 34.444 1224 206.66)'%3E%3Cstop stop-color='rgba(6%2C182%2C212%2C0.22)' offset='0'/%3E%3Cstop stop-color='rgba(6%2C182%2C212%2C0)' offset='0.55'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g3)'/%3E%3Cdefs%3E%3CradialGradient id='g3' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(72 0 0 41.333 720 551.1)'%3E%3Cstop stop-color='rgba(100%2C80%2C200%2C0.2)' offset='0'/%3E%3Cstop stop-color='rgba(100%2C80%2C200%2C0)' offset='0.55'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `linear-gradient(135deg, #0D0B1A 0%, #120F24 100%)`,
      ].join(", ")
    : [
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g1)'/%3E%3Cdefs%3E%3CradialGradient id='g1' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(100.8 0 0 37.888 216 275.55)'%3E%3Cstop stop-color='rgba(200%2C185%2C255%2C0.55)' offset='0'/%3E%3Cstop stop-color='rgba(200%2C185%2C255%2C0)' offset='0.6'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g2)'/%3E%3Cdefs%3E%3CradialGradient id='g2' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(86.4 0 0 34.444 1224 206.66)'%3E%3Cstop stop-color='rgba(223%2C250%2C255%2C0.5)' offset='0'/%3E%3Cstop stop-color='rgba(214%2C249%2C255%2C0)' offset='0.55'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g3)'/%3E%3Cdefs%3E%3CradialGradient id='g3' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(72 0 0 41.333 720 551.1)'%3E%3Cstop stop-color='rgba(210%2C200%2C255%2C0.4)' offset='0'/%3E%3Cstop stop-color='rgba(210%2C200%2C255%2C0)' offset='0.55'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 688.88' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect width='100%25' height='100%25' fill='url(%23g4)'/%3E%3Cdefs%3E%3CradialGradient id='g4' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(115.2 0 0 55.11 720 344.44)'%3E%3Cstop stop-color='rgba(230%2C225%2C255%2C0.3)' offset='0'/%3E%3Cstop stop-color='rgba(230%2C225%2C255%2C0)' offset='0.7'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E")`,
        `linear-gradient(90deg, #EDE8FA 0%, #EDE8FA 100%)`,
      ].join(", ");

  const maskStyle: React.CSSProperties = {
    maskImage: "url('/images/grid-mask.svg')",
    WebkitMaskImage: "url('/images/grid-mask.svg')",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskComposite: "intersect",
    WebkitMaskComposite: "destination-in",
  };

  /* block opacity is lower in dark to avoid blown-out look */
  const bo = dark ? 0.55 : 1;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-500"
      style={{ backgroundColor: dark ? "#0D0B1A" : "#F0EDFB" }}
    >
      {/* Container — 1440×689, top 84, centred, clips children */}
      <div
        className="absolute overflow-hidden"
        style={{ width: "1440px", height: "689px", top: "84px", left: "50%", transform: "translateX(-50%)" }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 transition-all duration-500" style={{ backgroundImage: gradBg }} />

        {/* ── Grid lines (7% opacity) ── */}
        <div
          className="absolute"
          style={{ width: "2120.938px", height: "1831.719px", left: "-352px", top: "-353px", opacity: dark ? 0.11 : 0.07, ...maskStyle, maskSize: "1518.399px 1193.027px", WebkitMaskSize: "1518.399px 1193.027px", maskPosition: "88.872px 295.244px", WebkitMaskPosition: "88.872px 295.244px" }}
        >
          <div className="absolute flex items-center justify-center" style={{ inset: 0 }}>
            <div style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
              <div style={{ width: "1831.719px", height: "2120.938px", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/images/hori-lines.svg" style={{ position: "absolute", display: "block", maxWidth: "none", width: "102.06%", height: "100%", left: 0, top: 0 }} />
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/images/verti-lines.svg" style={{ position: "absolute", display: "block", maxWidth: "none", width: "1831.719px", height: "1394.878px", left: "55.73px", top: "218.42px" }} />
        </div>

        {/* ── Grid blocks (40% opacity) ── */}
        <div
          className="absolute"
          style={{ width: "1541.952px", height: "1169.474px", left: "-295.44px", top: "-113.08px", opacity: dark ? 0.20 : 0.70, ...maskStyle, maskSize: "1518.399px 1193.027px", WebkitMaskSize: "1518.399px 1193.027px", maskPosition: "32.314px 55.325px", WebkitMaskPosition: "32.314px 55.325px" }}
        >
          <Block l={964.06}  t={976.39}  w={95.858} h={95.858} o={0.5 * bo} />
          <Block l={482.03}  t={976.39}  w={95.858} h={95.858} o={0.8 * bo} />
          <Block l={1350.24} t={302.64}  w={95.858} h={94.489} o={0.5 * bo} />
          <Block l={577.89}  t={591.52}  w={95.858} h={94.489} o={0.4 * bo} />
          <Block l={1253.01} t={398.5}   w={95.858} h={94.489} o={0.5 * bo} />
          <Block l={481.86}  t={302.64}  w={95.858} h={94.489} o={0.4 * bo} />
          <Block l={1253.01} t={302.64}  w={95.858} h={94.489} o={0.5 * bo} />
          <Block l={481.86}  t={591.52}  w={95.858} h={94.489} o={0.4 * bo} />
          <Block l={386.17}  t={976.39}  w={95.858} h={95.858} o={0.8 * bo} />
          <Block l={386.17}  t={1072.25} w={95.858} h={97.228} o={0.8 * bo} />
          <Block l={193.09}  t={880.53}  w={95.858} h={95.858} o={0.8 * bo} />
          <Block l={1157.15} t={109.55}  w={95.858} h={95.858} o={0.4 * bo} />
          <Block l={1060.24} t={13.14}   w={95.858} h={94.998} o={0.4 * bo} />
          <Block l={1060.24} t={108.77}  w={95.858} h={95.622} o={0.4 * bo} />
          <Block l={193.08}  t={204.05}  w={97.228} h={98.597} o={0.8 * bo} />
          <Block l={95.86}   t={108.19}  w={97.228} h={95.858} o={0.8 * bo} />
          <Block l={0}       t={109.56}  w={97.228} h={95.858} o={0.8 * bo} />
          <Block l={95.86}   t={204.05}  w={97.228} h={98.597} o={0.8 * bo} />
          <Block l={482.03}  t={12.33}   w={97.228} h={95.858} o={0.5 * bo} />
          <Block l={193.08}  t={397.13}  w={95.858} h={97.228} o={0.8 * bo} />
          <Block l={1350.23} t={880.53}  w={95.858} h={95.858} o={0.4 * bo} />
          <Block l={1446.09} t={975.05}  w={95.858} h={95.858} o={0.4 * bo} />
        </div>
      </div>
    </div>
  );
}
