#!/usr/bin/env bash
# go.sh — prove tests can go green end-to-end first
# Usage: ./scripts/go.sh <case-id>
set -euo pipefail

CASE_ID="${1:-}"
if [ -z "$CASE_ID" ]; then
  echo "[go] Usage: $0 <case-id>"
  exit 1
fi

TEST_FILE="tests/${CASE_ID}/${CASE_ID}.spec.ts"
if [ ! -f "$TEST_FILE" ]; then
  echo "[go] FAIL: test file not found: $TEST_FILE"
  exit 1
fi

echo "[go] Running: $TEST_FILE"
CLAUDE_CASE_ID="$CASE_ID" npx playwright test "$TEST_FILE" --reporter=json 2>&1 | tee "run/guard/${CASE_ID}-go.json"
EXIT_CODE=${PIPESTATUS[0]}

if [ $EXIT_CODE -ne 0 ]; then
  echo "[go] FAIL: tests did not pass (exit $EXIT_CODE)"
  exit 1
fi

echo "[go] PASS: $CASE_ID tests green."

# Update verdict file
node -e "
const fs = require('fs');
const path = 'run/guard/${CASE_ID}.json';
let v = {};
try { v = JSON.parse(fs.readFileSync(path, 'utf8')); } catch {}
v.execution_pass = true;
v.execution_ts = new Date().toISOString();
fs.writeFileSync(path, JSON.stringify(v, null, 2));
"
