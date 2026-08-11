import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Legacy shim: kept for API compatibility with any lingering imports.
 * New animation code should use GSAP + ScrollTrigger directly.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/**
 * Old count-up hook kept for compatibility; prefer useCountUpOnScroll.
 */
export function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

/**
 * GSAP + ScrollTrigger driven count-up. Fires exactly when `ref` enters the
 * viewport; disabled under prefers-reduced-motion (jumps to final value).
 */
export function useCountUpOnScroll<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T | null>,
  target: number,
  duration = 1.6,
) {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const { gsap, ScrollTrigger } = ensureGsap();
    const proxy = { v: 0 };
    const ctx = gsap.context(() => {
      const tween = gsap.to(proxy, {
        v: target,
        duration,
        ease: "power2.out",
        onUpdate: () => setValue(Math.round(proxy.v)),
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
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
  }, [ref, target, duration]);

  return value;
}
