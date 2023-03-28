import path from 'path';
import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { getConfig } from './config/base';
import baseConfig from './playwright.config';

const { rootPATH } = getConfig();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...baseConfig,
  // reporter: process.env.CI
  //   ? [['html', { outputFolder: './report/others', open: 'never' }]]
  //   : 'line', //测试报告
  reporter: [['html', { outputFolder: './report/others', open: 'never', host: 'localhost', port: '22222' }]],
  globalSetup: require.resolve(path.join(rootPATH, 'config/global-setup.ts')),
  projects: [
    {
      name: 'others',
      testMatch: '**/*.spec.ts',
      testIgnore: ['login/*.spec.ts', 'demo/*.spec.ts'],
      use: {
        ...devices['Desktop chrome'],
        headless: true,
        storageState: path.join(rootPATH, 'data/context/session.json'),
      },
    },
    {
      name: 'test',
      testMatch: ['account/account.spec.ts', 'account/group.spec.ts'],
      // testIgnore: ['login/*.spec.ts', 'demo/*.spec.ts'],
      use: {
        channel: 'msedge',
        headless: false,
        storageState: path.join(rootPATH, 'data/context/session.json'),
      },
    },
    {
      name: 'pom',
      testDir: path.join(rootPATH, 'tests-examples'),
      use: {
        channel: 'msedge',
        headless: true,
      },
    },
    // {
    //   name: 'test',
    //   testDir,
    //   testMatch: 'account/user.spec.ts',
    //   use: {
    //     ...devices['Desktop chrome'],
    //     headless: true,
    //     storageState: sessionDataDir,
    //   },
    // },
  ],
});
