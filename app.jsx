/* global React, ReactDOM */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e0411f",
  "marquee": true,
  "density": "comfy"
}/*EDITMODE-END*/;

function App() {
  const [openCS, setOpenCS] = useState(null);
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply accent
  useEffect(() => {
    const hex = tweaks.accent || "#e0411f";
    document.documentElement.style.setProperty("--accent", hex);
  }, [tweaks.accent]);

  // Density
  useEffect(() => {
    if (tweaks.density === "tight") {
      document.documentElement.style.setProperty("--pad-x", "clamp(14px, 3vw, 40px)");
    } else if (tweaks.density === "airy") {
      document.documentElement.style.setProperty("--pad-x", "clamp(24px, 6vw, 112px)");
    } else {
      document.documentElement.style.setProperty("--pad-x", "clamp(18px, 4vw, 64px)");
    }
  }, [tweaks.density]);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [openCS]);

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
