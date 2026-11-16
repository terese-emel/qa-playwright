#!/usr/bin/env bash
# preflight.sh — stop before spending if setup is wrong
set -euo pipefail

echo "[preflight] Checking Node.js..."
node --version || { echo "[preflight] FAIL: node not found"; exit 1; }

echo "[preflight] Checking npm packages..."
npm ls @playwright/test --depth=0 2>/dev/null || { echo "[preflight] FAIL: @playwright/test not installed"; exit 1; }

echo "[preflight] Checking Playwright browsers..."
npx playwright --version || { echo "[preflight] FAIL: playwright not available"; exit 1; }

echo "[preflight] Checking plans/ directory..."
[ -d plans ] || { echo "[preflight] FAIL: plans/ directory missing"; exit 1; }
[ "$(ls plans/*.md 2>/dev/null | wc -l)" -gt 0 ] || { echo "[preflight] FAIL: no plan files in plans/"; exit 1; }

echo "[preflight] Checking run/ directory..."
mkdir -p run/guard

echo "[preflight] Checking gates/static.mjs..."
[ -f gates/static.mjs ] || { echo "[preflight] FAIL: gates/static.mjs missing"; exit 1; }

echo "[preflight] Checking hooks..."
for hook in hooks/halt.mjs hooks/spawn-check.mjs hooks/gates.mjs hooks/accept-check.mjs; do
  [ -f "$hook" ] || { echo "[preflight] FAIL: $hook missing"; exit 1; }
done

echo "[preflight] All checks passed."
