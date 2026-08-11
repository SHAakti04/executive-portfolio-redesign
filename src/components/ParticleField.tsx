import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  className?: string;
  /** Base density: particles per 100,000 px^2 of canvas area. */
  density?: number;
  /** Max particles regardless of viewport. */
  maxParticles?: number;
  /** Link distance in CSS pixels. */
  linkDistance?: number;
  /** oklch or rgb accent color for dots/lines. */
  color?: string;
};

/**
 * Lightweight canvas network-of-dots layer. Pointer-events: none.
 * - DPR-aware, capped for perf.
 * - Pauses on tab hidden.
 * - Disabled entirely for prefers-reduced-motion or tiny viewports.
 * - Cleanly tears down listeners + rAF on unmount.
 */
export function ParticleField({
  className = "",
  density = 5,
  maxParticles = 80,
  linkDistance = 140,
  color = "201, 160, 99", // champagne gold accent
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      phase: number;
    }[] = [];
    let rafId = 0;
    let running = true;
    let lastT = performance.now();

    const isSmall = () => window.innerWidth < 640;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const target = Math.min(
        maxParticles,
        Math.max(12, Math.round((area / 100000) * density)),
      );
      const finalCount = isSmall() ? Math.round(target * 0.55) : target;

      if (particles.length !== finalCount) {
        particles = new Array(finalCount).fill(0).map(() => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.8 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
        }));
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = Math.min(48, now - lastT);
      lastT = now;

      ctx.clearRect(0, 0, width, height);

      const effLink = isSmall() ? linkDistance * 0.75 : linkDistance;
      const linkSq = effLink * effLink;

      // update + draw dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        p.phase += dt * 0.0012;
        const pulse = 0.55 + Math.sin(p.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${(0.35 * pulse).toFixed(3)})`;
        ctx.fill();
      }

      // draw links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkSq) {
            const alpha = (1 - d2 / linkSq) * 0.22;
            ctx.strokeStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (rafId) return;
      lastT = performance.now();
      rafId = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) start();
      else stop();
    };

    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    resize();
    start();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      stop();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, maxParticles, linkDistance, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
