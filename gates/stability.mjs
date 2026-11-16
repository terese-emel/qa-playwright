/**
 * Gate 8: Stability — 3 of 3 runs pass
 * Called by the orchestrator after running scripts/stability.sh.
 * Reads run/guard/<case-id>.json stability_runs field.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export function checkStability(caseId) {
  const verdictPath = resolve(`run/guard/${caseId}.json`);
  if (!existsSync(verdictPath)) {
    return { pass: false, msg: 'No verdict file for stability check' };
  }

  let verdict;
  try {
    verdict = JSON.parse(readFileSync(verdictPath, 'utf8'));
  } catch {
    return { pass: false, msg: 'Cannot parse verdict file' };
  }

  const runs = verdict.stability_runs || [];
  if (runs.length < 3) {
    return { pass: false, msg: `Only ${runs.length}/3 stability runs recorded` };
  }

  const allPass = runs.every(r => r.pass);
  return allPass
    ? { pass: true, msg: '3/3 stability runs passed' }
    : { pass: false, msg: `Stability runs: ${runs.map(r => r.pass ? 'PASS' : 'FAIL').join(', ')}` };
}
