#!/usr/bin/env node
/**
 * PostToolUse (Write): gates.mjs
 * After a test file is written, run gates 1–4 (the synchronous pre-checks).
 * Gates 5–8 require execution and are triggered by the orchestrator after a real spec run.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, relative } from 'path';

let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) {
  input += chunk;
}

let entry;
try {
  entry = JSON.parse(input);
} catch {
  process.exit(0);
}

const filePath = entry.input?.file_path || entry.input?.path || '';
if (!filePath || !filePath.endsWith('.spec.ts')) {
  process.exit(0);
}

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  process.exit(0);
}

// Run gates 1–4
const { runStaticGates } = await import('../gates/static.mjs');
const content = readFileSync(resolve(filePath), 'utf8');
const results = await runStaticGates(content, filePath);

mkdirSync(resolve('run/guard'), { recursive: true });

const verdictPath = resolve(`run/guard/${caseId}.json`);
let existing = {};
if (existsSync(verdictPath)) {
  try { existing = JSON.parse(readFileSync(verdictPath, 'utf8')); } catch {}
}

const updated = {
  ...existing,
  case_id: caseId,
  static_gates: results,
  static_pass: results.every(r => r.pass),
  ts: new Date().toISOString(),
};

writeFileSync(verdictPath, JSON.stringify(updated, null, 2));

if (!updated.static_pass) {
  const failed = results.filter(r => !r.pass).map(r => r.name);
  console.error(`[gates] Static gates FAILED for ${caseId}: ${failed.join(', ')}`);
  process.exit(2);
}

console.error(`[gates] Static gates passed for ${caseId}`);
process.exit(0);
