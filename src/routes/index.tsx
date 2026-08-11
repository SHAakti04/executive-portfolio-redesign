import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Mail, Phone, ExternalLink, ArrowRight, MapPin, Award, Users, Globe2,
  BadgeCheck, Building2, Rocket, Briefcase, GraduationCap, Sparkles,
  Instagram, Facebook, Twitter, Quote, ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCountUp, useInView } from "@/hooks/use-in-view";

import headshotAsset from "@/assets/headshot.jpg.asset.json";
import worldMapAsset from "@/assets/world-map.jpg.asset.json";
import smbGrowthAsset from "@/assets/smb-growth.jpg.asset.json";
import ngoSessionAsset from "@/assets/ngo-session.jpg.asset.json";
import sosVillageAsset from "@/assets/sos-village.jpg.asset.json";
import pressMarathiAsset from "@/assets/press-marathi.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gurpreet Singh — Founder, Kefaru Technologies" },
      {
        name: "description",
        content:
          "Gurpreet Singh — Founder of Kefaru Technologies, Salesforce Marketing Analytics leader, and Chairman of Sardar Swaran Singh's Anandvan. Building consulting organizations and bridging India–US business ecosystems.",
      },
      { property: "og:title", content: "Gurpreet Singh — Founder, Kefaru Technologies" },
      {
        property: "og:description",
        content:
          "Founder, Salesforce Marketing Analytics leader, and Chairman of Anandvan — a bridge between Indian and American business ecosystems.",
      },
      { property: "og:image", content: headshotAsset.url },
      { name: "twitter:image", content: headshotAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // reveal once user has scrolled past ~70% of viewport (hero)
      setVisible(y > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "about"], ["Journey", "journey"], ["Global", "global"],
    ["Expertise", "expertise"], ["Impact", "impact"], ["Contact", "contact"],
  ] as const;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--navy-deep)]/80 border-b border-white/10 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.7)]"
          : "backdrop-blur-md bg-[color:var(--navy-deep)]/40 border-b border-white/[0.06]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-white shadow-[0_0_20px_-4px_var(--electric)] transition-transform group-hover:scale-105">
            GS
            <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide text-white/90 sm:inline">
            Gurpreet Singh
          </span>
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur-md md:flex">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="group relative rounded-full px-4 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 rounded-full bg-white/[0.06] opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary hidden rounded-full px-5 py-2 text-sm font-medium md:inline-flex transition-transform hover:scale-[1.03]">
          Get in Touch
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/25 blur-3xl animate-ambient" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[600px] w-[600px] rounded-full bg-accent/20 blur-3xl animate-ambient-2" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            Founder · Chairman · Builder
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Gurpreet <span className="text-gradient">Singh</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Founder, Kefaru Technologies · Salesforce Marketing Analytics Leader ·
            Chairman, Sardar Swaran Singh's Anandvan
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            A builder of consulting organizations and technology platforms — and a
            bridge between Indian and American business ecosystems. Equally invested
            in enterprise growth and social impact.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://kefaru.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Visit Kefaru
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-white/40">
            <span>Pune · India</span>
            <span className="h-px w-8 bg-white/20" />
            <span>USA · Europe · Asia</span>
          </div>
        </Reveal>

        <Reveal delay={300} y={30}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-2xl" />
            <div className="absolute inset-2 rounded-full border border-white/10 [mask:radial-gradient(closest-side,black,transparent)]" />
            <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 shadow-[0_30px_80px_-20px_rgba(47,123,255,0.5)]">
              <img
                src={headshotAsset.url}
                alt="Gurpreet Singh, Founder of Kefaru Technologies"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/40 via-transparent to-transparent" />
            </div>
            <div className="hero-float-card hero-float-card-top absolute -right-2 top-8 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md sm:block shadow-[var(--shadow-card)]">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Currently</div>
              <div className="text-sm font-semibold text-white">Founder, Kefaru</div>
            </div>
            <div className="hero-float-card hero-float-card-bottom absolute -left-4 bottom-10 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md sm:block shadow-[var(--shadow-card)]">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Chairman</div>
              <div className="text-sm font-semibold text-white">Anandvan NGO</div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40">
        <div className="h-10 w-6 rounded-full border border-white/20 p-1">
          <div className="h-2 w-1 mx-auto animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id, eyebrow, title, subtitle, children,
}: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                <span className="h-px w-8 bg-accent" />
                {eyebrow}
              </div>
            )}
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p>}
          </div>
        </Reveal>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about" eyebrow="About" title="A technology leader building at the intersection of enterprise and impact.">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr]">
        <Reveal delay={100}>
          <div className="space-y-5 text-base leading-relaxed text-white/70 sm:text-lg">
            <p>
              Pune-based technology leader and entrepreneur with a career spanning
              enterprise SAP consulting, Salesforce Marketing Cloud and Datorama
              analytics, and founding his own ventures.
            </p>
            <p>
              Alongside that enterprise journey runs a parallel commitment to
              community education — an NGO built in his father's memory, providing
              free education to underprivileged children in rural Uttar Pradesh.
            </p>
            <p className="text-white/55">
              The through-line: building things from scratch — consulting practices,
              product organizations, cross-border business relationships, and now, a
              school. All with the same operating principle — calm execution,
              technical depth, and long-term thinking.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { n: 20, l: "Years leading", s: "+" },
                { n: 4,  l: "Continents",    s: ""  },
                { n: 3,  l: "Companies built", s: "" },
              ].map(({ n, l, s }) => (
                <InlineCount key={l} n={n} label={l} suffix={s} />
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={250}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
            <img src={smbGrowthAsset.url} alt="Salesforce-powered growth analytics for SMBs" className="h-full w-full object-cover" loading="lazy" width={1024} height={1280} />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="text-xs uppercase tracking-widest text-accent">Currently</div>
              <div className="mt-2 font-display text-xl font-semibold text-white">
                Building Salesforce-powered growth ecosystems for SMBs at Kefaru.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- Journey ---------- */
const journey = [
  {
    icon: Briefcase,
    role: "Country Manager",
    org: "U.S.-focused Staffing Organization · India",
    body: "Led India operations for a U.S.-focused staffing organization. Foundational exposure to US enterprise hiring, offshore delivery, client relationships, and operations management.",
  },
  {
    icon: Building2,
    role: "Partner / Leadership",
    org: "Bhashya IT Solutions · SAP Ecosystem",
    body: "Helped build SAP consulting capabilities in Western India, working with enterprise customers before Salesforce became the primary focus.",
  },
  {
    icon: Sparkles,
    role: "Marketing Analytics Era",
    org: "Datorama · Global Bootcamps",
    body: "Introduced Datorama into the Indian market. Built implementation practices, trained consultants, and delivered bootcamps across Singapore, Europe, India, and the USA — becoming a recognized expert in what is now Salesforce Marketing Cloud Intelligence.",
  },
  {
    icon: Users,
    role: "Managing Partner",
    org: "Solstice Decision Sciences",
    body: "Built the firm into an early specialist in Marketing Analytics, Datorama, and Salesforce Marketing Cloud Intelligence. Later acquired and merged into Decision Foundry's broader Salesforce analytics practice.",
  },
  {
    icon: Rocket,
    role: "Founder",
    org: "Kefaru Technologies · Current",
    body: "Building Salesforce-powered growth ecosystems for SMBs — the next chapter in a career spent scaling consulting organizations from the ground up.",
    current: true,
  },
];

function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Career Journey"
      title="Building consulting organizations from scratch."
      subtitle="Hiring teams, creating delivery practices and implementation methodology, partner enablement, and global consulting operations — not just individual implementations."
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/30 to-transparent md:left-1/2" />
        <ul className="space-y-10 md:space-y-16">
          {journey.map((step, i) => {
            const Icon = step.icon;
            const left = i % 2 === 0;
            return (
              <Reveal as="li" key={step.role + i} delay={i * 90} y={30}>
                <div className={`grid grid-cols-[3rem_1fr] items-start gap-6 md:grid-cols-2 md:gap-16 ${left ? "" : "md:[&>*:first-child]:order-2"}`}>
                  <div className={`hidden md:block ${left ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                    <div className="text-xs uppercase tracking-[0.25em] text-accent">Chapter {String(i + 1).padStart(2, "0")}</div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">{step.role}</div>
                  </div>
                  <div className="relative md:pl-8">
                    <span className={`absolute -left-[0.6rem] top-2 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[color:var(--navy)] shadow-[var(--shadow-glow)] transition-transform hover:scale-110 md:left-auto md:-translate-x-[calc(2rem+50%)] ${step.current ? "ring-2 ring-accent" : ""}`}
                          style={left ? { left: "auto", right: "-24px", transform: "translateX(50%)" } : undefined}>
                      <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <div className="glass-card ml-14 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40 md:ml-0">
                      <div className="md:hidden">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Chapter {String(i + 1).padStart(2, "0")}</div>
                        <div className="mt-1 font-display text-lg font-semibold text-white">{step.role}</div>
                      </div>
                      <div className="text-sm font-medium text-accent">{step.org}</div>
                      {step.current && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> Now
                        </span>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-white/65">{step.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Global ---------- */
function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(n, inView);
  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-glow)]">
      <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
        {v}{suffix}
      </div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
}

function InlineCount({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(n, inView);
  return (
    <div ref={ref}>
      <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
        {v}{suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

function Global() {
  return (
    <Section
      id="global"
      eyebrow="Global Exposure"
      title="Delivered across North America, Europe, and Asia."
      subtitle="Led international consulting engagements, executive workshops, partner enablement programs, and enterprise digital transformation initiatives across the USA, India, Singapore, and Europe."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
            <img src={worldMapAsset.url} alt="Global engagements map" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--navy-deep)]/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-6">
              {["USA", "India", "Singapore", "Europe"].map((r, i) => (
                <span key={r} style={{ animationDelay: `${i * 400}ms` }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <MapPin className="h-3 w-3 text-accent" /> {r}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="space-y-4">
          <Reveal delay={100}><Stat n={4} label="Continents of active engagement" suffix="" /></Reveal>
          <Reveal delay={200}><Stat n={20} label="Years of cross-border consulting" suffix="+" /></Reveal>
          <Reveal delay={300}><Stat n={100} label="Consultants trained across regions" suffix="+" /></Reveal>
        </div>
      </div>

      <Reveal delay={200}>
        <div className="mt-12 glass-card rounded-2xl p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <Globe2 className="mt-1 h-7 w-7 shrink-0 text-accent" />
            <div>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                India–US Business Bridge
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Has led Indian business delegations to the USA and hosted US
                delegations in India — actively promoting bilateral business
                relationships and cross-border collaboration between companies
                across both ecosystems.
              </p>
            </div>
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
  "SAP HCM",
  "SAP SuccessFactors — Cloud",
  "Datorama Canvas Fundamentals",
  "Datorama Project Manager",
];
const skills = [
  "IT Consulting", "SaaS Development", "Growth Marketing", "Digital Marketing",
  "Business Analytics", "Strategic Planning", "Cloud Application Development", "Management Consulting",
];

function Expertise() {
  return (
    <Section
      id="expertise"
      eyebrow="Expertise & Certifications"
      title="Credentialed across Salesforce, SAP, and analytics platforms."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 auto-rows-[minmax(140px,auto)]">
        {/* Featured hero bento cell */}
        <Reveal delay={0} className="col-span-2 row-span-2 sm:col-span-2">
          <div className="group glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-glow)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-accent">
                <Sparkles className="h-3 w-3" /> Signature Expertise
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Salesforce Marketing Cloud <span className="text-gradient">Intelligence</span>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                Recognized expert in Datorama / MC Intelligence — trained consultants and delivered bootcamps across Singapore, Europe, India, and the USA.
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {["MC Intelligence", "Email Specialist", "Personalization", "Heroku"].map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/75">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        {certifications.map((c, i) => {
          // Bento sizing pattern: certain cards span 2 cols
          const wide = i === 2 || i === 5;
          return (
            <Reveal key={c} delay={80 + i * 60} y={20} className={wide ? "sm:col-span-2" : ""}>
              <div className="group glass-card flex h-full items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-glow)]">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/25 to-accent/15 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <BadgeCheck className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-snug text-white">{c}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Certified</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={150}>
        <div className="mt-12">
          <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">Core Skills</div>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 40} y={12}>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-white">
                  {s}
                </span>
              </Reveal>
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
    <Section
      id="leadership"
      eyebrow="Leadership"
      title="How colleagues, partners, and clients describe working together."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {traits.map((tr, i) => (
          <Reveal key={tr.t} delay={i * 100} y={24}>
            <div className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-accent/40">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-accent/25 transition-transform group-hover:scale-110" />
              <div className="font-display text-xl font-semibold text-white">{tr.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{tr.d}</p>
              <div className="mt-6 h-px w-12 bg-gradient-to-r from-accent to-transparent" />
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
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
    { src: sosVillageAsset.url, caption: "SOS Village session — a one-hour visit that ran three hours because of how engaged the students were." },
    { src: ngoSessionAsset.url, caption: "Guiding students onto their higher-education and career paths — resumes, interviews, and self-belief." },
  ];
  return (
    <Section
      id="impact"
      eyebrow="Social Impact"
      title="Sardar Swaran Singh's Anandvan — A Dream of a Father."
      subtitle="An NGO founded and chaired in memory of his father, Swaran Singh — providing free education to underprivileged children near Lucknow, Uttar Pradesh."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6">
                {[["Jan 2022", "Began"], ["150+", "Students"], ["Nursery–5th", "Standards"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl font-bold text-gradient">{n}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/70 sm:text-base">
              <p>
                Started in January 2022 with roughly 150 students, nursery through 5th
                standard, drawn from financially underprivileged families near Lucknow.
              </p>
              <p>
                Beyond core academics, Anandvan teaches life skills and ethics — and
                for older students, resume-building, interview preparation, and career
                guidance, with the goal of creating real employment pathways.
              </p>
              <div className="flex items-center gap-2 pt-2 text-sm text-white/60">
                <GraduationCap className="h-4 w-4 text-accent" />
                <span className="font-medium text-white">@sssanandvan</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={200 + i * 150}>
              <figure className="group relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={p.src}
                  alt={p.caption}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/95 via-[color:var(--navy-deep)]/20 to-transparent" />
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
      src: pressMarathiAsset.url,
      title: "मोफत शिक्षणाचे 'आनंदवन'",
      sub: "Marathi press coverage of the free-education initiative — 'Anandvan of Free Education'.",
    },
    {
      src: ngoSessionAsset.url,
      title: "The News — Anandvan Session",
      sub: "Coverage of a mentorship session guiding students on higher education, career journeys, and life skills.",
    },
    {
      src: sosVillageAsset.url,
      title: "SOS Village Visit",
      sub: "Featured coverage of a community session with children and volunteers.",
    },
  ];
  return (
    <Section id="press" eyebrow="In the Press" title="Recognized coverage of the work.">
      <div className="relative -mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee py-2 pl-6 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
          {[...items, ...items].map((it, i) => (
            <article
              key={i}
              className="group/card relative w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-glow)] sm:w-[380px]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Press</div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{it.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = encodeURIComponent(String(data.get("name") ?? ""));
    const message = encodeURIComponent(String(data.get("message") ?? ""));
    const email = encodeURIComponent(String(data.get("email") ?? ""));
    window.location.href = `mailto:r7887950902@gmail.com?subject=${name}%20—%20Website%20Inquiry&body=${message}%0A%0AFrom:%20${email}`;
    setSent(true);
  };
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-ambient" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl animate-ambient-2" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-8 bg-accent" /> Contact
          </div>
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Let's build something that lasts.
          </h2>
          <p className="mt-4 max-w-xl text-white/60 sm:text-lg">
            Whether it's a Salesforce transformation, a cross-border business
            introduction, or a conversation about Anandvan — get in touch.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal delay={100}>
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "r7887950902@gmail.com", href: "mailto:r7887950902@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 95610 97388", href: "tel:+919561097388" },
                { icon: Building2, label: "Company", value: "Kefaru Technologies", href: "https://kefaru.com/" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="glass-card group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
                    <div className="truncate text-sm font-semibold text-white">{value}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </a>
              ))}
              <div className="pt-4">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Follow Anandvan</div>
                <div className="mt-3 flex gap-3">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a key={i} href="#" aria-label="Anandvan social"
                       className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-white/70 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                  <span className="ml-2 self-center text-sm text-white/60">@sssanandvan</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form onSubmit={onSubmit} className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Name</span>
                  <input required name="name" type="text"
                         className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent/60 focus:bg-white/[0.05]" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Email</span>
                  <input required name="email" type="email"
                         className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent/60 focus:bg-white/[0.05]" placeholder="you@company.com" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Message</span>
                <textarea required name="message" rows={5}
                          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-accent/60 focus:bg-white/[0.05]" placeholder="Tell me a bit about your project or idea…" />
              </label>
              <button type="submit"
                      className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold sm:w-auto">
                {sent ? "Opening mail…" : "Send Message"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-xs text-white/40">
                Prefer email? Reach me directly at r7887950902@gmail.com.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">GS</span>
          <span className="text-sm text-white/60">© {new Date().getFullYear()} Gurpreet Singh · All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/50">
          <a href="https://kefaru.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">Kefaru Technologies</a>
          <a href="#impact" className="transition-colors hover:text-accent">Anandvan NGO</a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <main className="min-h-screen bg-[color:var(--navy-deep)] text-white">
      <Nav />
      <Hero />
      <About />
      <Journey />
      <Global />
      <Expertise />
      <Leadership />
      <Impact />
      <Press />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
