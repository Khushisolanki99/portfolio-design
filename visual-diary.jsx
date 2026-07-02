/* global React */
/* ============================================================ */
/* OFF—CLOCK · THE VISUAL DIARY                                  */
/* Scattered photo-wall: drifting frames, mouse parallax,        */
/* hover-to-enlarge, working Dark Mode + Info + Index toggles.   */
/* ============================================================ */

const { useState: useStateVD, useEffect: useEffectVD, useRef: useRefVD } = React;

/* Scatter map — to add a new image:
   1. Copy the file to public/uploads/ with a clean name (no spaces), e.g. vd-26.jpeg
   2. Append a new object below using the same fields:
        l     = left  (% of stage width)   — keep 35–65% clear for the title
        t     = top   (% of stage height)  — keep 38–62% clear for the title
        w     = width (% of stage width, capped at 160px by CSS)
        depth = parallax weight  (0.4 = slow, 1.2 = fast)
        rot   = tilt in degrees  (positive = clockwise)
        tag   = caption label
        src   = path relative to Portfolio.html */
const VD_FRAMES = [
  // ── Top row: 7 frames spread l=1–80%, t=2–8% ───────────────────────
  { l:1,  t:3,  w:9, depth:0.80, rot:-3, tag:"off-duty",  src:"/uploads/vd-01.jpeg" },
  { l:13, t:6,  w:8, depth:0.60, rot:3,  tag:"film",      src:"/uploads/vd-02.jpeg" },
  { l:25, t:2,  w:9, depth:0.70, rot:-5, tag:"street",    src:"/uploads/vd-03.jpeg" },
  { l:37, t:7,  w:8, depth:0.55, rot:4,  tag:"weekend",   src:"/uploads/vd-04.jpeg" },
  { l:55, t:4,  w:9, depth:0.65, rot:-4, tag:"candid",    src:"/uploads/vd-05.jpeg" },
  { l:67, t:8,  w:8, depth:0.72, rot:5,  tag:"poster",    src:"/uploads/vd-06.jpeg" },
  { l:80, t:3,  w:9, depth:0.85, rot:-3, tag:"keeper",    src:"/uploads/vd-07.jpeg" },

  // ── Second tier: fills gap between top row and middle, t=14–26% ─────
  { l:46, t:14, w:8, depth:0.65, rot:-2, tag:"found",     src:"/uploads/vd-18.jpeg" },
  { l:10, t:23, w:9, depth:0.60, rot:-4, tag:"grain",     src:"/uploads/vd-20.jpeg" },
  { l:68, t:26, w:8, depth:0.75, rot:3,  tag:"mood",      src:"/uploads/vd-21.jpeg" },
  { l:88, t:20, w:8, depth:0.72, rot:4,  tag:"sunday",    src:"/uploads/vd-19.jpeg" },

  // ── Middle sides only: title center (35–65%, 38–62%) stays clear ────
  { l:1,  t:36, w:8, depth:0.95, rot:2,  tag:"riso",      src:"/uploads/vd-08.jpeg" },
  { l:2,  t:63, w:9, depth:0.75, rot:-3, tag:"type",      src:"/uploads/vd-09.jpeg" },
  { l:84, t:34, w:8, depth:1.00, rot:-4, tag:"still",     src:"/uploads/vd-10.jpeg" },
  { l:83, t:62, w:9, depth:0.80, rot:3,  tag:"contact",   src:"/uploads/vd-11.jpeg" },

  // ── Lower-middle fill: t=63–73%, stays outside title zone ───────────
  { l:33, t:63, w:8, depth:0.80, rot:2,  tag:"still life",src:"/uploads/vd-25.jpeg" },
  { l:25, t:65, w:9, depth:0.68, rot:-5, tag:"colour",    src:"/uploads/vd-22.jpeg" },
  { l:51, t:72, w:8, depth:0.70, rot:4,  tag:"take two",  src:"/uploads/vd-23.jpeg" },

  // ── Bottom row: 6 frames spread l=2–72%, t=76–82% ───────────────────
  { l:2,  t:80, w:9, depth:0.68, rot:3,  tag:"frame 22",  src:"/uploads/vd-12.jpeg" },
  { l:16, t:76, w:8, depth:0.58, rot:-4, tag:"light",     src:"/uploads/vd-13.jpeg" },
  { l:29, t:82, w:9, depth:0.72, rot:5,  tag:"for fun",   src:"/uploads/vd-14.jpeg" },
  { l:42, t:78, w:8, depth:0.62, rot:-3, tag:"cover",     src:"/uploads/vd-15.jpeg" },
  { l:59, t:80, w:9, depth:0.78, rot:4,  tag:"amber",     src:"/uploads/vd-16.jpeg" },
  { l:72, t:77, w:8, depth:0.55, rot:-5, tag:"no client", src:"/uploads/vd-17.jpeg" },

  // ── Bottom-right corner extension ───────────────────────────────────
  { l:85, t:79, w:9, depth:0.62, rot:-3, tag:"late",      src:"/uploads/vd-24.jpeg" },
];

function VisualDiary() {
  const stageRef = useRefVD(null);
  const [dark, setDark] = useStateVD(false);
  const [info, setInfo] = useStateVD(false);
  const [index, setIndex] = useStateVD(false);

  /* drift + mouse parallax + proximity FISHEYE lens.
     Every frame swells as the cursor nears it (Gaussian falloff) and its
     neighbours are nudged outward to make room — a dock-style magnifier
     that reads as a soft spherical lens. Strength is live-tunable via the
     Tweaks panel through window.__vdLens (0–100). */
  useEffectVD(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const photos = Array.from(stage.querySelectorAll(".vd-photo"));
    photos.forEach((el, i) => { el.dataset.phase = (i * 1.7).toFixed(3); });

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 860px)").matches;

    // lens geometry
    const SIGMA = 160;     // px — radius of perceptible bulge
    const MAX_SCALE = 0.12; // extra scale at the dead-centre of the lens
    const PUSH = 6;        // px — how far neighbours are shoved outward

    let tmx = 0, tmy = 0, mx = 0, my = 0;           // normalised parallax
    let tpx = 0, tpy = 0, cpx = 0, cpy = 0;          // pixel cursor (smoothed)
    let tLens = 0, lens = 0;                          // lens fade-in 0..1
    let raf;

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      tpx = e.clientX - r.left;
      tpy = e.clientY - r.top;
      tLens = 1;
    };
    const onLeave = () => { tmx = 0; tmy = 0; tLens = 0; };

    const tick = () => {
      const t = performance.now();
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      cpx += (tpx - cpx) * 0.16;
      cpy += (tpy - cpy) * 0.16;
      lens += (tLens - lens) * 0.08;

      // live strength from Tweaks (0..100 → 0..1), default 0.55
      const gain = (typeof window.__vdLens === "number" ? window.__vdLens / 100 : 0.55) * lens;

      for (const el of photos) {
        const d = +el.dataset.depth, rot = +el.dataset.rot, ph = +el.dataset.phase;
        const amp = 4 + d * 5;
        const fx = Math.sin(t * 0.0004 + ph) * amp;
        const fy = Math.cos(t * 0.00033 + ph * 1.3) * amp;
        const px = -mx * d * 16;
        const py = -my * d * 16;

        // fisheye contribution
        let sx = px + fx, sy = py + fy, scale = 1, z = "";
        if (gain > 0.001) {
          const bx = el.offsetLeft + el.offsetWidth / 2;
          const by = el.offsetTop + el.offsetHeight / 2;
          const ddx = bx - cpx, ddy = by - cpy;
          const dist = Math.hypot(ddx, ddy);
          const fall = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
          scale = 1 + MAX_SCALE * gain * fall;
          if (dist > 0.001) {
            const nudge = PUSH * gain * fall * (1 - fall); // peaks mid-ring
            sx += (ddx / dist) * nudge;
            sy += (ddy / dist) * nudge;
          }
          if (fall > 0.12) z = String(30 + Math.round(fall * 50));
        }

        el.style.zIndex = z;
        el.style.transform =
          `translate3d(${sx.toFixed(2)}px, ${sy.toFixed(2)}px, 0) rotate(${rot}deg) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    if (!small) {
      raf = requestAnimationFrame(tick);
      if (!coarse) {
        stage.addEventListener("pointermove", onMove);
        stage.addEventListener("pointerleave", onLeave);
      }
    }
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const pad = (n) => String(n + 1).padStart(2, "0");

  return (
    <section id="art" className="vd" data-screen-label="05 Visual Diary">
      <div
        ref={stageRef}
        className={"vd-stage" + (dark ? " vd-dark" : "") + (index ? " vd-showcap" : "")}
      >
        {/* corner + edge labels */}
        <span className="vd-mark vd-tl">©2026</span>
        <span className="vd-mark vd-tc">KHUSHI SOLANKI</span>
        <button
          className={"vd-mark vd-tr vd-btn" + (info ? " on" : "")}
          onClick={() => setInfo((v) => !v)}
        >
          {info ? "CLOSE" : "INFO"}
        </button>

        <button
          className={"vd-mark vd-bl vd-btn" + (dark ? " on" : "")}
          onClick={() => setDark((v) => !v)}
        >
          {dark ? "LIGHT MODE" : "DARK MODE"}
        </button>
        <span className="vd-mark vd-bc">film · graphic design · art</span>
        <button
          className={"vd-mark vd-br vd-btn" + (index ? " on" : "")}
          onClick={() => setIndex((v) => !v)}
        >
          {index ? "HIDE INDEX" : "INDEX"}
        </button>

        {/* centred title */}
        <div className="vd-title" aria-hidden>
          <span className="vd-title-main">Off—Clock</span>
          <span className="vd-title-sub">The Visual Diary <span className="yr">(2026)</span></span>
        </div>

        {/* scattered frames — real photos, height adapts naturally */}
        <div className="vd-canvas">
          {VD_FRAMES.map((f, i) => (
            <figure
              key={i}
              className="vd-photo"
              data-depth={f.depth}
              data-rot={f.rot}
              style={{
                "--l": f.l + "%",
                "--t": f.t + "%",
                "--w": f.w + "%",
              }}
            >
              <div className="vd-inner">
                <img
                  src={f.src}
                  alt={f.tag}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.closest(".vd-inner").classList.add("vd-broken");
                  }}
                />
                <span className="vd-num">{pad(i)}</span>
                <span className="vd-cap">{f.tag}</span>
              </div>
            </figure>
          ))}
        </div>

        {/* info overlay */}
        <div className={"vd-info" + (info ? " open" : "")}>
          <p className="vd-info-lead">
            A diary of the work that pays no rent — film shot on weekends,
            posters set for no client, and colour chased until a frame feels
            like the room I actually stood in.
          </p>
          <div className="vd-info-meta">
            <span><b>{VD_FRAMES.length}</b> frames · 2024—26</span>
            <span>35mm · riso · hand-set type</span>
            <span>made for fun, not the feed</span>
          </div>
          <p className="vd-info-hint">Move your cursor — the wall drifts. Hover a frame to bring it forward.</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { VisualDiary });
