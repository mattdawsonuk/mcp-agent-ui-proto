import { test } from '@playwright/test';

test('Comprehensive contrast check across all pages and tabs', async ({ page }) => {
  test.setTimeout(180000); // 3 minutes for comprehensive testing

  // Helper function to check contrast for current page
  async function checkContrast(mode: 'light' | 'dark', pageName: string) {
    const results = await page.evaluate(() => {
      function luminance(r: number, g: number, b: number) {
        const a = [r, g, b].map(function (v) {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
      }
      function contrast(rgb1: number[], rgb2: number[]) {
        const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
        const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
        return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
      }
      function parseRGB(str: string): number[] | null {
        const match = str.match(/rgba?\((\d+), (\d+), (\d+)/);
        if (!match) return null;
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      
      const MIN_CONTRAST = 4.5; // WCAG AA for normal text
      const elements = Array.from(document.querySelectorAll('*'));
      const issues = [];
      
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        if (style.visibility === 'hidden' || style.display === 'none' || (el as HTMLElement).offsetParent === null) continue;
        
        const color = parseRGB(style.color);
        const bgColor = parseRGB(style.backgroundColor);
        if (!color || !bgColor) continue;
        
        const ratio = contrast(color, bgColor);
        if (ratio < MIN_CONTRAST) {
          issues.push({
            tag: el.tagName,
            text: el.textContent?.trim().slice(0, 40),
            color: style.color,
            backgroundColor: style.backgroundColor,
            contrast: ratio.toFixed(2)
          });
        }
      }
      return issues;
    });
    return results;
  }

  // Function to set theme
  async function setTheme(theme: 'light' | 'dark') {
    await page.evaluate((t) => {
      localStorage.setItem('theme', t);
      document.documentElement.classList.remove('dark');
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }, theme);
    await page.reload();
    await page.waitForTimeout(2000);
  }

  // Test main MCP interface with all tabs
  console.log('=== Testing Main MCP Interface ===');
  await page.goto('/mcp');
  await page.waitForSelector('h1');

  const tabs = ['read', 'create', 'modify', 'chained', 'audit'];
  
  for (const theme of ['light', 'dark'] as const) {
    console.log(`\n--- Testing ${theme} mode ---`);
    await setTheme(theme);
    
    // Test each tab
    for (const tab of tabs) {
      console.log(`Testing tab: ${tab}`);
      await page.click(`button[role="tab"]:has-text("${tab.charAt(0).toUpperCase() + tab.slice(1)}")`);
      await page.waitForTimeout(1000);
      
      const issues = await checkContrast(theme, `mcp-${tab}`);
      if (issues.length > 0) {
        console.log(`❌ ${issues.length} contrast issues found in ${tab} tab (${theme} mode):`);
        issues.forEach(issue => {
          console.log(`  [${issue.tag}] "${issue.text}" - contrast: ${issue.contrast}`);
        });
      } else {
        console.log(`✅ No contrast issues in ${tab} tab (${theme} mode)`);
      }
      
      // Take screenshot of each tab
      await page.screenshot({ 
        path: `tests/screenshots/contrast-${theme}-${tab}.png`, 
        fullPage: true 
      });
    }
    
    // Test expanded sections
    console.log('Testing expanded sections...');
    await page.click('button[role="tab"]:has-text("Read")');
    await page.waitForTimeout(500);
    
    // Try to expand a section if available
    const expandableSections = page.locator('[data-section-index]');
    if (await expandableSections.count() > 0) {
      await expandableSections.first().click();
      await page.waitForTimeout(1000);
      
      const issues = await checkContrast(theme, 'mcp-expanded-sections');
      if (issues.length > 0) {
        console.log(`❌ ${issues.length} contrast issues found in expanded sections (${theme} mode):`);
        issues.forEach(issue => {
          console.log(`  [${issue.tag}] "${issue.text}" - contrast: ${issue.contrast}`);
        });
      } else {
        console.log(`✅ No contrast issues in expanded sections (${theme} mode)`);
      }
    }
  }

  // Test chat interface
  console.log('\n=== Testing Chat Interface ===');
  await page.goto('/mcp/chat?workflow=Sample%20Workflow&type=read');
  await page.waitForSelector('h2');
  
  for (const theme of ['light', 'dark'] as const) {
    console.log(`\n--- Testing chat interface (${theme} mode) ---`);
    await setTheme(theme);
    
    const issues = await checkContrast(theme, 'chat-interface');
    if (issues.length > 0) {
      console.log(`❌ ${issues.length} contrast issues found in chat interface (${theme} mode):`);
      issues.forEach(issue => {
        console.log(`  [${issue.tag}] "${issue.text}" - contrast: ${issue.contrast}`);
      });
    } else {
      console.log(`✅ No contrast issues in chat interface (${theme} mode)`);
    }
    
    await page.screenshot({ 
      path: `tests/screenshots/contrast-${theme}-chat.png`, 
      fullPage: true 
    });
  }

  // Test home page redirect
  console.log('\n=== Testing Home Page ===');
  await page.goto('/');
  await page.waitForTimeout(2000);
  
  for (const theme of ['light', 'dark'] as const) {
    console.log(`\n--- Testing home page (${theme} mode) ---`);
    await setTheme(theme);
    
    const issues = await checkContrast(theme, 'home-page');
    if (issues.length > 0) {
      console.log(`❌ ${issues.length} contrast issues found on home page (${theme} mode):`);
      issues.forEach(issue => {
        console.log(`  [${issue.tag}] "${issue.text}" - contrast: ${issue.contrast}`);
      });
    } else {
      console.log(`✅ No contrast issues on home page (${theme} mode)`);
    }
    
    await page.screenshot({ 
      path: `tests/screenshots/contrast-${theme}-home.png`, 
      fullPage: true 
    });
  }

  console.log('\n=== Comprehensive Contrast Test Complete ===');
}); 