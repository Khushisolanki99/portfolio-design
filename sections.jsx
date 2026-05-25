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
          <span className="sticker ae-ptag tilt-l">● PORTRAIT.01 · CUTOUT</span>
        </div>

        {/* Content — right */}
        <div className="ae-content">

          {/* Heading + location stickers */}
          <div className="ae-head-zone">
            <h1 className="ae-head">Hi, I'm <span className="accent">Khushi</span> Solanki</h1>
            <div className="ae-loc-stickers">
              <span className="sticker tilt-r">NEW DELHI</span>
              <span className="sticker tilt-l">INDIA</span>
            </div>
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
                My work starts with a <em>problem statement</em>, a few uncomfortable
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
                  <div className="ae-yr ac">2024<small>now</small></div>
                  <div><div className="ae-co">[Company Name]</div><div className="ae-role">Business Analyst</div></div>
                </div>
                <div className="ae-entry">
                  <div className="ae-yr ac">2023<small>24</small></div>
                  <div><div className="ae-co">[Company Name]</div><div className="ae-role">Product / Project Analyst</div></div>
                </div>
                <div className="ae-entry">
                  <div className="ae-yr ac">2022<small>23</small></div>
                  <div><div className="ae-co">[Company Name]</div><div className="ae-role">Brand &amp; Ops</div></div>
                </div>
              </div>
            </div>

            {/* Col 3: Education + Focus + Tools */}
            <div className="ae-sidebar">
              <div className="ae-sb-block">
                <div className="ae-sec-title">Education</div>
                <div className="ae-timeline">
                  <div className="ae-entry">
                    <div className="ae-yr gr">2019<small>23</small></div>
                    <div><div className="ae-co">BBA, Business Analytics</div><div className="ae-role">[University Name]</div></div>
                  </div>
                  <div className="ae-entry">
                    <div className="ae-yr gr">2024</div>
                    <div><div className="ae-co">UX Certification</div><div className="ae-role">Interaction Design Foundation</div></div>
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
                  {["Figma","JIRA","Notion","Miro","Excel","Power BI","Canva","Adobe Suite"].map(t => (
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
              <div className="ae-cap">workspace ★</div>
            </div>
            <div className="ae-poly tilt-b">
              <image-slot id="about-poly-2" shape="rect" placeholder="sketches ↓"
                style={{width:"100%",aspectRatio:"4/3",background:"#d8cfc0"}}></image-slot>
              <div className="ae-cap">bocetos ♡</div>
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

            <button className="btn accent" onClick={() => {
              if (cs.externalUrl) { window.location.href = cs.externalUrl; }
              else { onOpen(cs); }
            }}>
              Open full case study →
            </button>
          </div>

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

function CyclingWord({ words }) {
  return (
    <span className="cycling-word-wrap">
      <span className="cycling-word accent">{words[0]}</span>
    </span>
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
          <h2>
            What I{" "}
            <CyclingWord words={["analyse", "design", "manage", "ship", "direct"]} />
            <br />on a Tuesday.
          </h2>
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
