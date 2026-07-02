/* global React */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ============================================================ */
/* Hero                                                         */
/* ============================================================ */
function Hero() {
  const t = new Date();
  const mins = t.getMinutes().toString().padStart(2, "0");
  const hrs = t.getHours().toString().padStart(2, "0");
  return (
    <section id="index" className="hero" data-screen-label="00 Hero">
      <div className="hero-meta">
        <div>
          Index <b>Portfolio · 2026</b>
        </div>
        <div>
          Based in <b>Mumbai, IN</b>
        </div>
        <div>
          Available <b>Mar — Aug 2026</b>
        </div>
        <div>
          Local <b>{hrs}:{mins} IST</b>
        </div>
      </div>

      <h1 className="hero-name">
        Khushi<br />
        <span className="ital">Solanki</span>
      </h1>

      <div className="hero-grid">
        <p className="hero-intro">
          I create clarity from <em>complexity</em> — translating business needs into
          structured requirements, product flows, stakeholder-ready documentation, and
          clean digital experiences.
        </p>
        <div className="hero-role">
          <span>Business Analyst</span>
          <span>Product Thinker</span>
          <span>Design-Oriented Professional</span>
        </div>
      </div>

      <div className="hero-cta">
        <button className="btn primary" onClick={() => document.getElementById("work").scrollIntoView({ behavior: "smooth" })}>
          <span>View Work</span>
          <span className="arrow">→</span>
        </button>
        <button className="btn">
          <span>Download Resume</span>
          <span className="arrow">↓</span>
        </button>
        <button className="btn" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          <span>Contact</span>
          <span className="arrow">↗</span>
        </button>
      </div>

      <div className="hero-foot">
        <div className="scroll-cue">
          <span className="line"></span>
          Scroll — Portfolio 01/07
        </div>
        <div className="mono" style={{ color: "var(--ink-soft)" }}>
          © 2026 — All rights reserved
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Marquee                                                      */
/* ============================================================ */
function Marquee() {
  const words = [
    "Business Analysis", "Product Thinking", "Requirements", "Workflow Design",
    "Stakeholder Comms", "UX & UI", "Creative Direction",
  ];
  const items = [...words, ...words];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i}>
            <span className="it">{w}</span>
            <span className="star">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* About / Snapshot                                             */
/* ============================================================ */
const FOCUS = [
  "Business Analysis", "Product Management", "Requirements Gathering",
  "User Experience", "Workflow Design", "Stakeholder Communication",
  "Project Coordination", "Creative Direction",
];
const TOOLS = [
  "Figma", "JIRA", "Notion", "Miro", "Excel",
  "Power BI", "Canva", "Adobe", "Framer", "Web tools",
];

function About() {
  return (
    <section id="about" data-screen-label="01 About">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="num">01</span><span className="dot"></span><span>About</span></div>
          <h2>A note<br />on <em><span className="serif-i">how</span></em> I work.</h2>
        </div>
        <p className="lede">
          A practice at the intersection of <em>business analysis</em>, <em>product thinking</em>,
          and <em>visual design</em> — built for teams turning ambiguity into shipped product.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p className="serif">
            I'm a business and product-focused professional with a strong
            <em> design sensibility</em>. My work blends structured thinking, stakeholder
            communication, workflow mapping, product documentation, and visual storytelling.
          </p>
          <p className="serif">
            I enjoy simplifying complex problems and turning them into clear, useful, and
            <em> well-presented</em> digital solutions — equally at home in a requirements
            doc, a Figma file, or a stakeholder review deck.
          </p>
        </div>
        <div className="snapshot">
          <div className="snap-card">
            <div className="label"><span>Focus Areas</span><span className="count">{FOCUS.length} / disciplines</span></div>
            <div className="snap-tags">
              {FOCUS.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>
          <div className="snap-card">
            <div className="label"><span>Toolkit</span><span className="count">{TOOLS.length} / tools</span></div>
            <div className="snap-tags snap-tools">
              {TOOLS.map((f) => <span key={f}>{f}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Work                                                         */
/* ============================================================ */
function Work({ onOpen }) {
  return (
    <section id="work" className="work" data-screen-label="02 Work">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="num">02</span><span className="dot"></span><span>Selected Work</span></div>
          <h2>Four <em><span className="serif-i">cases</span></em>,<br />four kinds of clarity.</h2>
        </div>
        <p className="lede">
          A spread from operations to onboarding — each project starts with a tangled
          business problem and ends with a system someone can <em>actually use</em> on Monday.
        </p>
      </div>

      <div className="work-list">
        {window.CASE_STUDIES.map((cs) => (
          <article className="case-card" key={cs.id} onClick={() => onOpen(cs)} data-cursor="lg">
            <div>
              <div className="case-meta-row">
                <span><span className="num">{cs.num}</span> &nbsp; / &nbsp; {cs.type}</span>
                <span>{cs.year} · {cs.duration}</span>
              </div>
              <h3>{cs.title} <em>{cs.titleEm}</em></h3>
              <p className="sub">{cs.sub}</p>
              <div className="case-tags">
                {cs.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="case-spec">
                {Object.entries(cs.spec).slice(0, 4).map(([k, v]) => (
                  <div className="item" key={k}>
                    <div className="k">{k}</div>
                    <div className="v">{v.split("—")[0].trim()}</div>
                  </div>
                ))}
              </div>
              <div className="case-cta">
                <span>View case study</span>
                <span>↗</span>
              </div>
            </div>
            <div className="ph case-thumb">
              <span className="ph-corner"><span className="sq"></span> {cs.id}.cover</span>
              <span className="ph-corner tr">{cs.num} / 04</span>
              <span className="ph-corner bl">{cs.year}</span>
              <span className="ph-corner br">4 : 3</span>
              <span className="ph-cap">Cover image — {cs.title}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Experience                                                   */
/* ============================================================ */
const EXPERIENCE = [
  { idx: "EXP.01", title: "Business Analysis", desc: "Understanding user needs, documenting requirements, mapping workflows, and translating business goals into actionable product direction." },
  { idx: "EXP.02", title: "Project Management", desc: "Coordinating tasks, timelines, stakeholders, reviews, and execution across different project phases." },
  { idx: "EXP.03", title: "Product Thinking",   desc: "Defining problems, identifying user pain points, shaping solutions, and aligning features with business value." },
  { idx: "EXP.04", title: "UI / UX & Design",   desc: "Creating wireframes, interfaces, visual systems, and user-friendly digital experiences." },
  { idx: "EXP.05", title: "Creative Execution", desc: "Presenting ideas with strong visual clarity through layouts, decks, mockups, and content systems." },
];

function Experience() {
  return (
    <section id="experience" data-screen-label="03 Experience">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="num">03</span><span className="dot"></span><span>Practice</span></div>
          <h2>What<br />I <em><span className="serif-i">actually</span></em> do.</h2>
        </div>
        <p className="lede">
          Five disciplines that overlap on every project. The order shifts; the
          <em> care</em> doesn't.
        </p>
      </div>

      <div className="exp-list">
        {EXPERIENCE.map((e) => (
          <div className="exp-row" key={e.idx}>
            <div className="idx">{e.idx}</div>
            <div className="title">{e.title}</div>
            <div className="desc">{e.desc}</div>
            <div className="arrow">Read →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Skills                                                       */
/* ============================================================ */
const SKILLS = [
  {
    title: "Business & Product",
    em: "Product",
    items: ["Requirement Gathering","PRD Writing","User Stories","Stakeholder Communication","Process Mapping","Market Research","Competitor Research","User Journey Mapping"],
  },
  {
    title: "Project Execution",
    em: "Execution",
    items: ["Agile / Scrum","Sprint Planning","JIRA Boards","Task Tracking","Review Presentations","Documentation","Stakeholder Updates","Timeline Coordination"],
  },
  {
    title: "Design",
    em: "Design",
    items: ["Wireframing","UI Layouts","Design Systems","Visual Storytelling","Figma Prototyping","Portfolio Presentation","Creative Direction","Content Layouts"],
  },
];

function Skills() {
  return (
    <section id="skills" className="work" data-screen-label="04 Skills">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="num">04</span><span className="dot"></span><span>Capabilities</span></div>
          <h2>Skills,<br />in three <em><span className="serif-i">columns</span></em>.</h2>
        </div>
        <p className="lede">
          A working inventory — the things I've used recently, on real projects, with
          <em> shipped outcomes</em>.
        </p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((col) => {
          const before = col.title.split(col.em)[0];
          return (
            <div className="skill-col" key={col.title}>
              <h4>{before}<em>{col.em}</em></h4>
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
/* Gallery                                                      */
/* ============================================================ */
const GALLERY = [
  { cls: "big",  cap: "UI Screens", id: "ui.screens" },
  { cls: "thin", cap: "Wireframes", id: "wires.set" },
  { cls: "thin", cap: "Dashboard concepts", id: "dash.concepts" },
  { cls: "wide", cap: "PRD snapshots", id: "prd.snap" },
  { cls: "g",    cap: "Journey maps", id: "journey.map" },
  { cls: "g",    cap: "Creative layouts", id: "layouts" },
  { cls: "g",    cap: "Presentation slides", id: "deck.cover" },
  { cls: "full", cap: "Product flow diagrams", id: "flow.diag" },
  { cls: "g",    cap: "Visual systems", id: "system.tile" },
];

function Gallery() {
  return (
    <section id="gallery" data-screen-label="05 Gallery">
      <div className="section-head">
        <div>
          <div className="eyebrow"><span className="num">05</span><span className="dot"></span><span>Visual Gallery</span></div>
          <h2>Fragments<br /><em><span className="serif-i">in passing</span></em>.</h2>
        </div>
        <p className="lede">
          Loose ends and supporting artefacts from the work above — wireframes, dashboards,
          PRDs, and the occasional <em>creative aside</em>.
        </p>
      </div>

      <div className="gallery">
        {GALLERY.map((g, i) => (
          <div className={`ph g ${g.cls}`} key={i}>
            <span className="ph-corner"><span className="sq"></span> {g.id}</span>
            <span className="ph-corner tr">{String(i + 1).padStart(2, "0")} / {GALLERY.length}</span>
            <span className="ph-cap">{g.cap}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Contact                                                      */
/* ============================================================ */
function Contact() {
  const cards = [
    { lbl: "Email",            val: "hello@khushisolanki.in",        href: "mailto:hello@khushisolanki.in" },
    { lbl: "LinkedIn",         val: "/in/khushi-solanki",            href: "#" },
    { lbl: "Resume",           val: "Download PDF",                  href: "#" },
    { lbl: "Portfolio / Figma", val: "View workspace",               href: "#" },
  ];
  return (
    <section id="contact" className="contact" data-screen-label="06 Contact">
      <div className="eyebrow"><span className="num">06</span><span className="dot"></span><span>Contact</span></div>
      <h2>Let's build clear, useful, &amp; <em>beautifully structured</em> digital products.</h2>
      <div className="contact-grid">
        {cards.map((c) => (
          <a className="contact-card" href={c.href} key={c.lbl}>
            <div className="lbl">{c.lbl}</div>
            <div className="val"><span>{c.val}</span><span className="arrow">↗</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Footer                                                       */
/* ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div>Khushi Solanki — Portfolio 2026</div>
      <div className="right">
        <span>EST. 2024</span>
        <span>Made with care in Mumbai</span>
        <span>v1.0</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, Marquee, About, Work, Experience, Skills, Gallery, Contact, Footer });
