/* global React, ReactDOM */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e0411f",
  "marquee": true,
  "density": "comfy"
}/*EDITMODE-END*/;

/* ── G1: Lenis smooth scroll ─────────────────────────────── */
function initLenis() {
  if (!window.Lenis) return;
  const lenis = new window.Lenis({ lerp: 0.08, smoothWheel: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  window.__lenis = lenis;
}

/* ── G2: Custom cursor (desktop only) ───────────────────── */
function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const dot  = Object.assign(document.createElement("div"), { className: "cursor-dot"  });
  const ring = Object.assign(document.createElement("div"), { className: "cursor-ring" });
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top  = my + "px";
  });

  (function rafLoop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(rafLoop);
  })();

  document.addEventListener("mouseover", (e) => {
    const over = !!e.target.closest("a,button,.folder-tab,.contact-card,.art-tile,.exp-row,.poly,.btn");
    ring.classList.toggle("hover", over);
  });
}

/* ── G3: Scroll progress bar ────────────────────────────── */
function initScrollProgress() {
  const bar = Object.assign(document.createElement("div"), { id: "scroll-progress" });
  document.body.appendChild(bar);
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ── H1: Hero entrance sequence ─────────────────────────── */
function runHeroEntrance() {
  document.querySelectorAll("[data-hero-enter]").forEach((el) => {
    const delay = parseFloat(el.dataset.heroDelay) || 0;
    setTimeout(() => el.classList.add("hero-in"), delay);
  });
  document.querySelectorAll(".hero-obj-animate").forEach((el) => {
    const delay = parseFloat(el.dataset.heroDelay) || 600;
    setTimeout(() => el.classList.add("hero-in"), delay);
  });
}

/* ── H3: Mouse parallax on hero images ──────────────────── */
function initHeroParallax() {
  const stage = document.querySelector(".hero-stage");
  const objs  = document.querySelectorAll("[data-parallax]");
  if (!stage || !objs.length) return;

  stage.addEventListener("mousemove", (e) => {
    const r  = stage.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / r.width;
    const dy = (e.clientY - r.top  - r.height / 2) / r.height;
    objs.forEach((el) => {
      const m = parseFloat(el.dataset.parallax) || 10;
      el.style.translate = `${dx * m}px ${dy * m}px`;
    });
  });

  stage.addEventListener("mouseleave", () => {
    objs.forEach((el) => {
      el.style.transition = "translate 0.6s cubic-bezier(.2,.6,.2,1)";
      el.style.translate   = "0px 0px";
      setTimeout(() => { el.style.transition = ""; }, 650);
    });
  });
}

/* ── A1 + A2: Polaroid toss-in + 3D tilt ───────────────── */
function initPolaroids() {
  const polys = Array.from(document.querySelectorAll(".about-polaroids .poly"));
  if (!polys.length) return;

  const rests = {
    "tilt-a": "rotate(-4deg)",
    "tilt-b": "rotate(2deg) translateY(10px)",
    "tilt-c": "rotate(3.5deg)",
  };

  /* Settle: lock final transform as inline style so JS tilt can safely override/restore */
  polys.forEach((p) => {
    p.addEventListener("animationend", () => {
      const cls = ["tilt-a", "tilt-b", "tilt-c"].find((c) => p.classList.contains(c));
      if (cls) p.style.transform = rests[cls];
      p.style.opacity = "1";
      p.classList.add("settled");
      p.classList.remove("tossing");
    }, { once: true });
  });

  /* Toss-in via IntersectionObserver */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const i = polys.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add("tossing"), i * 160);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  polys.forEach((p) => io.observe(p));

  /* 3D tilt on hover (only after settled) */
  polys.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      if (!el.classList.contains("settled")) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - 0.5;
      const y = (e.clientY - r.top)   / r.height - 0.5;
      el.style.transition = "transform 0.06s ease, box-shadow 0.06s ease";
      el.style.transform  = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px) scale(1.03)`;
      el.style.boxShadow  = "0 1px 0 rgba(0,0,0,0.25), 8px 24px 40px -6px rgba(0,0,0,0.32)";
    });
    el.addEventListener("mouseleave", () => {
      if (!el.classList.contains("settled")) return;
      const cls = ["tilt-a", "tilt-b", "tilt-c"].find((c) => el.classList.contains(c));
      el.style.transition = "transform 0.5s cubic-bezier(.2,.6,.2,1), box-shadow 0.3s";
      el.style.transform  = cls ? rests[cls] : "";
      el.style.boxShadow  = "";
    });
  });
}

/* ── E1: Experience stagger ─────────────────────────────── */
function initExpStagger() {
  const rows = Array.from(document.querySelectorAll(".exp-row"));
  rows.forEach((row, i) => {
    row.classList.add(i % 2 === 0 ? "slide-from-left" : "slide-from-right");
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const i = rows.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add("exp-in"), i * 100);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  rows.forEach((r) => io.observe(r));
}

/* ── S1: Skills waterfall cascade ───────────────────────── */
function initSkillsWaterfall() {
  const cols = document.querySelectorAll(".skill-col");
  cols.forEach((col) => {
    col.querySelectorAll("li").forEach((item, i) => {
      item.style.cssText += `opacity:0;transform:translateY(10px);transition:opacity 0.4s ease ${i * 35}ms,transform 0.4s ease ${i * 35}ms;`;
    });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll("li").forEach((item) => {
        item.style.opacity   = "1";
        item.style.transform = "translateY(0)";
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  cols.forEach((c) => io.observe(c));
}

/* ── D1 + D2: Art mosaic diagonal reveal + 3D tilt ──────── */
function initArtMosaic() {
  const tiles  = Array.from(document.querySelectorAll(".art-tile"));
  const mosaic = document.querySelector(".art-mosaic");
  if (!mosaic || !tiles.length) return;

  /* D1: diagonal wave reveal */
  tiles.forEach((tile, i) => {
    tile.style.opacity   = "0";
    tile.style.transform = "scale(0.92)";
    tile.style.transition = `opacity 0.5s ease ${i * 55}ms, transform 0.5s cubic-bezier(.2,.6,.2,1) ${i * 55}ms`;
  });
  const revealIO = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    tiles.forEach((tile) => {
      tile.style.opacity   = "1";
      tile.style.transform = "";
    });
    revealIO.disconnect();
  }, { threshold: 0.04 });
  revealIO.observe(mosaic);

  /* D2: 3D tilt on hover */
  tiles.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - 0.5;
      const y = (e.clientY - r.top)   / r.height - 0.5;
      el.style.transition = "transform 0.05s ease, box-shadow 0.05s ease";
      el.style.transform  = `perspective(600px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-4px)`;
      el.style.boxShadow  = "0 1px 0 rgba(0,0,0,0.08), 0 28px 52px -18px rgba(0,0,0,0.4)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.4s cubic-bezier(.2,.6,.2,1), box-shadow 0.4s";
      el.style.transform  = "";
      el.style.boxShadow  = "";
    });
  });
}

/* ── W2: 3D tilt on case tray content ───────────────────── */
function initWorkTilt() {
  document.querySelectorAll(".case-tray-inner > div:first-child").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - 0.5;
      const y = (e.clientY - r.top)   / r.height - 0.5;
      el.style.transition = "transform 0.08s ease";
      el.style.transform  = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.5s cubic-bezier(.2,.6,.2,1)";
      el.style.transform  = "";
    });
  });
}

/* ── C1: Contact card stagger ───────────────────────────── */
function initContactStagger() {
  const cards = document.querySelectorAll(".contact-card");
  const grid  = document.querySelector(".contact-grid");
  if (!grid || !cards.length) return;
  cards.forEach((card, i) => {
    card.style.cssText += `opacity:0;transform:translateY(20px);transition:opacity 0.5s ease ${i * 100}ms,transform 0.5s cubic-bezier(.2,.6,.2,1) ${i * 100}ms;`;
  });
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    cards.forEach((card) => {
      card.style.opacity   = "1";
      card.style.transform = "translateY(0)";
    });
    io.disconnect();
  }, { threshold: 0.1 });
  io.observe(grid);
}

/* ── C2: Magnetic buttons ───────────────────────────────── */
function initMagnetic() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
      btn.style.transition = "transform 0.1s ease, box-shadow 0.15s ease";
      btn.style.transform  = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform 0.4s cubic-bezier(.2,.6,.2,1), box-shadow 0.15s ease";
      btn.style.transform  = "";
    });
  });
}

/* ── Main App ────────────────────────────────────────────── */
function App() {
  const [openCS, setOpenCS] = useState(null);
  const [tweaks, setTweak]  = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent || "#e0411f");
  }, [tweaks.accent]);

  useEffect(() => {
    const val = tweaks.density === "tight" ? "clamp(14px, 3vw, 40px)"
              : tweaks.density === "airy"  ? "clamp(24px, 6vw, 112px)"
              :                              "clamp(18px, 4vw, 64px)";
    document.documentElement.style.setProperty("--pad-x", val);
  }, [tweaks.density]);

  /* Existing reveal-on-scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io  = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [openCS]);

  /* All premium animation inits — run once after mount */
  useEffect(() => {
    initLenis();
    initCursor();
    initScrollProgress();
    runHeroEntrance();
    initHeroParallax();
    initPolaroids();
    initExpStagger();
    initSkillsWaterfall();
    initArtMosaic();
    initWorkTilt();
    initContactStagger();
    initMagnetic();
  }, []);

  return (
    <>
      <main>
        <Hero />
        {tweaks.marquee && <Marquee />}
        <About />
        <Work onOpen={setOpenCS} />
        <Experience />
        <Skills />
        <DesignArt />
        <Contact />
      </main>
      <Footer />

      {openCS && (
        <CaseStudyDetail
          cs={openCS}
          onClose={() => setOpenCS(null)}
          onNav={(c) => setOpenCS(c)}
        />
      )}

      <window.TweaksPanel>
        <window.TweakSection label="Theme" />
        <window.TweakColor
          label="Accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#e0411f", "#d54a1c", "#c1342a", "#1e5f3a", "#0066ff", "#181513"]}
        />
        <window.TweakRadio
          label="Density"
          value={tweaks.density}
          onChange={(v) => setTweak("density", v)}
          options={["tight", "comfy", "airy"]}
        />

        <window.TweakSection label="Motion" />
        <window.TweakToggle
          label="Marquee strip"
          value={tweaks.marquee}
          onChange={(v) => setTweak("marquee", v)}
        />

        <window.TweakSection label="Navigate" />
        <window.TweakButton label="Open Case Study 01" onClick={() => setOpenCS(window.CASE_STUDIES[0])} />
        <window.TweakButton label="Open Case Study 02" onClick={() => setOpenCS(window.CASE_STUDIES[1])} />
        <window.TweakButton label="Close detail" secondary onClick={() => setOpenCS(null)} />
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
