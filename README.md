# Executive Portfolio Redesign

Use this GitHub repository as the source of truth and work directly on top of it:

https://github.com/SHAakti04/elevated-founder-site.git

Important:

Clone/import this repository first, understand the existing codebase, then make the UI changes on top of the current implementation. Do not start from a blank project. Preserve existing working features, routes, assets, contact form integration, floating call/WhatsApp buttons, and current portfolio content unless a change is needed for the new UI direction.

Live website reference:
https://gurpreetbahara.com/

UI reference:
Use the uploaded PDF: "Portfolio website design version 2.pdf"

Goal:
Redesign the existing Gurpreet Bahara portfolio into an advanced, premium, modern, highly animated, fully responsive executive portfolio website. Keep the best information and necessary sections from the current codebase/live website, but visually evolve it using the PDF design direction.

Important:
Do not remove important existing content. Merge the current website content with the PDF UI structure. Keep the current website’s real business, leadership, social impact, press, contact, call button, WhatsApp button, and contact form functionality. Do not break existing PHP contact form integration.

Current codebase context:
The app is React + TypeScript + Vite + Tailwind CSS. It already uses GSAP animations, lucide-react icons, a ParticleField, Reveal animations, floating call and WhatsApp buttons, and these major sections:
- Hero
- About
- Journey
- Global
- Expertise
- Leadership
- Impact / Anandvan NGO
- Press
- Contact
- Footer

PDF design direction to follow:
The PDF has an editorial premium portfolio style with:
- Minimal uppercase navigation: HOME, STORY, IMPACT, CONVERSATIONS, CONTACT, GET IN TOUCH
- Strong hero section with large “Gurpreet Singh”
- Role line: Founder, CEO, Technologist, Chairman
- Hero copy around 18+ years senior leadership, global digital transformation, Salesforce & AWS
- Philosophy / story section
- Metric strip: 3 companies, 18+ years, 100+ projects, continents/global experience
- Large personal quote block
- “The Work Beyond the Title” section with two venture cards:
  1. Kefaru Technologies - technology consulting, Salesforce, cloud execution
  2. SSS Anandvan - social impact, empowerment, NGO
- Journey timeline with years including 2024 Kefaru, 2023 Spaulding Ridge acquisition, 2021 SSS Anandvan, 2020 Bombora AppExchange, 2019 visualization award
- Blogs & Podcasts / Conversations section
- Book an Appointment / Contact section with gs@kefaru.com and phone

Design requirements:
Create a premium executive look, not a generic template. Use refined spacing, strong typography, cinematic section transitions, deep contrast, elegant motion, and high-end visual hierarchy. The hero section should strongly follow the PDF layout and mood, but use current website content and assets where useful.

Hero section must match the uploaded PDF UI very closely.

Specific hero layout:

- Use the PDF hero section as the main visual reference.

- Navigation should feel like the PDF: minimal, spaced uppercase text links across the top: HOME, STORY, IMPACT, CONVERSATIONS, CONTACT, GET IN TOUCH.

- Hero should have an editorial luxury layout, not a standard centered SaaS hero.

- Large name typography must be the first visual focus: “Gurpreet Singh” or “Gurpreet Singh Bahara”.

- Add the role line above or near the name in uppercase spaced text:

  FOUNDER  CEO  TECHNOLOGIST  CHAIRMAN

- Use the PDF-style supporting line:

  “18+ years of senior leadership across global digital transformation. Certified consultant in Salesforce & AWS.”

- Keep the current website’s real identity and CTAs, but visually arrange them like the PDF hero.

- The hero should feel spacious, minimal, premium, and editorial with strong typography, generous whitespace, refined grid alignment, and subtle animated background details.

- Do not make the hero look like the current circular-photo card layout if it conflicts with the PDF. Rework it to match the PDF’s premium editorial structure.

- If using the headshot, integrate it elegantly as a large editorial portrait or layered visual element without making it look like a generic profile card.

- Use advanced but tasteful motion: staggered nav reveal, role-line reveal, large name reveal, subtle background/parallax movement, and smooth CTA entrance.

- On mobile, preserve the same PDF-inspired hierarchy: nav/menu first, role line, large name, short description, CTAs, then portrait/visual if space allows. Priority: The hero section should be redesigned to look same as the uploaded PDF UI hero section as much as possible, while preserving Gurpreet’s real current website content and CTAs.  Content/section requirements:
- Keep About/Philosophy content from current website and PDF.
- Keep Global expansion/market positioning content from current website.
- Keep Expertise content: Salesforce, AWS/cloud, AI, consulting, GCC, partnerships, business strategy.
- Keep Social Impact/Anandvan content and photos.
- Keep Press section.
- Add or refine a “Conversations / Blogs & Podcasts” section inspired by the PDF. If no real podcast/blog URLs exist, create polished placeholder cards that do not claim fake external links; use “Coming soon” or non-clickable cards unless existing links exist.
- Keep Contact form exactly functional with existing `/contact.php` POST logic. Do not remove honeypot field. Do not alter PHP credentials/config files.
- Keep floating Call and WhatsApp buttons, but improve their responsive placement if needed.

Assets:
Use existing assets in `src/assets` where appropriate:
- headshot.jpg
- world-map.jpg
- smb-growth.jpg
- ngo-session.jpg
- sos-village.jpg
- press-marathi.jpg
- about-visual.jpg if useful

Generate any additional required premium visuals/icons/patterns if needed, but do not use generic stock-looking imagery. Prefer subtle executive textures, map lines, abstract business-network visuals, and tasteful motion backgrounds. Use lucide-react icons where icons are needed.

Animation requirements:
- Use existing GSAP utilities and current patterns.
- Add polished scroll-triggered reveals, timeline animations, hover micro-interactions, subtle parallax, animated stats/count-ups, and section transitions.
- Respect `prefers-reduced-motion`.
- Avoid heavy animations that hurt performance.
- No layout shifts or overlapping text during animation.

Responsive requirements:
Test and retest across:
- Mobile: 360px, 390px, 430px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px
- Windows/macOS/Linux browser rendering assumptions
- Touch and non-touch devices

Quality requirements:
- No text overflow.
- No buttons overlapping floating call/WhatsApp buttons.
- No clipped hero title.
- No broken navigation anchors.
- No broken images.
- No console errors.
- Contact form should still call `/contact.php`.
- Build must pass with `npm run build`.
- Test locally and fix all visible issues before final response.

Implementation guidance:
Refactor only where useful. Prefer improving existing `src/App.tsx`, `src/styles.css`, and existing components instead of rebuilding from scratch. Keep the existing stack: React, TypeScript, Tailwind, GSAP, lucide-react. Do not introduce unnecessary new dependencies.

Final response required:
Provide a concise summary of changes, files modified, tests run, and any remaining notes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/05260569-087c-47a2-98aa-0632ef9c54c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
