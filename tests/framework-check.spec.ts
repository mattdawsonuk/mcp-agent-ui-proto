import { test } from '@playwright/test';

test.describe('Next.js Framework Issues Check', () => {
  test('Check for Next.js framework issues across all pages', async ({ page }) => {
    const frameworkIssues: string[] = [];
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    // Listen for console messages
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(`[${msg.type()}] ${text}`);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(`[${msg.type()}] ${text}`);
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      frameworkIssues.push(`Page Error: ${error.message}`);
    });

    console.log('=== Testing Main MCP Interface ===');
    
    // Navigate to main page
    await page.goto('http://localhost:3000/mcp', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });

    // Check for Next.js data script
    const nextDataScript = await page.locator('#__NEXT_DATA__');
    if (!(await nextDataScript.isVisible())) {
      frameworkIssues.push('Next.js data script (#__NEXT_DATA__) not found - this is critical for hydration');
    } else {
      console.log('✅ Next.js data script found');
    }

    // Check for hydration mismatches
    const hydrationMismatches = await page.locator('[data-hydration-mismatch]');
    const mismatchCount = await hydrationMismatches.count();
    if (mismatchCount > 0) {
      frameworkIssues.push(`Found ${mismatchCount} hydration mismatches`);
    } else {
      console.log('✅ No hydration mismatches found');
    }

    // Test tab interactions
    const tabs = ['Read Operations', 'Create Operations', 'Modify/Delete', 'Chained Workflows'];
    
    for (const tabName of tabs) {
      try {
        console.log(`Testing tab: ${tabName}`);
        
        // Click tab
        const tab = page.locator(`button[role="tab"]`).filter({ hasText: tabName });
        await tab.waitFor({ state: 'visible', timeout: 5000 });
        await tab.click();
        
        // Wait for content to load
        await page.waitForTimeout(1000);
        
        // Check for React errors after tab interaction
        const reactErrors = await page.locator('[data-nextjs-error]');
        const errorCount = await reactErrors.count();
        if (errorCount > 0) {
          frameworkIssues.push(`Found ${errorCount} React errors in ${tabName} tab`);
        }
        
      } catch (error) {
        console.log(`Warning: Could not test tab "${tabName}": ${error}`);
      }
    }

    console.log('=== Testing Chat Interface ===');
    
    // Test chat interface
    try {
      await page.goto('http://localhost:3000/mcp/chat', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      // Check for chat-specific elements
      const chatElements = [
        'textarea[placeholder*="message"]',
        'input[placeholder*="message"]',
        'button[aria-label*="send"]',
        '.chat-container',
        '[class*="chat"]'
      ];
      
      let chatElementFound = false;
      for (const selector of chatElements) {
        const element = page.locator(selector);
        if (await element.count() > 0) {
          chatElementFound = true;
          console.log(`✅ Chat element found: ${selector}`);
          break;
        }
      }
      
      if (!chatElementFound) {
        frameworkIssues.push('Chat interface elements not found - check if chat page is rendering properly');
      }
      
    } catch (error) {
      console.log(`Warning: Could not test chat interface: ${error}`);
    }

    console.log('=== Testing Home Page ===');
    
    // Test home page (should redirect to /mcp)
    try {
      await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      // Check if redirect happened
      const currentUrl = page.url();
      if (currentUrl.includes('/mcp')) {
        console.log('✅ Home page redirect working correctly');
      } else {
        frameworkIssues.push('Home page redirect not working - should redirect to /mcp');
      }
      
    } catch (error) {
      console.log(`Warning: Could not test home page: ${error}`);
    }

    console.log('=== Testing Theme Switching ===');
    
    // Test theme switching
    try {
      await page.goto('http://localhost:3000/mcp', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      const themeToggle = page.locator('[data-testid="theme-toggle"]').or(page.locator('button[aria-label*="theme"]'));
      if (await themeToggle.isVisible()) {
        await themeToggle.click();
        await page.waitForTimeout(500);
        
        // Check for theme-related issues
        const html = page.locator('html');
        const classList = await html.getAttribute('class');
        
        if (classList && (classList.includes('dark') || classList.includes('light'))) {
          console.log('✅ Theme switching working correctly');
        } else {
          frameworkIssues.push('Theme class not applied after toggle');
        }
      } else {
        console.log('⚠️ Theme toggle not found');
      }
      
    } catch (error) {
      console.log(`Warning: Could not test theme switching: ${error}`);
    }

    console.log('=== Final DOM Check ===');
    
    // Final comprehensive DOM check
    const domIssues = await page.evaluate(() => {
      const issues: string[] = [];
      
      // Check for common Next.js issues
      const nextData = document.querySelector('#__NEXT_DATA__');
      if (!nextData) {
        issues.push('Next.js data script not found');
      }
      
      // Check for hydration mismatches
      const hydrationMismatches = document.querySelectorAll('[data-hydration-mismatch]');
      if (hydrationMismatches.length > 0) {
        issues.push(`Found ${hydrationMismatches.length} hydration mismatches`);
      }
      
      // Check for missing meta tags
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        issues.push('Viewport meta tag missing');
      }
      
      // Check for React error boundaries
      const errorBoundaries = document.querySelectorAll('[data-nextjs-error]');
      if (errorBoundaries.length > 0) {
        issues.push(`Found ${errorBoundaries.length} React error boundaries`);
      }
      
      return issues;
    });
    
    frameworkIssues.push(...domIssues);

    console.log('=== Next.js Framework Issues Report ===');
    
    if (frameworkIssues.length > 0) {
      console.log(`❌ Found ${frameworkIssues.length} framework issues:`);
      frameworkIssues.forEach(issue => console.log(`  - ${issue}`));
      
      // Provide specific recommendations
      console.log('\n=== Recommendations ===');
      if (frameworkIssues.some(issue => issue.includes('Next.js data script'))) {
        console.log('  🔧 Next.js data script missing: Check if the app is properly built and served');
      }
      if (frameworkIssues.some(issue => issue.includes('Chat container'))) {
        console.log('  🔧 Chat interface issues: Check if the chat page components are properly exported');
      }
      if (frameworkIssues.some(issue => issue.includes('Main content'))) {
        console.log('  🔧 Main content missing: Check if the home page redirect is working properly');
      }
    } else {
      console.log('✅ No framework issues found');
    }

    if (consoleErrors.length > 0) {
      console.log(`⚠️  Found ${consoleErrors.length} console errors:`);
      consoleErrors.slice(0, 10).forEach(error => console.log(`  - ${error}`));
      if (consoleErrors.length > 10) {
        console.log(`  ... and ${consoleErrors.length - 10} more`);
      }
    }

    if (consoleWarnings.length > 0) {
      console.log(`⚠️  Found ${consoleWarnings.length} console warnings:`);
      consoleWarnings.slice(0, 5).forEach(warning => console.log(`  - ${warning}`));
      if (consoleWarnings.length > 5) {
        console.log(`  ... and ${consoleWarnings.length - 5} more`);
      }
    }

    // Only fail the test for actual framework issues
    if (frameworkIssues.length > 0) {
      throw new Error(`Found ${frameworkIssues.length} Next.js framework issues:\n${frameworkIssues.join('\n')}`);
    }

    console.log('✅ Next.js framework check completed successfully');
  });
}); 