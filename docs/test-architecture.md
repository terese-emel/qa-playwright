# Mandatory Page Object Model (POM)

```text
pages/          # selectors, page/screen actions and navigation
components/      # shared widgets, dialogs and reusable elements
fixtures/        # setup, teardown, dependency injection
test-data/       # synthetic factories and unique identifiers
tests/           # scenario intent and assertions only
```

For every new test case: identify the requirement and test ID; inspect existing page/screen objects; reuse or extend the right object; create unique synthetic data; implement scenario and assertions in the test; update traceability; run the framework suite and validators.

Do not embed selectors (`locator`, `getBy*`, `cy.get`, `findElement`, accessibility IDs, XPath/CSS selectors) in new test files. Prefer semantic and stable selectors inside page objects. Page objects should expose meaningful actions such as `loginAs(...)`, not low-level test steps. Avoid hiding business assertions inside page objects.

Review checklist: page/screen objects reused; no selectors in test code; assertions in tests; mock/synthetic data only; independent parallel-safe tests; traceability updated; security and flaky checks considered.

This rule applies to new or modified test cases; pre-existing examples are retained and are not claimed to have been refactored.
