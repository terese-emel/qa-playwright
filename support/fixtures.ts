import { test as base } from '@playwright/test';

/**
 * Extended test fixture with shared setup.
 */
export const test = base.extend({
  // Add any shared fixtures here
  // e.g. authenticated page, mock server, etc.
});

export { expect } from '@playwright/test';
