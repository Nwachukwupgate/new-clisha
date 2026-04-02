#!/usr/bin/env bash
# Push the current branch to GitHub as `main` without touching Azure (`origin`).
# Run from your machine (not CI) where GitHub auth works: HTTPS token or SSH.
#
# Usage:
#   ./scripts/push-to-github.sh
#   ./scripts/push-to-github.sh my-branch   # optional: branch name (default: current)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GITHUB_REMOTE="${GITHUB_REMOTE:-github}"
TARGET_BRANCH="${1:-$(git branch --show-current)}"

if ! git remote get-url "$GITHUB_REMOTE" &>/dev/null; then
  echo "Add the GitHub remote first:"
  echo "  git remote add $GITHUB_REMOTE https://github.com/Nwachukwupgate/new-clisha.git"
  echo "Or SSH:"
  echo "  git remote add $GITHUB_REMOTE git@github.com:Nwachukwupgate/new-clisha.git"
  exit 1
fi

echo "Remote '$GITHUB_REMOTE': $(git remote get-url "$GITHUB_REMOTE")"
echo "Azure 'origin' (unchanged): $(git remote get-url origin)"
echo "Pushing $TARGET_BRANCH -> ${GITHUB_REMOTE}/main ..."

git config http.postBuffer 524288000
git push -u "$GITHUB_REMOTE" "${TARGET_BRANCH}:main"

echo "Done. Continue using Azure: git fetch origin && git push origin <branch>"
