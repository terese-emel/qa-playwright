#!/usr/bin/env node
/**
 * SubagentStart: subagent-start.mjs
 * Ties each author run to its assigned case.
 * Verifies CLAUDE_CASE_ID is set and the task exists before the sub-agent runs.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  // Not an author — orchestrator or evaluator context
  process.exit(0);
}

const taskFile = resolve(`tasks/${caseId}.json`);
if (!existsSync(taskFile)) {
  console.error(`[subagent-start] No task file for case ${caseId}`);
  process.exit(2);
}

const task = JSON.parse(readFileSync(taskFile, 'utf8'));

// Stamp the start time
task.started_at = new Date().toISOString();
task.runs_left = Math.max(0, (task.runs_left || 1) - 1);
writeFileSync(taskFile, JSON.stringify(task, null, 2));

// Update run/status.json
mkdirSync(resolve('run'), { recursive: true });
const statusFile = resolve('run/status.json');
let status = {};
if (existsSync(statusFile)) {
  try { status = JSON.parse(readFileSync(statusFile, 'utf8')); } catch { status = {}; }
}
status.active_case = caseId;
status.state = 'running';
writeFileSync(statusFile, JSON.stringify(status, null, 2));

console.error(`[subagent-start] Case ${caseId} started, runs_left: ${task.runs_left}`);
process.exit(0);
