import { useLayoutEffect, useRef, type ReactNode } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  delay?: number; // milliseconds (kept for API compatibility)
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      // Set the pre-reveal state and let ScrollTrigger fire the entrance.
      gsap.set(el, { opacity: 0, y });
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          // toggleActions default: play once
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [delay, y]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
