/**
 * Canary test — contains a fake secret.
 * Used to verify gate 4 (no-secret-leak) catches secret patterns.
 */
import { test, expect } from '@playwright/test';

test('canary: has fake secret', async ({ page }) => {
  // gate 4 should catch this
  const api_key = 'fake-secret-1234567890abcdef';
  await page.goto('https://example.com');
  expect(await page.title()).toBeTruthy();
});
