import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

const TEL = "tel:+919561097388";

export function CallButton() {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 16, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.9 },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <a
      ref={ref}
      href={TEL}
      aria-label="Call Gurpreet"
      className="group fixed right-5 z-[60] sm:right-7"
      style={{
        // Stack directly above the WhatsApp FAB (WhatsApp is 56px tall, 20/28px from bottom).
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.75rem)",
        opacity: 0,
      }}
    >
      {/* pulse ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 0 rgba(79, 163, 255, 0.55)",
          animation: "call-pulse 2.6s cubic-bezier(0.66, 0, 0, 1) infinite",
        }}
      />
      {/* tooltip (hidden on touch) */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[color:var(--navy)]/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 max-[640px]:hidden">
        Call now
      </span>
      {/* button */}
      <span
        className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_30px_-6px_rgba(79,163,255,0.65)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, #6fb4ff 0%, #2F7BFF 55%, #1e50c8 100%)",
        }}
      >
        <Phone className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <style>{`
        @keyframes call-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(79, 163, 255, 0.55); }
          70%  { box-shadow: 0 0 0 18px rgba(79, 163, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(79, 163, 255, 0); }
        }
      `}</style>
    </a>
  );
}
