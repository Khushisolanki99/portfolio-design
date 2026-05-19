/* global React */
const { useState: useStateS, useRef: useRefS } = React;

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
/* HERO                                                          */
/* ============================================================ */
function Hero() {
  // Real product PNGs scattered around the wordmark — Behance-ref style.
  const objects = [
    // top-left corner — CD bleeding off the top-left
    { id: "cd",       src: "images/cd.png",       alt: "CD case",
      style: { top: "-9%",   left: "-4%",   width: "17%", aspectRatio: "1/1",  transform: "rotate(-22deg)" } },
    // top-right corner — keyboard, big, bleeding off the top-right
    { id: "keyboard", src: "images/keyboard.png", alt: "Keyboard",
      style: { top: "-15%",  right: "-5%",  width: "23%", aspectRatio: "3/4",  transform: "rotate(14deg)" } },
    // top-center — earbuds dropping in from above, half-bleed off top
    { id: "earbuds",  src: "images/earbuds.png",  alt: "Earbuds",
      style: { top: "-7%",   left: "44%",   width: "11%", aspectRatio: "1/1",  transform: "rotate(28deg)" } },
    // upper-left area — iced latte bleeding off the top edge, sitting between CD and earbuds
    { id: "latte",    src: "images/latte.png",    alt: "Iced latte",
      style: { top: "-12%",  left: "16%",   width: "13%", aspectRatio: "2/3",  transform: "rotate(-12deg)" } },
    // bottom-right corner — radio, large, bleeding off bottom-right
    { id: "radio",    src: "images/radio.png",    alt: "Radio",
      style: { bottom: "-7%", right: "-6%", width: "26%", aspectRatio: "4/5",  transform: "rotate(9deg)" } },
    // bottom-left corner — notebook anchored to bottom-left, no longer floating
    { id: "notebook", src: "images/notebook.png", alt: "Notebook",
      style: { bottom: "-6%", left: "-4%",  width: "17%", aspectRatio: "3/4",  transform: "rotate(-17deg)" } },
  ];

  return (
    <section id="index" className="hero bg-grid-dark" data-screen-label="00 Hero">
      <div className="hero-top">
        <div className="brand">
          <div className="mark"><KMark size={28} /></div>
          <div className="name">
            khushi<br /><b>solanki</b>
            <span>business analyst · product · creative direction</span>
          </div>
        </div>
        <div className="brand-mark-corner"><KMark size={36} /></div>
      </div>

      <div className="hero-stage">
        {/* faint wire/squiggle trail */}
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

        {/* Two black Doberman puppies — drop your own bg-removed PNGs onto these */}
        <div className="hero-obj hero-slot" style={{ top: "34%", left: "2%", width: "14%", aspectRatio: "1/1", transform: "rotate(-8deg)" }}>
          <image-slot
            id="hero-dobie-left"
            shape="rect"
            fit="contain"
            placeholder="Doberman pup ↓"
            style={{ width: "100%", height: "100%", background: "transparent", border: "1px dashed rgba(239,233,221,0.22)" }}
          ></image-slot>
        </div>
        <div className="hero-obj hero-slot" style={{ top: "42%", right: "3%", width: "15%", aspectRatio: "1/1", transform: "rotate(11deg)" }}>
          <image-slot
            id="hero-dobie-right"
            shape="rect"
            fit="contain"
            placeholder="Doberman pup ↓"
            style={{ width: "100%", height: "100%", background: "transparent", border: "1px dashed rgba(239,233,221,0.22)" }}
          ></image-slot>
        </div>

        <div className="hero-center">
          <div className="hero-wordmark">
            <span className="line">BA / Product</span>
            <span className="line accent">Portfolio</span>
            <span className="ml-sticker">
              <span className="sticker">KHUSHI SOLANKI · 2026</span>
            </span>
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
          <button className="btn">Download Resume ↓</button>
          <button className="btn dark" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact ↗</button>
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
            <span className="sep"><KMark size={32} color="var(--accent)" /></span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* ABOUT — story-driven                                          */
/* ============================================================ */
function About() {
  return (
    <section id="about" className="about bg-grid-paper" data-screen-label="01 About">
      <div className="about-lang">
        <span className="on">ENG</span> / <span>HIN</span>
      </div>

      <div className="about-grid">
        {/* Portrait — freestanding cutout with orange silhouette outline. */}
        <div className="about-portrait">
          <img
            className="cutout"
            src="images/khushi.png"
            alt="Khushi Solanki — portrait"
          />
          <span className="about-tag sticker tilt-l">● PORTRAIT.01 · CUTOUT</span>
          <span className="about-hecho sticker lg tilt-r">✎ MADE BY KHUSHI</span>
        </div>

        {/* Right column — story-driven */}
        <div>
          <h1 className="about-head">
            Hi, I'm <span className="accent">Khu</span>shi.
            <span className="ny-tag">
              <span className="sticker tilt-r">NEW DELHI</span>
              <span className="sticker tilt-l">INDIA</span>
            </span>
          </h1>

          <div className="about-story">
            <p>
              I work at the intersection of <b>business analysis, product thinking,
              and visual storytelling</b>. I like taking messy problems, turning them
              into clear requirements, mapping the user journey, and shaping screens
              that make the solution easier to understand.
            </p>
            <p>
              My work usually starts with a <em>problem statement</em>, a few
              uncomfortable questions, and a blank flow. From there, I build PRDs,
              user stories, wireframes, dashboards, and product concepts that are
              <b> structured enough for teams</b> and <b>clear enough for users</b>.
            </p>
            <p>
              Off the clock, I'm usually editing visuals, exploring web layouts,
              making posters, or redesigning something nobody asked me to redesign.
            </p>
          </div>

          {/* What I ship — BA credibility marker */}
          <div className="about-ships">
            <span className="lbl">What I ship</span>
            <div className="items">
              <span>PRDs</span><span>·</span>
              <span>User flows</span><span>·</span>
              <span>Requirement specs</span><span>·</span>
              <span>Journey maps</span><span>·</span>
              <span>Wireframes</span><span>·</span>
              <span>Review decks</span><span>·</span>
              <span>Ops playbooks</span>
            </div>
          </div>

          {/* Principles */}
          <div className="about-principles">
            <div className="chip-card"><span className="n">01</span><span>Understand the problem before designing the solution.</span></div>
            <div className="chip-card"><span className="n">02</span><span>Turn ambiguity into requirements, flows, and decisions.</span></div>
            <div className="chip-card"><span className="n">03</span><span>Make the first version useful before making it beautiful.</span></div>
            <div className="chip-card"><span className="n">04</span><span>Use design to communicate, not decorate.</span></div>
          </div>

          {/* Experience + Education timeline */}
          <div className="about-time">
            <div className="about-time-block">
              <div className="eyebrow-light"><span className="num">A.01</span><span className="dot" /><span>Experience</span></div>
              <div className="about-time-list">
                <div className="trow">
                  <span className="yr">2024<small>now</small></span>
                  <div className="t">
                    <div className="role">Business Analyst</div>
                    <div className="co">[Company Name]</div>
                    <div className="d">Worked on product requirements, process mapping, stakeholder coordination, and internal tools.</div>
                  </div>
                </div>
                <div className="trow">
                  <span className="yr">2023<small>24</small></span>
                  <div className="t">
                    <div className="role">Product / Project Analyst</div>
                    <div className="co">[Company Name]</div>
                    <div className="d">Supported PRDs, sprint planning, user flows, and feature documentation.</div>
                  </div>
                </div>
                <div className="trow">
                  <span className="yr">2022<small>23</small></span>
                  <div className="t">
                    <div className="role">Brand &amp; Ops</div>
                    <div className="co">[Company Name]</div>
                    <div className="d">Worked across content planning, visual direction, operations, and delivery.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-time-block">
              <div className="eyebrow-light"><span className="num">A.02</span><span className="dot" /><span>Education</span></div>
              <div className="about-time-list">
                <div className="trow gr">
                  <span className="yr">2019<small>23</small></span>
                  <div className="t">
                    <div className="role">BBA, Business Analytics</div>
                    <div className="co">[University Name]</div>
                  </div>
                </div>
                <div className="trow gr">
                  <span className="yr">2024</span>
                  <div className="t">
                    <div className="role">UX Certification</div>
                    <div className="co">Interaction Design Foundation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools on rotation card */}
          <div className="about-tools-card">
            <div className="head">
              <span className="eyebrow-light"><span className="num">A.03</span><span className="dot" /><span>Tools on rotation</span></span>
              <span className="hint">used recently, on real projects</span>
            </div>
            <div className="grid">
              <span>Figma</span>
              <span>JIRA</span>
              <span>Notion</span>
              <span>Miro</span>
              <span>Excel</span>
              <span>Power BI</span>
              <span>Canva</span>
              <span>Adobe Suite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Polaroid strip — user drops real images on these */}
      <div className="about-polaroids">
        <div className="poly tilt-a">
          <image-slot
            id="about-poly-1"
            shape="rect"
            fit="cover"
            placeholder="workspace ↓"
            style={{ width: "100%", aspectRatio: "4/5", background: "#e5dfd1" }}
          ></image-slot>
          <div className="cap hand">workspace ★</div>
        </div>
        <div className="poly tilt-b">
          <image-slot
            id="about-poly-2"
            shape="rect"
            fit="cover"
            placeholder="sketches ↓"
            style={{ width: "100%", aspectRatio: "4/5", background: "#e5dfd1" }}
          ></image-slot>
          <div className="cap hand">notes &lt;3</div>
        </div>
        <div className="poly tilt-c">
          <image-slot
            id="about-poly-3"
            shape="rect"
            fit="cover"
            placeholder="off-hours ↓"
            style={{ width: "100%", aspectRatio: "4/5", background: "#e5dfd1" }}
          ></image-slot>
          <div className="cap hand">coffee ✰</div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* WORK — folder tabs + case-study tray                          */
/* ============================================================ */
function Work({ onOpen }) {
  const [active, setActive] = useStateS(0);
  const cases = window.CASE_STUDIES || [];
  const cs = cases[active] || cases[0];

  return (
    <section id="work" className="section dark bg-grid-dark" data-screen-label="02 Work">
      <div className="sec-head-dark">
        <div>
          <div className="eyebrow-dark"><span className="num">02</span><span className="dot" /><span>Selected Work · 2024 — 26</span></div>
          <div className="title">
            <span>Business </span>
            <span className="accent">analysis</span>
            <span className="of"> &amp;</span><br />
            <span>product</span><br />
            <span className="accent">thinking</span>
            <span className="sub-sticker"><span className="sticker">in practice</span></span>
          </div>
        </div>
        <div className="work-summary">
          <div className="head">
            <span className="lbl">★ Selected work index</span>
            <span className="hint">4 case studies · 2024 — 26</span>
          </div>
          <div className="rows">
            {cases.map((c) => (
              <div className="r" key={c.id} onClick={() => setActive(cases.indexOf(c))}>
                <span className="n">{c.num}</span>
                <span className="t">{c.title} <em>{c.titleEm}</em></span>
                <span className="m">{(c.outcome && c.outcome[0]) ? c.outcome[0].n : "—"}</span>
              </div>
            ))}
          </div>
          <div className="foot">Each case opens with TL;DR outcomes and a live mock.</div>
        </div>
      </div>

      <div className="folder-tabs">
        {cases.map((c, i) => (
          <div
            key={c.id}
            className={`folder-tab ${i === active ? "active" : i % 2 ? "green" : ""}`}
            onClick={() => setActive(i)}
          >
            {c.title} <span style={{ fontWeight: 800, color: i === active ? "rgba(255,255,255,0.85)" : "var(--ink)" }}>{c.titleEm}</span>
            <span className="yr">{c.num} · {c.year}</span>
          </div>
        ))}
      </div>

      <div className="case-tray">
        <div className="case-tray-inner">
          <div>
            {/* Headline outcome chips */}
            <div className="case-outcomes">
              {cs.outcome.slice(0, 3).map((o, i) => (
                <div className="oc" key={i}>
                  <span className="n">{o.n}</span>
                  <span className="l">{o.l}</span>
                </div>
              ))}
            </div>

            <div className="case-eyebrow">
              CASE {cs.num} / {String(cases.length).padStart(2, "0")} · {cs.type} · {cs.year} · {cs.duration}
            </div>
            <h3>{cs.title} <span className="accent">{cs.titleEm}</span></h3>
            <p className="sub">{cs.sub}</p>
            <div className="case-tags">
              {cs.tags.map((t) => <span key={t}>{t}</span>)}
            </div>

            {/* What I owned — BA credibility row */}
            <div className="case-owned">
              <span className="lbl">What I owned</span>
              <div className="items">
                {cs.spec.Output.split(",").map((it, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{it.trim()}</span>
                    {i < arr.length - 1 && <span className="sep">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Compact role/client/tools */}
            <div className="case-spec">
              <div className="item">
                <div className="k">Role</div>
                <div className="v">{cs.spec.Role.split("—")[0].trim()}</div>
              </div>
              <div className="item">
                <div className="k">Client</div>
                <div className="v">{cs.client}</div>
              </div>
              <div className="item">
                <div className="k">Process</div>
                <div className="v">{cs.spec.Process}</div>
              </div>
              <div className="item">
                <div className="k">Tools</div>
                <div className="v">{cs.spec.Tools}</div>
              </div>
            </div>

            <button className="btn accent" onClick={() => onOpen(cs)}>
              Open full case study →
            </button>
          </div>

          {/* Live, case-specific preview */}
          <div className="case-cover-live">
            <window.CasePreview cs={cs} />
            <div className="case-cover-meta">
              <span className="dot" /> {cs.id}.preview · live
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* EXPERIENCE (cream)                                            */
/* ============================================================ */
const EXPERIENCE = [
  { idx: "01", title: "Business Analysis",  desc: "Understanding users, documenting requirements, mapping workflows, and translating business goals into actionable product direction." },
  { idx: "02", title: "Product Thinking",   desc: "Defining problems, identifying user pain points, shaping solutions, and aligning features with business value." },
  { idx: "03", title: "Project Management", desc: "Coordinating tasks, timelines, stakeholders, reviews, feedback loops, and execution across project phases." },
  { idx: "04", title: "UX / UI Design",     desc: "Creating wireframes, flows, interfaces, visual systems, and user-friendly digital experiences." },
  { idx: "05", title: "Creative Direction", desc: "Using storytelling, layout, visuals, and brand thinking to make ideas easier to understand and remember." },
];

function Experience() {
  return (
    <section id="experience" className="exp bg-grid-paper" data-screen-label="03 Practice">
      <div className="exp-grid">
        <div>
          <div className="eyebrow-light"><span className="num">03</span><span className="dot" /><span>Practice — 5 disciplines</span></div>
          <h2>What <span className="accent">I do</span><br />on a Tuesday.</h2>
          <p className="lede">
            Five disciplines that overlap on almost every product brief.
            The order changes, but the core doesn't.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="sticker tilt-l">★ open to freelance</span>
            <span className="sticker tilt-r">⌁ remote-friendly</span>
          </div>
        </div>
        <div className="exp-list">
          {EXPERIENCE.map((e) => (
            <div className="exp-row" key={e.idx}>
              <div className="n">EXP.{e.idx}</div>
              <div className="body">
                <div className="t">{e.title}</div>
                <div className="d">{e.desc}</div>
              </div>
              <a className="arrow" href="#work" onClick={(ev) => { ev.preventDefault(); document.getElementById("work").scrollIntoView({ behavior: "smooth" }); }}>See examples →</a>
            </div>
          ))}
        </div>
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
  // Feature poster — bold type
  { cls: "feature", id: "poster.A1",   cap: "TYPE POSTER · 01",    ratio: "3:4",
    render: () => (
      <div className="art-ph type-poster">
        <div className="glyph">khu<br />shi.<small>— a study in serif × sans —</small></div>
      </div>
    ) },
  // Tall photo edit
  { cls: "col-r",   id: "edit.warm.04", cap: "PHOTO EDIT · warm grade", ratio: "4:5",
    render: () => <div className="art-ph photo warm" /> },
  { cls: "wide",    id: "deck.cover.07", cap: "DECK COVER · 09",    ratio: "16:9",
    render: () => (
      <div className="art-ph deck">
        <div className="top"><span><span className="num">01 / 09</span> · cover</span><span>placeholder</span></div>
        <div className="big">Deck<br /><em>cover — 01.</em></div>
        <div className="bot"><span>drop a real export</span><div className="bar" /><span>—</span></div>
      </div>
    ) },
  { cls: "tall",    id: "edit.cool.03", cap: "PHOTO EDIT · cool grade", ratio: "4:5",
    render: () => <div className="art-ph photo cool" /> },
  { cls: "third",   id: "poster.D2",   cap: "TYPE POSTER · 04",    ratio: "1:1",
    render: () => (
      <div className="art-ph type-poster alt">
        <div className="glyph">A.<small>after hours</small></div>
      </div>
    ) },
  { cls: "third",   id: "deck.cover.12", cap: "DECK COVER · dark",  ratio: "1:1",
    render: () => (
      <div className="art-ph deck dark">
        <div className="top"><span><span className="num">04 / 14</span> · cover</span><span>placeholder</span></div>
        <div className="big">Deck<br /><em>cover — 02.</em></div>
        <div className="bot"><span>drop a real export</span><div className="bar" /><span>—</span></div>
      </div>
    ) },
  { cls: "third",   id: "edit.dust.09", cap: "PHOTO EDIT · dust",   ratio: "1:1",
    render: () => <div className="art-ph photo" /> },
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
      v: "Download PDF",
      hint: "BA · Product · UX",
      ar: "↓",
      href: "#",
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
          <a className="contact-card" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} key={c.k}>
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
