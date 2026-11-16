/**
 * Canary test — always fails.
 * Used by scripts/canary.sh to verify gates catch failures.
 * Never commit this to a real test suite.
 */
import { test, expect } from '@playwright/test';

test('canary: this test always fails', async () => {
  expect(false).toBe(true);
});
