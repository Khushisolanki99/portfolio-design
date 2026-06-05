/* global React */
/* ============================================================ */
/* CREATIVE DIRECTION & PRODUCTION WORK — "Field Archive"        */
/* A scroll-driven editorial spread. Each project is a large     */
/* magazine panel: big number, source badge, sticky text, and a  */
/* flexible visual collage that drifts on scroll.                */
/* ------------------------------------------------------------ */
/* ADD REAL MEDIA LATER:                                         */
/*  · Image frames  → drop a scan onto any <image-slot> in the   */
/*    browser (persists). Each has a unique id (cd-XX-n).        */
/*  · YouTube tiles  → set href on the .cd-play anchors          */
/*    (search "TODO-LINK" to find every spot).                   */
/*  · Figma frame    → set the Figma URL on the Run Frenzy panel.*/
/* Search "TODO-LINK" to find every spot that takes a real URL.  */
/* ============================================================ */

const { useState: useStateCD, useEffect: useEffectCD, useRef: useRefCD } = React;

/* ---- source badge ------------------------------------------ */
function CDBadge({ source, legend }) {
  const map = {
    images:  { cls: "",       label: "Images",           gl: <span className="gl gl-images" /> },
    youtube: { cls: "youtube", label: "YouTube",         gl: <span className="gl"><span className="gl-play" /></span> },
    figma:   { cls: "figma",   label: "Figma Prototype", gl: <span className="gl gl-figma"><i /><i /><i /><i /></span> },
    mixed:   { cls: "",       label: "Mixed Media",      gl: <span className="gl gl-mixed">✶</span> },
  };
  const m = map[source] || map.images;
  return (
    <span className={"cd-badge " + m.cls + (legend ? " legend" : "")}>
      {m.gl}{m.label}
    </span>
  );
}

/* ---- one collage frame ------------------------------------- */
function CDFrame({ item, pid, idx }) {
  const style = {
    "--w": item.w, "--wm": item.wm || "100%", "--ar": item.ar || "4 / 3",
    "--rot": (item.rot || 0) + "deg",
  };
  const slotId = `cd-${pid}-${idx}`;

  let inner;
  if (item.type === "play") {
    const hasLink = item.href && item.href !== "#";
    inner = (
      <a
        className={"cd-play" + (item.mini ? " mini" : "")}
        href={item.href || "#"}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "noopener noreferrer" : undefined}
        onClick={!hasLink ? (e) => e.preventDefault() : undefined}
        aria-label={hasLink ? ("Watch on YouTube" + (item.runtime ? " — " + item.runtime : "")) : "YouTube link — to be added"}
      >
        {item.thumbnailUrl && (
          <img
            src={item.thumbnailUrl}
            alt=""
            className="cd-thumb"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            aria-hidden="true"
          />
        )}
        <div className="scrim" aria-hidden></div>
        <div className="btn-play" aria-hidden></div>
        <div className="yt-tag">
          <span className="src">● YouTube</span>
          <span className="runtime">{item.runtime || "link →"}</span>
        </div>
      </a>
    );
  } else if (item.type === "figma") {
    const figBody = (
      <div className="cd-fig">
        <div className="chrome"><i /><i /><i /><span className="url">{item.url || "figma.com/proto/run-frenzy"}</span></div>
        <div className="body" style={item.previewSrc ? { padding: 0, overflow: "hidden" } : {}}>
          {item.previewSrc
            ? <img src={item.previewSrc} alt="prototype preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            : <span className="fig-badge"><span className="gl-figma"><i /><i /><i /><i /></span>Figma Prototype</span>
          }
        </div>
        <span className="corner"><span className="d">●</span> {item.label}</span>
      </div>
    );
    inner = item.href ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
        {figBody}
      </a>
    ) : figBody;
  } else if (item.type === "social") {
    inner = (
      <div className="cd-social">
        <div className="top"><span className="av" /><div className="meta"><b>{item.handle || "@studio"}</b><span>{item.label}</span></div></div>
        <div className="canvas"><span>{item.note || "post / reel"}</span></div>
        <div className="acts"><i /><i /><i /></div>
      </div>
    );
  } else if (item.type === "wordmark") {
    inner = (
      <div className={"cd-type" + (item.green ? " green" : "")}>
        <div className="top"><span>{item.kicker || "IDENTITY"}</span><span>{item.label}</span></div>
        <div className="word" dangerouslySetInnerHTML={{ __html: item.word }} />
        <div className="bot"><span>{item.foot || "creative direction"}</span><span>★</span></div>
      </div>
    );
  } else {
    /* type: "image" — fillable placeholder; item.src sets a pre-filled image */
    inner = (
      <image-slot
        id={slotId}
        shape="rect"
        src={item.src || ""}
        placeholder={item.label}
        style={{ width: "100%", height: "100%", display: "block" }}
      ></image-slot>
    );
  }

  return (
    <figure className={"cd-frame" + (item.grow ? " grow" : "")} style={style} data-par={item.par != null ? item.par : 0.05}>
      <div className="ph">
        {inner}
        {item.type === "image" && <span className="corner"><span className="d">●</span> {item.corner || item.label}</span>}
      </div>
      {item.pin && <span className={"cd-pin" + (item.pinGreen ? " gr" : "")}>{item.pin}</span>}
    </figure>
  );
}

/* ---- one project panel ------------------------------------- */
function CDPanel({ p, i, total, setActive }) {
  const ref = useRefCD(null);

  useEffectCD(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(i); }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [i, setActive]);

  return (
    <article ref={ref} className={"cd-panel" + (i % 2 ? " flip" : "")} data-cd-panel={i} data-screen-label={`CD ${p.n} ${p.title}`}>
      <div className="cd-pfolio">
        <span className="l"><b>№ {p.n}</b> — {p.title}</span>
        <span className="r">{p.source === "youtube" ? "YouTube" : p.source === "figma" ? "Figma" : p.source === "mixed" ? "Mixed Media" : "Images"} · field archive</span>
      </div>

      <div className="cd-text reveal">
        <div className="cd-numwrap">
          <span className="cd-num">{p.n}<span className="pp">●</span></span>
        </div>
        <div className="cd-badges">
          <CDBadge source={p.source} />
          {p.source2 && <CDBadge source={p.source2} />}
        </div>
        <div className="cd-cat">{p.category}</div>
        <h3 className="cd-ptitle" dangerouslySetInnerHTML={{ __html: p.title2 || p.title }} />
        <p className="cd-desc">{p.desc}</p>
        <div className="cd-resp">
          <span className="k">What I did</span>
          <div className="items">
            {p.resp.map((r, k) => (
              <React.Fragment key={k}>
                <span>{r}</span>
                {k < p.resp.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="cd-tags">
          {p.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>

      <div className="cd-visual reveal">
        {p.items.map((it, idx) => <CDFrame key={idx} item={it} pid={p.n} idx={idx} />)}
        {p.links && (
          <div className="cd-links">
            {p.links.map((l, k) => (
              /* TODO-LINK: each chip is a placeholder destination — add real URLs */
              <a className={"cd-linkchip" + (l.green ? " gr" : "")} key={k} href="#" onClick={(e) => e.preventDefault()}>
                <span className="d" />{l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* ---- the section ------------------------------------------- */
function CreativeDirection() {
  const sectionRef = useRefCD(null);
  const [active, setActive] = useStateCD(0);
  const [railOn, setRailOn] = useStateCD(false);

  const projects = window.CD_PROJECTS;

  /* show the side rail only while the section is on screen */
  useEffectCD(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setRailOn(e.isIntersecting && e.intersectionRatio > 0.04),
      { threshold: [0, 0.05, 0.2] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* subtle scroll parallax on collage frames */
  useEffectCD(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 620px)").matches;
    if (reduce || small) return;

    let frames = [];
    let raf = null;
    const collect = () => { frames = Array.from(el.querySelectorAll(".cd-frame[data-par]")); };
    collect();

    const tick = () => {
      raf = null;
      const vh = window.innerHeight;
      const gain = (typeof window.__cdParallax === "number" ? window.__cdParallax : 50) / 50;
      for (const f of frames) {
        const r = f.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const center = r.top + r.height / 2;
        const prog = (center - vh / 2) / vh;
        const speed = parseFloat(f.dataset.par) || 0.05;
        const py = -prog * speed * 220 * gain;
        f.style.transform = `translateY(${py.toFixed(1)}px)`;
      }
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(tick); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { collect(); onScroll(); }, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const goTo = (i) => {
    const el = sectionRef.current && sectionRef.current.querySelector(`[data-cd-panel="${i}"]`);
    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: y, behavior: "smooth" }); }
  };

  return (
    <section id="creative" className="cd bg-grid-paper" ref={sectionRef} data-screen-label="06 Creative Direction">
      {/* threading squiggle */}
      <div className="cd-wires" aria-hidden>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 4 10 C 24 16, 18 30, 34 34 S 16 52, 38 60 S 70 56, 82 46" />
          <path d="M 58 84 C 72 88, 86 80, 92 66 S 80 46, 64 50" />
        </svg>
      </div>

      {/* progress rail */}
      <nav className={"cd-rail" + (railOn ? " show" : "")} aria-label="Project index">
        {projects.map((p, i) => (
          <button key={p.n} className={"cd-rail-item" + (active === i ? " on" : "")} onClick={() => goTo(i)}>
            <span className="t">{p.title}</span>
            <span>{p.n}</span>
            <span className="bar" />
          </button>
        ))}
      </nav>

      {/* header */}
      <header className="cd-head">
        <div className="cd-folio">
          <span><b>FIELD ARCHIVE</b> · creative direction &amp; production</span>
          <span>№ 06 · <span className="pp">●</span> {projects.length} projects · 2023 — 26</span>
        </div>
        <div className="cd-eyebrow"><span className="num">06</span><span className="dot" /><span>Beyond the product work</span></div>
        <h2 className="cd-title">
          Creative Direction <span className="it accent">&amp;</span><br />
          <span className="scribble">Production Work</span>
        </h2>
        <p className="cd-sub">
          <b>Production, post-production, brand visuals, podcast edits, website prototypes,
          event creatives,</b> and digital-presence work — across teams, studios, and clients.
        </p>
        <div className="cd-note">
          <span className="tape">how to read</span>
          <span>Some work shows as <b style={{ color: "var(--ink)" }}>images</b>, some opens
          <b style={{ color: "var(--accent-ink)" }}> YouTube</b> links, some opens
          <b style={{ color: "var(--green)" }}> Figma</b> prototypes, and some is kept as archived previews.</span>
        </div>
        <div className="cd-legend">
          <span className="lg-lbl">Sources</span>
          <CDBadge source="images" legend />
          <CDBadge source="youtube" legend />
          <CDBadge source="figma" legend />
          <CDBadge source="mixed" legend />
        </div>
      </header>

      {/* stream */}
      <div className="cd-stream">
        {projects.map((p, i) => (
          <CDPanel key={p.n} p={p} i={i} total={projects.length} setActive={setActive} />
        ))}
      </div>

      <div className="cd-foot">
        <span><span className="accent">●</span> {projects.length} projects · production · post · brand · web</span>
        <span>images · youtube · figma · mixed media</span>
        <span>more on request →</span>
      </div>
    </section>
  );
}

/* ============================================================ */
/* PROJECT DATA                                                  */
/* Visual `items` use flex-basis (--w desktop) + aspect (--ar); */
/* `rot` tilts the frame, `par` sets parallax weight, `pin` is  */
/* a hand-written sticky caption.                               */
/* type: image | play | figma | social | wordmark               */
/* ============================================================ */
const CD_PROJECTS = [
  {
    n: "01", title: "TEDx 2025 Nagpur",
    category: "Production · Post-Production · Event",
    source: "images",
    desc: "In 2025, I worked with my team on the production and post-production side of two TEDx events in Nagpur — TEDx IIM Nagpur and TEDx Ambazari. The work involved supporting event visuals, coordinating content requirements, handling post-event creative assets, and helping shape the final output so the event communication felt clean, polished, and consistent.",
    resp: ["Production planning", "Post-production", "Visual coordination", "Event content", "Creative asset support"],
    tags: ["TEDx", "Nagpur", "Event Production", "Post-Production", "Creative Direction"],
    items: [
      { type: "image", w: "62%", ar: "16 / 10", rot: -1.5, par: 0.04, src: "uploads/tedx-nagpur-01.jpeg", label: "main stage — wide", corner: "fig. 01 · stage", pin: "the red dot ●" },
      { type: "image", w: "34%", ar: "3 / 4",   rot: 2.5,  par: 0.09, src: "uploads/tedx-nagpur-02.webp", label: "think beyond the obvious" },
    ],
  },
  {
    n: "02", title: "Ruf Studios", title2: 'Ruf <span class="accent">Studios</span>',
    category: "Creative Studio · Production · Post-Production",
    source: "mixed",
    desc: "Led Ruf Studios, a creative studio handling production, post-production, video editing, and graphic design work for multiple clients. The work included on-site production for events, coordinating creative requirements, managing timelines, editing videos, designing visuals, and making sure each project moved from brief to final delivery smoothly.",
    resp: ["Creative direction", "On-site production", "Post-production", "Video editing", "Graphic design", "Client coordination", "Timeline management"],
    tags: ["Studio", "Production", "Post-Production", "Video Editing", "Graphic Design", "Client Work"],
    items: [
      { type: "play",  w: "100%", ar: "16 / 9", rot: 0,    par: 0.03, href: "https://youtu.be/mMUdmrtWLoY?si=AhO9jCNbygF7Omnv", thumbnailUrl: "https://img.youtube.com/vi/mMUdmrtWLoY/maxresdefault.jpg", runtime: "Ruf Studios · Showreel", pin: "studio work" },
      { type: "image", w: "50%",  ar: "4 / 3",  rot: 1.5,  par: 0.08, src: "uploads/ruf-studios-01.jpeg", label: "production — on-site", corner: "fig. 01 · production", pin: "on-site work" },
      { type: "image", w: "40%",  ar: "1 / 1",  rot: -2.5, par: 0.07, src: "uploads/ruf-studios-02.jpeg", label: "client visual", corner: "fig. 02 · client" },
    ],
  },
  {
    n: "03", title: "Sayacare Podcast", title2: 'Sayacare <span class="accent">Podcast</span>',
    category: "Podcast · Production · Post-Production",
    source: "youtube",
    desc: "Worked with Sayacare to create podcast content for their brand and help build their online presence through production, post-production, video editing, and platform-ready podcast assets.",
    resp: ["Podcast production", "Post-production", "Video editing", "YouTube asset support", "Brand presence", "Short-form clips"],
    tags: ["Podcast", "YouTube", "Brand Presence", "Production", "Post-Production", "Video Editing"],
    linkhint: "↳ click thumbnail to open YouTube in a new tab — no embed",
    /* ── Sayacare YouTube links ──────────────────────────────────────────
       To update: edit href + thumbnailUrl on each item below.
       thumbnailUrl is auto-generated from the YouTube video ID:
         https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg
       Fields: href (YouTube URL) · thumbnailUrl · runtime (optional label)
    ─────────────────────────────────────────────────────────────────── */
    items: [
      {
        type: "play", w: "100%", ar: "16 / 9", rot: 0, par: 0.03,
        href: "https://youtu.be/CT9uZ_Lk0gM",
        thumbnailUrl: "https://img.youtube.com/vi/CT9uZ_Lk0gM/hqdefault.jpg",
        runtime: "EP · featured", pin: "featured episode",
      },
      {
        type: "play", w: "47%", ar: "16 / 10", rot: -2, par: 0.08, mini: true,
        href: "https://youtu.be/WX0KRVBkYks",
        thumbnailUrl: "https://img.youtube.com/vi/WX0KRVBkYks/hqdefault.jpg",
        runtime: "EP · 02",
      },
      {
        type: "play", w: "47%", ar: "16 / 10", rot: 1.5, par: 0.07, mini: true,
        href: "https://youtu.be/a0DCNfRPsfA",
        thumbnailUrl: "https://img.youtube.com/vi/a0DCNfRPsfA/hqdefault.jpg",
        runtime: "EP · 03",
      },
    ],
  },
  {
    n: "04", title: "The Career Company", title2: 'The Career <span class="accent">Company</span>',
    category: "Podcast · Video Editing · Social Content",
    source: "youtube",
    desc: "Worked with The Career Company to build their brand presence through podcast production, video editing, and platform-ready content for Instagram and YouTube. The work included recording support, editing long-form podcast content, cutting short-form clips, and preparing social/video assets for publishing.",
    resp: ["Podcast production", "Recording support", "Video editing", "Instagram content", "YouTube content", "Short-form clips", "Brand presence"],
    tags: ["Podcast", "YouTube", "Instagram", "Brand Presence", "Video Editing", "Social Content"],
    linkhint: "↳ click thumbnail to open in a new tab — no embed",
    /* ── The Career Company links ─────────────────────────────────────────
       Fields per item: platform ("youtube" | "instagram") · href (URL) ·
         thumbnailUrl · runtime (optional label)
       YouTube thumbnails are auto-generated:
         https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg
       Instagram thumbnails: paste a direct image URL into thumbnailUrl
         (Instagram does not expose auto-generated thumb URLs).
    ─────────────────────────────────────────────────────────────────── */
    items: [
      {
        platform: "youtube", type: "play", w: "100%", ar: "16 / 9", rot: 0, par: 0.03,
        href: "https://youtu.be/veqMXQGyHFg",
        thumbnailUrl: "https://img.youtube.com/vi/veqMXQGyHFg/hqdefault.jpg",
        runtime: "EP · featured", pin: "featured episode",
      },
      {
        platform: "youtube", type: "play", w: "47%", ar: "16 / 10", rot: -2, par: 0.08, mini: true,
        href: "https://youtu.be/SA1TiG4QhA0",
        thumbnailUrl: "https://img.youtube.com/vi/SA1TiG4QhA0/hqdefault.jpg",
        runtime: "EP · 02",
      },
      {
        platform: "youtube", type: "play", w: "47%", ar: "16 / 10", rot: 1.5, par: 0.07, mini: true,
        href: "https://youtu.be/dYxWYPxjoj8",
        thumbnailUrl: "https://img.youtube.com/vi/dYxWYPxjoj8/hqdefault.jpg",
        runtime: "EP · 03",
      },
    ],
  },
  {
    n: "05", title: "Advantage Vidarbha", title2: 'Advantage <span class="accent">Vidarbha</span>',
    category: "Event · Design · Ticketing · BTS Content",
    source: "images",
    desc: "Worked with Advantage Vidarbha as a ticketing partner and design partner. The work included designing lanyards for visitors and exhibitors, creating brochures and event-facing communication material, and recording BTS/fun content to support the event's digital presence.",
    resp: ["Ticketing partnership", "Design partnership", "Visitor lanyards", "Exhibitor lanyards", "Brochure design", "Event creatives", "BTS content", "Social content support"],
    tags: ["Event", "Ticketing", "Lanyards", "Brochures", "BTS Content", "Design Partner", "Vidarbha"],
    items: [
      { type: "image", w: "55%", ar: "4 / 3", rot: -1.5, par: 0.05, src: "uploads/av-01.jpg",            label: "lanyard design",    corner: "fig. 01 · lanyard", pin: "design partner" },
      { type: "image", w: "40%", ar: "3 / 4", rot: 2.5,  par: 0.09, src: "uploads/av-coordinator-1.jpg", label: "exhibitor lanyard", corner: "exhibitor" },
      { type: "image", w: "40%", ar: "3 / 4", rot: -2,   par: 0.08, src: "uploads/av-coordinator-2.jpg", label: "visitor lanyard",   corner: "visitor" },
    ],
  },
  {
    n: "06", title: "Run Frenzy Website", title2: 'Run Frenzy <span class="accent">Website</span>',
    category: "Website · Figma Prototype · Visual Direction",
    source: "figma",
    desc: "Redesigned the Run Frenzy website with a quirky, playful visual direction and interactive website experience. The work focused on making the brand feel more energetic, fun, and memorable through layout, visual styling, and prototype-based interaction planning.",
    resp: ["Website redesign", "Figma prototype", "Visual direction", "Quirky UI elements", "Interaction planning", "Web layout"],
    tags: ["Website", "Figma Prototype", "UI Design", "Quirky Design", "Web Experience", "Visual Direction"],
    items: [
      { type: "figma", w: "100%", ar: "16 / 9", rot: 0,    par: 0.03,
        href: "https://www.figma.com/proto/t9TMfnS9aR8Zc3GGsRX9we/Run-Frenzy?node-id=263-389&t=W5UlrbNlxHyD2MSg-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
        url: "figma.com/proto/Run-Frenzy", previewSrc: "uploads/rf-screen-01.png", label: "open prototype →", pin: "live prototype", pinGreen: true },
      { type: "image", w: "58%",  ar: "16 / 9", rot: -1.5, par: 0.05, src: "uploads/rf-screen-new.png", label: "homepage preview",       corner: "fig. 01 · homepage" },
      { type: "image", w: "38%",  ar: "4 / 3",  rot: 2,    par: 0.08, src: "uploads/rf-screen-01.png", label: "website section preview", corner: "section detail" },
    ],
  },
  {
    n: "07", title: "Cheap Marketing", title2: 'Cheap <span class="accent">Marketing</span>',
    category: "Brand Content · Video Editing · Graphic Design",
    source: "mixed",
    desc: "Worked with Cheap Marketing, a New York-based marketing company, on brand content, high-quality video edits, graphics, and content planning. The work focused on creating polished digital assets that supported their brand presence and helped shape content for social and marketing channels.",
    resp: ["Video editing", "Graphic design", "Content planning", "Brand assets", "Social content", "Marketing creatives"],
    tags: ["New York", "Marketing", "Video Editing", "Graphic Design", "Content Planning", "Brand Work"],
    items: [
      { type: "image", w: "100%", ar: "16 / 9", rot: 0, par: 0.04, src: "uploads/cheap-marketing-01.png", label: "brand website", corner: "fig. 01 · brand" },
    ],
  },
];

window.CD_PROJECTS = CD_PROJECTS;
Object.assign(window, { CreativeDirection, CDPanel, CDFrame, CDBadge });
