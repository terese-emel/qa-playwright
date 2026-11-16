# Run

Runtime state for the current pipeline execution.

```
run/
  status.json      — overall pipeline state (orchestrator writes)
  latest.json      — page owners / which agent last touched which page
  review.md        — orchestrator sign-off (human reads this)
  tool-io.jsonl    — append-only log of all real tool I/O
  HALT             — if present, pipeline is stopped (any hook may create this)
  guard/
    <case-id>.json — per-case gate verdicts
```

All files in `run/` except `guard/` are written by the orchestrator or hooks.
Agents (authors, evaluator) write only to `run/guard/<their-case-id>.json`.
