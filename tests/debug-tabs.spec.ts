import { test } from '@playwright/test';

test('Debug tab selectors', async ({ page }) => {
  test.setTimeout(60000);
  
  await page.goto('/mcp');
  await page.waitForLoadState('networkidle');
  
  // Debug: Find all elements that might be tabs
  const possibleTabs = await page.locator('[role="tab"], [data-state], button').all();
  console.log(`Found ${possibleTabs.length} possible tab elements`);
  
  for (let i = 0; i < possibleTabs.length; i++) {
    const element = possibleTabs[i];
    const tagName = await element.evaluate(el => el.tagName);
    const role = await element.getAttribute('role');
    const dataState = await element.getAttribute('data-state');
    const value = await element.getAttribute('value');
    const text = await element.textContent();
    
    console.log(`Element ${i + 1}: tag=${tagName}, role=${role}, data-state=${dataState}, value=${value}, text="${text?.trim()}"`);
  }
  
  // Take a screenshot to see the current state
  await page.screenshot({ path: 'tests/screenshots/debug-tabs.png', fullPage: true });
}); 