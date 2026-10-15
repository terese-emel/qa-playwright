---
name: test-data-safety
description: Review QA tests, fixtures, mocks, reports, and generated artifacts for personal information, production records, credentials, tokens, or other secrets. Use before sharing, committing, or publishing test work and when creating synthetic test data.
---

# Test-data safety

Use synthetic, clearly fictional data. Run `scripts/validate_test_data.py --root .`, inspect its findings, and review logs, screenshots, traces, prompts, and attachments for accidental exposure. Redact or replace sensitive values and stop when a finding cannot be resolved safely.

Do not paste secrets into tests or reports. Do not treat a clean heuristic scan as a complete security review; record the limitation and ask for human security review when the data or environment is sensitive.
