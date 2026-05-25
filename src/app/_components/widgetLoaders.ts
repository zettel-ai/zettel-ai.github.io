// Lazily inject the Calendly and Tally third-party widgets so their scripts
// stay off the initial render path (they were previously eager tags in the
// document <head> on every page). Each loader is idempotent.

let calendlyRequested = false;
let tallyRequested = false;

export function loadCalendly() {
  if (calendlyRequested || typeof document === "undefined") return;
  calendlyRequested = true;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(css);

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;
  document.head.appendChild(script);
}

export function loadTally() {
  if (tallyRequested || typeof document === "undefined") return;
  tallyRequested = true;

  const script = document.createElement("script");
  script.src = "https://tally.so/widgets/embed.js";
  script.async = true;
  document.head.appendChild(script);
}
