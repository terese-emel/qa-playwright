#!/usr/bin/env node
/**
 * PreToolUse (Bash): spawn-check.mjs
 * Ensures no author starts without a real case assigned and runs remaining.
 * Reads CLAUDE_CASE_ID env and tasks/<case-id>.json to verify runs_left > 0.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  // Not an author sub-agent context — allow through
  process.exit(0);
}

const taskFile = resolve(`tasks/${caseId}.json`);
if (!existsSync(taskFile)) {
  console.error(`[spawn-check] No task file found for case: ${caseId}`);
  process.exit(2);
}

let task;
try {
  task = JSON.parse(readFileSync(taskFile, 'utf8'));
} catch (e) {
  console.error(`[spawn-check] Failed to parse task file: ${e.message}`);
  process.exit(2);
}

if (!task.case_id || task.case_id !== caseId) {
  console.error(`[spawn-check] Task case_id mismatch: expected ${caseId}`);
  process.exit(2);
}

if (typeof task.runs_left !== 'number' || task.runs_left <= 0) {
  console.error(`[spawn-check] No runs left for case: ${caseId}`);
  process.exit(2);
}

console.error(`[spawn-check] OK — case ${caseId}, runs_left: ${task.runs_left}`);
process.exit(0);
