#!/usr/bin/env node
/**
 * PreToolUse: halt.mjs
 * Stops everything if run/HALT exists. Any hook or script can create this file
 * to immediately abort the pipeline before the next tool call.
 */
import { existsSync } from 'fs';
import { resolve } from 'path';

const haltFile = resolve('run/HALT');

if (existsSync(haltFile)) {
  const { readFileSync } = await import('fs');
  const reason = readFileSync(haltFile, 'utf8').trim() || 'HALT file present';
  console.error(`[halt] Pipeline stopped: ${reason}`);
  process.exit(2); // non-zero exit blocks the tool call
}
