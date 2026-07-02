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
  const sectionRef         = useRefProc(null);
  const scribbleScreenRef  = useRefProc(null);
  const scribbleGroupRef   = useRefProc(null);
  const threadWrapRef      = useRefProc(null);
  const svgRef             = useRefProc(null);
  const stickyThreadSvgRef = useRefProc(null); /* centered sticky SVG for the orange thread */
  const pathRef            = useRefProc(null);
  const beadRef            = useRefProc(null);
  const ms1Ref           = useRefProc(null);
  const ms2Ref           = useRefProc(null);
  const ms3Ref           = useRefProc(null);
  const scribble         = useMemoProc(() => generateScribblePaths(7), []);

  useEffectProc(() => {
    let raf = 0;
    let sectionStart = 0, sectionEnd = 0, pathLen = 0;

    const measure = () => {
      const sec        = sectionRef.current;
      const scrScreen  = scribbleScreenRef.current;
      const twrap      = threadWrapRef.current;
      const svg        = svgRef.current;
      const stickySvg  = stickyThreadSvgRef.current;
      const path       = pathRef.current;
      const scribbleG  = scribbleGroupRef.current;
      if (!sec || !scrScreen || !twrap || !svg || !stickySvg || !path || !scribbleG) return;

      const secRect   = sec.getBoundingClientRect();
      const secAbsTop = secRect.top + window.scrollY;
      const secW      = sec.offsetWidth;
      const secH      = sec.offsetHeight;

      /* Overlay SVG covers the whole section — used only for the scribble */
      svg.setAttribute('viewBox', `0 0 ${secW} ${secH}`);

      /* Scribble screen bounds in section-local coords */
      const scrRect       = scrScreen.getBoundingClientRect();
      const scrLeft       = scrRect.left - secRect.left;
      const scrTop        = (scrRect.top + window.scrollY) - secAbsTop;
      const scrW          = scrRect.width;
      const cssScribbleW  = Math.min(480, window.innerWidth * 0.85);
      const scribbleScale = cssScribbleW / 400;
      const scrH          = scrRect.height;
      const scribbleH     = 260 * scribbleScale;
      const labelWithMargin = 76;
      const scribbleX     = scrLeft + (scrW - cssScribbleW) / 2;
      const scribbleY     = scrTop  + (scrH - labelWithMargin - scribbleH) / 2 + labelWithMargin;

      scribbleG.setAttribute('transform',
        `translate(${scribbleX.toFixed(1)}, ${scribbleY.toFixed(1)}) scale(${scribbleScale.toFixed(4)})`
      );
      scribbleG.style.opacity = '1';

      /* Thread lives in the sticky SVG — coordinates are viewport-local (0..120 × 0..innerHeight).
         left: 50% + translateX(-50%) on the SVG element keeps it horizontally centered on any
         screen width without any JS measurement, so it can never drift off-screen. */
      const H = window.innerHeight;
      stickySvg.setAttribute('viewBox', `0 0 120 ${H}`);
      path.setAttribute('d', buildThreadPath(60, 0, H));
      pathLen = path.getTotalLength();
      path.style.strokeDasharray  = pathLen;
      path.style.strokeDashoffset = pathLen * 0.90; /* 10% pre-drawn at entry */

      /* Scroll bounds span the thread-wrap zone only */
      const twRect = twrap.getBoundingClientRect();
      sectionStart = twRect.top  + window.scrollY;
      sectionEnd   = twRect.bottom + window.scrollY - window.innerHeight;
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
        </div>
      </div>

      {/* Thread scroll zone — tall div keeps milestones sticky while thread draws */}
      <div className="process-thread-wrap" ref={threadWrapRef}>
        <div className="process-thread-sticky">

          {/* Orange thread — viewport-local coordinates, always centered via CSS */}
          <svg
            ref={stickyThreadSvgRef}
            className="thread-line-svg"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              stroke="var(--accent)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ transition: 'none', willChange: 'stroke-dashoffset' }}
            />
            <circle
              ref={beadRef}
              r="5"
              fill="var(--accent)"
              style={{ opacity: 0 }}
            />
          </svg>

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

      {/* Screen 3 — Branch output diagram */}
      <div className="process-board-wrap">
        <div className="board-branch reveal" aria-hidden="true">
          <svg viewBox="0 0 680 370" xmlns="http://www.w3.org/2000/svg">

            {/* ── Orange wavy trunk ── */}
            <path d="M 340,0 C 348,18 332,42 341,62 S 334,76 340,85"
                  stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="340" cy="85" r="4.5" fill="var(--accent)" />

            {/* ── Three wavy branches ── */}
            <path d="M 340,85 C 300,110 220,132 176,160 S 128,180 112,187"
                  stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 340,85 C 348,110 332,134 341,158 S 334,178 340,187"
                  stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 340,85 C 380,110 460,132 504,160 S 552,180 568,187"
                  stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* ══ Node 1 · PRD · hand-drawn document  (130 × 150 px) ══ */}
            {/* x: 47–177  y: 187–337  dog-ear at x=155 */}
            <path d="M 49,188 C 48,187 47,188 47,190 L 47,335 C 47,337 49,338 51,337
                     L 175,337 L 175,210 L 155,188 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 155,188 C 155,196 156,208 155,210 L 175,210"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.58" />
            <path d="M 60,232 C 66,231 96,233 128,232"  fill="none" stroke="var(--ink)" strokeWidth="2"   strokeLinecap="round" opacity="0.52"/>
            <path d="M 60,248 C 67,247 100,249 142,248"  fill="none" stroke="var(--ink)" strokeWidth="2"   strokeLinecap="round" opacity="0.52"/>
            <path d="M 60,264 C 65,263 98,265 136,264"  fill="none" stroke="var(--ink)" strokeWidth="2"   strokeLinecap="round" opacity="0.52"/>
            <path d="M 60,280 C 66,279 96,281 125,280"  fill="none" stroke="var(--ink)" strokeWidth="2"   strokeLinecap="round" opacity="0.52"/>
            <path d="M 60,296 C 64,295 91,297 112,296"  fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.38"/>

            {/* ══ Node 2 · Workflow · hand-drawn process boxes (130 × 155 px) ══ */}
            {/* x: 275–405  y: 187–342 */}
            {/* Box 1 */}
            <path d="M 277,189 C 276,188 274,188 274,190 L 274,226 C 274,228 276,229 278,229
                     L 402,229 C 404,229 406,228 405,226 L 406,190 C 406,188 404,187 402,188 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 340,229 C 342,237 337,243 340,249"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 333,246 L 340,253 L 347,246"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.68"/>
            {/* Box 2 */}
            <path d="M 277,254 C 276,253 274,253 274,255 L 274,291 C 274,293 276,294 278,294
                     L 402,294 C 404,294 406,293 405,291 L 406,255 C 406,253 404,252 402,253 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 340,294 C 342,302 337,308 340,314"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 333,311 L 340,318 L 347,311"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.68"/>
            {/* Box 3 */}
            <path d="M 277,319 C 276,318 274,318 274,320 L 274,342 C 274,344 276,345 278,345
                     L 402,345 C 404,345 406,344 405,342 L 406,320 C 406,318 404,317 402,318 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* ══ Node 3 · Wireframe · hand-drawn screen (130 × 150 px) ══ */}
            {/* x: 503–633  y: 187–337 */}
            <path d="M 505,189 C 504,188 502,188 502,190 L 502,335 C 502,337 504,338 506,337
                     L 631,337 C 633,337 634,336 634,334 L 635,190 C 635,188 633,187 631,188 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Nav bar */}
            <path d="M 502,206 C 524,205 568,207 635,206"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" opacity="0.62"/>
            {/* Headline block */}
            <path d="M 514,218 C 518,217 552,219 582,218 L 582,230 C 580,231 550,231 515,230 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.52"/>
            {/* Content text lines */}
            <path d="M 514,242 C 520,241 560,243 608,242"
                  fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.44"/>
            <path d="M 514,257 C 519,256 556,258 592,257"
                  fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.44"/>
            <path d="M 514,272 C 518,271 548,273 572,272"
                  fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.44"/>
            {/* CTA button */}
            <path d="M 514,287 C 513,286 511,287 511,289 L 511,302 C 511,304 513,305 515,305
                     L 618,305 C 620,305 621,304 621,302 L 622,289 C 622,287 620,286 618,287 Z"
                  fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.56"/>

            {/* ── Labels ── */}
            <text x="112" y="358" textAnchor="middle"
                  fontFamily="Special Elite, Courier New, monospace"
                  fontSize="13" letterSpacing="0.12em" fill="var(--ink)" opacity="0.72">PRD</text>
            <text x="340" y="364" textAnchor="middle"
                  fontFamily="Special Elite, Courier New, monospace"
                  fontSize="13" letterSpacing="0.12em" fill="var(--ink)" opacity="0.72">WORKFLOW</text>
            <text x="568" y="358" textAnchor="middle"
                  fontFamily="Special Elite, Courier New, monospace"
                  fontSize="13" letterSpacing="0.12em" fill="var(--ink)" opacity="0.72">WIREFRAME</text>
          </svg>
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

      {/* ── Scribble overlay SVG ────────────────────────────────── */}
      {/* Scribble only — thread has moved to the sticky viewport SVG */}
      <svg
        ref={svgRef}
        className="process-thread-svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g ref={scribbleGroupRef} style={{ opacity: 0 }}>
          <g className="scribble-wiggle">
            {scribble.map((sp, i) => (
              <path key={i} d={sp.d} stroke="#181513" strokeWidth={sp.sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </g>
        </g>
      </svg>
    </section>
  );
}

Object.assign(window, { Process });
