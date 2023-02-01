import path from 'path';
import { defineConfig, expect, PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { baseConfig as commonConfig } from './playwright.base.config';

console.log(path.join(__dirname, 'tests-examples'), 'filefile!!!');

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

const config = Object.assign(commonConfig, {
  reporter: [['html', { outputFolder: './report/test', open: 'never' }]], //测试报告
  // globalSetup: require.resolve('./global-setup'),
  projects: [
    {
      name: 'other',
      testDir: path.join(__dirname, 'tests-examples'),
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'pom',
      testDir: path.join(__dirname, 'tests-examples'),
      use: {
        channel: 'msedge',
        headless: true,
      },
    },
  ],
} as PlaywrightTestConfig);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config);
