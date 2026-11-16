#!/usr/bin/env bash
# parse.sh — read and merge results from each case
# Reads all run/guard/*.json verdict files and writes run/status.json summary.
set -euo pipefail

echo "[parse] Merging verdicts..."

node -e "
const fs = require('fs');
const path = require('path');

const guardDir = 'run/guard';
const verdicts = fs.readdirSync(guardDir)
  .filter(f => f.endsWith('.json'))
  .map(f => {
    try { return JSON.parse(fs.readFileSync(path.join(guardDir, f), 'utf8')); }
    catch { return null; }
  })
  .filter(Boolean);

const total = verdicts.length;
const passed = verdicts.filter(v => v.result === 'PASS').length;
const failed = verdicts.filter(v => v.result === 'FAIL').length;
const pending = verdicts.filter(v => !v.result).length;

const status = {
  state: failed > 0 ? 'FAIL' : pending > 0 ? 'running' : 'PASS',
  total, passed, failed, pending,
  updated_at: new Date().toISOString()
};

const existing = (() => {
  try { return JSON.parse(fs.readFileSync('run/status.json', 'utf8')); } catch { return {}; }
})();

fs.writeFileSync('run/status.json', JSON.stringify({ ...existing, ...status }, null, 2));
console.log('[parse] Done:', JSON.stringify(status));
"
