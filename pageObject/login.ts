//UI交互层代码
import { Page } from '@playwright/test';

export class TestLoginView {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  /** * 加载测试的网址 */
  goTestUrl = async (url: string) => {
    /**跳转地址**/
    await this.page.goto(url);
    /**等待页面加载**/
    await this.page.waitForLoadState();
  };
  /** * 搜索指定内容 */
  searchContent = async (param) => {
    /**在输入框中填充搜索字段**/
    await this.page.locator('.s_ipt').fill(param);
    /**在输入框中回车触发搜索**/
    await this.page.locator('.s_ipt').press('Enter');
    /**等待页面加载**/
    await this.page.waitForLoadState();
    /**返回搜索内容第一项的内容**/
    const result = await this.page
      .locator('//div[@id="1"]/h3//em')
      .textContent();
    return result;
  };

  getElement = (selector: string) => {
    return this.page.locator(selector);
  };

  isHaveElement = (selector: string) => {
    return this.page.locator(selector);
  };
}
