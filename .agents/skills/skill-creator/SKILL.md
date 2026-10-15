---
name: skill-creator
description: Create or improve portable agent skills under `.agents/skills/` using the Agent Skills specification. Use when the team wants to turn a workflow into a reusable skill, add a new agent capability, improve a skill description, or validate skill structure.
---

# Skill creator

Create skills that are useful across compatible agent clients, not instructions tied only to one chat or one person.

## Create or improve a skill

1. Capture the capability, trigger situations, expected output, tools, environment needs, and boundaries.
2. Check whether an existing skill already covers the workflow; improve it instead of creating a duplicate.
3. Create `.agents/skills/<skill-name>/SKILL.md` with YAML frontmatter containing:
   - `name:` — lowercase letters, numbers, and single hyphens; must match the folder name;
   - `description:` — what the skill does and when it should activate, with concrete keywords.
4. Write the body in direct, practical language. Explain important decisions, safety limits, inputs, outputs, and edge cases.
5. Keep the entrypoint focused and short. Move large schemas, examples, or mode-specific details into linked `references/` files.
6. Add scripts only for repeatable work where deterministic execution is safer or clearer than rewriting instructions.
7. Define approval boundaries for external writes, secrets, destructive actions, and shared team state.
8. Before writing or packaging the skill, inspect source material for secrets, credentials, tokens, personal information, customer or employee records, production data, private URLs, proprietary text, and sensitive instructions. Replace them with generic placeholders or omit them.
9. Validate frontmatter, naming, links, and any scripts. Try realistic prompts, including one near-miss that should not activate the skill.

## Quality bar

- The description is specific enough to trigger for the right requests without becoming a catchall.
- The skill does not duplicate an agent file or another skill unnecessarily.
- Instructions preserve user scope and do not imply permission for extra actions.
- The skill explains what to do when information is missing instead of encouraging guesses.
- Outputs are reviewable and use a clear template when structure matters.
- Secrets, personal data, production data, and unredacted artifacts are handled safely.
- Never copy sensitive content from source documents into `SKILL.md`, references, scripts, examples, prompts, logs, or assets.
- The skill does not commit, push, or change shared systems without explicit authorization.

Before handing it off, report the skill path, purpose, validation performed, and any missing dependency or test limitation.
