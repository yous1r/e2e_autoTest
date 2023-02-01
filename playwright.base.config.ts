import path from 'path';
import { defineConfig, expect, PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => 'passed',
        pass: true,
      };
    } else {
      return {
        message: () => 'failed',
        pass: false,
      };
    }
  },
});
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const baseConfig: PlaywrightTestConfig = {
  // testDir: './tests',
  /* Maximum time one test can run for. */
  // timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 3 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
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
    actionTimeout: 3 * 1000,
    navigationTimeout: 5 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Login',
      testDir: path.join(__dirname, 'tests/login'),
      use: {
        channel: 'msedge',
        headless: true,
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/login',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};
export default defineConfig(baseConfig);
