import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // Increased timeout
  expect: {
    timeout: 10000, // Increased expect timeout
  },
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  // Reuse browser context for faster tests
  workers: 1, // Run tests sequentially to avoid conflicts
  retries: 1, // Retry failed tests once
}); 