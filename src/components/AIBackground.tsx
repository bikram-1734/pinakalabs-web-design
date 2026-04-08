"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  { r: 79,  g: 70,  b: 229 }, // brand indigo
  { r: 61,  g: 98,  b: 225 }, // blue-indigo
  { r: 43,  g: 126, b: 221 }, // mid blue
  { r: 6,   g: 182, b: 212 }, // cyan
  { r: 100, g: 80,  b: 200 }, // purple
];

function c(col: { r: number; g: number; b: number }, a: number) {
  return `rgba(${col.r},${col.g},${col.b},${a})`;
}
function pick<T>(a: T[]): T { return a[Math.floor(Math.random() * a.length)]; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  col: { r: number; g: number; b: number };
  phase: number;
  speed: number;
  hub: boolean;
}
interface Pulse {
  i: number; j: number;
  t: number; s: number;
  col: { r: number; g: number; b: number };
}

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;

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

    /* nodes */
    const COUNT = Math.min(45, Math.floor(window.innerWidth / 32));
    const nodes: Node[] = [];
    for (let i = 0; i < COUNT; i++) {
      const hub = Math.random() < 0.2;
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: hub ? Math.random() * 3 + 3.5 : Math.random() * 1.8 + 1,
        col: pick(PALETTE),
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.022 + 0.01,
        hub,
      });
    }

    /* pulses */
    const pulses: Pulse[] = [];
    const DIST = 210;

    let tick = 0;

    const spawnPulse = () => {
      if (pulses.length >= 12) return;
      const i = Math.floor(Math.random() * nodes.length);
      const j = Math.floor(Math.random() * nodes.length);
      if (i === j) return;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.hypot(dx, dy) > DIST) return;
      pulses.push({ i, j, t: 0, s: Math.random() * 0.007 + 0.004, col: pick(PALETTE) });
    };

    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, W, H);

      /* move nodes */
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -30) n.x = W + 30;
        if (n.x > W + 30) n.x = -30;
        if (n.y < -30) n.y = H + 30;
        if (n.y > H + 30) n.y = -30;
      }

      /* edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d > DIST) continue;
          const alpha = (1 - d / DIST) * 0.13;
          ctx.save();
          ctx.strokeStyle = c(nodes[i].col, alpha);
          ctx.lineWidth = 0.7;
          ctx.setLineDash([5, 8]);
          ctx.lineDashOffset = -(tick * 0.7);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* nodes */
      for (const n of nodes) {
        const pulse = Math.sin(tick * n.speed + n.phase) * 0.5 + 0.5;
        const opacity = lerp(n.hub ? 0.5 : 0.2, n.hub ? 0.85 : 0.45, pulse);
        const r = n.r * lerp(0.85, 1.25, pulse);

        // glow halo
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * (n.hub ? 10 : 7));
        gr.addColorStop(0, c(n.col, opacity * 0.35));
        gr.addColorStop(1, c(n.col, 0));
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.arc(n.x, n.y, r * (n.hub ? 10 : 7), 0, Math.PI * 2); ctx.fill();

        // core
        ctx.fillStyle = c(n.col, opacity);
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();

        // hub ring
        if (n.hub) {
          ctx.strokeStyle = c(n.col, opacity * 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2); ctx.stroke();
        }
      }

      /* pulses */
      if (tick % 55 === 0) spawnPulse();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.s;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }

        const a = nodes[p.i], b = nodes[p.j];
        const px = lerp(a.x, b.x, p.t);
        const py = lerp(a.y, b.y, p.t);
        const t0 = Math.max(0, p.t - 0.1);
        const tx = lerp(a.x, b.x, t0);
        const ty = lerp(a.y, b.y, t0);

        // trail
        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, c(p.col, 0));
        grad.addColorStop(1, c(p.col, 0.7));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke();

        // head
        const hg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        hg.addColorStop(0, c(p.col, 0.9));
        hg.addColorStop(1, c(p.col, 0));
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
