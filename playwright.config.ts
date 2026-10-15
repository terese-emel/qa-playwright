import { defineConfig } from "@playwright/test";

// Agent mode: CLI is the default for lean, repeatable runs (~4x fewer tokens than MCP).
// Set PLAYWRIGHT_AGENT_MODE=mcp for live exploration and debugging sessions.
const agentMode = process.env.PLAYWRIGHT_AGENT_MODE ?? "cli";

export default defineConfig({
  testDir: "./tests",
  outputDir: ".qa-artifacts",
  reporter: [
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["junit", { outputFile: "reports/results.xml" }],
  ],
  retries: process.env.CI ? 1 : 0,
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // CLI mode: snapshots saved to disk, context not sent into agent context window.
    // MCP mode: live page state sent to agent at every step; use for exploration/debugging.
    ...(agentMode === "mcp" ? { _optionValueForMcpMode: true } : {}),
  },
});
