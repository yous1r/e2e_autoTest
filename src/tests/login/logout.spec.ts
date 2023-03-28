import { test, expect } from '@playwright/test';
import { getConfig } from '../../../config/base';

const { baseURL } = getConfig();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});
