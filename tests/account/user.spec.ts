import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/base';

const { baseURL } = getConfig();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL + '/account/users');
});

test.describe('登录页', () => {
  test('', async ({ page }) => {
    await page.getByLabel('用户名*').click();
    await page.getByLabel('用户名*').fill('task');
    await page.getByLabel('密码*').click();
    await page.getByLabel('密码*').fill('1111');
    await page.getByLabel('密码确认*').click();
    await page.getByLabel('密码确认*').fill('1111');
    await page.getByRole('listbox', { name: '用户组' }).selectOption('1');
    await page.getByRole('combobox', { name: '经纪公司*' }).selectOption('2');
    await page.getByLabel('姓名').click();
    await page.getByLabel('姓名').fill('ddd');
  });
});
