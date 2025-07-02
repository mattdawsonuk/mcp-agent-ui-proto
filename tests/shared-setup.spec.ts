import { test as base, expect } from '@playwright/test';

// Extend the test to include shared context
export const test = base.extend({
  // Reuse the same page across tests
  page: async ({ page }, use) => {
    // Navigate to the app once
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    await use(page);
  },
});

export { expect }; 