import { test, expect } from '@playwright/test';
import { getConfig } from '../config/base';

const { baseURL } = getConfig();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test.describe('登录页', () => {
  test('检查登录页是否正常跳转', async ({ page }) => {
    const response = await page.request.get(baseURL + '/accounts/login');
    await expect(response).toBeOK();
  });
  test('检查登录页title是否为登录页', async ({ page }) => {
    await expect(page).toHaveTitle(/^登录页$/);
  });

  test('用户名密码都为空，预期展示报错信息', async ({ page }) => {
    const submit = page.getByRole('button', { name: '登录' });

    await submit.click({ timeout: 3000 });

    const error_username = page.locator('#loginForm > div:nth-child(3) > span');
    const error_password = page.locator('#loginForm > div:nth-child(4) > span');

    await expect(error_username, '用户名为空提示错误').toBeVisible();

    await expect(error_password, '用户名为空提示错误').toBeVisible();

    await expect(error_username).toContainText(/^This field is required.$/);

    await expect(error_password).toContainText(/^This field is required.$/);
  });

  test('用户名为空，预期展示报错信息：用户名不能为空', async ({ page }) => {
    await page.getByPlaceholder('密码').fill('1');

    const submit = page.getByRole('button', { name: '登录' });

    await submit.click();

    await page.evaluate(async () => {
      console.log(this);

      // const err = await page.locator('#loginForm > div:nth-child(4) > span');
      // console.log(err); // Issue console.log inside the page
    });
    await page.pause();

    const error_username = page.locator('#loginForm > div:nth-child(3) > span');

    await expect(error_username).toContainText(/^This field is required.$/);
  });

  test('密码为空，预期展示报错信息：密码不能为空', async ({ page }) => {
    await page.getByPlaceholder('用户名').fill('admin');

    const submit = page.getByRole('button', { name: '登录' });

    await submit.click();

    const error_password = page.locator('#loginForm > div:nth-child(4) > span');

    await expect(error_password).toContainText(/^This field is required.$/);
  });

  test('用户名与密码不匹配，预期展示登录错误', async ({ page }) => {
    await page.getByPlaceholder('用户名').fill('admin');

    const submit = page.getByRole('button', { name: '登录' });

    await submit.click();

    const error_alert = page.locator(
      'body > div > div.login > div.alert.alert-danger'
    );

    await expect(error_alert).toContainText('登录失败，请重试.');
  });

  test('预期登录成功，并能退出登录', async ({ page }) => {
    await page.getByPlaceholder('用户名').fill('admin');
    await page.getByPlaceholder('密码').fill('1');

    const submit = page.getByRole('button', { name: '登录' });

    await submit.click();

    await expect(page).toHaveURL(/dashboard/);

    await page.pause();

    // const user_ele = page.locator('#dropdown-user');

    // await user_ele.hover();

    // await expect(user_ele).toHaveClass(/open/);

    // await page
    //   .locator('#dropdown-user > div > div.pad-all.text-right > a')
    //   .click();

    // await expect(page).toHaveURL(/accounts\/login/);
  });
});
