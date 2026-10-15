---
name: playwright-test-healing
description: Investigate failing Playwright tests using CI output, traces, screenshots, and current UI state. Use when a test may have locator drift, a real product regression, or a reproducibility problem and the assertion must remain honest.
---

# Playwright test healing

Classify the failure before changing code. If an element moved but the behavior is intact, update the page object using a stable semantic locator. If the product behavior is broken or changed, preserve the assertion, document the regression, and record the skip in `coverage/skips.md` when appropriate. Treat intermittent failures as flakiness and hand them to the flaky-test analysis skill.

Run the smallest useful reproduction and the relevant checks. Keep scenario logic and assertions unchanged, use synthetic data, and present the diff for review. Never hide a regression or commit/push without explicit approval.
