import { test, expect } from '@playwright/test';

test.beforeEach(({ page }) => {
  page.goto('http://10.2.72.1/accounts/users/');
});
test.describe('', () => {
  test('添加用户', async ({ page }) => {
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.waitForLoadState('networkidle'),
      page.waitForTimeout(3 * 1000),
    ]);
    await page.getByRole('button', { name: ' 新增' }).click();
    await page.getByLabel('用户名*').fill('auto_test');
    await page.getByLabel('密码*').fill('1');
    await page.getByLabel('密码确认*').fill('1');
    await page.getByRole('listbox', { name: '用户组' }).selectOption('1');
    await page.getByRole('combobox', { name: '经纪公司*' }).selectOption('2');
    await page.getByRole('button', { name: '确定添加' }).click();

    await expect(page.getByRole('gridcell', { name: 'auto_test' })).toBeVisible();
  });

  test('修改用户名', async ({ page }) => {
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.waitForLoadState('networkidle'),
      page.waitForTimeout(3 * 1000),
    ]);
    await page
      .getByRole('row', { name: 'auto_test python3 超级管理员 修改 删除 查看权限' })
      .getByRole('button', { name: '修改' })
      .click();

    // 清除输入框内容
    await page.getByLabel('用户名*').clear();
    await page.getByLabel('用户名*').fill('haha');
    await page.getByRole('button', { name: '确定修改' }).click();

    await expect(page.getByRole('gridcell', { name: 'auto_test' })).toBeHidden();
    await expect(page.getByRole('gridcell', { name: 'haha' })).toBeVisible();
  });

  test('删除用户', async ({ page }) => {
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.waitForLoadState('networkidle'),
      page.waitForTimeout(3 * 1000),
    ]);
    await page
      .getByRole('row', { name: 'haha python3 超级管理员 修改 删除 查看权限' })
      .getByRole('button', { name: '删除' })
      .click();
    await page.getByText('确认', { exact: true }).click();

    await expect(page.getByRole('gridcell', { name: 'haha' })).toBeHidden();
  });
});
