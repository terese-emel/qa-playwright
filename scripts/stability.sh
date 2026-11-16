#!/usr/bin/env bash
# stability.sh — check for flaky tests and keep results stable
# Runs the test 3 times and records each result.
# Usage: ./scripts/stability.sh <case-id>
set -euo pipefail

CASE_ID="${1:-}"
if [ -z "$CASE_ID" ]; then
  echo "[stability] Usage: $0 <case-id>"
  exit 1
fi

TEST_FILE="tests/${CASE_ID}/${CASE_ID}.spec.ts"
if [ ! -f "$TEST_FILE" ]; then
  echo "[stability] FAIL: test file not found: $TEST_FILE"
  exit 1
fi

RUNS=()
for i in 1 2 3; do
  echo "[stability] Run $i/3 for $CASE_ID..."
  if CLAUDE_CASE_ID="$CASE_ID" npx playwright test "$TEST_FILE" --reporter=dot 2>&1; then
    RUNS+=("pass")
    echo "[stability] Run $i: PASS"
  else
    RUNS+=("fail")
    echo "[stability] Run $i: FAIL"
  fi
done

# Write stability results to verdict file
node -e "
const fs = require('fs');
const runs = ${RUNS[@]@Q};
const path = 'run/guard/${CASE_ID}.json';
let v = {};
try { v = JSON.parse(fs.readFileSync(path, 'utf8')); } catch {}
const runsArr = '${RUNS[*]}'.split(' ').map(r => ({ pass: r === 'pass' }));
v.stability_runs = runsArr;
v.stable = runsArr.every(r => r.pass);
if (v.stable && v.execution_pass && v.static_pass) {
  v.result = 'PASS';
}
fs.writeFileSync(path, JSON.stringify(v, null, 2));
const allPass = runsArr.every(r => r.pass);
console.log('[stability] ' + (allPass ? 'PASS' : 'FAIL') + ': ' + runsArr.map(r => r.pass ? 'P' : 'F').join(''));
"

if [[ " ${RUNS[@]} " != *" fail "* ]]; then
  echo "[stability] PASS: 3/3 runs green for $CASE_ID"
else
  echo "[stability] FAIL: some runs failed for $CASE_ID"
  exit 1
fi
