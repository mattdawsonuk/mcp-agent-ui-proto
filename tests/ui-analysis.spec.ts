import { test, expect } from '@playwright/test';

test.describe('UI Analysis and Improvement Suggestions', () => {
  test('Main MCP Interface Analysis', async ({ page }) => {
    // Navigate to the main MCP interface
    await page.goto('/mcp');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Take a full page screenshot
    await page.screenshot({ 
      path: 'tests/screenshots/main-interface.png',
      fullPage: true 
    });
    
    // Analyze the main interface
    const title = await page.locator('h1').textContent();
    expect(title).toBe('Aria');
    
    // Check for responsive design issues
    const viewport = page.viewportSize();
    console.log(`Viewport size: ${viewport?.width}x${viewport?.height}`);
    
    // Analyze color contrast and accessibility
    const badges = await page.locator('[class*="badge"]').count();
    console.log(`Number of badges found: ${badges}`);
    
    // Check for loading states
    const loadingElements = await page.locator('[class*="animate-spin"]').count();
    console.log(`Loading elements found: ${loadingElements}`);
  });

  test('Tab Navigation Analysis', async ({ page }) => {
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    
    // Test each tab - using correct selectors based on debug output
    const tabTexts = ['Read Operations', 'Create Operations', 'Modify/Delete', 'Chained Workflows', 'Audit Logs'];
    
    for (const tabText of tabTexts) {
      // Click on tab using text content
      await page.click(`button[role="tab"]:has-text("${tabText}")`);
      await page.waitForTimeout(1000);
      
      // Take screenshot of each tab
      const tabName = tabText.toLowerCase().replace(/\s+/g, '-');
      await page.screenshot({ 
        path: `tests/screenshots/tab-${tabName}.png`,
        fullPage: true 
      });
      
      // Check if tab content is visible
      const tabContent = await page.locator('[role="tabpanel"][data-state="active"]');
      await expect(tabContent).toBeVisible();
    }
  });

  test('Chat Interface Analysis', async ({ page }) => {
    // Navigate to chat with a sample workflow
    await page.goto('/mcp/chat?workflow=Sample%20Workflow&type=read');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of chat interface
    await page.screenshot({ 
      path: 'tests/screenshots/chat-interface.png',
      fullPage: true 
    });
    
    // Test chat functionality
    const input = page.locator('input[placeholder*="Type your response"]');
    await expect(input).toBeVisible();
    
    // Test sending a message
    await input.fill('test message');
    await page.click('button:has-text("Send")');
    
    // Wait for response and take screenshot
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: 'tests/screenshots/chat-with-message.png',
      fullPage: true 
    });
  });

  test('Responsive Design Analysis', async ({ page }) => {
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    
    // Test different screen sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 1024, height: 768, name: 'tablet' },
      { width: 768, height: 1024, name: 'tablet-portrait' },
      { width: 375, height: 667, name: 'mobile' },
      { width: 320, height: 568, name: 'mobile-small' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: `tests/screenshots/responsive-${viewport.name}.png`,
        fullPage: true 
      });
      
      // Check for horizontal scrolling issues
      const body = await page.locator('body');
      const overflow = await body.evaluate(el => getComputedStyle(el).overflowX);
      console.log(`${viewport.name}: overflow-x = ${overflow}`);
    }
  });

  test('Accessibility Analysis', async ({ page }) => {
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    console.log(`Found ${headings.length} headings`);
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (let i = 0; i < images.length; i++) {
      const alt = await images[i].getAttribute('alt');
      console.log(`Image ${i + 1} alt text: ${alt || 'MISSING'}`);
    }
    
    // Check for proper button labels
    const buttons = await page.locator('button').all();
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      console.log(`Button ${i + 1}: text="${text?.trim()}" aria-label="${ariaLabel || 'MISSING'}"`);
    }
  });

  test('Performance Analysis', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Check for any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    console.log(`Console errors found: ${errors.length}`);
    errors.forEach(error => console.log(`Error: ${error}`));
  });

  test('Dark Mode Analysis', async ({ page }) => {
    await page.goto('/mcp');
    await page.waitForLoadState('networkidle');
    
    // Check if dark mode toggle exists
    const darkModeToggle = page.locator('[data-testid="theme-toggle"], button:has-text("Toggle theme")');
    
    if (await darkModeToggle.count() > 0) {
      // Take screenshot in light mode
      await page.screenshot({ 
        path: 'tests/screenshots/light-mode.png',
        fullPage: true 
      });
      
      // Toggle to dark mode
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
      
      // Take screenshot in dark mode
      await page.screenshot({ 
        path: 'tests/screenshots/dark-mode.png',
        fullPage: true 
      });
      
      // Toggle back to light mode
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
    } else {
      console.log('Dark mode toggle not found');
      // Take screenshot anyway
      await page.screenshot({ 
        path: 'tests/screenshots/light-mode.png',
        fullPage: true 
      });
    }
  });
}); 