import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.goto('http://10.2.72.1/accounts/groups/');
});

test.describe('', () => {
  test('', async ({ page }) => {
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.waitForLoadState('networkidle'),
      page.waitForTimeout(3 * 1000),
    ]);
    await page.getByRole('button', { name: ' 新增' }).click();
    await page.getByLabel('用户组名称：').fill('test');
    await page.locator('#groupPermsTree_1_check').click();
    await page.locator('#groupPermsTree_20_check').click();
    await page.locator('#groupPermsTree_23_check').click();
    await page.locator('#groupPermsTree_27_check').click();
    await page
      .getByText(
        '权限列表： 经纪公司与系统账户管理交易日历管理运维流程管理网站系统管理认证和授权应用版本管理操作流程模板'
      )
      .click();
    await page.locator('#groupPermsTree_41_check').click();
    await page.getByRole('button', { name: '确定添加' }).click();

    await expect(await page.getByRole('cell', { name: 'test' })).toBeVisible();
  });
});
