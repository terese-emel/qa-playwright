/**
 * Shared assertion helpers.
 */
import { expect } from '@playwright/test';

/**
 * Assert that an element with the given text is visible.
 */
export async function assertVisible(page, text) {
  const el = page.getByText(text);
  await el.waitFor({ state: 'visible' });
  await expect(el).toBeVisible();
}

/**
 * Assert that the page URL contains the given substring.
 */
export function assertUrlContains(page, substring) {
  expect(page.url()).toContain(substring);
}
