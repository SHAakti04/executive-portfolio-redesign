import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function ensureGsap() {
  if (registered) return { gsap, ScrollTrigger, SplitText };
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // Default easing personality: fast, confident ease-out, no bounce.
    gsap.defaults({ ease: "power3.out", duration: 0.9 });
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText };
