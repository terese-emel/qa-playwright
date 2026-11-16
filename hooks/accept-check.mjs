#!/usr/bin/env node
/**
 * PreToolUse (push_files / git): accept-check.mjs
 * Only PASS + STABLE + canary-caught results may reach git.
 * Reads the verdict file for the current case and blocks if not all gates passed.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  // Orchestrator-level push — check overall run/status.json instead
  const statusFile = resolve('run/status.json');
  if (!existsSync(statusFile)) {
    console.error('[accept-check] No run/status.json — cannot verify pipeline state before push');
    process.exit(2);
  }
  const status = JSON.parse(readFileSync(statusFile, 'utf8'));
  if (status.state !== 'PASS') {
    console.error(`[accept-check] Pipeline state is ${status.state}, not PASS — blocking push`);
    process.exit(2);
  }
  process.exit(0);
}

const verdictFile = resolve(`run/guard/${caseId}.json`);
if (!existsSync(verdictFile)) {
  console.error(`[accept-check] No verdict file for case ${caseId} — tests have not been gated`);
  process.exit(2);
}

let verdict;
try {
  verdict = JSON.parse(readFileSync(verdictFile, 'utf8'));
} catch (e) {
  console.error(`[accept-check] Cannot parse verdict: ${e.message}`);
  process.exit(2);
}

if (verdict.result !== 'PASS') {
  console.error(`[accept-check] Case ${caseId} verdict is ${verdict.result} — blocking commit`);
  process.exit(2);
}

if (!verdict.stable) {
  console.error(`[accept-check] Case ${caseId} is not marked STABLE — blocking commit`);
  process.exit(2);
}

if (!verdict.canary_caught) {
  console.error(`[accept-check] Canary was not caught for case ${caseId} — blocking commit`);
  process.exit(2);
}

console.error(`[accept-check] Case ${caseId} cleared all accept checks`);
process.exit(0);
