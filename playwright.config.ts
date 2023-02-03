import { defineConfig, expect, PlaywrightTestConfig } from '@playwright/test';
import path from 'path';
import { getConfig } from './config/base';

console.log('dddd @playwright/test');

const { rootPATH } = getConfig();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const baseConfig: PlaywrightTestConfig = {
  testDir: path.join(rootPATH, 'tests'),
  /* Maximum time one test can run for. */
  // timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: process.env.CI ? true : false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'dot',
  // reporter: [['html', { outputFolder: './report/login', open: 'never' }]], //测试报告
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    colorScheme: 'dark',
    launchOptions: {
      headless: true,
      slowMo: 50,
      timeout: 60 * 1000,
    },
    // baseURL: 'http://10.2.69.242/',
    // storageState: './data/state.json',
    // contextOptions: {
    //   viewport: {
    //     width: 1400,
    //     height: 900,
    //   },
    // },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5 * 1000,
    navigationTimeout: 10 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};
export default defineConfig(baseConfig);
