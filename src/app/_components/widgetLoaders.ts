// Lazily inject the Calendly and Tally third-party widgets so their scripts
// stay off the initial render path (they were previously eager tags in the
// document <head> on every page). Each loader is idempotent.

let calendlyRequested = false;
let tallyRequested = false;
const prefetched = new Set<string>();

// Warm the document cache for a popup's iframe URL so it renders fast on open.
function prefetchDocument(url: string) {
  if (typeof document === "undefined" || prefetched.has(url)) return;
  prefetched.add(url);
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);
}

// Call on hover/focus/pointer-down (before the click) so the script is ready
// and the popup content is warm by the time the user actually clicks.
export function prewarmCalendly(popupUrl: string) {
  loadCalendly();
  prefetchDocument(popupUrl);
}

export function prewarmTally() {
  loadTally();
}

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
