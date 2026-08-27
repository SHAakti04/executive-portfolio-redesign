import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
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
  Youtube,
  Linkedin,
  Quote,
  ChevronRight,
  Video,
  Menu,
  X,
  Eye,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCountUpOnScroll } from "@/hooks/use-in-view";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

import headshotImage from "@/assets/headshot.jpg";
import worldMapImage from "@/assets/world-map.png";
import smbGrowthImage from "@/assets/smb-growth.jpg";
import quoteBackgroundImage from "@/assets/quoteBackground.png";
import kefaruTechImage from "@/assets/kefarutech.png";
import anandvanImage from "@/assets/anandvan.png";
import ngoSessionImage from "@/assets/ngo-session.jpg";
import sosVillageImage from "@/assets/sos-village.jpg";
import pressMarathiImage from "@/assets/press-marathi.jpg";
import aboutVisualImage from "@/assets/about-visual.jpg";
import heroDeskImage from "@/assets/hero-desk.jpg";
import heroPortraitImage from "@/assets/hero.png";
import wordMapPdfImage from "@/assets/wordmap2.png";
import philosophyPortraitImage from "@/assets/philosophy-portrait.jpg";
import gsPhilosophyImage from "@/assets/gs-philosophy.png";
import { useAdvancedSectionFX } from "@/lib/section-fx";

const imageUrls = {
  headshot: headshotImage,
  worldMap: worldMapImage,
  smbGrowth: smbGrowthImage,
  quoteBackground: quoteBackgroundImage,
  kefaruTech: kefaruTechImage,
  anandvan: anandvanImage,
  ngoSession: ngoSessionImage,
  sosVillage: sosVillageImage,
  pressMarathi: pressMarathiImage,
  aboutVisual: aboutVisualImage,
  heroDesk: heroDeskImage,
  heroPortrait: heroPortraitImage,
  wordMapPdf: wordMapPdfImage,
  philosophyPortrait: philosophyPortraitImage,
  gsPhilosophy: gsPhilosophyImage,
};

const NAV_LINKS = [
  ["About", "story"],
  ["Experience", "journey"],
  ["Blogs", "blogs"],
  ["Podcast", "podcast"],
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
            Gurpreet Bahara
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const animated = root.querySelectorAll(
        ".hero-kicker, .hero-title, .hero-copy, .hero-actions, .hero-role, .hero-portrait",
      );

      if (reduced) {
        gsap.set(animated, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        animated,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.72, stagger: 0.08, ease: "power3.out" },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="pdf-hero">
      <div className="pdf-hero-inner">
        <div className="pdf-hero-copy">
          <div className="hero-kicker pdf-kicker">
            Building Business&nbsp;&nbsp; Connecting Markets&nbsp;&nbsp; Creating Impact
          </div>

          <h1 className="hero-title pdf-hero-title">Gurpreet Bahara</h1>

          <p className="hero-copy pdf-hero-lead">
            18+ years of senior leadership across global digital transformation. Certified
            consultant in Salesforce &amp; AWS.
          </p>

          <p className="hero-copy pdf-hero-body">
            Gurpreet Singh Bahara - Founder &amp; CEO of Kefaru Technologies and Chairman of Sardar
            Swaran Singh's Anandvan - helping organizations establish, expand, and scale across
            India, the United States, Canada, and emerging global markets.
          </p>

          <div className="hero-actions pdf-action-row">
            <a href="#contact" className="pdf-btn-dark">
              Get in Touch
            </a>
            <a href="https://kefaru.com/" target="_blank" rel="noreferrer" className="pdf-btn-light">
              Visit Kefaru
            </a>
          </div>

          <div className="hero-role pdf-role-row">
            {ROLES.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>

        <div className="hero-portrait pdf-hero-portrait">
          <img
            src={imageUrls.heroPortrait}
            alt="Gurpreet Singh Bahara"
            fetchPriority="high"
            className="pdf-hero-image"
          />
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
function Metric({
  value,
  suffix = "",
  label,
  sub,
}: {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
}) {
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
  const philosophyPillars = [
    {
      icon: Building2,
      label: "Enterprise Builder",
      text: "Scaling consulting, cloud, AI, and GCC-led transformation with execution discipline.",
    },
    {
      icon: Globe2,
      label: "Market Connector",
      text: "Creating cross-border opportunities across India, North America, the Middle East, and Africa.",
    },
    {
      icon: Sparkles,
      label: "Impact Leader",
      text: "Building values-led systems for businesses and grassroots community transformation.",
    },
  ];

  return (
    <Section
      id="story"
      className="philosophy-section bg-[color:var(--ivory)] py-12 sm:py-14 lg:min-h-[100svh] lg:py-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold-deep)]/30 to-transparent" />
      <div className="philosophy-orb pointer-events-none absolute -left-40 top-28 h-[420px] w-[420px] rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      <div className="philosophy-orb philosophy-orb-alt pointer-events-none absolute -right-44 bottom-20 h-[460px] w-[460px] rounded-full bg-[color:var(--navy)]/8 blur-3xl" />

      <Reveal>
        <Eyebrow>Philosophy</Eyebrow>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
        <Reveal>
          <figure className="philosophy-visual group relative">
            <div className="philosophy-frame pointer-events-none absolute -inset-4 border border-[color:var(--gold-deep)]/25" />
            <div className="philosophy-portrait-frame relative overflow-hidden bg-[color:var(--navy-deep)] shadow-[var(--shadow-editorial)]">
              <img
                src={imageUrls.gsPhilosophy}
                alt="Gurpreet Singh Bahara, technology entrepreneur and Chairman of Sardar Swaran Singh's Anandvan"
                loading="lazy"
                className="philosophy-portrait aspect-[4/5] max-h-[34rem] w-full object-cover object-[50%_18%] transition-transform duration-1000 ease-out group-hover:scale-[1.045] lg:aspect-[1/1] lg:max-h-[calc(100svh-10rem)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/42 via-transparent to-transparent" />
              <div className="philosophy-sheen pointer-events-none absolute inset-0" />
            </div>

            <div className="philosophy-floating philosophy-floating-top">
              <span className="eyebrow text-[0.55rem] text-white/55">Founder</span>
              <strong>Kefaru Technologies</strong>
            </div>
            <div className="philosophy-floating philosophy-floating-bottom">
              <span className="eyebrow text-[0.55rem] text-white/55">Chairman</span>
              <strong>SSS Anandvan</strong>
            </div>
          </figure>
        </Reveal>

        <div>
          <Reveal delay={120}>
            <Heading className="max-w-2xl !text-[clamp(2.05rem,4.2vw,4.4rem)] !leading-[1.02]">
              A global entrepreneur building technology, partnerships, and lasting impact.
            </Heading>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {philosophyPillars.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                data-fx-item
                className="philosophy-pillar group relative overflow-hidden border border-[color:var(--ink)]/10 bg-white/45 p-4 shadow-[var(--shadow-card)] transition-all duration-700 hover:-translate-y-1 hover:border-[color:var(--gold-deep)]/35 hover:bg-white/70"
              >
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-[color:var(--gold-deep)]/25 bg-[color:var(--gold)]/10 text-[color:var(--gold-deep)] transition-all duration-500 group-hover:bg-[color:var(--gold)]/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="eyebrow text-[color:var(--gold-deep)]">{label}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                      {text}
                    </p>
                  </div>
                </div>
                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--gold-deep)]/45 transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            ))}
          </div>

          <Reveal delay={180}>
            <div className="mt-6 grid gap-4 text-[0.9rem] leading-[1.65] text-[color:var(--ink-soft)] sm:text-[0.95rem] lg:grid-cols-2">
              <p>
                Gurpreet Bahara is a technology entrepreneur, business strategist, and
                philanthropist with a passion for building businesses that create lasting impact. As
                Founder &amp; CEO of Kefaru Technologies, he partners with organizations across
                India, North America, the Middle East, and Africa to accelerate growth, drive
                digital transformation, and establish Global Capability Centers.
              </p>
              <p>
                His work spans enterprise consulting, cloud technologies, artificial intelligence,
                and business innovation, helping companies scale with confidence in an evolving
                global marketplace. Beyond business, he serves as Chairman of Sardar Swaran Singh's
                Anandvan, leading education, skill development, rural development, women
                empowerment, and technology-driven community transformation.
              </p>
            </div>

            <a
              href="#journey"
              className="philosophy-cta eyebrow group mt-6 inline-flex items-center gap-4 text-[color:var(--gold-deep)]"
            >
              Read the full story
              <span className="grid h-9 w-14 place-items-center border border-[color:var(--gold-deep)]/35 transition-all duration-500 group-hover:w-20 group-hover:bg-[color:var(--gold)]/15">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-3">
            {[
              ["18+", "Years", "Of senior leadership"],
              ["3", "Continents", "Global experience"],
              ["100+", "Projects", "Delivered successfully"],
            ].map(([value, label, sub]) => (
              <div
                key={label}
                data-fx-item
                className="philosophy-stat border-t border-[color:var(--ink)]/10 pt-5"
              >
                <div className="font-display text-4xl font-medium leading-none text-[color:var(--ink)] sm:text-5xl">
                  {value}
                </div>
                <div className="eyebrow mt-3 text-[color:var(--ink)]">{label}</div>
                <div className="mt-1 text-xs leading-relaxed text-[color:var(--ink-muted)]">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Quote ---------- */
/* ---------- Quote ---------- */
function QuoteBlock() {
  const quotePrinciples = ["Values-led", "Scalable systems", "Grassroots impact"];
  const quoteRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = quoteRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      section.classList.add("is-writing");
      return;
    }

    const { ScrollTrigger } = ensureGsap();
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => section.classList.add("is-writing"),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={quoteRef}
      className="quote-section relative isolate overflow-hidden bg-[color:var(--navy-deep)]"
    >
      <img
        src={imageUrls.quoteBackground}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="quote-bg absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[color:var(--navy-deep)]/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/72 to-[color:var(--navy-deep)]/35" />
      <div className="quote-grid pointer-events-none absolute inset-0" />
      <div className="quote-orb fx-ambient pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[color:var(--gold)]/12 blur-3xl" />

      <div className="relative mx-auto grid max-w-[88rem] grid-cols-1 gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[100svh] lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-12">
        <Reveal>
          <div className="quote-panel relative overflow-hidden border border-white/10 bg-white/[0.045] p-5 shadow-[0_34px_90px_-42px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-6">
            <div className="quote-panel-sheen pointer-events-none absolute inset-0" />
            <div className="relative">
              <div className="eyebrow text-[color:var(--gold-soft)]">Conviction</div>
              <div className="mt-6 grid gap-3">
                {quotePrinciples.map((item) => (
                  <div
                    key={item}
                    data-fx-item
                    className="quote-principle group flex items-center justify-between border-b border-white/10 pb-3 text-white/72 last:border-b-0 last:pb-0"
                  >
                    <span className="font-display text-xl font-normal text-white sm:text-2xl">
                      {item}
                    </span>
                    <span className="h-px w-12 bg-[color:var(--gold-soft)]/45 transition-all duration-500 group-hover:w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <blockquote className="quote-statement relative max-w-4xl">
            <div className="quote-mark-wrap mb-6 grid h-14 w-14 place-items-center border border-[color:var(--gold-soft)]/35 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]">
              <Quote className="h-8 w-8" />
            </div>

            <p className="quote-line font-display text-[clamp(1.85rem,3.65vw,3.65rem)] font-normal italic leading-[1.14] text-white">
              <span className="quote-write-line">
                <span className="quote-write-text">"I believe in leading with values,</span>
              </span>
              <span className="quote-write-line">
                <span className="quote-write-text">nurturing collaborative teams,</span>
              </span>
              <span className="quote-write-line">
                <span className="quote-write-text">and building scalable systems —</span>
              </span>
              <span className="quote-write-line">
                <span className="quote-write-text">in corporate setups and in frameworks</span>
              </span>
              <span className="quote-write-line">
                <span className="quote-write-text">for grassroots change."</span>
              </span>
            </p>
            <footer className="mt-7 flex flex-wrap items-center gap-4">
              <span className="h-px w-14 rule-gold" />
              <span className="eyebrow text-[color:var(--gold-soft)]">Gurpreet Singh</span>
              <span className="hidden h-px w-8 bg-white/15 sm:block" />
              <span className="eyebrow text-white/35">Founder · Chairman · Builder</span>
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
    eyebrow: "Enterprise Venture",
    tags: ["Technology Consulting", "Salesforce", "Cloud"],
    body: "Boutique enterprise IT consultancy bridging business vision with scalable cloud execution — Salesforce, AWS, AI, and Global Capability Centers across India and North America.",
    image: imageUrls.kefaruTech,
    href: "https://kefaru.com/",
    cta: "Visit Website",
    signature: "Global Vision · Smart Engineering · Fearless Execution",
    metrics: ["AWS", "Salesforce", "AI", "GCC"],
  },
  {
    name: "SSS Anandvan",
    eyebrow: "Impact Venture",
    tags: ["Social Impact", "Empowerment", "NGO"],
    body: "A movement to blend tradition with technology, values with opportunities, education with empowerment — free schooling and career guidance for underprivileged children.",
    image: imageUrls.anandvan,
    href: "https://www.sssanandvan.com/",
    cta: "Visit Website",
    signature: "Education · Skill Development · Community Upliftment",
    metrics: ["Education", "Skills", "Rural Impact", "Women Empowerment"],
  },
];

function Ventures() {
  return (
    <Section id="ventures" className="venture-section bg-[color:var(--ivory-deep)] py-16 sm:py-20">
      <div className="venture-ambient pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[color:var(--gold)]/10 blur-3xl" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal>
          <div>
            <Eyebrow>Ventures</Eyebrow>
            <Heading className="mt-6 max-w-xl !text-[clamp(2.2rem,4.6vw,4.8rem)]">
              The Work Beyond
              <br />
              the Title
            </Heading>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-xl text-[0.95rem] leading-[1.75] text-[color:var(--ink-soft)] lg:pb-2">
            Two ventures. One rooted in enterprise technology. One devoted to human impact. Both
            shaped by the same conviction: that depth beats scale.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-2">
        {ventures.map((v, i) => (
          <article key={v.name} data-fx-item className="venture-card group">
            <div className="venture-media">
              <img src={v.image} alt={v.name} loading="lazy" className="venture-image" />
              <div className="venture-media-overlay" />
              <div className="venture-index">0{i + 1}</div>
            </div>

            <div className="venture-content">
              <div className="venture-topline">
                <span className="venture-kicker">{v.eyebrow}</span>
                <span className="venture-line" />
              </div>

              <h3 className="venture-title">{v.name}</h3>

              <p className="venture-signature">{v.signature}</p>

              <div className="venture-tag-row">
                {v.tags.map((t) => (
                  <span key={t} className="venture-tag">
                    {t}
                  </span>
                ))}
              </div>

              <p className="venture-body">{v.body}</p>

              <div className="venture-metric-rail">
                {v.metrics.map((item) => (
                  <span key={item} className="venture-chip">
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="venture-link eyebrow group/link"
              >
                {v.cta}
                <span className="venture-link-icon">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </span>
              </a>
            </div>
          </article>
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
    <Section id="journey" tone="dark" className="journey-section py-16 sm:py-20">
      <div className="journey-ambient journey-ambient-left pointer-events-none absolute rounded-full" />
      <div className="journey-ambient journey-ambient-right pointer-events-none absolute rounded-full" />

      <Reveal>
        <Eyebrow tone="dark">The Journey</Eyebrow>
      </Reveal>

      <Reveal delay={80}>
        <Heading
          tone="dark"
          className="mt-6 max-w-4xl font-sans !text-[clamp(3.1rem,6.4vw,6rem)] !font-semibold !leading-[0.96] !tracking-normal"
        >
          Building consulting organizations from scratch.
        </Heading>
      </Reveal>

      <Reveal delay={130}>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/58 sm:text-lg">
          Hiring teams, creating delivery practices and implementation methodology, partner
          enablement, and global consulting operations — not just individual implementations.
        </p>
      </Reveal>

      <div className="journey-map mt-14 lg:mt-20">
        {journey.map((step, i) => {
          const Icon = step.icon;
          const sideClass = i % 2 === 0 ? "journey-node-left" : "journey-node-right";

          return (
            <Reveal
              as="article"
              key={step.year + i}
              delay={i * 80}
              y={34}
              className={`journey-node ${sideClass}`}
            >
              <span className="journey-dot" aria-hidden="true" />

              <div data-fx-item className="journey-card group relative overflow-hidden">
                <div className="journey-card-glow pointer-events-none absolute inset-0" />

                <div className="relative z-[1] flex items-start justify-between gap-5">
                  <div>
                    <div className="journey-chapter">Chapter {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-3 font-sans text-2xl font-semibold leading-tight text-white sm:text-3xl">
                      {step.role}
                    </h3>
                  </div>

                  <span className="journey-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="journey-line my-6" />

                <p className="relative z-[1] text-sm leading-relaxed text-white/62 sm:text-base">
                  {step.body}
                </p>

                <div className="relative z-[1] mt-7 flex flex-wrap items-center justify-between gap-4">
                  <span className="journey-year">{step.year}</span>
                  {step.current && <span className="journey-status">Now</span>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Global ---------- */
function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const v = useCountUpOnScroll(ref, n);
  return (
    <div
      ref={ref}
      className="card-ivory p-7 transition-transform duration-500 hover:-translate-y-1"
    >
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
  const credentialGroups = [
    {
      label: "Salesforce Depth",
      sub: "Marketing Cloud, Personalization, Heroku, Datorama",
      icon: BadgeCheck,
      count: "05",
      items: [
        certifications[0],
        certifications[1],
        certifications[2],
        certifications[3],
        certifications[7],
      ],
    },
    {
      label: "Cloud & Enterprise Systems",
      sub: "AWS, SAP, enterprise platforms, operating discipline",
      icon: Globe2,
      count: "03",
      items: [certifications[4], certifications[5], certifications[6]],
    },
  ];

  const capabilityPillars = [
    {
      icon: Building2,
      label: "Consulting Systems",
      items: ["IT Consulting", "Management Consulting", "Business Strategy"],
    },
    {
      icon: Rocket,
      label: "Growth Execution",
      items: ["Strategic Partnerships", "Growth Marketing", "SaaS Development"],
    },
    {
      icon: Sparkles,
      label: "Modern Platforms",
      items: ["AWS & Cloud", "Artificial Intelligence", "Business Analytics"],
    },
  ];

  return (
    <Section id="expertise" tone="dark" className="expertise-section py-16 sm:py-20">
      <div className="expertise-ambient expertise-ambient-left pointer-events-none absolute rounded-full" />
      <div className="expertise-ambient expertise-ambient-right pointer-events-none absolute rounded-full" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Expertise &amp; Certifications</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading tone="dark" className="mt-6 max-w-3xl">
              Credentialed across Salesforce, AWS, SAP, and analytics platforms.
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="expertise-summary">
            <div className="eyebrow text-[color:var(--gold-soft)]">Credential Architecture</div>
            <p className="mt-4 text-sm leading-relaxed text-white/58 sm:text-base">
              A practical mix of cloud certification, Salesforce specialization, enterprise systems,
              and consulting execution built for transformation work.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="grid grid-cols-1 gap-5">
          {credentialGroups.map((group, groupIndex) => {
            const Icon = group.icon;

            return (
              <Reveal key={group.label} delay={groupIndex * 100} y={24}>
                <article
                  data-fx-item
                  className="expertise-credential-card group relative overflow-hidden"
                >
                  <div className="expertise-card-glow pointer-events-none absolute inset-0" />

                  <div className="relative z-[1] flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <span className="expertise-icon">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="eyebrow text-[color:var(--gold-soft)]">{group.label}</div>
                        <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-white sm:text-3xl">
                          {group.sub}
                        </h3>
                      </div>
                    </div>

                    <div className="expertise-count">
                      <span>{group.count}</span>
                      <small>Verified</small>
                    </div>
                  </div>

                  <div className="relative z-[1] mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {group.items.map((item, itemIndex) => (
                      <div key={item} className="expertise-cert-row">
                        <span className="expertise-cert-index">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={180}>
          <aside data-fx-item className="expertise-capability-panel relative overflow-hidden">
            <div className="eyebrow text-[color:var(--gold-soft)]">Core Capabilities</div>

            <div className="mt-7 space-y-5">
              {capabilityPillars.map(({ icon: Icon, label, items }) => (
                <div key={label} className="expertise-pillar group">
                  <div className="flex items-center gap-3">
                    <span className="expertise-pillar-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-sans text-base font-semibold text-white">{label}</h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="expertise-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="eyebrow text-white/35">Additional Strengths</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills
                  .filter(
                    (skill) => !capabilityPillars.some((pillar) => pillar.items.includes(skill)),
                  )
                  .map((skill) => (
                    <span key={skill} className="expertise-chip expertise-chip-muted">
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
/* ---------- Leadership ---------- */
const traits = [
  {
    t: "Calm under pressure",
    d: "Steady leadership through complex, high-stakes transformations.",
  },
  {
    t: "Strategic & technically deep",
    d: "Balances architectural depth with clear business framing.",
  },
  { t: "Responsive & delivery-focused", d: "Prioritizes outcomes and clean execution over noise." },
  {
    t: "An excellent communicator",
    d: "Manages enterprise conversations across cultures and time zones.",
  },
];

function Leadership() {
  const leadershipCards = traits.map((trait, i) => {
    const accents = [
      {
        icon: BadgeCheck,
        signal: "High-stakes calm",
        proof: "Complex transformations",
      },
      {
        icon: Sparkles,
        signal: "Technical clarity",
        proof: "Business-aligned architecture",
      },
      {
        icon: Rocket,
        signal: "Delivery rhythm",
        proof: "Outcome-first execution",
      },
      {
        icon: Globe2,
        signal: "Global communication",
        proof: "Cross-cultural leadership",
      },
    ];

    return {
      ...trait,
      ...accents[i],
      index: String(i + 1).padStart(2, "0"),
    };
  });

  return (
    <Section id="leadership" className="leadership-section bg-[color:var(--ivory)] py-16 sm:py-20">
      <div className="leadership-ambient leadership-ambient-left pointer-events-none absolute rounded-full" />
      <div className="leadership-ambient leadership-ambient-right pointer-events-none absolute rounded-full" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <Reveal>
            <Eyebrow>Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading className="mt-6 max-w-3xl">
              How colleagues, partners, and clients describe working together.
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={130}>
          <div className="leadership-summary">
            <div className="eyebrow text-[color:var(--gold-deep)]">Working Style</div>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-soft)] sm:text-base">
              A reputation built around steadiness, strategic depth, delivery ownership, and clear
              communication across complex enterprise conversations.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="leadership-stage mt-14">
        <div className="leadership-trust-rail">
          <span>Colleagues</span>
          <span>Partners</span>
          <span>Clients</span>
          <span>Teams</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {leadershipCards.map((card, i) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.t} delay={i * 100} y={26}>
                <article
                  data-fx-item
                  className="leadership-card group relative h-full overflow-hidden"
                >
                  <div className="leadership-card-glow pointer-events-none absolute inset-0" />

                  <div className="relative z-[1] flex items-start justify-between gap-5">
                    <div>
                      <span className="leadership-index">{card.index}</span>
                      <h3 className="mt-5 font-display text-3xl font-normal leading-tight text-[color:var(--ink)]">
                        {card.t}
                      </h3>
                    </div>

                    <span className="leadership-quote-mark">
                      <Quote className="h-6 w-6" />
                    </span>
                  </div>

                  <p className="relative z-[1] mt-5 text-sm leading-relaxed text-[color:var(--ink-soft)] sm:text-base">
                    {card.d}
                  </p>

                  <div className="leadership-divider" />

                  <div className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="leadership-icon">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="eyebrow text-[0.58rem] text-[color:var(--gold-deep)]">
                          {card.signal}
                        </div>
                        <div className="mt-1 text-xs font-medium text-[color:var(--ink-muted)]">
                          {card.proof}
                        </div>
                      </div>
                    </div>

                    <div className="leadership-source">Professional recommendations</div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
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
        "SOS Village session - a one-hour visit that ran three hours because of how engaged the students were.",
    },
    {
      src: imageUrls.ngoSession,
      caption:
        "Guiding students onto their higher-education and career paths - resumes, interviews, and self-belief.",
    },
  ];

  const impactMetrics = [
    { value: "Jan 2022", label: "Began", icon: Rocket },
    { value: "150+", label: "Students", icon: Users },
    { value: "Nursery-5th", label: "Standards", icon: GraduationCap },
  ];

  const impactPillars = [
    {
      icon: GraduationCap,
      title: "Free Education",
      text: "Access to schooling for financially underprivileged children near Lucknow.",
    },
    {
      icon: Sparkles,
      title: "Life Skills",
      text: "Ethics, confidence, communication, and practical development beyond academics.",
    },
    {
      icon: BadgeCheck,
      title: "Career Pathways",
      text: "Resume-building, interview preparation, and guidance toward real employment routes.",
    },
  ];

  return (
    <Section id="impact" tone="dark" className="impact-section py-16 sm:py-20">
      <div className="impact-ambient impact-ambient-left pointer-events-none absolute rounded-full" />
      <div className="impact-ambient impact-ambient-right pointer-events-none absolute rounded-full" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <Reveal>
            <Eyebrow tone="dark">Social Impact</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <Heading tone="dark" className="mt-6 max-w-4xl">
              Sardar Swaran Singh's Anandvan - A Dream of a Father.
            </Heading>
          </Reveal>
        </div>

        <Reveal delay={130}>
          <div data-fx-item className="impact-mission-card relative overflow-hidden">
            <div className="eyebrow text-[color:var(--gold-soft)]">Mission</div>
            <p className="mt-4 text-sm leading-relaxed text-white/62 sm:text-base">
              An NGO founded and chaired in memory of his father, Swaran Singh - providing free
              education to underprivileged children near Lucknow, Uttar Pradesh.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-3">
            {impactMetrics.map(({ value, label, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 80} y={20}>
                <div data-fx-item className="impact-metric group relative overflow-hidden">
                  <div className="impact-metric-glow pointer-events-none absolute inset-0" />
                  <Icon className="relative z-[1] h-5 w-5 text-[color:var(--gold)]" />
                  <div className="relative z-[1] mt-5 break-words font-display text-3xl font-normal leading-tight text-[color:var(--gold-soft)]">
                    {value}
                  </div>
                  <div className="relative z-[1] eyebrow mt-2 text-[0.58rem] text-white/45">
                    {label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={170}>
            <div data-fx-item className="impact-story-card relative overflow-hidden">
              <div className="space-y-5 text-[0.95rem] leading-[1.85] text-white/65">
                <p>
                  Started in January 2022 with roughly 150 students, nursery through 5th standard,
                  drawn from financially underprivileged families near Lucknow.
                </p>
                <p>
                  Beyond core academics, Anandvan teaches life skills and ethics - and for older
                  students, resume-building, interview preparation, and career guidance, with the
                  goal of creating real employment pathways.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="impact-handle-icon">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <span className="font-medium text-white">@sssanandvan</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {impactPillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={220 + i * 80} y={20}>
                <article data-fx-item className="impact-pillar group relative overflow-hidden">
                  <span className="impact-pillar-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 font-sans text-base font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/52">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="impact-gallery">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={150 + i * 130} y={26}>
              <figure
                data-fx-item
                className={`impact-photo impact-photo-${i + 1} group relative overflow-hidden`}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="impact-photo-overlay pointer-events-none absolute inset-0" />
                <figcaption className="absolute inset-x-0 bottom-0 z-[1] p-5 text-sm leading-snug text-white/88">
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
  const [activePressImage, setActivePressImage] = useState<null | {
    src: string;
    title: string;
  }>(null);

  useEffect(() => {
    if (!activePressImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePressImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePressImage]);

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
    <>
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
              <article data-fx-item className="press-card group h-full overflow-hidden bg-white/75">
                <div className="press-image-wrap relative aspect-[16/11] overflow-hidden bg-[color:var(--navy-deep)] p-3">
                  <img
                    src={it.src}
                    alt={it.title}
                    loading="lazy"
                    className="press-image h-full w-full object-contain"
                  />

                  <button
                    type="button"
                    className="press-view-button"
                    onClick={() => setActivePressImage({ src: it.src, title: it.title })}
                    aria-label={`View ${it.title} full size`}
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-7">
                  <div className="eyebrow text-[0.6rem] text-[color:var(--gold-deep)]">Press</div>
                  <h3 className="mt-3 font-display text-xl font-normal leading-snug text-[color:var(--ink)]">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                    {it.sub}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {activePressImage && (
        <div
          className="press-lightbox fixed inset-0 z-[95] flex items-center justify-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Press image preview"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setActivePressImage(null)}
            aria-label="Close image preview"
          />

          <div className="press-lightbox-panel relative z-[1] overflow-hidden bg-[color:var(--navy-deep)]">
            <button
              type="button"
              className="press-lightbox-close"
              onClick={() => setActivePressImage(null)}
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={activePressImage.src}
              alt={activePressImage.title}
              className="press-lightbox-image w-full object-contain"
            />

            <div className="border-t border-white/10 px-5 py-4">
              <div className="eyebrow text-[0.6rem] text-[color:var(--gold-soft)]">Preview</div>
              <div className="mt-1 font-display text-xl text-white">{activePressImage.title}</div>
            </div>
          </div>
        </div>
      )}
    </>
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
    <Section id="conversations" tone="dark" className="conversation-section py-16 sm:py-20">
      <div className="conversation-ambient conversation-ambient-left pointer-events-none absolute rounded-full" />
      <div className="conversation-ambient conversation-ambient-right pointer-events-none absolute rounded-full" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <Reveal>
          <div>
            <Eyebrow tone="dark">Blogs &amp; Podcasts</Eyebrow>
            <Heading tone="dark" className="mt-7 max-w-3xl">
              Insights on leadership, technology &amp; building purpose-driven enterprises.
            </Heading>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div data-fx-item className="conversation-intro-card relative overflow-hidden">
            <div className="eyebrow text-[color:var(--gold-soft)]">Conversation Studio</div>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.85] text-white/62">
              Gurpreet hosts candid conversations with founders, technologists, and changemakers —
              exploring the questions that don't have clean answers.
            </p>
            <div className="conversation-status mt-7">
              <span>All conversations</span>
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span>Coming soon</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8">
        <Reveal delay={150}>
          <div data-fx-item className="conversation-feature relative overflow-hidden">
            <div className="conversation-feature-grid pointer-events-none absolute inset-0" />

            <div className="relative z-[1] flex items-center justify-between gap-5">
              <div>
                <div className="eyebrow text-[color:var(--gold-soft)]">Coming Soon</div>
                <h3 className="mt-4 font-display text-4xl font-normal leading-tight text-white sm:text-5xl">
                  Video-led thought leadership.
                </h3>
              </div>

              <span className="conversation-play">
                <Video className="h-7 w-7" />
              </span>
            </div>

            <p className="relative z-[1] mt-7 max-w-md text-sm leading-relaxed text-white/58 sm:text-base">
              A curated library of conversations on enterprise building, practical technology,
              values-led leadership, and social impact.
            </p>

            <div className="relative z-[1] mt-10 grid grid-cols-3 gap-3">
              {["Leadership", "Technology", "Impact"].map((label) => (
                <div key={label} className="conversation-signal">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4">
          {episodes.map((e, i) => (
            <Reveal key={e.title} delay={190 + i * 90} y={22}>
              <article data-fx-item className="conversation-card group relative overflow-hidden">
                <div className="conversation-card-glow pointer-events-none absolute inset-0" />

                <div className="relative z-[1] flex items-start gap-5">
                  <span className="conversation-card-icon">
                    <Video className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="eyebrow text-[0.58rem] text-[color:var(--gold-soft)]">
                        {e.kicker}
                      </div>
                      <span className="conversation-pill">Soon</span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
                      {e.title}
                    </h3>

                    <div className="conversation-card-line" />

                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {e.meta} · Video Series
                    </div>
                  </div>

                  <span className="conversation-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Appointment band ---------- */
function AppointmentBand() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy)] py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
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
                {
                  icon: Mail,
                  label: "Email",
                  value: "gs@kefaru.com",
                  href: "mailto:gs@kefaru.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/gurpreet-singh1505",
                  href: "https://www.linkedin.com/in/gurpreet-singh1505/",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 95610 97388",
                  href: "tel:+919561097388",
                },
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
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/sss.anandvan/",
                    label: "Anandvan Instagram",
                  },
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/sssanandvan/",
                    label: "Anandvan Facebook",
                  },
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
          <a
            href="https://www.sssanandvan.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[color:var(--gold-soft)]"
          >
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

function PortfolioLoader({ exiting }: { exiting: boolean }) {
  return (
    <div
      className={`portfolio-loader fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[color:var(--navy-deep)] text-white transition-opacity duration-700 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={exiting}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,oklch(0.66_0.1_70_/_0.18),transparent_58%)]" />
      <div className="portfolio-loader-sweep pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[color:var(--gold-soft)]/40" />

      <div className="relative px-6 text-center">
        <div className="portfolio-loader-mark mx-auto mb-7 h-16 w-16 border border-[color:var(--gold-soft)]/45">
          <span className="font-script text-5xl leading-none text-[color:var(--gold-soft)]">G</span>
        </div>
        <div className="font-script text-6xl leading-none text-[color:var(--gold-soft)] sm:text-7xl">
          Gurpreet Singh
        </div>
        <div className="portfolio-loader-rule mx-auto mt-7 h-px w-56 bg-gradient-to-r from-transparent via-[color:var(--gold-soft)] to-transparent" />
        <div className="eyebrow mt-6 text-white/55">
          Building Businesses · Connecting Markets · Creating Impact
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useCardHoverMicroInteractions();
  useAdvancedSectionFX();

  useEffect(() => {
    const delay = prefersReducedMotion() ? 250 : 1250;
    const t = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), loading ? 1450 : 400);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), loading ? 2200 : 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [loading]);

  return (
    <>
      <PortfolioLoader exiting={!loading} />
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
        <Contact />
        <Footer />
        <CallButton />
        <WhatsAppButton />
      </main>
    </>
  );
}
