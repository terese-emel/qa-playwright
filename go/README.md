# Go — Proof-probe scripts

Scripts in this directory are run by `scripts/go.sh` to verify a test can reach
the target page and produce a minimal passing result before the full gate suite runs.

Probe scripts are:
- Read-only (no writes to the app)
- Fast (< 10s)
- Self-contained
