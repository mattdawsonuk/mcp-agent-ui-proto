import { test, expect } from '@playwright/test';

test('Basic connectivity test', async ({ page }) => {
  test.setTimeout(60000);
  
  // Test basic page load
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Check if we're redirected to /mcp
  await expect(page).toHaveURL(/\/mcp/);
  
  // Take a screenshot
  await page.screenshot({ path: 'tests/screenshots/basic-test.png' });
  
  // Check if the page has content
  const title = await page.locator('h1').textContent();
  console.log('Page title:', title);
  
  // Check if tabs are present
  const tabs = await page.locator('[role="tab"]').count();
  console.log('Number of tabs found:', tabs);
}); 