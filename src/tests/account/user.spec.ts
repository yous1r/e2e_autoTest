import { getConfig } from '../../../config/base';
import { test, expect } from '@playwright/test';
import { UniadminAccountUser } from '../../pageObject/account';
import path from 'path';

const { rootPATH, baseURL, getTestCaseData } = getConfig();

getTestCaseData(path.join(rootPATH, 'data/testCase.xlsx'));

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL + '/accounts/users');
});

// test('demo', async ({ page }) => {
//   const account = new UniadminAccountUser(page);
//   await account.getStarted();
// });

test.describe('账户管理', () => {
  test('点击新增，展示新增弹窗', async ({ page }) => {
    const account = new UniadminAccountUser(page);
    await account.addUserClick();
    await expect(account.formInstance).toBeVisible();
  });
  test('表单标题', async ({ page }) => {
    const account = new UniadminAccountUser(page);
    console.log(account);

    await expect(account.formTitle).toContain('账号管理');
  });
});
