/**
 * Gate 5: Execution — real run + real trace
 * Called by the orchestrator after running the spec file.
 * Checks that tool-io.jsonl has a real playwright test invocation with exit_code 0
 * and that a trace file was produced.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export function checkExecution(caseId) {
  const ioLog = resolve('run/tool-io.jsonl');
  if (!existsSync(ioLog)) return { pass: false, msg: 'No tool-io.jsonl' };

  const lines = readFileSync(ioLog, 'utf8').split('\n').filter(Boolean);
  const entries = lines
    .map(l => { try { return JSON.parse(l); } catch { return null; } })
    .filter(e => e && e.case_id === caseId);

  const run = entries.find(e =>
    e.command && /npx playwright test|playwright test/.test(e.command) &&
    e.exit_code === 0
  );

  if (!run) {
    return { pass: false, msg: 'No passing Playwright run recorded for this case' };
  }

  const traceDir = resolve('test-results');
  const traceExists = existsSync(traceDir);
  return traceExists
    ? { pass: true, msg: 'Real run with exit_code 0 and trace directory present' }
    : { pass: false, msg: 'Run passed but no test-results trace directory found' };
}
