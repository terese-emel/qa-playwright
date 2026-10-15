---
name: requirement-traceability
description: Check whether important product needs are linked to named test cases. Use when reviewing `coverage/manifest.json`, planning coverage, finding missing error or boundary scenarios, or explaining what a coverage percentage means.
---

# Requirement traceability

Review `coverage/manifest.json` and run `scripts/check_test_coverage.py`. Report requirements without tests, invalid or duplicated IDs, and missing scenario types. Explain that the result measures declared links between needs and tests; it is not code coverage, assertion quality, or proof that tests passed.

Separate mechanically verified gaps from questions that need human judgment. Do not invent requirements, claim execution, or commit changes without review.
