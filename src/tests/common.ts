import { expect, test } from '@playwright/test';
import { chromium } from 'playwright';
import { TestOperationPanel } from './TestOperationPanel';
import { judgeSystem } from './config';
let testOperation: TestOperationPanel, browser, page, context;
/**测试用例组**/
test.describe('Playright-demo', async function () {
  /**运行所有测试用例前的函数**/
  test.beforeAll(async ({ browserName }, testConfig) => {
    /**判断系统类型配置**/
    const launch = await judgeSystem();

    /**创建浏览器**/
    browser = await chromium.launch(launch);

    /**创建窗口**/
    context = await browser.newContext();

    /**创建界面**/
    page = await context.newPage();

    /**创建UI交互配置代码实例**/
    testOperation = new TestOperationPanel(page);
  });
  /**运行每个测试用例前的函数**/
  test.beforeEach(async function () {
    /**跳转地址**/
    await testOperation.goTestUrl('http://www.baidu.com');
  });
  /**测试用例**/
  test('搜索Playwright', async function () {
    /**搜索指定内容**/
    const result = await testOperation.searchContent('playwright');
    /**断言校验匹配的内容**/
    expect(result).toMatch(/^playwright/);
  });
  /**运行所有测试用例后的函数**/
  test.afterAll(async function ({ browser }) {
    /**关闭浏览器**/
    await browser.close();
  });
});
