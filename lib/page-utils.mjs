/**
 * Page navigation and wait helpers.
 */

/**
 * Navigate to a URL and wait for load.
 */
export async function gotoAndWait(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
}

/**
 * Wait for a network response matching a URL pattern.
 */
export async function waitForResponse(page, urlPattern, action) {
  const [response] = await Promise.all([
    page.waitForResponse(resp => urlPattern.test(resp.url())),
    action(),
  ]);
  return response;
}
