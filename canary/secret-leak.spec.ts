/**
 * Canary test — contains a fake secret pattern.
 * Used to verify gate 4 (no-secret-leak) catches secret patterns.
 */
import { test, expect } from '@playwright/test';

test('canary: has fake secret', async ({ page }) => {
  // gate 4 should catch the api_key pattern in this file at static analysis time
  await page.goto('https://example.com');
  expect(await page.title()).toBeTruthy();
});
