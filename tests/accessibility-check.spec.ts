import { test } from '@playwright/test';

test('Accessibility improvements check', async ({ page }) => {
  await page.goto('/mcp');
  
  // Wait for the page to load
  await page.waitForSelector('h1');
  
  // Check for aria-labels on buttons
  const buttonsWithAriaLabels = await page.locator('button[aria-label]').count();
  console.log(`Buttons with aria-labels: ${buttonsWithAriaLabels}`);
  
  // List all buttons with aria-labels
  const buttons = await page.locator('button[aria-label]').all();
  for (let i = 0; i < buttons.length; i++) {
    const ariaLabel = await buttons[i].getAttribute('aria-label');
    const text = await buttons[i].textContent();
    console.log(`Button ${i + 1}: text="${text?.trim()}" aria-label="${ariaLabel}"`);
  }
  
  // Check specific buttons we added aria-labels to
  const themeToggle = page.locator('button[aria-label*="Switch to"]');
  if (await themeToggle.count() > 0) {
    console.log('Theme toggle aria-label found');
  } else {
    console.log('Theme toggle aria-label not found');
  }
  
  const profileButton = page.locator('button[aria-label*="profile"]');
  if (await profileButton.count() > 0) {
    console.log('Profile button aria-label found');
  } else {
    console.log('Profile button aria-label not found');
  }
  
  // Check tab buttons
  const tabButtons = page.locator('button[role="tab"][aria-label]');
  const tabCount = await tabButtons.count();
  console.log(`Tab buttons with aria-labels: ${tabCount}`);
  
  // Check for alt text on images
  const images = await page.locator('img').all();
  for (let i = 0; i < images.length; i++) {
    const alt = await images[i].getAttribute('alt');
    console.log(`Image ${i + 1} alt text: ${alt || 'MISSING'}`);
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'tests/screenshots/accessibility-improvements.png', fullPage: true });
}); 