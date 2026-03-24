#!/usr/bin/env bash
# Zip the Clisha Experience extension into public/extensions/ for dev.clisha.me download.
# Usage:
#   npm run pack-extension
#   CLISHA_EXPERIENCE_EXTENSION_PATH=/path/to/clisha-experience-extension npm run pack-extension
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/extensions"
OUT_ZIP="$OUT_DIR/clisha-experience-extension.zip"
DEFAULT_EXT="${CLISHA_EXPERIENCE_EXTENSION_PATH:-$HOME/Documents/clisha-experience-extension}"
EXT_PATH="${1:-$DEFAULT_EXT}"

if [[ ! -f "$EXT_PATH/manifest.json" ]]; then
  echo "pack-clisha-extension: manifest.json not found at: $EXT_PATH"
  echo "Set CLISHA_EXPERIENCE_EXTENSION_PATH or pass the extension directory as the first argument."
  exit 1
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_ZIP"
(
  cd "$EXT_PATH"
  zip -r "$OUT_ZIP" . \
    -x "*.git*" \
    -x "*node_modules/*" \
    -x "*.DS_Store" \
    -x "*.zip"
)
echo "pack-clisha-extension: wrote $OUT_ZIP"
