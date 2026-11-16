# Tasks

One JSON file per case. Created by the orchestrator when it batches plan sections.

## Schema

```json
{
  "case_id": "<plan-id>-<section-id>",
  "plan_id": "<plan-id>",
  "section_id": "<section-id>",
  "lane": "ui | api | e2e-ui | e2e-api",
  "url": "https://...",
  "asserts": ["..."],
  "runs_left": 1,
  "started_at": null,
  "done_at": null
}
```

Task files are written by the orchestrator and read by hooks. Authors never write them.
