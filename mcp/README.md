# MCP — API logins and Playwright MCP integration

This directory holds the MCP server configuration for the pipeline.

## Files

- `mcp.json` — MCP server config (tool definitions, server URL, auth)
- `README.md` — this file

## Usage

The Playwright MCP server enables the evaluator and author agents to
initiate browser sessions through a controlled interface rather than
shell commands.

Credentials are loaded from environment variables — never hardcoded.
