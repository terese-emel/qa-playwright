#!/usr/bin/env node
/**
 * PreToolUse (Bash): data-safety.mjs
 * Prevents any test from locking or modifying a shared account.
 * Blocks commands that reference shared account identifiers.
 */

let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) {
  input += chunk;
}

let toolInput;
try {
  toolInput = JSON.parse(input);
} catch {
  process.exit(0); // can't parse — let it through
}

const cmd = toolInput?.command || toolInput?.cmd || '';

// Block patterns that could modify shared accounts
const BLOCKED_PATTERNS = [
  /shared[_-]?account/i,
  /prod[_-]?user/i,
  /DELETE\s+FROM\s+users/i,
  /DROP\s+TABLE/i,
  /TRUNCATE/i,
  /--shared/,
];

for (const pattern of BLOCKED_PATTERNS) {
  if (pattern.test(cmd)) {
    console.error(`[data-safety] Blocked: command matches shared-account pattern: ${pattern}`);
    process.exit(2);
  }
}

process.exit(0);
