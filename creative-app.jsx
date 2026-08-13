/* global React, ReactDOM */
/* Standalone mount for /creative — Creative Direction only. */

function CreativePage() {
  return (
    <>
      <a className="cd-back" href="/">← Portfolio</a>
      <main>
        <window.CreativeDirection />
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CreativePage />);
