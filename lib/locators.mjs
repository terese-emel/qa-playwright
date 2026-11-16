/**
 * Common locator patterns.
 */

/**
 * Get a button by its accessible label.
 */
export function getButton(page, label) {
  return page.getByRole('button', { name: label });
}

/**
 * Get an input by its label text.
 */
export function getInput(page, label) {
  return page.getByLabel(label);
}

/**
 * Get a link by its text.
 */
export function getLink(page, text) {
  return page.getByRole('link', { name: text });
}
