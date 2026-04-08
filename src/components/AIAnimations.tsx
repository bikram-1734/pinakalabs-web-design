"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

export default function AIAnimations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // Color palette matching brand
    const colors = [
      "79,70,229", // brand indigo
      "61,98,225", // mid blue
      "43,126,221", // blue
      "24,154,216", // teal-blue
      "6,182,212", // accent cyan
      "100,80,180", // purple
    ];

    // Create particles
    const particleCount = Math.min(35, Math.floor(w() / 40));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, w(), h());

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (const p of particles) {
        // Gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction - gentle repulsion/attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.01;
          p.vy += (dy / dist) * force * 0.01;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around edges
        if (p.x < -20) p.x = w() + 20;
        if (p.x > w() + 20) p.x = -20;
        if (p.y < -20) p.y = h() + 20;
        if (p.y > h() + 20) p.y = -20;

        // Pulse
        const pulse =
          Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
        const currentOpacity = p.opacity * (0.6 + pulse * 0.4);
        const currentRadius = p.radius * (0.8 + pulse * 0.4);

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius * 8
        );
        gradient.addColorStop(0, `rgba(${p.color},${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(${p.color},${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections
      const connectionDist = 180;
      connectionsRef.current = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.08;

            // Animated dash offset for "data flow" effect
            ctx.strokeStyle = `rgba(${particles[i].color},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([4, 6]);
            ctx.lineDashOffset = -time * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.setLineDash([]);

            connectionsRef.current.push({ from: i, to: j, opacity });
          }
        }
      }

      // Traveling data packets along connections
      for (const conn of connectionsRef.current) {
        if (conn.opacity > 0.04) {
          const p1 = particles[conn.from];
          const p2 = particles[conn.to];
          const progress =
            (Math.sin(time * 0.03 + conn.from + conn.to) * 0.5 + 0.5);
          const px = p1.x + (p2.x - p1.x) * progress;
          const py = p1.y + (p2.y - p1.y) * progress;

          ctx.fillStyle = `rgba(${p1.color},${conn.opacity * 3})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Floating orbital rings around center area
      const cx = w() / 2;
      const cy = h() * 0.38;

      // Orbit 1
      const orbitRadius1 = Math.min(w(), h()) * 0.28;
      ctx.strokeStyle = "rgba(79,70,229,0.03)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbitRadius1, orbitRadius1 * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting dot 1
      const angle1 = time * 0.008;
      const ox1 = cx + Math.cos(angle1) * orbitRadius1;
      const oy1 = cy + Math.sin(angle1) * orbitRadius1 * 0.3;
      const ogradient1 = ctx.createRadialGradient(ox1, oy1, 0, ox1, oy1, 12);
      ogradient1.addColorStop(0, "rgba(79,70,229,0.2)");
      ogradient1.addColorStop(1, "rgba(79,70,229,0)");
      ctx.fillStyle = ogradient1;
      ctx.beginPath();
      ctx.arc(ox1, oy1, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(79,70,229,0.35)";
      ctx.beginPath();
      ctx.arc(ox1, oy1, 2, 0, Math.PI * 2);
      ctx.fill();

      // Orbit 2
      const orbitRadius2 = Math.min(w(), h()) * 0.35;
      ctx.strokeStyle = "rgba(6,182,212,0.025)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        orbitRadius2,
        orbitRadius2 * 0.25,
        0.3,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Orbiting dot 2
      const angle2 = -time * 0.006 + Math.PI;
      const cos2 = Math.cos(0.3);
      const sin2 = Math.sin(0.3);
      const rx2 = Math.cos(angle2) * orbitRadius2;
      const ry2 = Math.sin(angle2) * orbitRadius2 * 0.25;
      const ox2 = cx + rx2 * cos2 - ry2 * sin2;
      const oy2 = cy + rx2 * sin2 + ry2 * cos2;
      const ogradient2 = ctx.createRadialGradient(ox2, oy2, 0, ox2, oy2, 10);
      ogradient2.addColorStop(0, "rgba(6,182,212,0.2)");
      ogradient2.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = ogradient2;
      ctx.beginPath();
      ctx.arc(ox2, oy2, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(6,182,212,0.35)";
      ctx.beginPath();
      ctx.arc(ox2, oy2, 1.8, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
