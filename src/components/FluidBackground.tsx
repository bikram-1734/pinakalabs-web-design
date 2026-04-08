"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0, t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Fluid blobs — each has a center, amplitude, frequency, and color
    // Phase offsets (p1/p2/p3) create non-repeating Lissajous-style paths
    const blobs = dark ? [
      { cx: 0.18, cy: 0.38, ax: 0.18, ay: 0.14, fx: 0.38, fy: 0.52, r: 0.42, color: [79,  70, 229], a: 0.20, p1: 1.2, p2: 0.8, p3: 2.1 },
      { cx: 0.82, cy: 0.28, ax: 0.14, ay: 0.18, fx: 0.29, fy: 0.41, r: 0.36, color: [6,  182, 212], a: 0.16, p1: 0.5, p2: 1.6, p3: 3.3 },
      { cx: 0.50, cy: 0.70, ax: 0.22, ay: 0.13, fx: 0.47, fy: 0.33, r: 0.34, color: [100, 80, 200], a: 0.14, p1: 2.4, p2: 0.3, p3: 1.7 },
      { cx: 0.72, cy: 0.55, ax: 0.17, ay: 0.21, fx: 0.61, fy: 0.44, r: 0.30, color: [43, 126, 221], a: 0.12, p1: 0.9, p2: 2.2, p3: 0.6 },
      { cx: 0.28, cy: 0.62, ax: 0.13, ay: 0.17, fx: 0.53, fy: 0.37, r: 0.26, color: [124, 58, 237], a: 0.12, p1: 1.8, p2: 3.1, p3: 2.5 },
      { cx: 0.60, cy: 0.20, ax: 0.20, ay: 0.10, fx: 0.43, fy: 0.58, r: 0.28, color: [56, 189, 248], a: 0.10, p1: 3.0, p2: 0.7, p3: 1.4 },
      { cx: 0.10, cy: 0.75, ax: 0.10, ay: 0.15, fx: 0.35, fy: 0.48, r: 0.22, color: [99,  90, 255], a: 0.09, p1: 0.2, p2: 1.9, p3: 4.1 },
    ] : [
      { cx: 0.18, cy: 0.38, ax: 0.18, ay: 0.14, fx: 0.38, fy: 0.52, r: 0.44, color: [190,172,255], a: 0.46, p1: 1.2, p2: 0.8, p3: 2.1 },
      { cx: 0.82, cy: 0.28, ax: 0.14, ay: 0.18, fx: 0.29, fy: 0.41, r: 0.36, color: [156,220,255], a: 0.36, p1: 0.5, p2: 1.6, p3: 3.3 },
      { cx: 0.50, cy: 0.70, ax: 0.22, ay: 0.13, fx: 0.47, fy: 0.33, r: 0.34, color: [208,195,255], a: 0.32, p1: 2.4, p2: 0.3, p3: 1.7 },
      { cx: 0.72, cy: 0.55, ax: 0.17, ay: 0.21, fx: 0.61, fy: 0.44, r: 0.30, color: [160,215,255], a: 0.26, p1: 0.9, p2: 2.2, p3: 0.6 },
      { cx: 0.28, cy: 0.62, ax: 0.13, ay: 0.17, fx: 0.53, fy: 0.37, r: 0.26, color: [220,200,255], a: 0.24, p1: 1.8, p2: 3.1, p3: 2.5 },
      { cx: 0.62, cy: 0.18, ax: 0.20, ay: 0.11, fx: 0.43, fy: 0.58, r: 0.28, color: [180,240,255], a: 0.20, p1: 3.0, p2: 0.7, p3: 1.4 },
      { cx: 0.10, cy: 0.78, ax: 0.11, ay: 0.15, fx: 0.35, fy: 0.48, r: 0.22, color: [215,205,255], a: 0.18, p1: 0.2, p2: 1.9, p3: 4.1 },
    ];

    const draw = () => {
      t += 0.0028; // very slow — water-fluid feel
      ctx.clearRect(0, 0, W, H);

      // Slow-sweeping background color wash
      const wx1 = (0.5 + Math.cos(t * 0.18) * 0.45) * W;
      const wy1 = (0.2 + Math.sin(t * 0.14) * 0.25) * H;
      const wx2 = (0.5 + Math.sin(t * 0.16 + 1.5) * 0.45) * W;
      const wy2 = (0.85 + Math.cos(t * 0.12 + 1.0) * 0.20) * H;
      const wash = ctx.createLinearGradient(wx1, wy1, wx2, wy2);
      if (dark) {
        const h1 = 240 + Math.sin(t * 0.4) * 20;
        const h2 = 195 + Math.cos(t * 0.35) * 20;
        wash.addColorStop(0, `hsla(${h1}, 65%, 20%, 0.08)`);
        wash.addColorStop(1, `hsla(${h2}, 70%, 22%, 0.06)`);
      } else {
        const h1 = 248 + Math.sin(t * 0.4) * 18;
        const h2 = 200 + Math.cos(t * 0.35) * 18;
        wash.addColorStop(0, `hsla(${h1}, 80%, 88%, 0.35)`);
        wash.addColorStop(0.5, `hsla(${(h1 + h2) / 2}, 75%, 92%, 0.18)`);
        wash.addColorStop(1, `hsla(${h2}, 72%, 90%, 0.28)`);
      }
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, W, H);

      for (const b of blobs) {
        // Three-term Lissajous — creates smooth, non-repeating organic paths
        const x = (
          b.cx
          + Math.sin(t * b.fx + b.p1) * b.ax
          + Math.cos(t * b.fy * 0.71 + b.p2) * b.ax * 0.42
          + Math.sin(t * b.fx * 1.31 + b.p3) * b.ax * 0.18
        ) * W;
        const y = (
          b.cy
          + Math.cos(t * b.fy + b.p2) * b.ay
          + Math.sin(t * b.fx * 0.63 + b.p1) * b.ay * 0.42
          + Math.cos(t * b.fy * 1.19 + b.p3) * b.ay * 0.18
        ) * H;
        const pulse = 0.86 + Math.sin(t * 0.75 + b.cx * 5.8) * 0.14;
        const r = b.r * Math.min(W, H) * pulse;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.a})`);
        g.addColorStop(0.38, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.a * 0.45})`);
        g.addColorStop(0.70, `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${b.a * 0.12})`);
        g.addColorStop(1,    `rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
