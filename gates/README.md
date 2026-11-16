# Gates

Eight checks every generated test must pass before it can be committed.

| # | Name | Type | When |
|---|------|------|------|
| 1 | Grounding | Live check | Author run |
| 2 | Static | 12 Playwright rules | PostToolUse (Write) |
| 3 | Verify on site | No guessed text | Author run |
| 4 | Type rule — no secret leak | Static | PostToolUse (Write) |
| 5 | Execution | Real run + trace | Orchestrator |
| 6 | Evaluator | LLM judge | Evaluator agent |
| 7 | Type rule — Assert covered | Static | PostToolUse (Write) |
| 8 | Stability | 3-of-3 runs | Orchestrator |

Gates 2, 4, and 7 are scored synchronously by `hooks/gates.mjs` via `gates/static.mjs`.
Gates 1 and 3 are enforced by author-lane rules in `.claude/CLAUDE.md`.
Gates 5 and 8 are run by `scripts/go.sh` and `scripts/stability.sh`.
Gate 6 is run by `agents/evaluator.md`.
