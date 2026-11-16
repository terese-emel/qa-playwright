# Plans

This directory holds the source-of-truth plan files for the agentic pipeline.

## Format

Each plan file is a Markdown document named `<plan-id>.md`.

```markdown
# Plan: <name>

## Sections

### <section-id>: <section-name>

**URL:** https://...
**Type:** ui | api | e2e-ui | e2e-api
**Asserts:**
- <what must be true after the test>

**Selector hints:** (optional)
- ...
```

Plans are read-only for all agents. Only the human or orchestrator may add new plan files.
