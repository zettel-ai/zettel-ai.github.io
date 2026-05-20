#!/usr/bin/env bash
# Copy rendered diagram SVGs from the website_diagram repo into this landing page.
# Run after regenerating SVGs in ../website_diagram (e.g. `d2 analyze.d2 analyze.svg`).
set -euo pipefail

SRC="${SRC:-../website_diagram}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/diagrams"

if [ ! -d "$SRC" ]; then
  echo "Source not found: $SRC" >&2
  echo "Set SRC=/path/to/website_diagram and re-run." >&2
  exit 1
fi

mkdir -p "$DEST"
for f in analyze.svg communicate.svg ingest.svg; do
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$DEST/$f"
    echo "synced $f"
  else
    echo "missing in source: $f" >&2
  fi
done
