#!/usr/bin/env bash
# canary.sh — insert bad tests to ensure the gates catch failures
# Copies a canary test into the test suite, runs it, verifies gates catch it,
# then removes it. Updates the verdict with canary_caught=true if gates worked.
# Usage: ./scripts/canary.sh <case-id>
set -euo pipefail

CASE_ID="${1:-}"
if [ -z "$CASE_ID" ]; then
  echo "[canary] Usage: $0 <case-id>"
  exit 1
fi

CANARY_DIR="canary"
CANARY_FILE="${CANARY_DIR}/always-fail.spec.ts"
if [ ! -f "$CANARY_FILE" ]; then
  echo "[canary] FAIL: canary file not found: $CANARY_FILE"
  exit 1
fi

TEST_DIR="tests/${CASE_ID}"
TMP_CANARY="${TEST_DIR}/__canary__.spec.ts"
mkdir -p "$TEST_DIR"
cp "$CANARY_FILE" "$TMP_CANARY"

echo "[canary] Running canary test (expect failure)..."
set +e
CLAUDE_CASE_ID="$CASE_ID" npx playwright test "$TMP_CANARY" --reporter=dot 2>&1
CANARY_EXIT=$?
set -e

rm -f "$TMP_CANARY"

if [ $CANARY_EXIT -eq 0 ]; then
  echo "[canary] FAIL: canary test passed — gates are not catching failures!"
  exit 1
fi

echo "[canary] Canary test failed as expected — gates are working."

# Mark canary_caught in verdict
node -e "
const fs = require('fs');
const path = 'run/guard/${CASE_ID}.json';
let v = {};
try { v = JSON.parse(fs.readFileSync(path, 'utf8')); } catch {}
v.canary_caught = true;
v.canary_ts = new Date().toISOString();
fs.writeFileSync(path, JSON.stringify(v, null, 2));
console.log('[canary] canary_caught marked in verdict.');
"
