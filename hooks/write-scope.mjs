#!/usr/bin/env node
/**
 * PreToolUse (Write/Edit): write-scope.mjs
 * Prevents parallel authors from overwriting each other's files.
 * Each author may only write within their assigned case directory.
 */
import { readFileSync } from 'fs';
import { resolve, relative } from 'path';

let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) {
  input += chunk;
}

let toolInput;
try {
  toolInput = JSON.parse(input);
} catch {
  process.exit(0);
}

const caseId = process.env.CLAUDE_CASE_ID;
if (!caseId) {
  // Orchestrator context — no restriction
  process.exit(0);
}

const targetPath = toolInput?.file_path || toolInput?.path || '';
if (!targetPath) {
  process.exit(0);
}

// Authors may only write within tests/<case-id>/ or run/guard/<case-id>*
const rel = relative(resolve('.'), resolve(targetPath));
const allowedPrefixes = [`tests/${caseId}`, `run/guard/${caseId}`];

const allowed = allowedPrefixes.some(prefix => rel.startsWith(prefix));
if (!allowed) {
  console.error(`[write-scope] Blocked: author ${caseId} cannot write to ${rel}`);
  process.exit(2);
}

process.exit(0);
