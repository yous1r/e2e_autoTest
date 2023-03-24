import { chromium } from '@playwright/test'; // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://10.2.69.242');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
