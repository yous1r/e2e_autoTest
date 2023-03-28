import { getConfig } from '../../../config/base';
import { test, expect } from '@playwright/test';
import { UniadminAccountUser } from '../../pageObject/account';
import { Enum_Case_Desp } from '../../pageObject/types';

const { baseURL } = getConfig();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL + '/accounts/logbook');
});

// test('demo', async ({ page }) => {
//   const account = new UniadminAccountUser(page);
//   await account.getStarted();
// });

test.describe(Enum_Case_Desp.TC_0001, () => {
  test('点击新增，展示新增弹窗', async ({ page }) => {
    const {
      locators: { addAccountBtn, addFormEle },
    } = new UniadminAccountUser(page);
    try {
      await addAccountBtn.click();
      await expect(addFormEle).toBeVisible();
    } catch (e) {
      console.log(e);
    }
  });
});
