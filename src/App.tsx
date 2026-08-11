import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Users,
  Globe2,
  BadgeCheck,
  Building2,
  Rocket,
  Briefcase,
  GraduationCap,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Quote,
  ChevronRight,
  Mic,
  Menu,
  X,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCountUpOnScroll } from "@/hooks/use-in-view";
import { ParticleField } from "@/components/ParticleField";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

import headshotImage from "@/assets/headshot.jpg";
import worldMapImage from "@/assets/world-map.jpg";
import smbGrowthImage from "@/assets/smb-growth.jpg";
import ngoSessionImage from "@/assets/ngo-session.jpg";
import sosVillageImage from "@/assets/sos-village.jpg";
import pressMarathiImage from "@/assets/press-marathi.jpg";
import aboutVisualImage from "@/assets/about-visual.jpg";
import heroDeskAsset from "@/assets/hero-desk.png.asset.json";
import { useAdvancedSectionFX } from "@/lib/section-fx";
import philosophyPortraitAsset from "@/assets/philosophy-portrait.png.asset.json";

const imageUrls = {
  headshot: headshotImage,
  worldMap: worldMapImage,
  smbGrowth: smbGrowthImage,
  ngoSession: ngoSessionImage,
  sosVillage: sosVillageImage,
  pressMarathi: pressMarathiImage,
  aboutVisual: aboutVisualImage,
  heroDesk: heroDeskAsset.url,
  philosophyPortrait: philosophyPortraitAsset.url,
};

const NAV_LINKS = [
  ["Home", "top"],
  ["Story", "story"],
  ["Impact", "impact"],
  ["Conversations", "conversations"],
  ["Contact", "contact"],
] as const;

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    const items = el.querySelectorAll(".nav-item");
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, delay: 0.15, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-[color:var(--navy-deep)]/92 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" onClick={close} className="nav-item min-w-0 shrink-0">
          <span className="font-script text-[1.9rem] leading-none text-[color:var(--gold-soft)] sm:text-4xl">
            Gurpreet Singh
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-item eyebrow relative text-white/75 transition-colors hover:text-[color:var(--gold-soft)]"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="nav-item eyebrow hidden shrink-0 border border-[color:var(--gold)]/60 px-5 py-2.5 text-[color:var(--gold-soft)] transition-all duration-300 hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-deep)] lg:inline-flex"
        >
          Get in Touch
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="nav-item grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-white/85 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold-soft)] lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[color:var(--navy-deep)]/97 px-5 py-5 backdrop-blur-xl lg:hidden">
          <nav className="grid gap-1">
            {NAV_LINKS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={close}
                className="eyebrow border-b border-white/8 py-4 text-white/80 transition hover:text-[color:var(--gold-soft)]"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={close}
              className="btn-primary mt-5 inline-flex items-center justify-center px-6 py-3.5 text-xs"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
const ROLES = ["Founder", "CEO", "Technologist", "Chairman"];

function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap, ScrollTrigger, SplitText } = ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const kicker = root.querySelector(".hero-kicker");
      const roles = root.querySelectorAll(".hero-role-item");
      const roleWrap = root.querySelector(".hero-role");
      const words = root.querySelectorAll(".hero-name-word");
      const title = root.querySelector(".hero-title");
      const copies = root.querySelectorAll(".hero-copy");
      const actions = root.querySelector(".hero-actions");
      const meta = root.querySelector(".hero-meta");
      const portrait = root.querySelector(".hero-portrait");

      const all = [kicker, roleWrap, title, actions, meta, portrait].filter(Boolean);

      if (reduced) {
        gsap.set([...all, ...Array.from(copies), ...Array.from(words), ...Array.from(roles)], {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      gsap.set([kicker, roleWrap, actions, meta, ...Array.from(copies)], { opacity: 0, y: 18 });
      gsap.set(portrait, { opacity: 0, y: 26, scale: 0.98 });
      gsap.set(title, { opacity: 1 });

      let splits: Array<InstanceType<typeof SplitText>> = [];
      try {
        splits = Array.from(words).map(
          (w) => new SplitText(w as HTMLElement, { type: "chars", charsClass: "hero-char" }),
        );
      } catch {
        splits = [];
      }
      const chars = splits.flatMap((s) => s.chars ?? []);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(kicker, { opacity: 1, y: 0, duration: 0.6 }, 0.05);
      tl.to(roleWrap, { opacity: 1, y: 0, duration: 0.6 }, 0.15);
      tl.fromTo(
        roles,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.2,
      );
      if (chars.length) {
        gsap.set(chars, { opacity: 0, yPercent: 70 });
        tl.to(chars, { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.022 }, 0.35);
      } else {
        gsap.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.35 });
      }
      tl.to(portrait, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, 0.3);
      tl.to(copies, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.85);
      tl.to(actions, { opacity: 1, y: 0, duration: 0.7 }, 1.05);
      tl.to(meta, { opacity: 1, y: 0, duration: 0.6 }, 1.2);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const shell = portraitRef.current;
        if (!shell) return;
        const img = shell.querySelector("img");
        const t = gsap.to(shell, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        const t2 = img
          ? gsap.fromTo(
              img,
              { scale: 1.12 },
              {
                scale: 1.24,
                ease: "none",
                scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
              },
            )
          : null;
        return () => {
          t.scrollTrigger?.kill();
          t.kill();
          t2?.scrollTrigger?.kill();
          t2?.kill();
        };
      });

      return () => {
        splits.forEach((s) => s.revert());
        mm.revert();
      };
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === root)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div ref={portraitRef} className="hero-portrait pointer-events-none absolute inset-0 z-0">
        <img
          src={imageUrls.heroDesk}
          alt="Gurpreet Singh Bahara at his desk, Founder & CEO of Kefaru Technologies"
          fetchPriority="high"
          className="hero-portrait-image h-full w-full object-cover object-[70%_center] opacity-[0.55] [filter:contrast(1.05)_saturate(0.85)] sm:opacity-70 lg:object-[75%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/85 to-[color:var(--navy-deep)]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-transparent to-[color:var(--navy-deep)]/70" />
      </div>
      <div className="pointer-events-none absolute -left-48 top-24 h-[520px] w-[520px] rounded-full bg-[color:var(--gold)]/10 blur-3xl animate-ambient" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[color:var(--gold-deep)]/12 blur-3xl animate-ambient-2" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "52px 52px",
        }}
      />
      <ParticleField className="z-[1]" />

      <div className="relative z-[3] mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-12 px-5 pb-24 pt-6 sm:px-8 sm:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-3xl">
          <div className="hero-kicker flex items-center gap-3">
            <span className="h-px w-10 rule-gold" />
            <span className="eyebrow text-[color:var(--gold-soft)]">
              Building Businesses · Connecting Markets · Creating Impact
            </span>
          </div>

          <div className="hero-role mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8">
            {ROLES.map((r) => (
              <span key={r} className="hero-role-item eyebrow text-white/70">
                {r}
              </span>
            ))}
          </div>

          <h1
            className="hero-title mt-5 font-display text-[clamp(3.4rem,15vw,10rem)] font-normal leading-[0.92] tracking-[-0.02em] text-white"
            aria-label="Gurpreet Singh Bahara"
          >
            <span className="hero-name-line" aria-hidden="true">
              <span className="hero-name-word">Gurpreet</span>
            </span>
            <span className="hero-name-line" aria-hidden="true">
              <span className="hero-name-word italic text-[color:var(--gold-soft)]">Singh</span>
            </span>
          </h1>

          <p className="hero-copy mt-8 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
            18+ years of senior leadership across global digital transformation. Certified
            consultant in Salesforce &amp; AWS.
          </p>
          <p className="hero-copy hero-copy-delay mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            Gurpreet Singh Bahara — Founder &amp; CEO of Kefaru Technologies and Chairman of Sardar
            Swaran Singh's Anandvan — helping organizations establish, expand, and scale across
            India, the United States, Canada, and emerging global markets.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://kefaru.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2.5 px-7 py-3.5 text-xs"
            >
              Visit Kefaru
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="hero-meta mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
            <span>Pune · India</span>
            <span className="hidden h-px w-8 bg-white/20 sm:block" />
            <span>USA · Canada · Europe · Asia</span>
          </div>
        </div>

        <div className="pointer-events-none hidden lg:block" aria-hidden="true" />
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-[3] -translate-x-1/2 text-white/35">
        <div className="h-10 w-6 rounded-full border border-white/20 p-1">
          <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Section primitives ---------- */
function Section({
  id,
  tone = "light",
  className = "",
  children,
}: {
  id?: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 sm:py-32 ${
        tone === "dark"
          ? "bg-[color:var(--navy-deep)] text-white"
          : "bg-[color:var(--ivory)] text-[color:var(--ink)]"
      } ${className}`}
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">{children}</div>
    </section>
  );
}

function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 rule-gold" />
      <span
        className={`eyebrow ${tone === "dark" ? "text-[color:var(--gold-soft)]" : "text-[color:var(--gold-deep)]"}`}
      >
        {children}
      </span>
    </div>
  );
}

function Heading({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-normal leading-[1.08] ${
        tone === "dark" ? "text-white" : "text-[color:var(--ink)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------- Story / Philosophy ---------- */
function Metric({ value, suffix = "", label, sub }: { value: number; suffix?: string; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const v = useCountUpOnScroll(ref, value);
  return (
    <div ref={ref} className="min-w-0">
      <div className="font-display text-4xl font-medium leading-none text-[color:var(--ink)] sm:text-5xl">
        {v}
        {suffix}
      </div>
      <div className="eyebrow mt-3 text-[color:var(--ink)]">{label}</div>
      <div className="mt-1 text-xs leading-relaxed text-[color:var(--ink-muted)]">{sub}</div>
    </div>
  );
}

function Story() {
  return (
    <Section id="story">
      <Reveal>
        <Eyebrow>Philosophy</Eyebrow>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <figure className="relative">
            <div className="absolute -left-4 -top-4 hidden h-40 w-40 border border-[color:var(--gold)]/40 sm:block" />
            <img
              src={imageUrls.philosophyPortrait}
              alt="Gurpreet Singh Bahara, technology entrepreneur and Chairman of Sardar Swaran Singh's Anandvan"
              loading="lazy"
              className="relative aspect-[4/5] w-full object-cover object-top shadow-[var(--shadow-editorial)]"
            />
          </figure>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <Heading className="max-w-2xl">
              A global entrepreneur building technology, partnerships, and lasting impact.
            </Heading>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)] sm:text-base">
              <p>
                Gurpreet Bahara is a technology entrepreneur, business strategist, and philanthropist
                with a passion for building businesses that create lasting impact. As Founder &amp;
                CEO of Kefaru Technologies, he partners with organizations across India, North
                America, the Middle East, and Africa to accelerate growth, drive digital
                transformation, and establish Global Capability Centers.
              </p>
              <p>
                His work spans enterprise consulting, cloud technologies, artificial intelligence,
                and business innovation, helping companies scale with confidence in an evolving
                global marketplace. With more than two decades of experience, he has helped
                enterprises, founders, and leadership teams build high-growth businesses, forge
                strategic partnerships, and unlock cross-border opportunities.
              </p>
              <p>
                He believes in leading with values, nurturing collaborative teams, and building
                scalable systems — whether in corporate setups or while creating frameworks for
                grassroots change. Beyond business, Gurpreet serves as Chairman of Sardar Swaran
                Singh's Anandvan, leading initiatives across education, skill development, rural
                development, women empowerment, and technology-driven community transformation.
              </p>
            </div>

            <a
              href="#journey"
              className="eyebrow group mt-9 inline-flex items-center gap-3 text-[color:var(--gold-deep)]"
            >
              Read the full story
              <span className="h-px w-10 bg-[color:var(--gold-deep)] transition-all duration-300 group-hover:w-16" />
            </a>

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[color:var(--ink)]/10 pt-10 min-[420px]:grid-cols-3">
              <Metric value={18} suffix="+" label="Years" sub="Of senior leadership" />
              <Metric value={3} label="Continents" sub="Global experience" />
              <Metric value={100} suffix="+" label="Projects" sub="Delivered successfully" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- Quote ---------- */
function QuoteBlock() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={imageUrls.smbGrowth}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[color:var(--navy-deep)]/88" />
      <div className="relative mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <blockquote className="max-w-3xl">
            <Quote className="h-8 w-8 text-[color:var(--gold)]/60" />
            <p className="mt-7 font-display text-[clamp(1.6rem,4.2vw,2.9rem)] font-normal italic leading-[1.3] text-white">
              "I believe in leading with values, nurturing collaborative teams, and building scalable
              systems — in corporate setups and in frameworks for grassroots change."
            </p>
            <footer className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 rule-gold" />
              <span className="eyebrow text-[color:var(--gold-soft)]">Gurpreet Singh</span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Ventures ---------- */
const ventures = [
  {
    name: "Kefaru Technologies",
    tags: ["Technology Consulting", "Salesforce", "Cloud"],
    body: "Boutique enterprise IT consultancy bridging business vision with scalable cloud execution — Salesforce, AWS, AI, and Global Capability Centers across India and North America.",
    image: imageUrls.smbGrowth,
    href: "https://kefaru.com/",
    cta: "Visit Website",
  },
  {
    name: "SSS Anandvan",
    tags: ["Social Impact", "Empowerment", "NGO"],
    body: "A movement to blend tradition with technology, values with opportunities, education with empowerment — free schooling and career guidance for underprivileged children.",
    image: imageUrls.ngoSession,
    href: "https://www.youtube.com/@sssanandvan2155",
    cta: "See the Work",
  },
];

function Ventures() {
  return (
    <Section id="ventures" className="bg-[color:var(--ivory-deep)]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <Reveal>
          <Heading className="max-w-lg">
            The Work Beyond
            <br />
            the Title
          </Heading>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-xl text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)] lg:pb-3">
            Two ventures. One rooted in enterprise technology. One devoted to human impact. Both
            shaped by the same conviction: that depth beats scale.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-14 lg:gap-20">
        {ventures.map((v, i) => (
          <Reveal key={v.name} delay={i * 120}>
            <article
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="group relative overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover shadow-[var(--shadow-card)] transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <h3 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-normal leading-tight text-[color:var(--ink)]">
                  {v.name}
                </h3>
                <div className="eyebrow mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[color:var(--gold-deep)]">
                  {v.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <p className="mt-5 max-w-lg text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)]">
                  {v.body}
                </p>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow group mt-7 inline-flex items-center gap-3 text-[color:var(--ink)] transition-colors hover:text-[color:var(--gold-deep)]"
                >
                  {v.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Journey ---------- */
const journey = [
  {
    year: "2024",
    icon: Rocket,
    role: "Founded Kefaru Technologies",
    body: "A boutique Salesforce & AWS partner across India, the United States, and Canada — building Salesforce-powered growth ecosystems for SMBs and enterprises.",
    current: true,
  },
  {
    year: "2023",
    icon: Users,
    role: "Acquisition & Merger",
    body: "Solstice Decision Sciences, built into an early specialist in Marketing Analytics and Salesforce Marketing Cloud Intelligence, was acquired and merged into a broader Salesforce analytics practice.",
  },
  {
    year: "2021",
    icon: GraduationCap,
    role: "Chairman, SSS Anandvan",
    body: "Founded and chaired Sardar Swaran Singh's Anandvan in memory of his father — free education, life skills, and career pathways for underprivileged children.",
  },
  {
    year: "2020",
    icon: Sparkles,
    role: "Bombora App on Salesforce AppExchange",
    body: "Launched a custom connector on the Salesforce AppExchange, unlocking new enterprise revenue for intent-data driven marketing teams.",
  },
  {
    year: "2019",
    icon: BadgeCheck,
    role: "Best Visualization Award · Limitless",
    body: "Recognized for data-driven storytelling on Datorama — a signature capability later taught across bootcamps in Singapore, Europe, India, and the USA.",
  },
  {
    year: "Earlier",
    icon: Briefcase,
    role: "Foundations — Staffing, SAP & Datorama",
    body: "Country Manager for a U.S.-focused staffing organization, partner leadership building SAP consulting capability in Western India, and introducing Datorama to the Indian market.",
  },
];

function Journey() {
  return (
    <Section id="journey" tone="dark">
      <Reveal>
        <Eyebrow tone="dark">The Journey</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading tone="dark" className="mt-6 max-w-2xl">
          Building consulting organizations from scratch.
        </Heading>
      </Reveal>

      <ul className="mt-16 border-t border-white/10">
        {journey.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.year + i} delay={i * 70} y={26}>
              <div className="group grid grid-cols-1 gap-4 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-10 lg:grid-cols-[12rem_1fr]">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-normal text-[color:var(--gold-soft)] sm:text-4xl">
                    {step.year}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                    <h3 className="font-display text-xl font-normal text-white sm:text-2xl">
                      {step.role}
                    </h3>
                    {step.current && (
                      <span className="eyebrow inline-flex items-center gap-1.5 border border-[color:var(--gold)]/40 px-2.5 py-1 text-[0.6rem] text-[color:var(--gold-soft)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-pulse-dot" />
                        Now
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{step.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------- Global ---------- */
function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const v = useCountUpOnScroll(ref, n);
  return (
    <div ref={ref} className="card-ivory p-7 transition-transform duration-500 hover:-translate-y-1">
      <div className="font-display text-4xl font-medium leading-none text-[color:var(--ink)] sm:text-5xl">
        {v}
        {suffix}
      </div>
      <div className="mt-3 text-sm leading-relaxed text-[color:var(--ink-muted)]">{label}</div>
    </div>
  );
}

function GlobalReach() {
  return (
    <Section id="global">
      <Reveal>
        <Eyebrow>Global Exposure</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading className="mt-6 max-w-3xl">
          Delivered across North America, Europe, and Asia.
        </Heading>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)]">
          Led international consulting engagements, executive workshops, partner enablement
          programs, and enterprise digital transformation initiatives across the USA, India,
          Singapore, and Europe.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={imageUrls.worldMap}
              alt="Global engagements map"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5 sm:p-6">
              {["USA", "Canada", "India", "Singapore", "Europe"].map((r) => (
                <span
                  key={r}
                  className="eyebrow inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1.5 text-white backdrop-blur-md"
                >
                  <MapPin className="h-3 w-3 text-[color:var(--gold-soft)]" /> {r}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-1">
          <Reveal delay={100}>
            <Stat n={4} label="Continents of active engagement" />
          </Reveal>
          <Reveal delay={180}>
            <Stat n={20} label="Years of cross-border consulting" suffix="+" />
          </Reveal>
          <Reveal delay={260}>
            <Stat n={100} label="Consultants trained across regions" suffix="+" />
          </Reveal>
        </div>
      </div>

      <Reveal delay={160}>
        <div className="card-ivory mt-12 flex items-start gap-5 p-8 sm:p-10">
          <Globe2 className="mt-1 h-7 w-7 shrink-0 text-[color:var(--gold-deep)]" />
          <div>
            <h3 className="font-display text-2xl font-normal text-[color:var(--ink)]">
              India–US Business Bridge
            </h3>
            <p className="mt-3 max-w-3xl text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)]">
              Has led Indian business delegations to the USA and hosted US delegations in India —
              actively promoting bilateral business relationships and cross-border collaboration
              between companies across both ecosystems.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Expertise ---------- */
const certifications = [
  "Salesforce Marketing Cloud Intelligence — Accredited Professional",
  "Salesforce Marketing Cloud Email Specialist",
  "Salesforce Marketing Cloud Personalization",
  "Salesforce Heroku Developer — Accredited Professional",
  "AWS Certified Cloud Practitioner",
  "SAP HCM",
  "SAP SuccessFactors — Cloud",
  "Datorama Canvas Fundamentals",
];
const skills = [
  "IT Consulting",
  "Salesforce Ecosystem",
  "AWS & Cloud",
  "Artificial Intelligence",
  "Global Capability Centers",
  "Strategic Partnerships",
  "Business Strategy",
  "SaaS Development",
  "Growth Marketing",
  "Business Analytics",
  "Cloud Application Development",
  "Management Consulting",
];

function Expertise() {
  return (
    <Section id="expertise" tone="dark">
      <Reveal>
        <Eyebrow tone="dark">Expertise &amp; Certifications</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading tone="dark" className="mt-6 max-w-3xl">
          Credentialed across Salesforce, AWS, SAP, and analytics platforms.
        </Heading>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c} delay={i * 50} y={18}>
            <div className="group flex h-full items-start gap-4 bg-[color:var(--navy-deep)] p-6 transition-colors duration-500 hover:bg-[color:var(--navy)] sm:p-7">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)] transition-transform duration-500 group-hover:scale-110" />
              <div className="min-w-0">
                <div className="text-sm font-medium leading-snug text-white">{c}</div>
                <div className="eyebrow mt-2 text-[0.6rem] text-white/35">Certified</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14">
          <div className="eyebrow mb-5 text-white/45">Core Capabilities</div>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center border border-white/12 px-4 py-2 text-xs font-medium text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--gold)]/60 hover:text-[color:var(--gold-soft)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Leadership ---------- */
const traits = [
  { t: "Calm under pressure", d: "Steady leadership through complex, high-stakes transformations." },
  { t: "Strategic & technically deep", d: "Balances architectural depth with clear business framing." },
  { t: "Responsive & delivery-focused", d: "Prioritizes outcomes and clean execution over noise." },
  { t: "An excellent communicator", d: "Manages enterprise conversations across cultures and time zones." },
];

function Leadership() {
  return (
    <Section id="leadership">
      <Reveal>
        <Eyebrow>Leadership</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading className="mt-6 max-w-3xl">
          How colleagues, partners, and clients describe working together.
        </Heading>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {traits.map((tr, i) => (
          <Reveal key={tr.t} delay={i * 90} y={22}>
            <div className="card-ivory group relative h-full p-8 transition-transform duration-500 hover:-translate-y-1">
              <Quote className="absolute right-7 top-7 h-7 w-7 text-[color:var(--gold)]/40" />
              <h3 className="max-w-[80%] font-display text-2xl font-normal text-[color:var(--ink)]">
                {tr.t}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-soft)]">{tr.d}</p>
              <div className="mt-7 h-px w-12 rule-gold" />
              <div className="eyebrow mt-4 text-[0.6rem] text-[color:var(--ink-muted)]">
                Paraphrased from professional recommendations
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Impact ---------- */
function Impact() {
  const photos = [
    {
      src: imageUrls.sosVillage,
      caption:
        "SOS Village session — a one-hour visit that ran three hours because of how engaged the students were.",
    },
    {
      src: imageUrls.ngoSession,
      caption:
        "Guiding students onto their higher-education and career paths — resumes, interviews, and self-belief.",
    },
  ];
  return (
    <Section id="impact" tone="dark">
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[color:var(--gold)]/8 blur-3xl animate-ambient-2" />
      <Reveal>
        <Eyebrow tone="dark">Social Impact</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading tone="dark" className="mt-6 max-w-3xl">
          Sardar Swaran Singh's Anandvan — A Dream of a Father.
        </Heading>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.85] text-white/60">
          An NGO founded and chaired in memory of his father, Swaran Singh — providing free
          education to underprivileged children near Lucknow, Uttar Pradesh.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-8 min-[420px]:grid-cols-3">
              {[
                ["Jan 2022", "Began"],
                ["150+", "Students"],
                ["Nursery–5th", "Standards"],
              ].map(([n, l]) => (
                <div key={l} className="min-w-0">
                  <div className="break-words font-display text-2xl font-normal leading-tight text-[color:var(--gold-soft)]">
                    {n}
                  </div>
                  <div className="eyebrow mt-2 text-[0.6rem] text-white/45">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.85] text-white/65">
              <p>
                Started in January 2022 with roughly 150 students, nursery through 5th standard,
                drawn from financially underprivileged families near Lucknow.
              </p>
              <p>
                Beyond core academics, Anandvan teaches life skills and ethics — and for older
                students, resume-building, interview preparation, and career guidance, with the goal
                of creating real employment pathways.
              </p>
              <div className="flex items-center gap-2 pt-1 text-sm text-white/55">
                <GraduationCap className="h-4 w-4 text-[color:var(--gold)]" />
                <span className="font-medium text-white">@sssanandvan</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={150 + i * 130}>
              <figure className="group relative h-full overflow-hidden">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/25 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm leading-snug text-white/85">
                  {p.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Press ---------- */
function Press() {
  const items = [
    {
      src: imageUrls.pressMarathi,
      title: "मोफत शिक्षणाचे 'आनंदवन'",
      sub: "Marathi press coverage of the free-education initiative — 'Anandvan of Free Education'.",
    },
    {
      src: imageUrls.ngoSession,
      title: "The News — Anandvan Session",
      sub: "Coverage of a mentorship session guiding students on higher education, career journeys, and life skills.",
    },
    {
      src: imageUrls.sosVillage,
      title: "SOS Village Visit",
      sub: "Featured coverage of a community session with children and volunteers.",
    },
  ];
  return (
    <Section id="press" className="bg-[color:var(--ivory-deep)]">
      <Reveal>
        <Eyebrow>In the Press</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <Heading className="mt-6 max-w-2xl">Recognized coverage of the work.</Heading>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 110}>
            <article className="group h-full bg-white/70 transition-transform duration-500 hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="eyebrow text-[0.6rem] text-[color:var(--gold-deep)]">Press</div>
                <h3 className="mt-3 font-display text-xl font-normal leading-snug text-[color:var(--ink)]">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">{it.sub}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Conversations ---------- */
const episodes = [
  {
    kicker: "Latest Episode",
    title: "Leadership, Purpose & Building Impact",
    meta: "Technology & Leadership",
  },
  {
    kicker: "Featured",
    title: "The Courage to Build Slowly in a Fast World",
    meta: "Entrepreneurship",
  },
  {
    kicker: "Thought Leadership",
    title: "What Social Impact Owes to Enterprise Thinking",
    meta: "Social Impact",
  },
];

function Conversations() {
  return (
    <Section id="conversations" tone="dark">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <div>
            <Eyebrow tone="dark">Blogs &amp; Podcasts</Eyebrow>
            <Heading tone="dark" className="mt-7 max-w-xl">
              Insights on leadership, technology &amp; building purpose-driven enterprises.
            </Heading>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="lg:pt-24">
            <p className="max-w-md text-[0.95rem] leading-[1.85] text-white/60">
              Gurpreet hosts candid conversations with founders, technologists, and changemakers —
              exploring the questions that don't have clean answers.
            </p>
            <div className="eyebrow mt-7 inline-flex items-center gap-3 text-[color:var(--gold-soft)]">
              All conversations
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-white/40">Coming soon</span>
            </div>
          </div>
        </Reveal>
      </div>

      <ul className="mt-16 border-t border-white/10">
        {episodes.map((e, i) => (
          <Reveal as="li" key={e.title} delay={i * 90} y={20}>
            <div className="group flex items-center gap-5 border-b border-white/10 py-7 transition-colors duration-500 hover:bg-white/[0.025] sm:gap-8 sm:py-8">
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-[0.6rem] text-[color:var(--gold-soft)]/70">
                  {e.kicker}
                </div>
                <h3 className="mt-2 font-display text-xl font-normal leading-snug text-white sm:text-2xl">
                  {e.title}
                </h3>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
                  {e.meta} · Coming soon
                </div>
              </div>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold-soft)] transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12"
              >
                <Mic className="h-4 w-4" />
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Appointment band ---------- */
function AppointmentBand() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy)] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "48px 48px",
      }} />
      <div className="relative mx-auto max-w-[88rem] px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,5.5vw,3.5rem)] font-normal uppercase tracking-[0.12em] text-white">
            Book an Appointment
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setFormError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const isJson = response.headers.get("content-type")?.includes("application/json");

      if (!isJson || responseText.trim().startsWith("<?php")) {
        throw new Error(
          "Email sending works only after uploading to Hostinger PHP hosting. Local Vite preview cannot run contact.php.",
        );
      }

      const result = JSON.parse(responseText) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Message could not be sent.");
      }

      setSent(true);
      form.reset();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Message could not be sent.");
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "mt-2 w-full border border-[color:var(--ink)]/15 bg-white/70 px-4 py-3.5 text-sm text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--ink-muted)]/70 focus:border-[color:var(--gold-deep)] focus:bg-white";

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <Heading className="mt-7 max-w-md">
              Let's Build
              <br />
              Something
              <br />
              <span className="italic text-[color:var(--gold-deep)]">Meaningful</span>
            </Heading>
            <p className="mt-7 max-w-md text-[0.95rem] leading-[1.85] text-[color:var(--ink-soft)]">
              I'm always excited to connect with people, explore ideas, and build impactful
              solutions — whether it's a Salesforce or cloud transformation, a cross-border business
              introduction, or a conversation about Anandvan.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 space-y-px border-y border-[color:var(--ink)]/10">
              {[
                { icon: Mail, label: "Email", value: "gs@kefaru.com", href: "mailto:gs@kefaru.com" },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/gurpreet-singh",
                  href: "https://www.linkedin.com/in/gurpreet-singh",
                },
                { icon: Phone, label: "Phone", value: "+91 95610 97388", href: "tel:+919561097388" },
                {
                  icon: Building2,
                  label: "Company",
                  value: "Kefaru Technologies",
                  href: "https://kefaru.com/",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 border-b border-[color:var(--ink)]/10 py-5 last:border-b-0"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[color:var(--gold-deep)]" />
                  <div className="min-w-0 flex-1">
                    <div className="eyebrow text-[0.6rem] text-[color:var(--ink-muted)]">
                      {label}
                    </div>
                    <div className="truncate text-sm font-medium text-[color:var(--ink)]">
                      {value}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--ink-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--gold-deep)]" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8">
              <div className="eyebrow text-[0.6rem] text-[color:var(--ink-muted)]">
                Follow Anandvan
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {[
                  { icon: Instagram, href: "#", label: "Anandvan Instagram" },
                  { icon: Facebook, href: "#", label: "Anandvan Facebook" },
                  { icon: Twitter, href: "#", label: "Anandvan Twitter" },
                  {
                    icon: Youtube,
                    href: "https://www.youtube.com/@sssanandvan2155",
                    label: "Anandvan YouTube",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center border border-[color:var(--ink)]/15 text-[color:var(--ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[color:var(--gold-deep)] hover:text-[color:var(--gold-deep)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
                <span className="text-sm text-[color:var(--ink-muted)]">@sssanandvan</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <form onSubmit={onSubmit} className="card-ivory p-7 sm:p-10">
            <div className="eyebrow text-[color:var(--gold-deep)]">Schedule a Conversation</div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-[0.6rem] text-[color:var(--ink-muted)]">Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-[0.6rem] text-[color:var(--ink-muted)]">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="mt-6 block">
              <span className="eyebrow text-[0.6rem] text-[color:var(--ink-muted)]">Message</span>
              <textarea
                required
                name="message"
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Tell me a bit about your project or idea…"
              />
            </label>
            <input name="website" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              disabled={sending}
              className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-xs disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
            >
              {sending ? "Sending..." : sent ? "Message Sent" : "Send Message"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {sent && (
              <p className="mt-4 text-xs font-medium text-[color:var(--gold-deep)]">
                Thank you. Your message has been received, and an acknowledgement email has been
                sent.
              </p>
            )}
            {formError && <p className="mt-4 text-xs font-medium text-red-600">{formError}</p>}

            <p className="mt-5 text-xs text-[color:var(--ink-muted)]">
              Prefer email? Reach me directly at gs@kefaru.com.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--navy-deep)] py-12 text-white">
      <div className="mx-auto flex max-w-[88rem] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8">
        <div>
          <div className="font-script text-3xl leading-none text-[color:var(--gold-soft)]">
            Gurpreet Singh
          </div>
          <p className="mt-2 text-xs text-white/45">
            © {new Date().getFullYear()} Gurpreet Bahara · All rights reserved.
          </p>
        </div>
        <div className="eyebrow flex flex-wrap items-center gap-x-8 gap-y-3 text-white/50">
          <a
            href="https://kefaru.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[color:var(--gold-soft)]"
          >
            Kefaru Technologies
          </a>
          <a href="#impact" className="transition-colors hover:text-[color:var(--gold-soft)]">
            Anandvan NGO
          </a>
          <a href="#contact" className="transition-colors hover:text-[color:var(--gold-soft)]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

function useCardHoverMicroInteractions() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;

    const { gsap } = ensureGsap();
    const raf = requestAnimationFrame(() => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-hover-card]"));
      const cleanups: Array<() => void> = [];
      for (const card of cards) {
        const onEnter = () =>
          gsap.to(card, { y: -6, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        const onLeave = () =>
          gsap.to(card, { y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
        });
      }
      (window as any).__cardCleanups = cleanups;
    });

    return () => {
      cancelAnimationFrame(raf);
      const cleanups: Array<() => void> = (window as any).__cardCleanups || [];
      cleanups.forEach((fn) => fn());
      (window as any).__cardCleanups = [];
    };
  }, []);
}

export default function App() {
  useCardHoverMicroInteractions();
  useAdvancedSectionFX();

  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--ivory)] text-[color:var(--ink)]">
      <Nav />
      <Hero />
      <Story />
      <QuoteBlock />
      <Ventures />
      <Journey />
      <GlobalReach />
      <Expertise />
      <Leadership />
      <Impact />
      <Press />
      <Conversations />
      <AppointmentBand />
      <Contact />
      <Footer />
      <CallButton />
      <WhatsAppButton />
    </main>
  );
}
