import { chromium, FullConfig } from '@playwright/test';
import { getConfig } from './base';

async function globalSetup(config: FullConfig) {
  //   process.env.FOO = 'some data';
  /**
   * Or a more complicated data structure as JSON:
   *
   */
  //   process.env.BAR = JSON.stringify({ some: 'data' });
  const { storageState } = config.projects[0].use;
  const { baseURL } = getConfig();
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    console.log('baseURL: >>> ', baseURL);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await page.goto(baseURL!);
    await page.getByPlaceholder('用户名').fill('admin');
    await page.getByPlaceholder('密码').fill('1');
    await page.getByRole('button', { name: '登录' }).click();
    await context.storageState({ path: storageState as string });
    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;
