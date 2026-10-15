---
name: flaky-test-analysis
description: Analyze repeated JUnit test results to find intermittent failures and likely patterns. Use when a suite has mixed pass/fail history, timing-sensitive failures, retries, or suspected nondeterminism; do not use it to excuse a consistent product failure.
---

# Flaky test analysis

Collect comparable JUnit XML results from multiple runs and use `scripts/analyze_flakiness.py` to summarize mixed outcomes. Distinguish evidence from hypotheses, preserve original failure status, and report likely causes such as timing, shared state, random data, network dependence, or environment instability.

Recommend investigation steps rather than silently changing assertions or disabling tests. A mixed history is a signal for review, not proof of flakiness. Keep reports free of secrets and personal or production data.
