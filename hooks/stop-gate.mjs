#!/usr/bin/env node
/**
 * SubagentStop: stop-gate.mjs
 * Ensures passing gate counts only after a real spec run.
 * Checks that run/tool-io.jsonl contains a real playwright test execution.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  process.exit(0);
}

const ioLog = resolve('run/tool-io.jsonl');
if (!existsSync(ioLog)) {
  console.error(`[stop-gate] No tool-io.jsonl — no test execution recorded for case ${caseId}`);
  process.exit(2);
}

const lines = readFileSync(ioLog, 'utf8').split('\n').filter(Boolean);
const caseEntries = lines
  .map(l => { try { return JSON.parse(l); } catch { return null; } })
  .filter(e => e && e.case_id === caseId);

const hasRealRun = caseEntries.some(e =>
  e.command && /npx playwright test|playwright test/.test(e.command) &&
  e.exit_code !== null
);

if (!hasRealRun) {
  console.error(`[stop-gate] Case ${caseId} has no real Playwright spec run in tool-io.jsonl`);
  process.exit(2);
}

console.error(`[stop-gate] Real spec run confirmed for ${caseId}`);
process.exit(0);
