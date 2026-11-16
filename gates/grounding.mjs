/**
 * Gate 1: Grounding — seen live
 * The author must have navigated to the real page before writing the test.
 * This is enforced by author-lane rules, but this module provides a checker
 * the evaluator can call to verify the tool-io.jsonl contains a real navigation.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export function checkGrounding(caseId) {
  const ioLog = resolve('run/tool-io.jsonl');
  if (!existsSync(ioLog)) return { pass: false, msg: 'No tool-io.jsonl' };

  const lines = readFileSync(ioLog, 'utf8').split('\n').filter(Boolean);
  const entries = lines
    .map(l => { try { return JSON.parse(l); } catch { return null; } })
    .filter(e => e && e.case_id === caseId);

  const hasNavigation = entries.some(e =>
    e.command && /goto|navigate|page\.goto/.test(e.command)
  );

  return hasNavigation
    ? { pass: true, msg: 'Live navigation recorded' }
    : { pass: false, msg: 'No live navigation in tool-io.jsonl for this case' };
}
