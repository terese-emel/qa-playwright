/**
 * Proof probe: example.com is reachable.
 * Run with: node go/probe-example.mjs
 */
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
const title = await page.title();
if (!title.includes('Example')) {
  console.error(`[probe] FAIL: unexpected title: ${title}`);
  await browser.close();
  process.exit(1);
}
console.log(`[probe] PASS: title = "${title}"`);
await browser.close();
