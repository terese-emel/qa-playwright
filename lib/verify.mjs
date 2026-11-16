/**
 * Verification checks used by the evaluator and gates.
 * All checks are read-only.
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Load the tool-io log for a case and return relevant entries.
 */
export function loadCaseIoLog(caseId) {
  const ioLog = resolve('run/tool-io.jsonl');
  if (!existsSync(ioLog)) return [];
  return readFileSync(ioLog, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(l => { try { return JSON.parse(l); } catch { return null; } })
    .filter(e => e && e.case_id === caseId);
}

/**
 * Check that a plan assert appears in the test file content.
 */
export function assertCoveredByTest(assertText, testContent) {
  // Simple keyword overlap check
  const keywords = assertText.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  return keywords.some(kw => testContent.toLowerCase().includes(kw));
}
