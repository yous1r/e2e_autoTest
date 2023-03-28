import { getConfig } from '../../../config/base';
import { test, expect } from '@playwright/test';
import { UniadminAccountUser } from '../../pageObject/account';
import { Enum_Case_Desp } from '../../pageObject/types';

const { baseURL } = getConfig();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL + '/accounts/users');
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

test.describe('用户名不合规', () => {
  test('用户名为空', async ({ page }) => {
    const {
      locators: { addAccountBtn, inputUserNameEle },
    } = new UniadminAccountUser(page);
    try {
      await addAccountBtn.click();
      await inputUserNameEle.clear();
      // await
    } catch (e) {
      console.log(e);
    }
  });
  test('用户名不符合校验规则', async ({ page }) => {
    const {
      locators: { addAccountBtn, inputUserNameEle },
    } = new UniadminAccountUser(page);
    await addAccountBtn.click();
    await inputUserNameEle.fill('$$test');
    // await expect(formTitleEle.innerText()).toContain('账号管理');
  });
  test('用户名超出长度', async ({ page }) => {
    const {
      locators: { addAccountBtn, inputUserNameEle },
    } = new UniadminAccountUser(page);
    await addAccountBtn.click();
    let count = 0;
    let testData = '1';
    while (count < 150) {
      count += 1;
      testData += '1';
    }
    console.log(testData.length);

    // await inputUserNameEle.fill(
    //   '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111112'
    // );
    await inputUserNameEle.fill(testData);
    // await expect(formTitleEle.innerText()).toContain('账号管理');
  });
});

test.describe('账户管理', () => {
  test('新增用户', async ({ page }) => {
    const { locators } = new UniadminAccountUser(page);
  });
});
