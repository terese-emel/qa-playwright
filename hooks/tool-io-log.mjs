#!/usr/bin/env node
/**
 * PostToolUse (Bash): tool-io-log.mjs
 * Logs real tool I/O so gates can read actual replies, not the author's story.
 * Appends a structured entry to run/tool-io.jsonl.
 */
import { appendFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

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

mkdirSync(resolve('run'), { recursive: true });

const record = {
  ts: new Date().toISOString(),
  case_id: process.env.CLAUDE_CASE_ID || null,
  tool: entry.tool || 'bash',
  command: entry.input?.command || null,
  exit_code: entry.output?.exit_code ?? null,
  stdout_tail: (entry.output?.stdout || '').slice(-2000),
  stderr_tail: (entry.output?.stderr || '').slice(-500),
};

appendFileSync(resolve('run/tool-io.jsonl'), JSON.stringify(record) + '\n');
process.exit(0);
