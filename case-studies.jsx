/* global React */
const { useState, useEffect } = React;

/* ============================================================ */
/* Case study data                                              */
/* ============================================================ */
const CASE_STUDIES = [
  {
    id: "rto",
    num: "01",
    title: "RTO",
    titleEm: "Guard",
    sub: "Dashboard that helps e-commerce teams identify risky orders before they become returns.",
    year: "2025",
    duration: "8 wks",
    type: "B2B SaaS",
    client: "D2C Logistics",
    tags: ["B2B SaaS", "Dashboard", "Ops", "Risk Detection"],
    problemLine: "Ops teams lack a single early-warning system for failed deliveries, COD risk, and courier issues.",
    spec: {
      Problem: "Ops teams lack a single early-warning system for failed deliveries, COD risk, and courier issues.",
      Role: "BA + Product strategy",
      Process: "Stakeholder interviews → workflow audit → risk heuristics → PRD → dashboard IA → screens",
      Output: "PRD, dashboard IA, risk flags, order detail screens",
      Tools: "Figma, Miro, Notion, JIRA, Excel",
    },
    overview:
      "RTO Guard is an internal operations dashboard that flags high-risk orders before they ship — combining buyer history, address signals, COD patterns, and pincode performance into a single confidence score the warehouse can act on in seconds.",
    problem: [
      "Returns-to-origin were eating 11.8% of contribution margin, with no upstream signal.",
      "Ops shipped every order and learned the cost on the way back.",
      "Existing BI dashboards were retrospective, not actionable at picking time.",
    ],
    users: [
      "Warehouse pickers — need a glance-level signal at the pick station.",
      "Ops leads — need queue triage, batch holds, escalation paths.",
      "Finance — need weekly cohort views and policy levers.",
    ],
    context:
      "The business goal was a 4-point reduction in RTO rate within one quarter without changing courier mix. Constraints: no new data sources, mobile-friendly for floor staff, integrate with existing Shopify + Shiprocket stack.",
    research: [
      "12 stakeholder interviews across ops, CX, finance, growth.",
      "Shadowed 3 days at the Bhiwandi warehouse, mapped 17 decision points.",
      "Audited 6 months of returns — clustered into 4 risk archetypes.",
    ],
    pains: [
      "\"We only know it's a bad order when it comes back.\"",
      "Pickers had no way to flag — only escalate verbally.",
      "Ops leads bounced between 3 tabs to make one hold decision.",
    ],
    reqs: [
      "Single confidence score per order, computed at sync time.",
      "Reason chips so pickers understand the why.",
      "One-click hold + reroute, with auto-notify to CX.",
      "Weekly cohort export, segmentable by SKU and pincode.",
    ],
    flow: [
      { t: "Order sync", d: "Pulled from Shopify webhook" },
      { t: "Score",      d: "Heuristics + history applied" },
      { t: "Triage",     d: "Lead reviews orange / red queue" },
      { t: "Action",     d: "Hold, reroute, or release" },
      { t: "Loop back",  d: "Outcome feeds learning set" },
    ],
    outcome: [
      { n: "−38%", l: "RTO rate, Q2" },
      { n: "4.2×", l: "ROI in 90 days" },
      { n: "<3s",  l: "Decision time / order" },
      { n: "94%",  l: "Ops adoption" },
    ],
    learnings: [
      "The dashboard wasn't the product — the reason chips were. Pickers trusted the score only once they saw the why.",
      "Shipping a v0 spreadsheet first beat a polished tool nobody wanted to use.",
    ],
  },
  {
    id: "ai-meet",
    num: "02",
    title: "AI Meeting",
    titleEm: "Brief",
    sub: "AI-powered workspace for meeting preparation, summaries, decisions, and follow-ups.",
    year: "2025",
    duration: "10 wks",
    type: "AI Product",
    client: "Product Squad, Beta",
    tags: ["AI Product", "PRD", "Workflow Design", "Task Tracking"],
    problemLine: "Cross-functional meetings create decisions and action items that often never make it into a system of record.",
    spec: {
      Problem: "Cross-functional meetings create decisions and action items that often never make it into a system of record.",
      Role: "Product thinker + BA",
      Process: "Problem framing → persona mapping → PRD → user flow → wireframes → screens",
      Output: "PRD v1 + user flow + AI brief logic + 5 core screens",
      Tools: "Notion, Figma, Miro, JIRA",
    },
    overview:
      "An AI workspace that sits before, during, and after every meeting — surfacing context on entry, listening for decisions live, and routing follow-ups to the right owner in the right tool the moment the call ends.",
    problem: [
      "Decisions made in calls weren't reaching JIRA, Linear, or the wiki.",
      "Pre-reads were copy-pasted from 5 places, or skipped.",
      "Recap docs got written once, then died in a Drive folder.",
    ],
    users: [
      "Product managers — coordinate 8–12 syncs/week.",
      "Engineering leads — need decisions, not transcripts.",
      "Execs — need a weekly \"what changed\" digest.",
    ],
    context:
      "Built for teams already using Notion + JIRA + Slack. The AI had to be auditable — every action it took needed a visible source in the transcript.",
    research: [
      "Diary study with 14 PMs across 3 companies.",
      "Logged 84 meetings; coded 612 decision moments.",
      "Mapped 9 recurring meeting archetypes with distinct brief shapes.",
    ],
    pains: [
      "\"By Friday I can't remember what we agreed Tuesday.\"",
      "Action items were buried in transcripts nobody re-read.",
      "Owners weren't tagged, so nothing was on a board.",
    ],
    reqs: [
      "Auto-generated pre-read 30 min before each meeting.",
      "Live decision capture with one-tap edit during the call.",
      "Owners auto-routed to JIRA/Linear with deep-linked source.",
      "Weekly digest grouped by initiative, not by meeting.",
    ],
    flow: [
      { t: "Pre-brief",  d: "Context surfaced T-30 min" },
      { t: "Live capture", d: "Agent listens for verbs" },
      { t: "Confirm",    d: "Owner taps to lock action" },
      { t: "Route",      d: "Tasks land in JIRA" },
      { t: "Digest",     d: "Friday rollup by initiative" },
    ],
    outcome: [
      { n: "+71%", l: "Actions captured" },
      { n: "−4h",  l: "Saved / PM / week" },
      { n: "9.1",  l: "NPS, beta cohort" },
      { n: "3",    l: "Tools collapsed into one" },
    ],
    learnings: [
      "The brief was the wedge, not the recap. People joined for the pre-read and stayed for the action loop.",
      "Confidence cues mattered: the agent had to flag uncertainty, not paper over it.",
    ],
  },
  {
    id: "nudge",
    num: "03",
    title: "Nudge",
    titleEm: "Buy where you decide",
    sub: "Embedded checkout layer that collapses the gap between content discovery and purchase — no redirect, no friction.",
    year: "2025",
    duration: "8 wks",
    type: "Commerce Infrastructure",
    client: "0 → 1 product · PM + BA",
    tags: ["PM + BA", "Commerce Infra", "0 → 1", "Embedded Checkout"],
    externalUrl: "case-studies/nudge.html",
    problemLine: "70% of high-intent shoppers abandon at the redirect — the moment between 'I want this' and 'where do I buy it' is where revenue disappears.",
    spec: {
      Problem: "High-intent buyers drop at the redirect between discovery and purchase.",
      Role: "PM + BA — 0 → 1",
      Process: "Discovery → user interviews → PRD → flow mapping → embedded spec → handoff",
      Output: "PRD, checkout embed spec, user flows, API contract, metric framework",
      Tools: "Figma, Notion, Miro, JIRA",
    },
    overview:
      "Nudge is an embedded checkout layer that lets buyers complete a purchase inside the surface where they discovered the product — social feed, creator post, editorial page — without a redirect, without a new tab.",
    outcome: [
      { n: "-30%", l: "Target checkout abandonment" },
      { n: "+25%", l: "Conversion from content" },
      { n: "<2min", l: "Intent to purchase" },
      { n: "8 wks", l: "Discovery to spec" },
    ],
  },
  {
    id: "idea-mvp",
    num: "04",
    title: "Idea-to-MVP",
    titleEm: "Platform",
    sub: "A guided workspace that turns a raw idea into a structured PRD, flow map, and shippable v0 spec.",
    year: "2024",
    duration: "12 wks",
    type: "B2B SaaS",
    client: "Founders, Beta",
    tags: ["B2B SaaS", "Founders", "PRD Automation", "Product Strategy"],
    problemLine: "Founders skip from idea straight to Figma — leaving requirements, scope, and feasibility unaddressed until it's too late.",
    spec: {
      Problem: "Founders skip from idea straight to Figma — leaving requirements, scope, and feasibility unaddressed until it's too late.",
      Role: "Product thinker + BA",
      Process: "Founder interviews → idea decomposition → PRD scaffolding → flow generator → wireframes",
      Output: "PRD, scope/feasibility scoring, 12 screens, idea-to-spec playbook",
      Tools: "Figma, Notion, Miro, JIRA",
    },
    overview:
      "A guided workspace that walks founders from a raw idea to a structured PRD, generated user flow, and a scope-scored v0 — built to feel like working with a senior PM who asks the right questions before letting you build.",
    problem: [
      "First-time founders jump from idea to Figma, skipping requirements entirely.",
      "PRDs written from scratch take 1–2 weeks the team doesn't have.",
      "Scope and feasibility surface as problems mid-build, not pre-build.",
    ],
    users: [
      "Solo founders pre-MVP with no PM partner.",
      "2–3 person founding teams sprinting toward a v0.",
      "Agencies pitching MVP scopes to clients.",
    ],
    context:
      "The platform had to feel like working WITH a senior PM — questions before answers, scaffolding before screens. Goal: cut idea-to-PRD time from 2 weeks to 2 days.",
    research: [
      "Interviewed 18 founders across pre-seed and seed stages.",
      "Audited 26 real-world PRDs for shared structural patterns.",
      "Mapped the 9 questions every founder under-answers.",
    ],
    pains: [
      "\"I have a deck but I don't have a spec.\"",
      "Founders mistook feature lists for PRDs.",
      "No way to score scope vs. timeline before building.",
    ],
    reqs: [
      "Guided intake: idea → users → problem → metrics → scope.",
      "Auto-generated PRD draft, editable inline.",
      "Flow map generated from the spec, not the other way around.",
      "Scope scoring with 'cut' suggestions for v0 vs. v1.",
    ],
    flow: [
      { t: "Frame",     d: "Idea broken into 9 prompts" },
      { t: "PRD draft", d: "Auto-scaffolded, editable" },
      { t: "Flow gen",  d: "User flow from requirements" },
      { t: "Score",     d: "Scope / feasibility check" },
      { t: "Ship v0",   d: "Export to Figma + Linear" },
    ],
    outcome: [
      { n: "2 days", l: "Idea-to-PRD, vs. 2 wks" },
      { n: "+60%",   l: "Founders who cut scope" },
      { n: "84%",    l: "PRDs reused without rewrite" },
      { n: "12→4",   l: "Wks to MVP, avg" },
    ],
    learnings: [
      "Founders didn't need a generator — they needed a scaffold. The questions were the product.",
      "Scope scoring was the highest-conversion feature; founders trusted a number more than advice.",
    ],
  },
];

window.CASE_STUDIES = CASE_STUDIES;

/* ============================================================ */
/* Per-case mock screens — differentiated PRD/UI artifacts       */
/* ============================================================ */
function MockRTOOverview() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />rto.dashboard.v2</span>
      <div className="mock mock-rto">
        <div className="topbar">
          <div className="brand">RTO<span className="dot">●</span>Guard</div>
          <div className="nav"><span className="on">Queue</span><span>Cohorts</span><span>Policy</span><span>Reports</span></div>
          <div className="user">K</div>
        </div>
        <div className="kpis">
          <div className="kpi alert"><div className="lbl">RTO Rate · today</div><div className="v"><span className="ac">8.2%</span></div><div className="delta down">↓ 2.1pp</div></div>
          <div className="kpi"><div className="lbl">At-risk orders</div><div className="v">142</div><div className="delta">+18</div></div>
          <div className="kpi"><div className="lbl">Held</div><div className="v">38</div></div>
          <div className="kpi"><div className="lbl">Released</div><div className="v">104</div></div>
        </div>
        <div className="body">
          <div className="table">
            <div className="h"><span>ORDER</span><span>BUYER</span><span>PINCODE</span><span>SCORE</span><span>FLAG</span></div>
            <div className="r"><span>#48211</span><span>R. Mehta</span><span>400 089</span><span>92</span><span><span className="chip red">RED</span></span></div>
            <div className="r"><span>#48207</span><span>A. Iyer</span><span>110 092</span><span>78</span><span><span className="chip amber">AMB</span></span></div>
            <div className="r"><span>#48201</span><span>P. Shah</span><span>700 056</span><span>64</span><span><span className="chip amber">AMB</span></span></div>
            <div className="r"><span>#48198</span><span>S. Khan</span><span>560 100</span><span>22</span><span><span className="chip green">OK</span></span></div>
            <div className="r"><span>#48190</span><span>N. Das</span><span>411 014</span><span>14</span><span><span className="chip green">OK</span></span></div>
            <div className="r"><span>#48184</span><span>V. Rao</span><span>500 081</span><span>09</span><span><span className="chip green">OK</span></span></div>
          </div>
          <div className="chart">
            <div className="lbl">RTO Rate · 14 days</div>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none">
              <path d="M 0 40 L 14 38 L 28 44 L 42 36 L 56 42 L 70 30 L 84 34 L 98 26 L 112 32 L 126 24 L 140 28 L 154 20 L 168 24 L 182 18 L 196 22" fill="none" stroke="var(--accent)" strokeWidth="2"/>
              <path d="M 0 40 L 14 38 L 28 44 L 42 36 L 56 42 L 70 30 L 84 34 L 98 26 L 112 32 L 126 24 L 140 28 L 154 20 L 168 24 L 182 18 L 196 22 L 196 80 L 0 80 Z" fill="rgba(224,65,31,0.12)"/>
            </svg>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 6 }}>
              <div><div style={{ fontFamily: "var(--type)", fontSize: 8.5, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Q2 avg</div><div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, color: "var(--ink)" }}>9.4%</div></div>
              <div><div style={{ fontFamily: "var(--type)", fontSize: 8.5, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Best</div><div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, color: "var(--green)" }}>6.1%</div></div>
              <div><div style={{ fontFamily: "var(--type)", fontSize: 8.5, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Target</div><div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, color: "var(--accent)" }}>7.0%</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockRTOPicker() {
  return (
    <div className="panel third">
      <span className="corner-tl"><span className="dot" />rto.picker.mobile</span>
      <div className="mock mock-picker">
        <div className="phone">
          <div className="stat"><span>9:41</span><span>•••</span></div>
          <div style={{ fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.1em", color: "var(--ink-soft)", textTransform: "uppercase" }}>Order #48211</div>
          <div className="score-ring">
            <div className="ring"><span>78</span></div>
            <div className="lbl">High risk · hold</div>
          </div>
          <div className="reasons">
            <span className="chip red">Repeat RTO</span>
            <span className="chip amber">COD &gt; ₹2k</span>
            <span className="chip amber">Pincode flag</span>
          </div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>
            Buyer has 4 RTOs in last 60d. Suggested: hold for prepaid switch.
          </div>
          <div className="btn">Hold &amp; reroute →</div>
        </div>
      </div>
    </div>
  );
}

function MockRTOPRD() {
  return (
    <div className="panel two-thirds">
      <span className="corner-tl"><span className="dot" />rto.prd.snippet</span>
      <div className="mock" style={{ background: "var(--paper)", padding: "5%", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 8 }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>PRD · RTO Guard v0.4</div>
          <div style={{ fontFamily: "var(--type)", fontSize: 10, letterSpacing: "0.1em", color: "var(--accent)" }}>DRAFT · Khushi S.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flex: 1 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <div style={{ fontFamily: "var(--type)", fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Problem</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, lineHeight: 1.5, color: "var(--ink)" }}>RTO eating 11.8% of margin with zero upstream signal at pick time.</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--type)", fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Hypothesis</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, lineHeight: 1.5, color: "var(--ink)" }}>A glance-level risk score + reason chips will cut RTO 4pp in 1 quarter without changing courier mix.</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--type)", fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Success</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, lineHeight: 1.5, color: "var(--ink)" }}>RTO rate −4pp · pick-time decision &lt; 3s · ops adoption &gt; 80%.</div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
            <div style={{ fontFamily: "var(--type)", fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Requirements</div>
            {["Score computed at sync, &lt; 800ms p95", "Reason chips on every score", "One-tap hold + auto-notify CX", "Cohort export, weekly, segmentable"].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 8, paddingBottom: 6, borderBottom: "1px dashed rgba(0,0,0,0.08)" }}>
                <span style={{ fontFamily: "var(--type)", fontSize: 9.5, color: "var(--ink-muted)", letterSpacing: "0.06em" }}>R.{String(i+1).padStart(2,"0")}</span>
                <span style={{ fontFamily: "var(--sans)", fontSize: 11, lineHeight: 1.45, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: r }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockAIOverview() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />ai.meeting.brief</span>
      <div className="mock mock-ai">
        <div className="topbar">
          <div className="brand">Brief<span className="dot">●</span>Live</div>
          <div className="nav"><span>Pre-brief</span><span className="on">Live</span><span>Actions</span><span>Digest</span></div>
          <div className="user">K</div>
        </div>
        <div className="body">
          <div className="col">
            <h5><span className="dot" /> Transcript · live</h5>
            <div className="who">M. Sharma · PM</div>
            <div className="bubble them">Can we lock the cutoff date for the Q3 rollout this week?</div>
            <div className="who">A. Patel · Eng</div>
            <div className="bubble them">Friday EOD works. I'll create the JIRA epic by tomorrow.</div>
            <div className="who">K. Solanki · BA</div>
            <div className="bubble you">I'll send the updated PRD by Thursday so QA has it before kickoff.</div>
            <div className="who">M. Sharma · PM</div>
            <div className="bubble them">Perfect. Adding it to the digest.</div>
          </div>
          <div className="col">
            <h5><span className="dot" /> Captured actions · 3</h5>
            <div className="action">
              <span className="box on" />
              <div>Lock Q3 cutoff · Fri EOD<small>jira · roadmap-114 · auto-routed</small></div>
              <span className="owner">M</span>
            </div>
            <div className="action">
              <span className="box on" />
              <div>Create JIRA epic for Q3<small>linear · open in 1 day</small></div>
              <span className="owner">A</span>
            </div>
            <div className="action">
              <span className="box" />
              <div>Send updated PRD to QA<small>notion · due Thu</small></div>
              <span className="owner" style={{ background: "var(--accent)" }}>K</span>
            </div>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
              <span>Confidence · 94%</span>
              <span><span style={{ color: "var(--accent)" }}>●</span> Listening</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockAIPreBrief() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />ai.prebrief.email</span>
      <div className="mock mock-prebrief">
        <div className="meta"><span className="ac">PRE-BRIEF · T-30 MIN</span><span>roadmap sync · 30 min · 5 attendees</span></div>
        <h5>Q3 cutoff &amp; rollout — read me before you join.</h5>
        <ul>
          <li>Last call ended with 2 open actions; one still unowned.</li>
          <li>Eng raised a dependency on QA capacity — bring this up.</li>
          <li>Finance asked for a revised launch budget; deck linked below.</li>
          <li>4 of 5 attendees marked themselves "ready to decide" in pre-poll.</li>
        </ul>
        <div style={{ marginTop: "auto", display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <span className="chip">PRD v1.4</span>
          <span className="chip">Budget v3</span>
          <span className="chip">Mixpanel · funnel</span>
        </div>
      </div>
    </div>
  );
}

function MockAIDigest() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />ai.weekly.digest</span>
      <div className="mock mock-prebrief">
        <div className="meta"><span className="ac">DIGEST · FRI 4:00 PM</span><span>week 28 · 14 meetings</span></div>
        <h5>What moved this week.</h5>
        <div style={{ display: "grid", gap: 10, flex: 1 }}>
          {[
            { i: "Q3 rollout", d: "Cutoff locked · QA dependency surfaced · 1 decision pending" },
            { i: "Onboarding", d: "Step-3 redesign approved · ship Tue · target +10pp activation" },
            { i: "Ops tooling", d: "Risk score v0.4 in prod · 38 holds · 0 false-positive escalations" },
          ].map((g) => (
            <div key={g.i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "baseline", paddingBottom: 8, borderBottom: "1px dashed rgba(0,0,0,0.08)" }}>
              <span style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", whiteSpace: "nowrap" }}>{g.i}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>{g.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockCXFlow() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />cx.flow.3-step</span>
      <div className="mock mock-cx">
        <div className="phones">
          <div className="phone">
            <span className="lbl">01 · welcome</span>
            <div className="stat"><span>9:41</span><span>•••</span></div>
            <div className="progress"><span className="seg on" /><span className="seg" /><span className="seg" /></div>
            <h6>What's <span className="ac">inside.</span></h6>
            <p>See your money grow before we ask for a single document. Promise.</p>
            <span className="badge">no fields yet</span>
            <div className="cta">Continue →</div>
          </div>
          <div className="phone">
            <span className="lbl">02 · identify</span>
            <div className="stat"><span>9:42</span><span>•••</span></div>
            <div className="progress"><span className="seg on" /><span className="seg on" /><span className="seg" /></div>
            <h6>Quick <span className="ac">hello.</span></h6>
            <p>Just your name and number — we'll keep it that simple until you decide to invest.</p>
            <div className="field">Khushi Solanki</div>
            <div className="field">+91 98••• ••212</div>
            <div className="cta">Verify →</div>
          </div>
          <div className="phone done">
            <span className="lbl">03 · verify</span>
            <div className="stat"><span>9:44</span><span>•••</span></div>
            <div className="progress"><span className="seg on" /><span className="seg on" /><span className="seg on" /></div>
            <h6>One last <span className="ac">step.</span></h6>
            <p>PAN + Aadhaar in one screen. Auto-saved if you need a break.</p>
            <div className="field">PAN · AB••••2K</div>
            <div className="field">Aadhaar · ••••• ••••• 4218</div>
            <div className="cta">Finish &amp; invest →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockCXCompare() {
  return (
    <div className="panel two-thirds">
      <span className="corner-tl"><span className="dot" />cx.before-after</span>
      <div className="mock mock-compare">
        <h5>Before vs. after — the same compliance, half the abandonment.</h5>
        <div className="row">
          <div className="col bad">
            <span className="tag bad">BEFORE · 6 steps</span>
            <div className="n">41%</div>
            <div className="l">activation rate · KYC complete</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              PAN asked on step 1 · system-language errors · no save &amp; resume.
            </div>
          </div>
          <div className="col good">
            <span className="tag good">AFTER · 3 steps</span>
            <div className="n">68%</div>
            <div className="l">activation rate · KYC complete</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              Value preview first · plain-language errors · auto-save across sessions.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.06)", fontFamily: "var(--type)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          <span><span style={{ color: "var(--accent)" }}>●</span> 8 wks · A/B on 18k users</span>
          <span>+27pp · day-7 retention 1.8×</span>
        </div>
      </div>
    </div>
  );
}

function MockCXError() {
  return (
    <div className="panel third">
      <span className="corner-tl"><span className="dot" />cx.error.before-after</span>
      <div className="mock mock-picker">
        <div className="phone" style={{ maxWidth: 240 }}>
          <div style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Error state · PAN</div>
          <div style={{ background: "rgba(224,65,31,0.08)", border: "1px solid rgba(224,65,31,0.3)", padding: "10px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--accent-ink)", lineHeight: 1.4 }}>
            <b style={{ display: "block", fontFamily: "var(--display)", fontSize: 13, marginBottom: 4 }}>Before</b>
            "Invalid input. Try again."
          </div>
          <div style={{ background: "rgba(30,95,58,0.08)", border: "1px solid rgba(30,95,58,0.3)", padding: "10px 12px", borderRadius: 8, fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--green)", lineHeight: 1.4 }}>
            <b style={{ display: "block", fontFamily: "var(--display)", fontSize: 13, marginBottom: 4 }}>After</b>
            "Looks like a typo — PAN should be 10 characters, e.g. AB CDE 1234 F."
          </div>
          <div style={{ marginTop: "auto", fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            Rewriting errors moved the funnel more than any visual change.
          </div>
        </div>
      </div>
    </div>
  );
}

function MockKanban() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />ops.board.weekly</span>
      <div className="mock mock-kanban">
        <div className="topbar">
          <div className="brand">Studio<span className="dot">●</span>Ops</div>
          <div className="nav"><span className="on">Board</span><span>Intake</span><span>Library</span><span>Capacity</span></div>
          <div className="user">K</div>
        </div>
        <div className="board">
          {[
            { name: "Intake · 8", cards: [
              { t: "Diwali landing — 4 banners", pri: "high", o: "S", bar: "" },
              { t: "Investor deck refresh", pri: "med", o: "M", bar: "" },
              { t: "App store screenshots", pri: "low", o: "R", bar: "" },
            ]},
            { name: "Triage · 5", cards: [
              { t: "Performance ads · Jan set", pri: "high", o: "S", bar: "bar" },
              { t: "Brand guidelines v3", pri: "med", o: "K", bar: "bar green" },
            ]},
            { name: "In progress · 6", cards: [
              { t: "Onboarding copy rewrite", pri: "high", o: "K", bar: "bar" },
              { t: "Email · welcome series", pri: "med", o: "R", bar: "bar" },
              { t: "Pitch deck · Series A", pri: "med", o: "M", bar: "bar green" },
            ]},
            { name: "Review · 3", cards: [
              { t: "Newsletter · Mar issue", pri: "low", o: "K", bar: "bar green" },
              { t: "Hiring · designer JD", pri: "high", o: "S", bar: "bar" },
            ]},
          ].map((col) => (
            <div className="col" key={col.name}>
              <h6>{col.name.split(" · ")[0]}<span className="count">{col.name.split(" · ")[1]}</span></h6>
              {col.cards.map((c, i) => (
                <div className={`card ${c.bar}`} key={i}>
                  <div>{c.t}</div>
                  <div className="row">
                    <span className={`pri ${c.pri === "high" ? "high" : c.pri === "low" ? "low" : ""}`}>{c.pri}</span>
                    <span className="owner">{c.o}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockIntakeForm() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />ops.intake.form</span>
      <div className="mock mock-form">
        <h5>New creative request</h5>
        <div className="field">
          <span className="lbl">Type</span>
          <div className="opts">
            <span className="opt">Ad</span><span className="opt on">Landing</span><span className="opt">Deck</span><span className="opt">Email</span><span className="opt">Brand</span>
          </div>
        </div>
        <div className="field">
          <span className="lbl">Title</span>
          <div className="ctl">Diwali campaign — hero banners</div>
        </div>
        <div className="field">
          <span className="lbl">Urgency × Reach × Effort (auto-score)</span>
          <div className="opts">
            <span className="opt on">High · 4</span><span className="opt on">National · 5</span><span className="opt">Med · 3</span>
          </div>
        </div>
        <div className="field">
          <span className="lbl">Approver (one named)</span>
          <div className="ctl">@meera (Brand Lead)</div>
        </div>
        <div className="submit">Submit · auto-scored to 60 →</div>
      </div>
    </div>
  );
}

function MockSLAMatrix() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />ops.sla.matrix</span>
      <div className="mock" style={{ background: "var(--paper)", padding: "6%", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>SLA matrix</div>
          <div style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", color: "var(--accent)" }}>v2 · live</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 4, fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)", paddingBottom: 4, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <span>Type</span><span>Score 1–40</span><span>41–70</span><span>71+</span>
        </div>
        {[
          { t: "Ad creative",   v: ["7d", "3d", "24h"] },
          { t: "Landing page", v: ["10d", "5d", "48h"] },
          { t: "Deck",          v: ["7d", "3d", "24h"] },
          { t: "Brand system", v: ["—", "14d", "7d"] },
          { t: "Email",         v: ["5d", "2d", "24h"] },
        ].map((r) => (
          <div key={r.t} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 4, padding: "6px 0", borderBottom: "1px dashed rgba(0,0,0,0.08)", fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--ink)" }}>
            <span style={{ fontWeight: 600 }}>{r.t}</span>
            {r.v.map((x, i) => <span key={i} style={{ fontFamily: "var(--mono)", color: i === 2 ? "var(--accent)" : "var(--ink)" }}>{x}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Creator Insight AI ============================== */
function MockCreatorOverview() {
  const posts = [
    { id: "TT-0421", plat: "TikTok",    score: 92, why: "Hook · 0–2s · trend echo", eng: "+340%" },
    { id: "IG-0418", plat: "Instagram", score: 84, why: "Format · carousel · save-driven", eng: "+180%" },
    { id: "YT-0415", plat: "YouTube",   score: 71, why: "Topic · how-to · search-fit", eng: "+96%" },
    { id: "TT-0411", plat: "TikTok",    score: 38, why: "Hook delayed · drop-off @ 3s", eng: "−42%" },
  ];
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />creator.insight.live</span>
      <div className="mock mock-creator">
        <div className="topbar">
          <div className="brand">Creator<span className="dot">●</span>Insight</div>
          <div className="nav"><span className="on">Posts</span><span>Why</span><span>Next 5</span><span>Reports</span></div>
          <div className="user">K</div>
        </div>
        <div className="kpis">
          <div className="kpi"><div className="lbl">Reach · 28d</div><div className="v">1.2<span style={{ fontSize: "0.6em", opacity: 0.6 }}>M</span></div><div className="delta">↑ 18%</div></div>
          <div className="kpi"><div className="lbl">Avg engagement</div><div className="v">8.4<span style={{ fontSize: "0.6em", opacity: 0.6 }}>%</span></div><div className="delta">↑ 2.1pp</div></div>
          <div className="kpi"><div className="lbl">Top format</div><div className="v" style={{ fontSize: 17 }}>Reels</div></div>
          <div className="kpi alert"><div className="lbl">Best post</div><div className="v"><span className="ac">+340%</span></div></div>
        </div>
        <div className="body">
          <div className="posts">
            <div className="h"><span>POST</span><span>PLATFORM</span><span>SCORE</span><span>WHY IT WORKED</span><span>ENG.</span></div>
            {posts.map((p) => (
              <div className="r" key={p.id}>
                <span>#{p.id}</span>
                <span>{p.plat}</span>
                <span><b style={{ color: p.score >= 70 ? "var(--green)" : p.score >= 50 ? "var(--ink)" : "var(--accent)" }}>{p.score}</b></span>
                <span style={{ fontFamily: "var(--sans)", color: "var(--ink-soft)", fontSize: 10 }}>{p.why}</span>
                <span style={{ color: p.eng.startsWith("+") ? "var(--green)" : "var(--accent)" }}>{p.eng}</span>
              </div>
            ))}
          </div>
          <div className="reco">
            <div className="reco-head">
              <span className="dot" /> AI · next 5 posts
            </div>
            <div className="reco-card">
              <div className="t">Do a 3-part series on <em>that</em> hook.</div>
              <div className="d">Your top hook (0–2s trend echo) gets 4.1× the engagement of your average. Triple-down this week.</div>
              <div className="meta"><span>Confidence 92%</span><span>Effort · Low</span></div>
            </div>
            <div className="reco-card mini">
              <div className="t">Convert your carousel saves → Reels.</div>
              <div className="d">IG carousels save well but don't reach. Reels with same topic win.</div>
            </div>
            <div className="reco-card mini">
              <div className="t">Drop the 8-min YT explainers.</div>
              <div className="d">Watch-time bottoms out at 3:40. Cut to 4 min.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockCreatorRec() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />creator.recommendation</span>
      <div className="mock mock-prebrief">
        <div className="meta"><span className="ac">RECOMMENDATION · WK 28</span><span>confidence 92%</span></div>
        <h5>Triple-down on the trend-echo hook.</h5>
        <ul>
          <li>Your top hook (0–2s trend echo) drives 4.1× avg engagement.</li>
          <li>3 of your top 5 posts last month used it. Saturation point ≈ 6 posts.</li>
          <li>Suggested topic frame: career-tip × trending audio × text overlay.</li>
          <li>Estimated reach lift: +28% if posted Tue / Thu / Sat.</li>
        </ul>
        <div style={{ marginTop: "auto", display: "flex", gap: 8, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <span className="chip green">PLAYBOOK</span>
          <span className="chip">3 posts · 1 wk</span>
          <span className="chip">low effort</span>
        </div>
      </div>
    </div>
  );
}

function MockCreatorInsight() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />creator.why.tile</span>
      <div className="mock" style={{ background: "var(--paper)", padding: "5%", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>Why post #TT-0421 worked.</div>
          <div style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", color: "var(--accent)" }}>SCORE · 92</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 }}>
          {[
            { k: "Hook · 0–2s", v: "Trend echo, vertical text", n: "+38" },
            { k: "Format",      v: "9:16, captions on", n: "+18" },
            { k: "Topic",       v: "Career advice · vulnerable",n: "+24" },
            { k: "Timing",      v: "Tue 6:42pm · audience peak", n: "+12" },
          ].map((s) => (
            <div key={s.k} style={{ background: "#f5f1e7", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 6, padding: "8px 10px" }}>
              <div style={{ fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 2 }}>{s.k}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11.5, color: "var(--ink)", lineHeight: 1.35 }}>{s.v}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, color: "var(--accent)", letterSpacing: "-0.02em", marginTop: 4 }}>{s.n}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontFamily: "var(--type)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          Every score has a why. That was the product.
        </div>
      </div>
    </div>
  );
}

/* ===== Idea-to-MVP Platform ============================ */
function MockIdeaOverview() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />idea.scaffold.live</span>
      <div className="mock mock-idea">
        <div className="topbar">
          <div className="brand">Idea<span className="dot">→</span>MVP</div>
          <div className="nav"><span>Frame</span><span className="on">PRD</span><span>Flow</span><span>Score</span><span>Ship</span></div>
          <div className="user">K</div>
        </div>
        <div className="body">
          <div className="prompts">
            <div className="head">
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 13 }}>9 guided questions</div>
              <div className="prog">7 / 9</div>
            </div>
            {[
              { q: "Who is this for?", a: "Solo founders pre-MVP", on: true },
              { q: "What hurts today?", a: "PRDs take 2 wks to write", on: true },
              { q: "Whose week does it save?", a: "Founder + agency PM", on: true },
              { q: "What metric moves?", a: "Idea → PRD time", on: true },
              { q: "What's the v0 cutline?", a: "PRD + flow + scope only", on: true },
              { q: "What can wait for v1?", a: "Templates library", on: true },
              { q: "What evidence already exists?", a: "18 founder interviews", on: true },
              { q: "What's the biggest risk?", a: "—", on: false },
              { q: "Who reviews / approves?", a: "—", on: false },
            ].map((p, i) => (
              <div key={i} className={`p ${p.on ? "on" : ""}`}>
                <span className="box">{p.on ? "✓" : ""}</span>
                <div>
                  <div className="q">{p.q}</div>
                  <div className="a">{p.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="prd">
            <div className="head">
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 14 }}>PRD · auto-draft</div>
              <div style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", color: "var(--accent)" }}>v0.3 · editable</div>
            </div>
            <div className="sec">
              <div className="k">Problem</div>
              <div className="v">First-time founders skip from idea to Figma, skipping requirements entirely. PRDs take 1–2 weeks teams don't have.</div>
            </div>
            <div className="sec">
              <div className="k">Hypothesis</div>
              <div className="v">A guided scaffold cuts idea-to-PRD from 2 weeks to 2 days, and surfaces scope issues before build.</div>
            </div>
            <div className="sec">
              <div className="k">Success</div>
              <div className="v">PRD shipped &lt; 2 days · 60%+ founders cut scope · 80%+ PRDs reused unchanged.</div>
            </div>
            <div className="sec">
              <div className="k">Requirements <span style={{ fontFamily: "var(--type)", fontSize: 9, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>· 6</span></div>
              <div className="reqs">
                {["Guided intake \u00b7 9 prompts", "Auto-draft PRD, inline edit", "Flow generated from PRD", "Scope score \u00b7 v0/v1 split", "Export to Figma + Linear", "Templates by archetype"].map((r, i) => (
                  <div className="rq" key={i}><span className="n">R.{String(i+1).padStart(2,"0")}</span><span>{r}</span></div>
                ))}
              </div>
            </div>
            <div className="score-strip">
              <div><span className="k">Scope score</span><span className="v" style={{ color: "var(--accent)" }}>v0 ✓ · cut 2</span></div>
              <div><span className="k">Feasibility</span><span className="v">High</span></div>
              <div><span className="k">Est. effort</span><span className="v">4 wks</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockIdeaFlow() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />idea.flow.gen</span>
      <div className="mock" style={{ background: "var(--paper)", padding: "5%", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>Flow · generated from PRD</div>
          <div style={{ fontFamily: "var(--type)", fontSize: 9.5, letterSpacing: "0.1em", color: "var(--accent)" }}>auto · 5 steps</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, flex: 1, alignItems: "stretch" }}>
          {[
            { t: "Frame",     d: "9 prompts" },
            { t: "PRD draft", d: "auto-scaffold" },
            { t: "Flow",      d: "generated" },
            { t: "Score",     d: "v0 / v1 cut" },
            { t: "Ship",      d: "Figma · Linear" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#f5f1e7", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 6, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
              <div style={{ fontFamily: "var(--type)", fontSize: 8.5, letterSpacing: "0.1em", color: "var(--accent)" }}>{String(i+1).padStart(2,"0")}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 13, letterSpacing: "-0.02em", color: "var(--ink)" }}>{s.t}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--ink-soft)" }}>{s.d}</div>
              {i < 4 && <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--display)", fontWeight: 800, color: "var(--accent)", fontSize: 14, zIndex: 1 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontFamily: "var(--type)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          The flow falls out of the spec — not the other way around.
        </div>
      </div>
    </div>
  );
}

function MockIdeaScope() {
  return (
    <div className="panel half">
      <span className="corner-tl"><span className="dot" />idea.scope.score</span>
      <div className="mock mock-prebrief">
        <div className="meta"><span className="ac">SCOPE SCORE</span><span>v0 · 4 wks</span></div>
        <h5>3 things you should cut before you build.</h5>
        <ul>
          <li><b>Templates library</b> — v1. Add after first 10 PRDs validate the scaffold.</li>
          <li><b>Multi-user editing</b> — v1. Solo founders don't co-author yet.</li>
          <li><b>Integration with JIRA Cloud</b> — v1. Linear export covers 70% of the cohort.</li>
        </ul>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: "auto", paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          {[
            { k: "Scope", v: "v0", a: true },
            { k: "Feasibility", v: "High" },
            { k: "Effort", v: "4 wks" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{s.k}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: s.a ? "var(--accent)" : "var(--ink)" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseScreens({ cs, set }) {
  // set = "overview" | "details"
  if (cs.id === "rto") {
    return set === "overview" ? (
      <div className="cs-mocks"><MockRTOOverview /></div>
    ) : (
      <div className="cs-mocks">
        <MockRTOPRD />
        <MockRTOPicker />
      </div>
    );
  }
  if (cs.id === "ai-meet") {
    return set === "overview" ? (
      <div className="cs-mocks"><MockAIOverview /></div>
    ) : (
      <div className="cs-mocks">
        <MockAIPreBrief />
        <MockAIDigest />
      </div>
    );
  }
  if (cs.id === "nudge") {
    return <div className="cs-mocks"><MockNudgePreview /></div>;
  }
  if (cs.id === "idea-mvp") {
    return set === "overview" ? (
      <div className="cs-mocks"><MockIdeaOverview /></div>
    ) : (
      <div className="cs-mocks">
        <MockIdeaFlow />
        <MockIdeaScope />
      </div>
    );
  }
  return null;
}

window.CaseScreens = CaseScreens;

function MockNudgePreview() {
  return (
    <div className="panel feature">
      <span className="corner-tl"><span className="dot" />nudge.embed.checkout</span>
      <div className="mock" style={{ background: "#0c0c0a", padding: "5%", gap: 12, color: "#f0ebe0" }}>
        <div className="topbar" style={{ borderBottom: "1px solid rgba(232,64,28,0.18)" }}>
          <div className="brand" style={{ color: "#f0ebe0" }}>Nudge<span className="dot" style={{ color: "#e8401c" }}>●</span>Checkout</div>
          <div className="nav" style={{ color: "rgba(240,235,224,0.45)" }}><span className="on" style={{ color: "#e8401c" }}>Embed</span><span>Analytics</span><span>Merchants</span></div>
          <div className="user" style={{ background: "#e8401c" }}>K</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginTop: 4 }}>
          {[
            { l: "Abandonment", v: "-30%", d: "vs redirect" },
            { l: "Content CVR", v: "+25%", d: "week 4" },
            { l: "Time to buy", v: "<2min", d: "intent to purchase" },
            { l: "Merchants", v: "12", d: "live on embed" },
          ].map((k, i) => (
            <div key={i} style={{ background: "#141410", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontFamily: "var(--type)", fontSize: 8.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,235,224,0.4)", marginBottom: 3 }}>{k.l}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 20, color: "#e8401c", letterSpacing: "-0.02em" }}>{k.v}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 10, color: "rgba(240,235,224,0.35)" }}>{k.d}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#141410", borderRadius: 8, padding: "14px 16px", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 14, color: "#f0ebe0", marginBottom: 4 }}>Air Max 97 · Sand Drift</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "rgba(240,235,224,0.45)" }}>Size 8 · ₹12,499 · 3 in stock</div>
          </div>
          <div style={{ background: "#e8401c", borderRadius: 6, padding: "8px 16px", fontFamily: "var(--display)", fontWeight: 800, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>Buy Now</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--type)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,235,224,0.28)", marginTop: "auto" }}>
          <span>● embedded · no redirect</span>
          <span>view full case study ↗</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Case preview — slimmer in-tray hero (no panel chrome)         */
/* ============================================================ */
function CasePreview({ cs }) {
  let Comp = null;
  if (cs.id === "rto")        Comp = MockRTOOverview;
  if (cs.id === "ai-meet")    Comp = MockAIOverview;
  if (cs.id === "nudge")      Comp = MockNudgePreview;
  if (cs.id === "idea-mvp")   Comp = MockIdeaOverview;
  if (!Comp) return null;
  return (
    <div className="case-preview">
      <Comp />
    </div>
  );
}
window.CasePreview = CasePreview;

/* ============================================================ */
/* RTO Guard — cinematic scroll sections                        */
/* ============================================================ */
function RTOCinematicSections() {
  const dark = "#1a1a1a";
  const cream = "var(--paper)";
  const accentColor = "var(--accent)";

  const sectionBase = (bg, extra) => ({
    background: bg,
    padding: "88px 8%",
    ...extra,
  });

  const eyebrow = {
    fontFamily: "var(--type)",
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: accentColor,
    marginBottom: 28,
  };

  return (
    <>
      {/* ── 1 · THE PROBLEM ──────────────────────────────────── */}
      <div style={sectionBase(dark, { borderTop: "1px solid rgba(255,255,255,0.06)" })}>
        <div style={eyebrow}>The Problem</div>
        <h2 style={{
          fontFamily: "var(--display)",
          fontWeight: 900,
          fontSize: "clamp(34px, 5vw, 68px)",
          letterSpacing: "-0.03em",
          color: "#ffffff",
          lineHeight: 1.04,
          maxWidth: 820,
          marginBottom: 36,
        }}>
          Returns were bleeding the business.
        </h2>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: 18,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.55)",
          maxWidth: 640,
        }}>
          E-commerce ops teams had no early warning system for high-risk orders. By the time a return happened, the damage was done — lost revenue, wasted logistics, angry customers. The question nobody was asking: can we predict a return before it ships?
        </p>
      </div>

      {/* ── 2 · DISCOVERY ────────────────────────────────────── */}
      <div style={sectionBase(cream, { borderTop: "1px solid rgba(0,0,0,0.07)" })}>
        <div style={eyebrow}>Discovery</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid rgba(0,0,0,0.09)",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          {[
            {
              stat: "8 stakeholder interviews",
              sub: "Ops managers, logistics heads, customer support leads.",
            },
            {
              stat: "1 in 4 orders",
              sub: "flagged as potentially returnable using existing data that nobody was reading.",
            },
            {
              stat: "Zero visibility",
              sub: "Teams were making decisions on gut feel, not signals.",
            },
          ].map((card, i) => (
            <div key={i} style={{
              background: cream,
              padding: "52px 40px",
              borderRight: i < 2 ? "1px dashed rgba(0,0,0,0.1)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 900,
                fontSize: "clamp(22px, 2.8vw, 38px)",
                letterSpacing: "-0.02em",
                color: accentColor,
                lineHeight: 1.1,
                marginBottom: 18,
              }}>{card.stat}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--ink-soft)",
              }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 · PROCESS TIMELINE ─────────────────────────────── */}
      <div style={sectionBase(dark, { borderTop: "1px solid rgba(255,255,255,0.06)" })}>
        <div style={eyebrow}>Process</div>
        <h3 style={{
          fontFamily: "var(--display)",
          fontWeight: 900,
          fontSize: "clamp(24px, 3vw, 42px)",
          letterSpacing: "-0.025em",
          color: "#ffffff",
          marginBottom: 56,
        }}>How we got there.</h3>
        <div style={{ position: "relative" }}>
          {/* connector rail */}
          <div style={{
            position: "absolute",
            top: 20,
            left: "calc(10% + 20px)",
            right: "calc(10% + 20px)",
            height: 1,
            background: "rgba(255,255,255,0.1)",
            zIndex: 0,
          }} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
            position: "relative",
            zIndex: 1,
          }}>
            {[
              { t: "Stakeholder interviews", d: "12 sessions across ops, CX, and finance." },
              { t: "Workflow audit",         d: "Mapped 17 decision points at the warehouse." },
              { t: "Risk heuristics defined",d: "Clustered returns into 4 risk archetypes." },
              { t: "Dashboard IA",           d: "Prioritised glance-level signal for pickers." },
              { t: "Screen design",          d: "PRD → wireframes → locked Figma screens." },
            ].map((step, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 8px",
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: i === 0 ? accentColor : "rgba(255,255,255,0.05)",
                  border: `1px solid ${i === 0 ? "transparent" : "rgba(255,255,255,0.12)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--type)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: i === 0 ? "#fff" : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.05em",
                  marginBottom: 24,
                  flexShrink: 0,
                }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  marginBottom: 10,
                  lineHeight: 1.25,
                }}>{step.t}</div>
                <div style={{
                  fontFamily: "var(--sans)",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.38)",
                }}>{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4 · THE SOLUTION ─────────────────────────────────── */}
      <div style={sectionBase(cream, { borderTop: "1px solid rgba(0,0,0,0.07)" })}>
        <div style={eyebrow}>The Solution</div>
        <h2 style={{
          fontFamily: "var(--display)",
          fontWeight: 900,
          fontSize: "clamp(28px, 4vw, 58px)",
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          lineHeight: 1.04,
          maxWidth: 740,
          marginBottom: 48,
        }}>
          A risk score for every order, before it ships.
        </h2>
        {/* Dashboard mock — same panel/mock styling as existing previews */}
        <div style={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 48,
          boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
        }}>
          <div className="cs-mocks" style={{ margin: 0, padding: 0 }}>
            <MockRTOOverview />
          </div>
        </div>
        {/* 3 feature callouts */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid rgba(0,0,0,0.09)",
        }}>
          {[
            {
              n: "Risk scoring engine",
              d: "Every order scored at sync time — buyer history, address signals, COD patterns, and pincode performance collapsed into one confidence number.",
            },
            {
              n: "Order flag system",
              d: "Red, amber, green flags surface at the pick station. No training required. Pickers act in seconds, not minutes.",
            },
            {
              n: "Ops decision layer",
              d: "One-tap hold, reroute, or release — with auto-notify to CX and a full audit trail every time.",
            },
          ].map((f, i) => (
            <div key={i} style={{
              padding: "40px 36px",
              borderRight: i < 2 ? "1px dashed rgba(0,0,0,0.09)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--type)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accentColor,
                marginBottom: 14,
              }}>0{i + 1}</div>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                marginBottom: 10,
              }}>{f.n}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 14,
                lineHeight: 1.65,
                color: "var(--ink-soft)",
              }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5 · OUTCOME ──────────────────────────────────────── */}
      <div style={sectionBase(dark, { borderTop: "1px solid rgba(255,255,255,0.06)" })}>
        <div style={eyebrow}>Outcome</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
        }}>
          {[
            {
              n: "−38%",
              l: "RTO rate, Q2",
              d: "From 12.1% to 7.5% within 8 weeks of launch — beat the 4pp target by nearly double.",
            },
            {
              n: "4.2×",
              l: "ROI in 90 days",
              d: "Logistics savings and reduced reverse-logistics cost covered the full build cost in under three months.",
            },
            {
              n: "<3s",
              l: "Decision time / order",
              d: "Pickers went from bouncing between 3 tabs to a single glance-level signal. Speed was the adoption unlock.",
            },
            {
              n: "94%",
              l: "Ops adoption",
              d: "Within 6 weeks. No training sessions. The reason chips did the onboarding for us.",
            },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "52px 36px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 900,
                fontSize: "clamp(36px, 4vw, 62px)",
                letterSpacing: "-0.03em",
                color: accentColor,
                lineHeight: 1,
                marginBottom: 8,
              }}>{m.n}</div>
              <div style={{
                fontFamily: "var(--type)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 22,
              }}>{m.l}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.4)",
              }}>{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6 · WHAT'S NEXT ──────────────────────────────────── */}
      <div style={sectionBase(cream, { borderTop: "1px solid rgba(0,0,0,0.07)" })}>
        <div style={eyebrow}>What's Next</div>
        <h3 style={{
          fontFamily: "var(--display)",
          fontWeight: 900,
          fontSize: "clamp(26px, 3.5vw, 50px)",
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          lineHeight: 1.1,
          maxWidth: 580,
          marginBottom: 44,
        }}>If I had another sprint.</h3>
        <div style={{ display: "grid", gap: 0, maxWidth: 660 }}>
          {[
            "Predictive restock triggers based on return patterns",
            "ML model trained on 6 months of flagged order outcomes",
          ].map((item, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: 20,
              padding: "28px 0",
              borderBottom: "1px dashed rgba(0,0,0,0.09)",
              alignItems: "start",
            }}>
              <div style={{
                fontFamily: "var(--type)",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: accentColor,
                paddingTop: 3,
              }}>0{i + 1}</div>
              <div style={{
                fontFamily: "var(--sans)",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink)",
              }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================ */
/* Detail view                                                  */
/* ============================================================ */
function CaseStudyDetail({ cs, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    window.scrollTo({ top: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, [cs.id]);

  const idx = CASE_STUDIES.findIndex((c) => c.id === cs.id);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];
  const prev = CASE_STUDIES[(idx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];

  return (
    <div className="cs-overlay" data-screen-label="Case Study Detail">
      <div className="cs-bar">
        <span>
          <span style={{ color: "var(--accent)" }}>● </span>
          Case Study / {cs.num} — {cs.title} {cs.titleEm}
        </span>
        <button className="close" onClick={onClose}>
          <span>Close</span><span aria-hidden>✕</span>
        </button>
      </div>

      <header className="cs-hero">
        <div className="eyebrow-light">
          <span className="num">{cs.num}</span><span className="dot" />
          <span>{cs.type} — {cs.year}</span>
        </div>
        <h1>{cs.title} <span className="accent">{cs.titleEm}</span></h1>
        <p className="sub">{cs.sub}</p>
        <div className="meta">
          <div><div className="k">Client</div><div className="v">{cs.client}</div></div>
          <div><div className="k">Duration</div><div className="v">{cs.duration}</div></div>
          <div><div className="k">Role</div><div className="v">{cs.spec.Role.split("—")[0].trim()}</div></div>
          <div><div className="k">Tools</div><div className="v">{cs.spec.Tools}</div></div>
        </div>

        {/* TL;DR — recruiter-friendly headline outcomes */}
        <div className="cs-tldr">
          <div className="lbl">TL;DR · outcomes</div>
          <div className="row">
            {cs.outcome.map((o, i) => (
              <div className="oc" key={i}>
                <span className="n">{o.n}</span>
                <span className="l">{o.l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {cs.id === "rto" && <RTOCinematicSections />}

      <section className="cs-section">
        <div className="hd">
          <h3>01 — Overview</h3>
          <div className="body"><p>{cs.overview}</p></div>
        </div>
        <CaseScreens cs={cs} set="overview" />
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>02 — <span className="accent">Problem</span> statement</h3>
        </div>
        <ul className="bul" style={{ maxWidth: 920 }}>
          {cs.problem.map((p, i) => (
            <li key={i}><span className="n">P.{String(i + 1).padStart(2, "0")}</span><span>{p}</span></li>
          ))}
        </ul>
      </section>

      <section className="cs-section">
        <div className="cs-two">
          <div>
            <h3>03 — Target users</h3>
            <ul className="bul" style={{ marginTop: 18 }}>
              {cs.users.map((u, i) => (
                <li key={i}><span className="n">U.{String(i + 1).padStart(2, "0")}</span><span>{u}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>04 — Business context</h3>
            <div className="body" style={{ marginTop: 18 }}><p>{cs.context}</p></div>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>05 — My <span className="accent">role</span></h3>
          <div className="body"><p>{cs.spec.Role}</p></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, paddingTop: 4 }}>
          {Object.entries(cs.spec).map(([k, v]) => (
            <div key={k} style={{ display: "grid", gap: 8 }}>
              <div className="l" style={{ fontFamily: "var(--type)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{k}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 14.5, lineHeight: 1.45, color: "var(--ink)" }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-two">
          <div>
            <h3>06 — Research</h3>
            <ul className="bul" style={{ marginTop: 18 }}>
              {cs.research.map((r, i) => (
                <li key={i}><span className="n">R.{String(i + 1).padStart(2, "0")}</span><span>{r}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>07 — User <span className="accent">pain points</span></h3>
            <ul className="bul" style={{ marginTop: 18 }}>
              {cs.pains.map((p, i) => (
                <li key={i}>
                  <span className="n">π.{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontStyle: "italic" }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>08 — Requirements</h3>
        </div>
        <ul className="bul" style={{ maxWidth: 920 }}>
          {cs.reqs.map((r, i) => (
            <li key={i}><span className="n">REQ.{String(i + 1).padStart(2, "0")}</span><span>{r}</span></li>
          ))}
        </ul>
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>09 — User <span className="accent">flow</span></h3>
        </div>
        <div className="flow">
          {cs.flow.map((s, i) => (
            <div className="step" key={i}>
              <div className="n">STEP {String(i + 1).padStart(2, "0")}</div>
              <div className="t">{s.t}</div>
              <div className="d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>10 — Wireframes &amp; final screens</h3>
          <div className="body"><p>Low-fi exploration, then locked screens handed to engineering.</p></div>
        </div>
        <CaseScreens cs={cs} set="details" />
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>11 — <span className="accent">Outcome</span></h3>
        </div>
        <div className="metrics">
          {cs.outcome.map((m, i) => (
            <div className="metric" key={i}>
              <div className="n"><span className="accent">{m.n}</span></div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <div className="hd">
          <h3>12 — Learnings</h3>
        </div>
        <ul className="bul" style={{ maxWidth: 920 }}>
          {cs.learnings.map((l, i) => (
            <li key={i}><span className="n">L.{String(i + 1).padStart(2, "0")}</span><span>{l}</span></li>
          ))}
        </ul>
      </section>

      <div className="cs-nav">
        <div className="cn" onClick={() => prev.externalUrl ? (window.location.href = prev.externalUrl) : onNav(prev)}>
          <div className="lbl">← Previous case</div>
          <div className="t">{prev.title} <span className="accent">{prev.titleEm}</span></div>
        </div>
        <div className="cn right" onClick={() => next.externalUrl ? (window.location.href = next.externalUrl) : onNav(next)}>
          <div className="lbl">Next case →</div>
          <div className="t">{next.title} <span className="accent">{next.titleEm}</span></div>
        </div>
      </div>
    </div>
  );
}

window.CaseStudyDetail = CaseStudyDetail;
