import { test } from '@playwright/test';

// Helper to calculate relative luminance
function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Helper to calculate contrast ratio
function contrast(rgb1: number[], rgb2: number[]) {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

// Helper to parse rgb/rgba color string
function parseRGB(str: string): number[] | null {
  const match = str.match(/rgba?\((\d+), (\d+), (\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

test('Contrast check for all visible elements in light and dark mode', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('/mcp');
  await page.waitForSelector('h1');

  // Function to check contrast for all visible elements
  async function checkContrast(mode: 'light' | 'dark') {
    const results = await page.evaluate(() => {
      function luminance(r, g, b) {
        const a = [r, g, b].map(function (v) {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
      }
      function contrast(rgb1, rgb2) {
        const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
        const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
        return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
      }
      function parseRGB(str) {
        const match = str.match(/rgba?\((\d+), (\d+), (\d+)/);
        if (!match) return null;
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      const MIN_CONTRAST = 4.5; // WCAG AA for normal text
      const elements = Array.from(document.querySelectorAll('*'));
      const issues = [];
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        if (style.visibility === 'hidden' || style.display === 'none' || el.offsetParent === null) continue;
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

  // Check in light mode
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.reload();
  await page.waitForTimeout(1000);
  const lightIssues = await checkContrast('light');
  await page.screenshot({ path: 'tests/screenshots/contrast-light.png', fullPage: true });

  // Check in dark mode
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload();
  await page.waitForTimeout(1000);
  const darkIssues = await checkContrast('dark');
  await page.screenshot({ path: 'tests/screenshots/contrast-dark.png', fullPage: true });

  // Log results
  console.log('--- Light mode contrast issues ---');
  if (lightIssues.length === 0) {
    console.log('No contrast issues found in light mode!');
  } else {
    for (const issue of lightIssues) {
      console.log(`[${issue.tag}] "${issue.text}" color: ${issue.color}, bg: ${issue.backgroundColor}, contrast: ${issue.contrast}`);
    }
  }
  console.log('--- Dark mode contrast issues ---');
  if (darkIssues.length === 0) {
    console.log('No contrast issues found in dark mode!');
  } else {
    for (const issue of darkIssues) {
      console.log(`[${issue.tag}] "${issue.text}" color: ${issue.color}, bg: ${issue.backgroundColor}, contrast: ${issue.contrast}`);
    }
  }
}); 