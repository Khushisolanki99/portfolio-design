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
/* ABOUT — editorial poster (reference-matched)                  */
/* ============================================================ */
function About() {
  return (
    <section id="about" className="about bg-grid-paper" data-screen-label="01 About">
      <div className="ae-wrap">

        {/* Portrait — left, full height */}
        <div className="ae-portrait">
          <img className="cutout" src="images/khushi.png" alt="Khushi Solanki — portrait" />
          <span className="sticker ae-hecho tilt-r">✎ MADE BY KHUSHI</span>
        </div>

        {/* Content — right */}
        <div className="ae-content">

          {/* Heading + location stickers */}
          <div className="ae-head-zone">
            <h1 className="ae-head">Hi, I'm <span className="accent">Khushi</span> Solanki</h1>
          </div>

          {/* Three-column middle: bio | experience | sidebar */}
          <div className="ae-middle">

            {/* Col 1: Intro bio */}
            <div className="ae-bio">
              <p>
                I work at the intersection of <b>business analysis, product thinking,
                and visual storytelling</b>. I take messy problems, turn them into clear
                requirements, map the user journey, and shape screens that make the
                solution easier to understand.
              </p>
              <p>
                My work starts with a <em style={{color:"var(--accent)"}}>problem statement</em>, a few uncomfortable
                questions, and a blank flow. From there I build PRDs, user stories,
                wireframes and dashboards that are <b>structured enough for teams</b> and
                <b> clear enough for users</b>.
              </p>
              <div className="ae-ships">
                <span className="lbl">What I ship →</span>
                PRDs · User flows · Specs · Journey maps · Wireframes · Decks · Playbooks
              </div>
            </div>

            {/* Col 2: Experience */}
            <div className="ae-exp-col">
              <div className="ae-sec-title">Experience</div>
              <div className="ae-timeline">
                <div className="ae-entry">
                  <div className="ae-yr ac">2024<small>26</small></div>
                  <div><div className="ae-co">ProCohat Technologies</div><div className="ae-role">Project Manager</div></div>
                </div>
                <div className="ae-entry">
                  <div className="ae-yr ac">2023<small>24</small></div>
                  <div><div className="ae-co">ProCohat Technologies</div><div className="ae-role">Product Associate Intern</div></div>
                </div>
                <div className="ae-entry">
                  <div className="ae-yr ac">2022<small>23</small></div>
                  <div><div className="ae-co">Breathing Paper</div><div className="ae-role">Marketing Intern</div></div>
                </div>
              </div>
            </div>

            {/* Col 3: Education + Focus + Tools */}
            <div className="ae-sidebar">
              <div className="ae-sb-block">
                <div className="ae-sec-title">Education</div>
                <div className="ae-timeline">
                  <div className="ae-entry">
                    <div className="ae-yr gr">2021<small>24</small></div>
                    <div><div className="ae-co">B.Tech, Artificial Intelligence</div><div className="ae-role">G.H. Raisoni Institute of Engineering &amp; Technology, Nagpur</div></div>
                  </div>
                  <div className="ae-entry">
                    <div className="ae-yr gr">2025<small>now</small></div>
                    <div><div className="ae-co">Product Management with Generative &amp; Agentic AI</div><div className="ae-role">BITSoM</div></div>
                  </div>
                </div>
              </div>
              <div className="ae-sb-block">
                <div className="ae-sec-title">Focus</div>
                <ul className="ae-focus-list">
                  <li>Business Analysis</li>
                  <li>Product Thinking</li>
                  <li>UX / Wireframing</li>
                  <li>Creative Direction</li>
                </ul>
              </div>
              <div className="ae-sb-block">
                <div className="ae-sec-title">Tools</div>
                <div className="ae-tag-cloud">
                  {["Figma","JIRA","Notion","Miro","SQL","Excel","Google Sheets","Power BI","Canva","Adobe Suite","PowerPoint"].map(t => (
                    <span key={t} className="ae-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Polaroid collage — bottom */}
          <div className="ae-collage">
            <div className="ae-poly tilt-a">
              <image-slot id="about-poly-1" shape="rect" placeholder="workspace ↓"
                style={{width:"100%",aspectRatio:"4/3",background:"#d8cfc0"}}></image-slot>
              <div className="ae-cap">art ★</div>
            </div>
            <div className="ae-poly tilt-b">
              <image-slot id="about-poly-2" shape="rect" placeholder="sketches ↓"
                style={{width:"100%",aspectRatio:"4/3",background:"#d8cfc0"}}></image-slot>
              <div className="ae-cap">picture ♡</div>
            </div>
            <div className="ae-poly tilt-c">
              <image-slot id="about-poly-3" shape="rect" placeholder="off-hours ↓"
                style={{width:"100%",aspectRatio:"4/3",background:"#d8cfc0"}}></image-slot>
              <div className="ae-cap">coffee ✰</div>
            </div>
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
      cardClass: "wc-card--mvp",
      title: "Idea-to-MVP Platform",
      desc: "Platform concept for turning rough ideas into structured MVP plans.",
      tags: ["Product", "MVP", "Planning"],
      owned: "PRD, scope scoring, flow generator, idea-to-spec playbook",
      tools: "Figma · Notion · Miro · JIRA",
      csIndex: 2,
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
/* EXPERIENCE — compact skill map (paper)                        */
/* ============================================================ */
const DISCIPLINES = [
  {
    idx: "01", title: "Business Analysis",
    desc: "Requirements, stakeholder needs, workflows, and decision clarity.",
    tag: "PRD brain", delay: "0s",
    pos: { top: "12%", left: "14%" },
  },
  {
    idx: "02", title: "Product Thinking",
    desc: "Problems, users, scope, trade-offs, and business value.",
    tag: "messy → clear", delay: "0.8s",
    pos: { top: "10%", left: "76%" },
  },
  {
    idx: "03", title: "Project Management",
    desc: "Timelines, dependencies, feedback loops, and delivery rhythm.",
    tag: "delivery mode", delay: "1.6s",
    pos: { top: "46%", left: "88%" },
  },
  {
    idx: "04", title: "UX / UI Design",
    desc: "Screens, wireframes, flows, and usable interfaces.",
    tag: "design chaos", delay: "2.4s",
    pos: { top: "80%", left: "13%" },
  },
  {
    idx: "05", title: "Creative Direction",
    desc: "Visual systems, storytelling, layout, and brand feeling.",
    tag: "big picture", delay: "3.2s",
    pos: { top: "82%", left: "72%" },
  },
];

const MICRO_SKILLS = [
  { label: "Requirements Writing", desc: "Turning ambiguity into clear product specs.",              delay: "0.4s", pos: { top: "28%", left: "27%" } },
  { label: "PRDs",                 desc: "Structuring product decisions into build-ready documents.", delay: "1.1s", pos: { top: "7%",  left: "50%" } },
  { label: "Wireframing",          desc: "Making ideas visible before design polish.",                delay: "1.9s", pos: { top: "65%", left: "29%" } },
  { label: "User Flows",           desc: "Mapping how users move from intent to action.",             delay: "2.3s", pos: { top: "88%", left: "50%" } },
  { label: "Stakeholder Mapping",  desc: "Understanding who needs what and why.",                    delay: "0.6s", pos: { top: "26%", left: "66%" } },
  { label: "Dashboard Thinking",   desc: "Turning messy data into readable product signals.",         delay: "1.5s", pos: { top: "56%", left: "18%" } },
  { label: "Visual Storytelling",  desc: "Making complex ideas easier to understand.",                delay: "2.7s", pos: { top: "76%", left: "60%" } },
];

function Experience() {
  const [active, setActive] = useStateS(null);
  const [hoveredMicro, setHoveredMicro] = useStateS(null);

  return (
    <section id="experience" className="exp-orbit bg-grid-paper" data-screen-label="03 Practice">
      <div className="eyebrow-light">
        <span className="num">03</span><span className="dot" /><span>Practice — 12 skills</span>
      </div>

      <div className="exp-orbit-stage">
        {/* Connector lines — viewBox 0 0 100 100, preserveAspectRatio none = 1 unit = 1% of stage */}
        <svg className="exp-orbit-svg" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="50" x2="14" y2="12" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.22"/>
          <line x1="50" y1="50" x2="76" y2="10" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.22"/>
          <line x1="50" y1="50" x2="88" y2="46" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.22"/>
          <line x1="50" y1="50" x2="13" y2="80" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.22"/>
          <line x1="50" y1="50" x2="72" y2="82" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="1.5 3" opacity="0.22"/>
          <line x1="50" y1="50" x2="27" y2="28" stroke="var(--ink)" strokeWidth="0.18" strokeDasharray="1 4" opacity="0.12"/>
          <line x1="50" y1="50" x2="50" y2="7"  stroke="var(--ink)" strokeWidth="0.18" strokeDasharray="1 4" opacity="0.12"/>
          <line x1="50" y1="50" x2="66" y2="26" stroke="var(--ink)" strokeWidth="0.18" strokeDasharray="1 4" opacity="0.12"/>
          <ellipse cx="50" cy="50" rx="18" ry="15" fill="none" stroke="var(--ink)" strokeWidth="0.2" strokeDasharray="1 5" opacity="0.09"/>
        </svg>

        {/* Center heading card */}
        <div className="exp-orbit-center">
          <h2 className="exp-orbit-heading">What I do<br />on a Tuesday.</h2>
          <p className="exp-orbit-sub">Five disciplines that overlap on almost every product brief.</p>
          <div className="exp-orbit-tags">
            <span className="sticker tilt-l">★ open to freelance</span>
            <span className="sticker tilt-r">⌁ remote-friendly</span>
          </div>
        </div>

        {/* Main discipline nodes */}
        {DISCIPLINES.map((d) => (
          <button
            key={d.idx}
            className={`exp-node${active === d.idx ? ' exp-node-active' : ''}`}
            style={{ ...d.pos, animationDelay: d.delay }}
            onClick={() => setActive(active === d.idx ? null : d.idx)}
            aria-expanded={active === d.idx}
          >
            <div className="exp-node-dot" />
            <div className="exp-node-num">EXP.{d.idx}</div>
            <div className="exp-node-title">{d.title}</div>
            <div className="exp-node-desc">{d.desc}</div>
            <div className="exp-node-tag">{d.tag}</div>
          </button>
        ))}

        {/* Micro skill tags */}
        {MICRO_SKILLS.map((s) => (
          <span
            key={s.label}
            className={`exp-micro${hoveredMicro === s.label ? ' exp-micro-active' : ''}`}
            style={{ ...s.pos, animationDelay: s.delay }}
            onMouseEnter={() => setHoveredMicro(s.label)}
            onMouseLeave={() => setHoveredMicro(null)}
          >
            {s.label}
            <span className="exp-micro-tooltip">{s.desc}</span>
          </span>
        ))}

        <span className="exp-doodle exp-d1" aria-hidden="true">✦</span>
        <span className="exp-doodle exp-d2" aria-hidden="true">→</span>
        <span className="exp-doodle exp-d3" aria-hidden="true">◦</span>
        <span className="exp-doodle exp-d4" aria-hidden="true">✦</span>
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
      v: "hello@khushi.in",
      hint: "fastest way to reach me",
      ar: "↗",
      href: "mailto:hello@khushi.in",
    },
    {
      k: "LinkedIn",
      v: "/in/khushi-solanki",
      hint: "roles, network, history",
      ar: "↗",
      href: "https://linkedin.com/in/khushi-solanki",
    },
    {
      k: "Resume",
      v: "Download Resume",
      hint: "BA · Product · UX",
      ar: "↓",
      href: "Khushi-Solanki-Resume.pdf",
      download: "Khushi-Solanki-Resume.pdf",
    },
    {
      k: "Figma / Portfolio Workspace",
      v: "View workspace",
      hint: "case studies + working files",
      ar: "↗",
      href: "#",
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


Object.assign(window, { Hero, Marquee, About, Work, Experience, Skills, DesignArt, Contact, Footer, KMark });
