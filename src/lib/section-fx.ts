import { useLayoutEffect } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Advanced, site-wide scroll choreography.
 * - Headings: masked line reveal with skew + stagger
 * - Images: clip-path curtain reveal + scrubbed parallax and scale
 * - Cards/grids: 3D stagger rise driven by ScrollTrigger batching
 * - Section eyebrows / gold rules: scaleX draw-in
 * - Dark sections: subtle scrubbed background drift
 */
export function useAdvancedSectionFX() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger, SplitText } = ensureGsap();
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const splits: Array<{ revert: () => void }> = [];

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* ---- Headings: line-mask reveal ---- */
        document.querySelectorAll<HTMLElement>("section h2, section h3.fx-head").forEach((el) => {
          let lines: Element[] = [];
          try {
            const s = new SplitText(el, { type: "lines", linesClass: "fx-line" });
            splits.push(s);
            lines = s.lines ?? [];
          } catch {
            lines = [];
          }
          const targets = lines.length ? lines : [el];
          gsap.set(targets, { yPercent: 110, opacity: 0, skewY: 4 });
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* ---- Images: curtain reveal + parallax scrub ---- */
        document.querySelectorAll<HTMLImageElement>("section img").forEach((img) => {
          const wrap = img.parentElement;
          if (!wrap) return;
          gsap.set(wrap, { overflow: "hidden" });
          gsap.fromTo(
            wrap,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
            },
          );
          gsap.fromTo(
            img,
            { scale: 1.18, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

        /* ---- Cards & list items: 3D stagger batches ---- */
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-hover-card], [data-fx-item]"),
        );
        if (cards.length) {
          gsap.set(cards, {
            opacity: 0,
            y: 46,
            rotateX: 8,
            transformPerspective: 900,
            transformOrigin: "50% 100%",
          });
          ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.09,
                clearProps: "transform",
              }),
          });
        }

        /* ---- Gold rules: draw-in ---- */
        document.querySelectorAll<HTMLElement>("section .rule-gold").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: rule, start: "top 92%", once: true },
            },
          );
        });

        /* ---- Dark sections: ambient drift on scroll ---- */
        document
          .querySelectorAll<HTMLElement>("section .fx-ambient")
          .forEach((el, i) => {
            gsap.to(el, {
              yPercent: i % 2 === 0 ? -14 : 14,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, []);
}
