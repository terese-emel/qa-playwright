import { defineConfig } from "@playwright/test";

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
  },
});
