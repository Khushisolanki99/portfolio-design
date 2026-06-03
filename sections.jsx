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
/* DESIGN & ART (paper, premium mosaic)                          */
/* ============================================================ */
const ART_TILES = [
  // Feature poster — real image
  { cls: "feature", id: "poster.A1",   cap: "TYPE POSTER · 01",    ratio: "3:4",
    render: () => (
      <img src="uploads/art-tile-1.jpeg" alt="Art tile 1"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    ) },
  // Tall photo edit — real image
  { cls: "col-r",   id: "edit.warm.04", cap: "PHOTO EDIT · warm grade", ratio: "4:5",
    render: () => (
      <img src="uploads/art-tile-2.png" alt="Art tile 2"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    ) },
  { cls: "wide",    id: "deck.cover.07", cap: "DECK COVER · 09",    ratio: "16:9",
    render: () => (
      <img src="uploads/art-tile-3.jpeg" alt="Art tile 3"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    ) },
  { cls: "tall",    id: "edit.cool.03", cap: "PHOTO EDIT · cool grade", ratio: "4:5",
    render: () => (
      <video
        src="uploads/video-surge.mp4"
        autoPlay muted loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    ) },
  { cls: "third",   id: "video.01",   cap: "VIDEO · 01",    ratio: "9:16",
    render: () => (
      <video
        src="uploads/video-1.mp4"
        autoPlay muted loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    ) },
  { cls: "third",   id: "edit.cool.03", cap: "PHOTO EDIT · cool grade",  ratio: "4:5",
    render: () => (
      <img src="uploads/art-tile-4.png" alt="Photo edit cool grade"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#1a1515" }} />
    ) },
  { cls: "third",   id: "video.03", cap: "VIDEO · 03",   ratio: "9:16",
    render: () => (
      <video
        src="uploads/video-3.mp4"
        autoPlay muted loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    ) },
  { cls: "half",    id: "poster.C1",   cap: "TYPE POSTER · 06",    ratio: "16:9",
    render: () => (
      <div className="art-ph type-poster">
        <div className="glyph" style={{ fontSize: "clamp(48px, 12vw, 160px)" }}>2026<small>portfolio season</small></div>
      </div>
    ) },
  { cls: "half",    id: "deck.cover.18", cap: "DECK COVER · brief", ratio: "16:9",
    render: () => (
      <div className="art-ph deck">
        <div className="top"><span><span className="num">brief</span> · 02</span><span>placeholder</span></div>
        <div className="big">Deck<br /><em>cover — 03.</em></div>
        <div className="bot"><span>drop a real export</span><div className="bar" /><span>—</span></div>
      </div>
    ) },
];

function DesignArt() {
  return (
    <section id="art" className="art bg-grid-paper" data-screen-label="03 Design & Art">
      <div className="art-head">
        <div>
          <div className="eyebrow-light"><span className="num">03</span><span className="dot" /><span>Design &amp; Art — off the clock</span></div>
          <h2>The other <span className="accent">half</span><br />of the studio.</h2>
          <p className="lede">
            Posters I make for no one in particular, photos I edit until the light feels right,
            and deck covers I redesign for the joy of laying things out. <b>Drop real exports
            on any tile</b> — these are placeholders waiting for the good stuff.
          </p>
        </div>
        <div className="filters">
          <span className="on">All · 09</span>
          <span>Type</span>
          <span>Photo</span>
          <span>Decks</span>
        </div>
      </div>

      <div className="art-mosaic">
        {ART_TILES.map((t) => (
          <div className={`art-tile ${t.cls}`} key={t.id}>
            {t.render()}
            <span className="corner-tl"><span className="dot" />{t.id}</span>
            <span className="corner-tr">{t.ratio}</span>
            <span className="cap">[ {t.cap} ]</span>
          </div>
        ))}
      </div>

      <div className="art-index">
        <span><span className="accent">●</span> 09 pieces · 2024 — 26</span>
        <span>filed under: posters, edits, deck covers</span>
        <span>not for sale · made for fun</span>
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


/* ============================================================ */
/* CREATIVE ARCHIVE                                              */
/* ============================================================ */
const ARCHIVE_FILTERS = ['All', 'Product / UX', 'Brand & Web', 'Social / Video', 'Print / Expo', 'Healthcare'];

const SOURCE_BADGE_MAP = {
  'Figma':     '#9059E8',
  'Web Page':  '#1A73E8',
  'YouTube':   '#E52D27',
  'Instagram': '#C13584',
  'Image':     '#3B7A56',
  'PDF':       '#C05621',
  'Video':     '#E0411F',
  'Mixed':     '#6B6059',
};

const ARCHIVE_CARDS = [
  {
    id: '01',
    title: 'Memotag Healthcare Wireframes',
    category: 'Product / UX',
    description: 'Wireframe support for a healthcare product focused on dementia patients — structuring product flows, early screen direction, and information architecture.',
    tags: ['Healthcare', 'Wireframes', 'UX Flow'],
    sourceType: 'Figma',
    sourceUrl: null,
    ctaLabel: 'View Figma',
  },
  {
    id: '02',
    title: 'Healthcare Mobile App Concepts',
    category: 'Healthcare',
    description: 'Mobile app screen concepts focused on clarity, trust, and usability — for healthcare contexts where hierarchy and readability matter most.',
    tags: ['Mobile UI', 'Healthcare', 'App Design'],
    sourceType: 'Image',
    sourceUrl: null,
    ctaLabel: 'View Screens',
  },
  {
    id: '03',
    title: 'Brand Articles & Web Pages',
    category: 'Brand & Web',
    description: 'Editorial article layouts and web pages designed for brand storytelling — making content feel sharper, more readable, and visually memorable.',
    tags: ['Web Design', 'Article Layout', 'Brand Content'],
    sourceType: 'Web Page',
    sourceUrl: null,
    ctaLabel: 'View Page',
  },
  {
    id: '04',
    title: 'Online Presence for Growing Brands',
    category: 'Brand & Web',
    description: 'Helped brands establish online presence through visual design, social creatives, and content structure.',
    tags: ['Brand Design', 'Social Media', 'Content'],
    sourceType: 'Mixed',
    sourceUrl: null,
    ctaLabel: 'View Work',
  },
  {
    id: '05',
    title: 'Podcast Edits & Featured Videos',
    category: 'Social / Video',
    description: 'Short-form edits, podcast clips, and featured video assets for social platforms — cut for shareability and pacing.',
    tags: ['Podcast', 'Reels', 'Video Editing'],
    sourceType: 'Instagram',
    sourceUrl: null,
    ctaLabel: 'Watch',
  },
  {
    id: '06',
    title: 'Brochures & Government Expo Designs',
    category: 'Print / Expo',
    description: 'Brochure and expo-facing visual designs for formal brand and government-facing communication.',
    tags: ['Brochure', 'Expo', 'Print Design'],
    sourceType: 'PDF',
    sourceUrl: null,
    ctaLabel: 'View Designs',
  },
  {
    id: '07',
    title: 'Overseas Client Brand Work',
    category: 'Social / Video',
    description: 'Brand visuals and video editing for overseas clients — shaping digital presence and communication style for international audiences.',
    tags: ['Client Work', 'Brand Design', 'Video Editing'],
    sourceType: 'Mixed',
    sourceUrl: null,
    ctaLabel: 'View Work',
  },
];

function CreativeWork() {
  const [activeFilter, setActiveFilter] = useStateS('All');

  const visible = activeFilter === 'All'
    ? ARCHIVE_CARDS
    : ARCHIVE_CARDS.filter(c => c.category === activeFilter);

  function handleCardClick(card) {
    if (card.sourceUrl) {
      window.open(card.sourceUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <section id="creative-work" className="creative-work-section bg-grid-dark" data-screen-label="03b Archive">

      <div className="cw-header">
        <div className="cw-eyebrow">
          <span className="cw-eyebrow-num">03b</span>
          <span className="cw-eyebrow-dot" />
          <span>Creative Archive — 7 projects</span>
        </div>
        <h2 className="cw-headline">
          Creative <span className="accent">archive</span> &amp;<br />visual work
        </h2>
        <p className="cw-subtitle">
          Wireframes, brand pages, social videos, brochures, and healthcare screens —
          work across formats and clients, kept here as a curated visual archive.
        </p>
      </div>

      <div className="cw-filters">
        {ARCHIVE_FILTERS.map(f => (
          <button
            key={f}
            className={`creative-filter-chip${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="creative-work-grid">
        {visible.map(card => {
          const badgeColor = SOURCE_BADGE_MAP[card.sourceType] || '#6B6059';
          const hasLink = !!card.sourceUrl;
          return (
            <div
              key={card.id}
              className={`creative-work-card${hasLink ? '' : ' ca-no-link'}`}
              onClick={() => handleCardClick(card)}
              role={hasLink ? 'link' : undefined}
              tabIndex={hasLink ? 0 : undefined}
              onKeyDown={hasLink ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(card); } : undefined}
            >
              <div className="cw-card-thumb">
                <div className="cw-thumb-inner">
                  <span className="cw-thumb-label">[ {card.category} ]</span>
                  <span className="cw-thumb-num">{card.id}</span>
                </div>
                <span className="ca-source-badge" style={{ background: badgeColor }}>
                  {card.sourceType}
                </span>
              </div>

              <div className="cw-card-body">
                <div className="cw-card-cat">{card.category}</div>
                <h3 className="cw-card-title">{card.title}</h3>
                <p className="cw-card-desc">{card.description}</p>
                <div className="cw-card-tags">
                  {card.tags.map(t => <span key={t} className="cw-tag">{t}</span>)}
                </div>
                <div className="cw-card-foot">
                  {hasLink ? (
                    <span className="cw-card-cta">
                      {card.ctaLabel} <span className="cw-arrow">→</span>
                    </span>
                  ) : (
                    <span className="cw-card-cta ca-cta-soon">Coming soon</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="cw-empty">No items in this category yet.</p>
      )}
    </section>
  );
}

/* ============================================================ */
/* CREATIVE DIRECTION & PRODUCTION WORK                         */
/* ============================================================ */

const CP_FILTERS = ['All', 'Production', 'Post-Production', 'Podcast', 'Brand Work', 'Website / Figma', 'Event Design', 'Social Content'];

const CP_SOURCE_META = {
  'Images':          { color: '#3B7A56' },
  'YouTube':         { color: '#E52D27' },
  'Figma Prototype': { color: '#9059E8' },
  'Mixed Media':     { color: '#6B6059' },
  'Coming Soon':     { color: '#9a9390' },
};

// ── Project data ────────────────────────────────────────────────
// To replace placeholders later:
//   thumbnails: swap null → actual path, e.g. "images/tedx-1.jpg"
//   links.youtube: add YouTube URL, e.g. "https://www.youtube.com/..."
//   links.figma:   add Figma prototype URL, e.g. "https://www.figma.com/proto/..."
//   links.primary: add any other external link
const CP_PROJECTS = [
  {
    id: '01',
    title: 'TEDx IIM 2025',
    category: 'Production · Post-Production · Event',
    filterTags: ['Production', 'Post-Production', 'Event Design'],
    description: 'Production and post-production support for TEDx IIM 2025, including event visuals, content coordination, and post-event creative assets.',
    responsibilities: ['Production support', 'Post-production', 'Visual coordination', 'Event content'],
    tags: ['TEDx', 'Event', 'Production', 'Editing'],
    sourceType: 'Images',
    // REPLACE: e.g. thumbnails: ["images/tedx-1.jpg", "images/tedx-2.jpg", "images/tedx-3.jpg"]
    thumbnails: [null, null, null],
    links: {
      // REPLACE: primary: "https://..."
      primary: null,
    },
    ctaLabel: 'View Work →',
    notes: null,
  },
  {
    id: '02',
    title: 'Ruf Studios',
    category: 'Creative Studio · Brand Work',
    filterTags: ['Brand Work'],
    description: 'Started my own creative studio focused on design, visuals, editing, and digital presence for brands and creators.',
    responsibilities: ['Creative direction', 'Brand visuals', 'Editing', 'Client communication', 'Digital presence'],
    tags: ['Studio', 'Brand', 'Design', 'Video'],
    sourceType: 'Mixed Media',
    // REPLACE: e.g. thumbnails: ["images/ruf-1.jpg", "images/ruf-2.jpg"]
    thumbnails: [null, null],
    links: {
      // REPLACE: primary: "https://..."
      primary: null,
    },
    ctaLabel: 'View Studio Work →',
    notes: null,
  },
  {
    id: '03',
    title: 'Sayacare Podcast',
    category: 'Podcast · Production · Post-Production',
    filterTags: ['Podcast', 'Production', 'Post-Production'],
    description: 'Podcast production and post-production work including edits, episode assets, short clips, and platform-ready video content.',
    responsibilities: ['Podcast editing', 'Video cleanup', 'Short-form edits', 'Publishing assets'],
    tags: ['Podcast', 'YouTube', 'Editing', 'Clips'],
    sourceType: 'YouTube',
    thumbnails: [],
    links: {
      // REPLACE: youtube: "https://www.youtube.com/channel/..."
      youtube: null,
    },
    ctaLabel: 'Watch Episodes →',
    notes: null,
  },
  {
    id: '04',
    title: 'The Career Company',
    category: 'Video · Social Content',
    filterTags: ['Social Content', 'Post-Production'],
    description: 'Video editing and content support for career-focused videos, helping shape educational content into platform-ready assets.',
    responsibilities: ['Video editing', 'Content formatting', 'Social-ready edits', 'YouTube support'],
    tags: ['Career', 'YouTube', 'Editing', 'Social'],
    sourceType: 'YouTube',
    thumbnails: [],
    links: {
      // REPLACE: youtube: "https://www.youtube.com/..."
      youtube: null,
    },
    ctaLabel: 'Watch Work →',
    notes: null,
  },
  {
    id: '05',
    title: 'Advantage Vidarbha',
    category: 'Event Design · Visual Communication',
    filterTags: ['Event Design'],
    description: 'Visual design support for Advantage Vidarbha, including event-facing creatives, presentation-style assets, and communication material.',
    responsibilities: ['Visual design', 'Event creatives', 'Layouts', 'Communication assets'],
    tags: ['Event', 'Design', 'Vidarbha', 'Visuals'],
    sourceType: 'Images',
    // REPLACE: e.g. thumbnails: ["images/vidarbha-1.jpg", "images/vidarbha-2.jpg", "images/vidarbha-3.jpg"]
    thumbnails: [null, null, null],
    links: {
      // REPLACE: primary: "https://..."
      primary: null,
    },
    ctaLabel: 'View Designs →',
    notes: null,
  },
  {
    id: '06',
    title: 'Run Frenzy Website',
    category: 'Website · Figma Prototype',
    filterTags: ['Website / Figma'],
    description: 'Website design/prototype work for Run Frenzy, focused on creating a clean digital experience and visual direction.',
    responsibilities: ['Website layout', 'Figma prototype', 'Visual design', 'Interaction planning'],
    tags: ['Website', 'Figma', 'Prototype', 'UI'],
    sourceType: 'Figma Prototype',
    // REPLACE: e.g. thumbnails: ["images/runfrenzy-thumb.jpg"]
    thumbnails: [null],
    links: {
      // REPLACE: figma: "https://www.figma.com/proto/..."
      figma: null,
    },
    ctaLabel: 'Open Prototype →',
    notes: null,
  },
  {
    id: '07',
    title: 'Cheap Marketing',
    category: 'Brand Work · Design · Video Editing',
    filterTags: ['Brand Work', 'Social Content'],
    description: 'Design and video editing support for marketing-focused brand content, social assets, and visual communication.',
    responsibilities: ['Graphic design', 'Video editing', 'Social creatives', 'Brand content'],
    tags: ['Marketing', 'Design', 'Editing', 'Social'],
    sourceType: 'Mixed Media',
    // REPLACE: e.g. thumbnails: ["images/cheapmkt-1.jpg", "images/cheapmkt-2.jpg"]
    thumbnails: [null, null],
    links: {
      // REPLACE: primary: "https://..."
      primary: null,
    },
    ctaLabel: 'View Work →',
    notes: null,
  },
];

// ── Card preview area (type-aware) ──────────────────────────────
function CPCardPreview({ project }) {
  const { sourceType, thumbnails } = project;

  if (sourceType === 'YouTube') {
    return (
      <div className="cp-preview cp-preview--yt">
        <div className="cp-yt-mock">
          <div className="cp-yt-play">▶</div>
          <span className="cp-yt-label">YouTube</span>
        </div>
      </div>
    );
  }

  if (sourceType === 'Figma Prototype') {
    return (
      <div className="cp-preview cp-preview--figma">
        <div className="cp-figma-mock">
          <svg width="28" height="42" viewBox="0 0 38 57" fill="none" aria-hidden="true">
            <rect x="0"  y="0"  width="18" height="18" rx="9"  fill="rgba(239,233,221,0.22)" />
            <rect x="20" y="0"  width="18" height="18" rx="9"  fill="rgba(239,233,221,0.22)" />
            <rect x="0"  y="20" width="18" height="18" rx="0"  fill="rgba(239,233,221,0.22)" />
            <rect x="20" y="20" width="18" height="18" rx="9"  fill="rgba(239,233,221,0.22)" />
            <rect x="0"  y="40" width="18" height="18" rx="9 9 9 9" fill="rgba(239,233,221,0.22)" />
          </svg>
          <span className="cp-figma-label">Figma Prototype</span>
        </div>
      </div>
    );
  }

  // Images / Mixed Media: 2–3 placeholder thumbnails
  const items = thumbnails.length > 0 ? thumbnails.slice(0, 3) : [null, null];
  return (
    <div className={`cp-preview cp-preview--imgs cp-imgs-${items.length}`}>
      {items.map((src, i) => (
        <div key={i} className="cp-thumb-ph">
          {src
            ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : <span className="cp-thumb-ph-label">{String(i + 1).padStart(2, '0')}</span>
          }
        </div>
      ))}
    </div>
  );
}

// ── Individual card ─────────────────────────────────────────────
function CPCard({ project, onOpen }) {
  const meta = CP_SOURCE_META[project.sourceType] || { color: '#6B6059' };
  return (
    <div
      className="cp-card"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(project); }}
    >
      <div className="cp-card-media">
        <CPCardPreview project={project} />
        <span className="cp-source-badge" style={{ background: meta.color }}>
          {project.sourceType}
        </span>
      </div>

      <div className="cp-card-body">
        <div className="cp-card-cat">{project.category}</div>
        <h3 className="cp-card-title">{project.title}</h3>
        <p className="cp-card-desc">{project.description}</p>
        <div className="cp-card-resp">
          {project.responsibilities.map((r) => (
            <span key={r} className="cp-resp-chip">{r}</span>
          ))}
        </div>
        <div className="cp-card-tags">
          {project.tags.map((t) => <span key={t} className="cp-tag">{t}</span>)}
        </div>
        <div className="cp-card-foot">
          <span className="cp-card-cta">{project.ctaLabel} <span className="cp-cta-arrow">→</span></span>
        </div>
      </div>
    </div>
  );
}

// ── Detail modal ────────────────────────────────────────────────
function CPModal({ project, onClose }) {
  useEffectS(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const meta = CP_SOURCE_META[project.sourceType] || { color: '#6B6059' };
  const primaryLink = project.links.youtube || project.links.figma || project.links.primary;

  return (
    <div className="cp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cp-modal" role="dialog" aria-modal="true">

        {/* Bar */}
        <div className="cp-modal-bar">
          <div className="cp-modal-bar-left">
            <span className="cp-modal-num">{project.id}</span>
            <span className="cp-modal-bar-div" />
            <span className="cp-modal-bar-cat">{project.category}</span>
          </div>
          <button className="cp-modal-close" onClick={onClose}>✕ Close</button>
        </div>

        {/* Body */}
        <div className="cp-modal-body">

          {/* Left: text */}
          <div className="cp-modal-left">
            <h2 className="cp-modal-title">{project.title}</h2>
            <p className="cp-modal-desc">{project.description}</p>

            <div className="cp-modal-block">
              <div className="cp-modal-label">My responsibilities</div>
              <ul className="cp-modal-resp">
                {project.responsibilities.map((r, i) => (
                  <li key={i}>
                    <span className="cp-modal-resp-n">{String(i + 1).padStart(2, '0')}</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cp-modal-tags">
              {project.tags.map((t) => <span key={t} className="cp-tag">{t}</span>)}
            </div>

            {project.notes && (
              <div className="cp-modal-block">
                <div className="cp-modal-label">Notes</div>
                <p className="cp-modal-note-text">{project.notes}</p>
              </div>
            )}

            <div className="cp-modal-ctas">
              {primaryLink ? (
                <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="cp-modal-btn cp-modal-btn--primary">
                  {project.ctaLabel}
                </a>
              ) : (
                <span className="cp-modal-btn cp-modal-btn--soon">Link coming soon</span>
              )}
            </div>
          </div>

          {/* Right: preview */}
          <div className="cp-modal-right">
            <span className="cp-modal-source-badge" style={{ background: meta.color }}>
              {project.sourceType}
            </span>

            {project.sourceType === 'YouTube' && (
              <div className="cp-modal-yt">
                <div className="cp-yt-play cp-yt-play--lg">▶</div>
                <span className="cp-yt-label">
                  {project.links.youtube ? 'Use the button below to watch →' : 'YouTube link coming soon'}
                </span>
              </div>
            )}

            {project.sourceType === 'Figma Prototype' && (
              <div className="cp-modal-figma">
                <svg width="44" height="66" viewBox="0 0 38 57" fill="none" aria-hidden="true">
                  <rect x="0"  y="0"  width="18" height="18" rx="9" fill="rgba(24,21,19,0.18)" />
                  <rect x="20" y="0"  width="18" height="18" rx="9" fill="rgba(24,21,19,0.18)" />
                  <rect x="0"  y="20" width="18" height="18" rx="0" fill="rgba(24,21,19,0.18)" />
                  <rect x="20" y="20" width="18" height="18" rx="9" fill="rgba(24,21,19,0.18)" />
                  <rect x="0"  y="40" width="18" height="18" rx="9" fill="rgba(24,21,19,0.18)" />
                </svg>
                <span className="cp-figma-label cp-figma-label--modal">
                  {project.links.figma ? 'Open prototype via button below →' : 'Figma link coming soon'}
                </span>
              </div>
            )}

            {(project.sourceType === 'Images' || project.sourceType === 'Mixed Media') && (
              <div className="cp-modal-gallery">
                {project.thumbnails.length > 0 ? project.thumbnails.map((src, i) => (
                  <div key={i} className="cp-modal-img-ph">
                    {src
                      ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
                      : <span className="cp-thumb-ph-label">
                          {/* REPLACE: image {i + 1} — swap with real path in thumbnails array */}
                          img {String(i + 1).padStart(2, '0')}
                        </span>
                    }
                  </div>
                )) : (
                  <div className="cp-modal-img-ph">
                    <span className="cp-thumb-ph-label">Images coming soon</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────
function CreativeDirectionWork() {
  const [activeFilter, setActiveFilter] = useStateS('All');
  const [openProject, setOpenProject] = useStateS(null);

  const visible = activeFilter === 'All'
    ? CP_PROJECTS
    : CP_PROJECTS.filter((p) => p.filterTags.includes(activeFilter));

  return (
    <section id="creative-production" className="cp-section bg-grid-dark" data-screen-label="03a Creative">

      <div className="cp-header">
        <div className="cp-eyebrow">
          <span className="cp-eyebrow-num">03a</span>
          <span className="cp-eyebrow-dot" />
          <span>Creative Direction &amp; Production — {CP_PROJECTS.length} projects</span>
        </div>
        <h2 className="cp-headline">
          Creative direction &amp; <span className="accent">production</span> work
        </h2>
        <p className="cp-subtitle">
          Alongside product and BA work, I've worked across event production, podcast edits,
          brand visuals, website prototypes, social content, and creative systems for different
          teams, studios, and clients.
        </p>
        <p className="cp-resp-note">
          My responsibilities usually included planning creative direction, coordinating
          production needs, designing visuals, editing videos, preparing brand assets,
          structuring content, and helping teams present their work more clearly online.
        </p>
      </div>

      <div className="cp-filters">
        {CP_FILTERS.map((f) => (
          <button
            key={f}
            className={`cp-filter-chip${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="cp-grid">
        {visible.map((p) => (
          <CPCard key={p.id} project={p} onOpen={setOpenProject} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="cp-empty">No projects in this category yet.</p>
      )}

      {openProject && (
        <CPModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}

Object.assign(window, { Hero, Marquee, About, Work, Experience, Skills, DesignArt, Contact, Footer, KMark, CreativeWork, CreativeDirectionWork });
