#!/usr/bin/env node
/**
 * PreToolUse (Bash): breaker.mjs
 * Circuit breaker — a dead or unresponsive app stops budget burn.
 * Checks run/status.json for app health before allowing test commands.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const statusFile = resolve('run/status.json');
if (!existsSync(statusFile)) {
  // No status file yet — allow through (first run)
  process.exit(0);
}

let status;
try {
  status = JSON.parse(readFileSync(statusFile, 'utf8'));
} catch {
  process.exit(0);
}

if (status.app_health === 'dead') {
  console.error('[breaker] App is marked dead in run/status.json — aborting to prevent budget burn');
  process.exit(2);
}

if (status.consecutive_failures >= 5) {
  console.error(`[breaker] ${status.consecutive_failures} consecutive failures — tripping circuit breaker`);
  writeFileSync(resolve('run/HALT'), 'circuit breaker tripped: too many consecutive failures');
  process.exit(2);
}

process.exit(0);
