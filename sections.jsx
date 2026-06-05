/* global React */
const { useState: useStateS, useRef: useRefS, useEffect: useEffectS } = React;

/* ============================================================ */
/* Shared monogram                                                */
/* ============================================================ */
function KMark({ size = 36, color = "var(--accent)" }) {
  // A simple bold "K"-arrow monogram
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <path
        d="M6 4 H14 V18 L24 4 H34 L22 20 L34 36 H24 L14 24 V36 H6 Z"
        fill={color}
      />
    </svg>
  );
}

/* ============================================================ */
/* shadcn-styled Badge (works without a bundler)                 */
/* ============================================================ */
function Badge({ children }) {
  return <span className="sh-badge">{children}</span>;
}

/* ============================================================ */
/* HERO                                                          */
/* ============================================================ */
function Hero() {
  const objects = [
    { id: "cd",       src: "images/cd.png",       alt: "CD case",
      style: { top: "12%",    left: "-3%",   width: "11%", aspectRatio: "1/1",  transform: "rotate(-22deg)" } },
    { id: "keyboard", src: "images/keyboard.png", alt: "Keyboard",
      style: { top: "-20%",   right: "-6%",  width: "30%", aspectRatio: "3/4",  transform: "rotate(65deg)"  } },
    { id: "earbuds",  src: "images/earbuds.png",  alt: "Earbuds",
      style: { top: "-7%",    left: "44%",   width: "11%", aspectRatio: "1/1",  transform: "rotate(28deg)"  } },
    { id: "latte",    src: "images/latte.png",    alt: "Iced latte",
      style: { top: "22%",    left: "8%",    width: "21%", aspectRatio: "2/3",  transform: "rotate(3deg)"   } },
    { id: "radio",    src: "images/radio.png",    alt: "Radio",
      style: { bottom: "-8%", right: "-8%",  width: "24%", aspectRatio: "4/5",  transform: "rotate(5deg)"   } },
    { id: "notebook", src: "images/notebook.png", alt: "Notebook",
      style: { bottom: "-5%", left: "-5%",   width: "20%", aspectRatio: "3/4",  transform: "rotate(-17deg)" } },
  ];

  return (
    <section id="index" className="hero bg-grid-dark" data-screen-label="00 Hero">
      <div className="hero-top">
        <div className="brand">
          <div className="mark"><KMark size={28} /></div>
          <div className="name">
            Khushi <b>Solanki</b>
            <span>business analyst · product · creative direction</span>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <div className="hero-wires" aria-hidden>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 12 6 C 28 24, 18 38, 30 50 S 14 70, 36 80 S 60 96, 78 84 S 96 60, 86 44 S 70 18, 52 22" />
            <path d="M 4 52 C 22 60, 30 76, 50 78 S 70 92, 88 96" />
          </svg>
        </div>

        {objects.map((o) => (
          <div key={o.id} className="hero-obj" style={o.style}>
            <img src={o.src} alt={o.alt} />
          </div>
        ))}

        <div className="hero-center">
          <div className="hero-wordmark">
            <span className="line">BA / Product</span>
            <span className="line accent">Portfolio</span>
          </div>
          <p className="hero-tagline">
            PRDs, flows, screens, dashboards, and creative systems for
            <span> real-world product problems.</span>
          </p>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="hero-meta">
          <div className="m">
            <span className="k">Available</span>
            <span className="v">Open to <b>BA / Product / Associate PM</b> roles</span>
          </div>
          <div className="m">
            <span className="k">Location</span>
            <span className="v"><b>India</b> · Remote-friendly</span>
          </div>
          <div className="m">
            <span className="k">Focus</span>
            <span className="v"><b>Product thinking</b> + business analysis + design direction</span>
          </div>
        </div>
        <div className="hero-ctas">
          <button className="btn accent" onClick={() => document.getElementById("work").scrollIntoView({ behavior: "smooth" })}>View Work →</button>
          <button className="btn">Download Resume →</button>
          <button className="btn dark" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact →</button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Marquee                                                       */
/* ============================================================ */
function Marquee() {
  const words = [
    { t: "Business Analysis", accent: false },
    { t: "Product Thinking",  accent: false },
    { t: "UX Design",         accent: false },
    { t: "Workflow Design",   accent: false },
    { t: "Creative Direction",accent: false },
  ];
  const items = [...words, ...words, ...words];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 50 }}>
            <span>{w.t}</span>
            <span className="sep" style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* ABOUT — editorial poster (no portrait, full-width spread)     */
/* ============================================================ */
/* ABOUT SECTION — self-contained, scoped to .about-section      */
/* ============================================================ */
function About() {
  return (
    <section id="about" className="about-section" data-screen-label="01 About">
      <img
        className="about-bg"
        src="images/about-photo.jpeg"
        alt="Khushi Solanki standing in a warm, light-filled stone corridor"
      />
      <div className="about-tint" aria-hidden></div>

      <div className="about-stage">
        {/* HEADLINE */}
        <div className="about-panel about-headline">
          <span className="about-kicker">portfolio 2026 · 01 — about</span>
          <h1>Hi, I'm <span className="o">Khushi</span><br />Solanki.</h1>
          <div className="about-tags">
            <span>Business Analysis</span>
            <span>Product Thinking</span>
            <span>Visual Storytelling</span>
          </div>
        </div>

        {/* INTRO */}
        <div className="about-panel about-intro">
          <span className="about-pin" aria-hidden></span>
          <span className="about-label">— intro</span>
          <p>I work at the intersection of <b>business analysis, product thinking and visual storytelling</b> — turning unclear ideas into structured product direction. I take messy problems, ask the right questions, map user journeys, and shape requirements that tell teams what to build and why.</p>
          <p>My work usually starts with a <em>problem statement</em>, a few uncomfortable questions, and a blank flow. From there I build PRDs, user stories, wireframes, dashboards, process maps and product concepts — <b>structured enough for teams</b>, <b>clear enough for users</b>.</p>
          <p>I care about making product thinking visible — connecting business goals with user needs, translating ambiguity into decisions, and using design to communicate the solution, not just decorate it.</p>
          <p className="about-off"><span>Off the clock —</span> editing visuals, exploring web layouts, making posters, or redesigning something nobody asked me to.</p>
        </div>

        {/* WHAT I SHIP */}
        <div className="about-panel about-ship">
          <span className="about-label">what i ship</span>
          <p className="about-shiplist">PRDs · User Flows · Specs · Journey Maps · Wireframes · Decks · Playbooks</p>
        </div>

        {/* EXPERIENCE */}
        <div className="about-panel about-experience">
          <div className="about-cardhead"><span className="about-label">experience</span><span className="about-rule" aria-hidden></span></div>
          <div className="about-row">
            <span className="yr">2024–2026</span>
            <div className="meta"><span className="role">Project Manager</span><span className="co">ProChat Technologies</span></div>
          </div>
          <div className="about-row">
            <span className="yr">2023–2024</span>
            <div className="meta"><span className="role">Product Associate Intern</span><span className="co">ProChat Technologies</span></div>
          </div>
          <div className="about-row">
            <span className="yr">2022–2023</span>
            <div className="meta"><span className="role">Marketing Intern</span><span className="co">Breathing Paper</span></div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="about-panel about-education">
          <div className="about-cardhead"><span className="about-label">education</span><span className="about-rule" aria-hidden></span></div>
          <div className="about-row">
            <span className="yr">2025–now</span>
            <div className="meta"><span className="role">PM, Generative &amp; Agentic AI</span><span className="co">BITSOM</span></div>
          </div>
          <div className="about-row">
            <span className="yr">2021–2024</span>
            <div className="meta"><span className="role">B.Tech, Artificial Intelligence</span><span className="co">G.H. Raisoni Institute · Nagpur</span></div>
          </div>
        </div>

        {/* FOCUS */}
        <div className="about-panel about-focus">
          <span className="about-label">focus</span>
          <ul>
            <li>Business Analysis</li>
            <li>Product Thinking</li>
            <li>UX / Wireframing</li>
            <li>Creative Direction</li>
          </ul>
        </div>

        {/* TOOLS */}
        <div className="about-panel about-tools">
          <span className="about-label">tools</span>
          <div className="about-chips">
            <span>Figma</span><span>JIRA</span><span>Notion</span><span>Miro</span><span>SQL</span><span>Excel</span><span>Sheets</span><span>Power BI</span><span>Canva</span><span>Adobe</span><span>PPT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* WORK — compact card grid                                      */
/* ============================================================ */
function Work({ onOpen }) {
  const sectionRef = useRefS(null);
  const cases = window.CASE_STUDIES || [];

  useEffectS(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('ws-visible'); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const projects = [
    {
      num: "01",
      cardClass: "wc-card--rto",
      title: "RTO Guard",
      desc: "Dashboard concept for identifying risky e-commerce orders before they become returns.",
      tags: ["BA", "Product Strategy", "Dashboard"],
      owned: "Requirements, dashboard IA, risk scoring logic, PRD",
      tools: "Figma · Miro · Notion · JIRA · Excel",
      url: "case-studies/rto-guard.html",
      csIndex: 0,
    },
    {
      num: "02",
      cardClass: "wc-card--meeting",
      title: "AI Meeting Brief",
      desc: "AI workspace for preparing meeting context, risks, and follow-up actions.",
      tags: ["Product Thinking", "AI", "Workflow"],
      owned: "Product spec, user flow, AI brief logic, core screens",
      tools: "Figma · Notion · Miro · JIRA",
      url: "case-studies/ai-meeting-brief.html",
      csIndex: 1,
    },
    {
      num: "03",
      cardClass: "wc-card--nudge",
      title: "Nudge",
      subtitle: "Buy where you decide",
      desc: "Checkout concept that lets buyers act at the moment of intent.",
      tags: ["UX Flow", "Commerce", "Case Study"],
      owned: "PRD, checkout embed spec, user flows, API contract",
      tools: "Figma · Notion · Miro · JIRA",
      url: "case-studies/nudge.html",
      csIndex: 2,
    },
    {
      num: "04",
      cardClass: "wc-card--healthcare",
      title: "Healthcare Memory-Care App",
      desc: "Confidential healthcare mobile app for dementia patient and caregiver support.",
      tags: ["Healthcare", "BA + PM", "Wireframes", "Mobile App"],
      owned: "Requirements · Client meetings · User flows · Wireframes · Product structure",
      tools: "Figma · Requirement mapping · Flow documentation",
      url: "case-studies/healthcare-memory-care.html",
      csIndex: null,
    },
    {
      num: "05",
      cardClass: "wc-card--wellness",
      title: "Tanvish Wellness App",
      desc: "Wellness mobile app for meditation videos, live meditation, daily quotes, and store experiences.",
      tags: ["Wellness", "BA + PM", "Wireframes", "UI Design"],
      owned: "Requirements · App flow · Wireframes · UI design · Feature structure",
      tools: "Figma · Product mapping · UI design · Client discussions",
      url: "case-studies/tanvish-wellness.html",
      csIndex: null,
    },
    {
      num: "06",
      cardClass: "wc-card--event",
      title: "Event Management SaaS",
      desc: "SaaS concept for managing events, registrations, vendors, attendees, and operational workflows.",
      tags: ["SaaS", "Event Management", "Dashboard"],
      owned: "Requirements · User flows · Dashboard structure · Admin workflows · Wireframes",
      tools: "Figma · Product mapping · Flow documentation",
      url: "case-studies/event-management-saas.html",
      csIndex: null,
    },
  ];

  function handleOpen(p) {
    if (p.url) { window.location.href = p.url; return; }
    const cs = cases[p.csIndex];
    if (cs) onOpen(cs);
  }

  return (
    <section id="work" ref={sectionRef} className="ws-section dark bg-grid-dark" data-screen-label="02 Work">

      <div className="ws-header">
        <div className="ws-eyebrow-row">
          <span className="ws-num">02</span>
          <span className="ws-dot-sep" />
          <span>Selected Work · 2024 — 26</span>
        </div>
        <h2 className="ws-headline">
          Business <span className="accent">analysis</span> &amp; product <span className="accent">thinking</span>
        </h2>
      </div>

      <div className="wc-grid">
        {projects.map((p) => (
          <div
            key={p.num}
            className={`wc-card${p.cardClass ? ' ' + p.cardClass : ''}`}
            onClick={() => handleOpen(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(p); }}
          >
            <div className="wc-top">
              <span className="wc-num">{p.num}</span>
              <div className="wc-tags">
                {p.tags.map((t) => <span className="wc-tag" key={t}>{t}</span>)}
              </div>
            </div>
            <h3 className="wc-title">
              {p.title}{p.subtitle && <span className="wc-subtitle"> — {p.subtitle}</span>}
            </h3>
            <p className="wc-desc">{p.desc}</p>
            <div className="wc-meta">
              <div className="wc-meta-row">
                <span className="wc-meta-k">Owned</span>
                <span className="wc-meta-v">{p.owned}</span>
              </div>
              <div className="wc-meta-row">
                <span className="wc-meta-k">Tools</span>
                <span className="wc-meta-v">{p.tools}</span>
              </div>
            </div>
            <div className="wc-foot">
              <span className="wc-btn">Open case study <span className="wc-arrow">→</span></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CyclingWord({ words }) {
  return (
    <span className="cycling-word-wrap">
      <span className="cycling-word accent">{words[0]}</span>
    </span>
  );
}

/* ============================================================ */
/* EXPERIENCE — constellation skill map (paper)                  */
/* ============================================================ */
const SKILL_CARDS_DATA = [
  { num: "01", title: "Business Analysis",    desc: "Requirements, stakeholder needs, workflows, and decision clarity.",          tag: "PRO BRAIN",       pos: { top: "10%", left: "50%" } },
  { num: "02", title: "Product Thinking",     desc: "Problems, users, scope, trade-offs, and business value.",                    tag: "MESSY + CLEAR",   pos: { top: "10%", left: "68%" } },
  { num: "03", title: "Project Management",   desc: "Timelines, dependencies, feedback loops, and delivery rhythm.",              tag: "DELIVERY MODE",   pos: { top: "24%", left: "82%" } },
  { num: "04", title: "UX / UI Design",       desc: "Screens, wireframes, flows, and usable interfaces.",                         tag: "DESIGN CHAOS",    pos: { top: "46%", left: "86%" } },
  { num: "05", title: "Creative Direction",   desc: "Visual systems, storytelling, layout, and brand feeling.",                   tag: "BIG PICTURE",     pos: { top: "66%", left: "82%" } },
  { num: "06", title: "PRDs",                 desc: "Structured product requirement documents that align teams.",                  tag: "SOURCE OF TRUTH", pos: { top: "82%", left: "68%" } },
  { num: "07", title: "Requirements Writing", desc: "Translating ambiguous needs into clear, actionable specs.",                  tag: "NO GUESSING",     pos: { top: "88%", left: "50%" } },
  { num: "08", title: "Stakeholder Mapping",  desc: "Identifying, aligning, and managing stakeholder expectations.",              tag: "PEOPLE LAYER",    pos: { top: "82%", left: "32%" } },
  { num: "09", title: "Dashboard Thinking",   desc: "Turning raw data into decisions through visual reporting.",                  tag: "DATA CLARITY",    pos: { top: "66%", left: "18%" } },
  { num: "10", title: "Wireframing",          desc: "Low to mid-fidelity flows that communicate before design does.",             tag: "THINK FIRST",     pos: { top: "46%", left: "14%" } },
  { num: "11", title: "Visual Storytelling",  desc: "Making complex information feel simple and worth reading.",                  tag: "SHOW DON'T TELL", pos: { top: "24%", left: "18%" } },
  { num: "12", title: "User Flows",           desc: "Mapping every step a user takes through a product journey.",                tag: "PATH FINDER",     pos: { top: "10%", left: "32%" } },
];

function Experience() {
  return (
    <section id="experience" className="exp-orbit bg-grid-paper" data-screen-label="03 Practice">
      <div className="eyebrow-light">
        <span className="num">03</span><span className="dot" /><span>Practice — 12 Skills</span>
      </div>

      <div className="exp-orbit-stage">
        {/* Connector lines: SVG x/y coords map directly to left%/top% of stage */}
        <svg className="exp-orbit-svg" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="50" x2="50" y2="10" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="68" y2="10" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="82" y2="24" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="86" y2="46" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="82" y2="66" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="68" y2="82" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="50" y2="88" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="32" y2="82" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="18" y2="66" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="14" y2="46" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="18" y2="24" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
          <line x1="50" y1="50" x2="32" y2="10" stroke="var(--ink)" strokeWidth="0.25" strokeDasharray="1.5 3" opacity="0.2"/>
        </svg>

        {/* Center card */}
        <div className="exp-orbit-center">
          <h2 className="exp-orbit-heading">What I do<br />on a Tuesday.</h2>
          <p className="exp-orbit-sub">Five disciplines that overlap on almost every product brief.</p>
          <div className="exp-orbit-tags">
            <span className="sticker tilt-l">★ open to freelance</span>
            <span className="sticker tilt-r">⌁ remote-friendly</span>
          </div>
        </div>

        {/* 12 skill cards — all identical size and style */}
        {SKILL_CARDS_DATA.map((card) => (
          <div key={card.num} className="exp-skill-card" style={card.pos}>
            <div className="exp-skill-num">EXP.{card.num}</div>
            <div className="exp-skill-title">{card.title}</div>
            <div className="exp-skill-desc">{card.desc}</div>
            <div className="exp-skill-tag">{card.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* SKILLS (dark)                                                 */
/* ============================================================ */
const SKILLS = [
  {
    title: "Business & Product", em: "Product",
    items: ["Requirement Gathering","PRD Writing","User Stories","Acceptance Criteria","Stakeholder Communication","Process Mapping","Market Research","Competitor Research"],
  },
  {
    title: "Execution & Delivery", em: "Delivery",
    items: ["Agile / Scrum","Sprint Planning","JIRA Boards","Task Tracking","Documentation","Review Presentations","Stakeholder Updates","QA Coordination"],
  },
  {
    title: "Design & Creative", em: "Creative",
    items: ["Wireframing","UI Layouts","Design Systems","Visual Storytelling","Figma Prototyping","Portfolio Presentation","Creative Direction","Poster / Web Design"],
  },
];

function Skills() {
  return (
    <section id="skills" className="section dark bg-grid-dark" data-screen-label="04 Skills">
      <div className="eyebrow-dark"><span className="num">04</span><span className="dot" /><span>Capabilities — 24 entries</span></div>
      <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 72px)", margin: "0 0 14px", color: "var(--paper-on-dark)" }}>
        Skills, <span style={{ color: "var(--accent)" }}>in three</span><br />columns.
      </h2>
      <p style={{ fontFamily: "var(--sans)", fontSize: 15, color: "rgba(239,233,221,0.7)", maxWidth: "52ch", margin: 0 }}>
        A working inventory of skills used across product briefs, case studies, and shipped work.
      </p>

      <div className="skills-grid">
        {SKILLS.map((col) => {
          const parts = col.title.split(col.em);
          return (
            <div className="skill-col" key={col.title}>
              <div className="label">{col.em.toUpperCase()} · {String(col.items.length).padStart(2, "0")}</div>
              <h4>{parts[0]}<span className="accent">{col.em}</span></h4>
              <ul>
                {col.items.map((it, i) => (
                  <li key={it}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}


/* ============================================================ */
/* CONTACT (paper)                                               */
/* ============================================================ */
function Contact() {
  const cards = [
    {
      k: "Email",
      v: "khushii.solannki@gmail.com",
      hint: "fastest way to reach me",
      ar: "↗",
      href: "mailto:khushii.solannki@gmail.com",
    },
    {
      k: "LinkedIn",
      v: "/in/khushisolanki-pm",
      hint: "roles, network, history",
      ar: "↗",
      href: "https://www.linkedin.com/in/khushisolanki-pm",
    },
    {
      k: "Resume",
      v: "Download Resume",
      hint: "BA · Product · UX",
      ar: "↓",
      href: "Khushi-Solanki-Resume.pdf",
      download: "Khushi-Solanki-Resume.pdf",
    },
  ];
  return (
    <section id="contact" className="contact bg-grid-paper" data-screen-label="06 Contact">
      <div className="eyebrow-light"><span className="num">06</span><span className="dot" /><span>Contact — let's chat</span></div>
      <h2>
        Let's build clear, <span className="accent">useful</span>,
        &amp; beautifully structured digital products.
        <span className="sticker">⌁ open · 2026</span>
      </h2>
      <p className="contact-sub">
        I'm open to <b>BA, Product Analyst, Associate PM, UX / Product, and creative product</b> roles.
        Also happy to collaborate on product ideas, case studies, dashboards, and early-stage concepts.
      </p>
      <div className="contact-grid">
        {cards.map((c) => (
          <a className="contact-card" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} download={c.download || undefined} key={c.k}>
            <div className="k">{c.k}</div>
            <div className="v"><span>{c.v}</span><span className="arrow">{c.ar}</span></div>
            <div className="hint">{c.hint}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Footer                                                        */
/* ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="left">
        <KMark size={22} color="var(--accent)" />
        <span>Khushi Solanki — Portfolio 2026</span>
      </div>
      <div className="right">
        <span>EST. 2024</span>
        <span>Made with care in Mumbai</span>
        <span>v2.0</span>
      </div>
    </footer>
  );
}




Object.assign(window, { Hero, Marquee, About, Work, Experience, Skills, Contact, Footer, KMark });
