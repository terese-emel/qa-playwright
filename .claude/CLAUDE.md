# Agentic Playwright Pipeline — Locked Rulebook

## What agents CAN do
- Read plan files from `plans/`
- Read task files from `tasks/`
- Write test files within their assigned case directory only
- Read shared helpers from `lib/` and `support/`
- Execute scripts in `scripts/` (read-only invocation)
- Write verdict files to `run/guard/`
- Read gate results from `gates/`

## What agents CANNOT do
- Spawn other agents (no sub-spawning)
- Write to another agent's case directory
- Modify `plans/`, `tasks/`, `scripts/`, `hooks/`, `gates/`, `.claude/`
- Access network resources not listed in `mcp.json`
- Modify `run/status.json` or `run/latest.json` directly (orchestrator only)
- Change their own token limits, model, or memory settings
- Write test results as passing without a real spec run
- Delete or rename existing tests without explicit task instruction
- Access credentials or secrets outside of `mcp/` tooling
- Modify `.gitignore`, `playwright.config.ts`, or `package.json`

## Author lane rules
- Each author handles exactly ONE case at a time
- Memory is OFF — no cross-run state
- Window is thrown away at end of run
- No shell access, no spawning
- Output: one test file per plan section, nothing else

## Gate rules
- A test reaches git only when it passes all 8 gates AND canary catch is confirmed
- Gates are scored by `hooks/gates.mjs` after each file write
- Verdict is written to `run/guard/<case-id>.json`
- The lead (orchestrator) reads verdicts from disk, never from chat

## Halt
- Any hook can write `run/HALT` to stop the entire pipeline immediately
- The orchestrator checks for `run/HALT` before every dispatch
