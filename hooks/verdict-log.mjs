#!/usr/bin/env node
/**
 * SubagentStop: verdict-log.mjs
 * Writes the final verdict to run/guard/<case-id>.json so the orchestrator
 * reads from disk, never from chat. Marks the case complete in run/status.json.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  process.exit(0);
}

mkdirSync(resolve('run/guard'), { recursive: true });

const verdictPath = resolve(`run/guard/${caseId}.json`);
let verdict = {};
if (existsSync(verdictPath)) {
  try { verdict = JSON.parse(readFileSync(verdictPath, 'utf8')); } catch {}
}

// Mark the sub-agent as done
verdict.sub_agent_done = true;
verdict.done_at = new Date().toISOString();

writeFileSync(verdictPath, JSON.stringify(verdict, null, 2));

// Update run/status.json
const statusFile = resolve('run/status.json');
let status = {};
if (existsSync(statusFile)) {
  try { status = JSON.parse(readFileSync(statusFile, 'utf8')); } catch {}
}
status.active_case = null;
status.last_completed = caseId;
status.state = 'idle';
writeFileSync(statusFile, JSON.stringify(status, null, 2));

console.error(`[verdict-log] Verdict written for ${caseId}`);
process.exit(0);
