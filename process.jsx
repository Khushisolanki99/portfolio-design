/* global React */
/* ============================================================ */
/* PROCESS — "From chaos to clarity"                             */
/* Scribble + orange thread share one SVG coordinate space so   */
/* the thread emerges visually from inside the tangle.          */
/* ============================================================ */

const { useEffect: useEffectProc, useRef: useRefProc, useMemo: useMemoProc } = React;

/* Deterministic PRNG so the scribble is stable across renders */
function pMulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateScribblePaths(seed) {
  const rng = pMulberry32(seed);
  const paths = [];
  const cx = 200, cy = 130, numPaths = 17;
  for (let i = 0; i < numPaths; i++) {
    const numPts = 10 + Math.floor(rng() * 6);
    const subCx = cx + (rng() - 0.5) * 70;
    const subCy = cy + (rng() - 0.5) * 50;
    const baseRx = 65 + rng() * 55;
    const baseRy = 45 + rng() * 35;
    const startA = rng() * Math.PI * 2;
    const turns = 1 + Math.floor(rng() * 2);
    const pts = [];
    for (let j = 0; j < numPts; j++) {
      const a = startA + (j / (numPts - 1)) * Math.PI * 2 * turns;
      const r = 0.35 + rng() * 0.9;
      pts.push([
        subCx + Math.cos(a) * baseRx * r + (rng() - 0.5) * 12,
        subCy + Math.sin(a) * baseRy * r + (rng() - 0.5) * 12,
      ]);
    }
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let j = 1; j < pts.length; j++) {
      const prev = pts[j - 1], cur = pts[j];
      const c1x = prev[0] + (rng() - 0.5) * 90, c1y = prev[1] + (rng() - 0.5) * 90;
      const c2x = cur[0]  + (rng() - 0.5) * 90, c2y = cur[1]  + (rng() - 0.5) * 90;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${cur[0].toFixed(1)} ${cur[1].toFixed(1)}`;
    }
    paths.push({ d, sw: 1.0 + rng() * 0.9 });
  }
  return paths;
}

function clampP(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function rangeProgress(t, a, b) { return clampP((t - a) / (b - a)); }

/* Wavy hand-drawn path from (cx, sy) down to (cx, ey) — section-local coords */
function buildThreadPath(cx, sy, ey) {
  const span = ey - sy;
  return [
    `M ${cx.toFixed(1)} ${sy.toFixed(1)}`,
    `C ${(cx+16).toFixed(1)} ${(sy + span*0.08).toFixed(1)}, ${(cx-22).toFixed(1)} ${(sy + span*0.18).toFixed(1)}, ${(cx+6).toFixed(1)} ${(sy + span*0.26).toFixed(1)}`,
    `S ${(cx-20).toFixed(1)} ${(sy + span*0.38).toFixed(1)}, ${cx.toFixed(1)} ${(sy + span*0.44).toFixed(1)}`,
    `S ${(cx+18).toFixed(1)} ${(sy + span*0.56).toFixed(1)}, ${(cx-8).toFixed(1)} ${(sy + span*0.66).toFixed(1)}`,
    `S ${(cx+14).toFixed(1)} ${(sy + span*0.78).toFixed(1)}, ${(cx-4).toFixed(1)} ${(sy + span*0.88).toFixed(1)}`,
    `S ${(cx+8).toFixed(1)}  ${(sy + span*0.95).toFixed(1)}, ${cx.toFixed(1)} ${ey.toFixed(1)}`,
  ].join(' ');
}

function Process() {
  const sectionRef       = useRefProc(null);
  const scribbleScreenRef = useRefProc(null); /* .process-screen-scribble for measuring position */
  const scribbleGroupRef  = useRefProc(null); /* outer <g> in overlay SVG — gets dynamic transform */
  const threadWrapRef    = useRefProc(null);
  const svgRef           = useRefProc(null);
  const pathRef          = useRefProc(null);
  const beadRef          = useRefProc(null);
  const ms1Ref           = useRefProc(null);
  const ms2Ref           = useRefProc(null);
  const ms3Ref           = useRefProc(null);
  const scribble         = useMemoProc(() => generateScribblePaths(7), []);

  useEffectProc(() => {
    let raf = 0;
    let sectionStart = 0, sectionEnd = 0, pathLen = 0;

    const measure = () => {
      const sec       = sectionRef.current;
      const scrScreen = scribbleScreenRef.current;
      const twrap     = threadWrapRef.current;
      const svg       = svgRef.current;
      const path      = pathRef.current;
      const scribbleG = scribbleGroupRef.current;
      if (!sec || !scrScreen || !twrap || !svg || !path || !scribbleG) return;

      const secRect    = sec.getBoundingClientRect();
      const secAbsTop  = secRect.top + window.scrollY;
      const secW       = sec.offsetWidth;
      const secH       = sec.offsetHeight;

      /* SVG spans the whole section */
      svg.setAttribute('viewBox', `0 0 ${secW} ${secH}`);

      /* Scribble screen bounds in section-local coords */
      const scrRect  = scrScreen.getBoundingClientRect();
      const scrLeft  = scrRect.left - secRect.left;
      const scrTop   = (scrRect.top  + window.scrollY) - secAbsTop;
      const scrW     = scrRect.width;

      /* Match .scribble-svg { width: min(480px, 85vw) } — same apparent size */
      const cssScribbleW  = Math.min(480, window.innerWidth * 0.85);
      const scribbleScale = cssScribbleW / 400;

      /* Center the scribble group in the screen div, 40px top padding */
      const scribbleX = scrLeft + (scrW - cssScribbleW) / 2;
      const scribbleY = scrTop + 40;

      /* Position the scribble group in section-local space */
      scribbleG.setAttribute('transform',
        `translate(${scribbleX.toFixed(1)}, ${scribbleY.toFixed(1)}) scale(${scribbleScale.toFixed(4)})`
      );
      scribbleG.style.opacity = '1';

      /* Thread starts at viewBox (200, 180) — inside the lower scribble cloud.
         ~100px of the initial path overlaps the scribble before exiting downward. */
      const threadStartY = scribbleY + 180 * scribbleScale;
      const cx = secW / 2;

      /* Thread ends at bottom of thread-wrap (the tall sticky scroll zone) */
      const twRect    = twrap.getBoundingClientRect();
      const twBottom  = (twRect.bottom + window.scrollY) - secAbsTop;

      path.setAttribute('d', buildThreadPath(cx, threadStartY, twBottom));

      pathLen = path.getTotalLength();
      path.style.strokeDasharray  = pathLen;
      /* 10% always visible — thread is already emerging from scribble on first view */
      path.style.strokeDashoffset = pathLen * 0.90;

      /* Scroll bounds: section top → thread-wrap bottom.
         This ties the reveal to when the scribble first enters view, so the
         bead is always in the lower viewport as the user scrolls. */
      const twAbsBottom = twRect.bottom + window.scrollY;
      sectionStart = secAbsTop;
      sectionEnd   = twAbsBottom - window.innerHeight;
    };

    const draw = () => {
      raf = 0;
      const p = clampP((window.scrollY - sectionStart) / (sectionEnd - sectionStart));

      if (pathRef.current && pathLen > 0) {
        /* 10% always visible so thread is already embedded in the scribble.
           Progress then reveals the remaining 90% as the user scrolls. */
        const minVisible = 0.10;
        const visibleProgress = minVisible + p * (1 - minVisible);
        pathRef.current.style.strokeDashoffset = pathLen * (1 - visibleProgress);

        if (beadRef.current) {
          /* Hide bead at p=0 (initial view) — show only the line so there is
             no floating dot. Bead appears once the user starts scrolling. */
          if (p > 0.03) {
            const drawn = pathLen * visibleProgress;
            const pt = pathRef.current.getPointAtLength(drawn);
            beadRef.current.setAttribute('cx', pt.x);
            beadRef.current.setAttribute('cy', pt.y);
            beadRef.current.style.opacity = 1;
          } else {
            beadRef.current.style.opacity = 0;
          }
        }
      }

      /* Milestone labels fade in as the thread passes their zone */
      const apply = (ref, v) => {
        if (!ref.current) return;
        ref.current.style.opacity   = v;
        ref.current.style.transform = `translateY(${(1 - v) * 8}px)`;
      };
      /* With section-wide bounds, thread-wrap starts at ~p=0.37.
         Milestones are spaced through the thread-wrap zone. */
      apply(ms1Ref, rangeProgress(p, 0.50, 0.57));
      apply(ms2Ref, rangeProgress(p, 0.66, 0.73));
      apply(ms3Ref, rangeProgress(p, 0.82, 0.89));
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const onResize = () => { measure(); draw(); };

    measure();
    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { measure(); draw(); });
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="process bg-grid-paper">

      {/* Decorative "PM tool" nav — sticky at top of section */}
      <nav className="process-ui-nav" aria-hidden="true">
        <span className="pun-item">Queue</span>
        <span className="pun-item pun-active">Brief · Day 01</span>
        <span className="pun-item">Cohorts</span>
        <span className="pun-item">Policy</span>
        <span className="pun-item">Reports</span>
      </nav>

      {/* Screen 1 — Messy scribble */}
      <div ref={scribbleScreenRef} className="process-screen process-screen-scribble">
        <div className="process-label reveal">
          <span className="dot" />
          <span>From chaos to clarity</span>
          <span className="num">/ 01</span>
        </div>
        <div className="process-scribble reveal">
          {/* Invisible spacer keeps layout height identical to before */}
          <svg aria-hidden="true" className="scribble-svg" viewBox="0 0 400 260" style={{ visibility: 'hidden' }} />
          <span className="scribble-cap hand">a tangle of thoughts</span>
          <span className="scribble-tag sticker tilt-l">✎ BRIEF · DAY 01</span>
        </div>
      </div>

      {/* Thread scroll zone — tall div keeps milestones sticky while thread draws */}
      <div className="process-thread-wrap" ref={threadWrapRef}>
        <div className="process-thread-sticky">
          <div ref={ms1Ref} className="thread-milestone left" style={{ top: "28%", opacity: 0, transform: "translateY(8px)" }}>
            <span className="ms-tag">listen</span>
            <span className="ms-note">interviews · field notes</span>
          </div>
          <div ref={ms2Ref} className="thread-milestone right" style={{ top: "50%", opacity: 0, transform: "translateY(8px)" }}>
            <span className="ms-tag">define</span>
            <span className="ms-note">problem · users · scope</span>
          </div>
          <div ref={ms3Ref} className="thread-milestone left" style={{ top: "72%", opacity: 0, transform: "translateY(8px)" }}>
            <span className="ms-tag">structure</span>
            <span className="ms-note">flows · requirements · ship</span>
          </div>
        </div>
      </div>

      {/* Screen 3 — Structured solution board */}
      <div className="process-board-wrap">
        <div className="process-board-label reveal">
          <span className="dot" />
          <span>The structured solution</span>
          <span className="num">/ 02</span>
        </div>

        <div className="process-board">
          <svg className="board-connectors" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 180 90 C 260 140, 320 160, 420 200" stroke="rgba(24,21,19,0.35)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
            <path d="M 560 230 C 640 240, 720 220, 820 200" stroke="rgba(24,21,19,0.35)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
            <path d="M 360 320 C 380 380, 380 420, 360 470" stroke="rgba(24,21,19,0.35)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
          </svg>

          <div className="b-card b-sticky b-sticky-1 reveal" style={{ transitionDelay: "0ms" }}>
            <span className="b-sticky-pin" />
            <div className="b-k">Problem</div>
            <div className="b-body">First-time users drop off in onboarding at step 3 of 5.</div>
            <div className="b-sticky-foot">↳ user research, n=12</div>
          </div>

          <div className="b-card b-sticky b-sticky-2 reveal" style={{ transitionDelay: "80ms" }}>
            <span className="b-sticky-pin" />
            <div className="b-k">Goal</div>
            <div className="b-body">Complete signup in under 90 seconds with zero blockers.</div>
            <div className="b-sticky-foot">v1.0 · sprint 14</div>
          </div>

          <div className="b-badge reveal" style={{ transitionDelay: "160ms" }}>
            <span className="b-badge-tag">PRD · 04</span>
            <span className="b-badge-sub">last edit 2d</span>
          </div>

          <div className="b-card b-flow reveal" style={{ transitionDelay: "240ms" }}>
            <div className="b-card-head">
              <span className="b-k">User flow</span>
              <span className="b-mini">4 steps · 0 dead-ends</span>
            </div>
            <div className="b-flow-row">
              <div className="b-node"><span className="n">01</span><span className="t">Land</span></div>
              <span className="b-flow-arrow">→</span>
              <div className="b-node"><span className="n">02</span><span className="t">Try</span></div>
              <span className="b-flow-arrow">→</span>
              <div className="b-node"><span className="n">03</span><span className="t">Verify</span></div>
              <span className="b-flow-arrow">→</span>
              <div className="b-node accent"><span className="n">04</span><span className="t">Done</span></div>
            </div>
          </div>

          <div className="b-card b-wire reveal" style={{ transitionDelay: "320ms" }}>
            <div className="b-card-head">
              <span className="b-k">Wireframe</span>
              <span className="b-mini">screen 03 · mobile</span>
            </div>
            <div className="b-wire-frame">
              <div className="b-wire-top">
                <span className="b-wire-dot" /><span className="b-wire-dot" /><span className="b-wire-dot" />
              </div>
              <div className="b-wire-stack">
                <div className="b-wire-line w-80" />
                <div className="b-wire-line w-55" />
                <div className="b-wire-line w-70" />
                <div className="b-wire-line w-40" />
                <div className="b-wire-cta">Continue →</div>
              </div>
            </div>
          </div>

          <div className="b-card b-prd reveal" style={{ transitionDelay: "400ms" }}>
            <div className="b-card-head">
              <span className="b-k">Requirements</span>
              <span className="b-mini">8 functional · 3 NFR · all owned</span>
            </div>
            <ul className="b-checklist">
              <li><span className="b-check" />User stories &amp; acceptance criteria</li>
              <li><span className="b-check" />Edge cases &amp; error states mapped</li>
              <li><span className="b-check" />Telemetry &amp; success metrics defined</li>
              <li><span className="b-check" />Rollout plan + fallback path agreed</li>
            </ul>
          </div>

          <div className="b-outcome reveal" style={{ transitionDelay: "480ms" }}>
            <span className="b-outcome-n">+24%</span>
            <span className="b-outcome-l">activation, week 1</span>
          </div>
        </div>
      </div>

      {/* Screen 4 — Caption */}
      <div className="process-caption-wrap">
        <div className="process-caption reveal">
          <span className="line">Messy ideas in.</span>
          <span className="line"><span className="accent">Structured solutions</span> out.</span>
        </div>
        <div className="process-caption-foot reveal">
          <span className="dot" />
          <span>process · in practice</span>
          <span className="sep">/</span>
          <span>↓ selected work</span>
        </div>
      </div>

      {/* ── Unified overlay SVG ─────────────────────────────────── */}
      {/* Scribble paths + orange thread share this coordinate space */}
      {/* so the thread visually emerges from inside the tangle.    */}
      <svg
        ref={svgRef}
        className="process-thread-svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Outer g gets a dynamic transform in measure() to place the
            scribble at the exact position of .process-screen-scribble.
            Inner g carries the CSS breathing animation. */}
        <g ref={scribbleGroupRef} style={{ opacity: 0 }}>
          <g className="scribble-wiggle">
            {scribble.map((sp, i) => (
              <path key={i} d={sp.d} stroke="#181513" strokeWidth={sp.sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </g>
        </g>

        {/* Orange thread — starts inside the scribble, grows downward with scroll */}
        <path
          ref={pathRef}
          stroke="var(--accent)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'none', willChange: 'stroke-dashoffset' }}
        />

        {/* Bead sits exactly at the visible drawn endpoint, never floats freely */}
        <circle
          ref={beadRef}
          r="5"
          fill="var(--accent)"
          style={{ opacity: 0 }}
        />
      </svg>
    </section>
  );
}

Object.assign(window, { Process });
