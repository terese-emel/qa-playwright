import { defineConfig, devices } from "@playwright/test";

// Agent mode: CLI is the default for lean, repeatable runs (~4x fewer tokens than MCP).
// Set PLAYWRIGHT_AGENT_MODE=mcp for live exploration and debugging sessions.
const agentMode = process.env.PLAYWRIGHT_AGENT_MODE ?? "cli";

export default defineConfig({
  testDir: "./tests",
  outputDir: ".qa-artifacts",
  snapshotDir: "./visual-baselines",
  expect: {
    toHaveScreenshot: {
      // Allow up to 0.2% of pixels to differ before failing.
      maxDiffPixelRatio: 0.002,
      threshold: 0.1,
    },
  },
  reporter: process.env.CI
    ? [
        // Blob reporter collects results per shard; a separate merge-reports job
        // combines them into a single HTML report after all shards finish.
        ["blob", { outputDir: "blob-report" }],
        ["junit", { outputFile: "reports/results.xml" }],
      ]
    : [
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
  projects: [
    // Auth setup runs first; each role logs in once and saves storageState to disk.
    // Tests that require an authenticated session declare `dependencies: ["setup"]`
    // and receive the saved state via `storageState` in their `use` block.
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // Remove the dependency below for tests that do not need authentication.
      dependencies: ["setup"],
    },
  ],
});
