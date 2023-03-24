import path from 'path';
import { defineConfig, expect, PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { getConfig } from './config/base';
import baseConfig from './playwright.config';

const { rootPATH, testDir, context: Ctx } = getConfig();

const { sessionDataDir } = Ctx;

// expect.extend({
//   toBeWithinRange(received: number, floor: number, ceiling: number) {
//     const pass = received >= floor && received <= ceiling;
//     if (pass) {
//       return {
//         message: () => 'passed !!!!',
//         pass: true,
//       };
//     } else {
//       return {
//         message: () => 'failed !!!',
//         pass: false,
//       };
//     }
//   },
// });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...baseConfig,
  // reporter: process.env.CI
  //   ? [['html', { outputFolder: './report/others', open: 'never' }]]
  //   : 'line', //测试报告
  reporter: [['html', { outputFolder: './report/others', open: 'always', host: '0.0.0.0', port: '22222' }]],
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
      name: 'pom',
      testDir: path.join(rootPATH, 'tests-examples'),
      use: {
        channel: 'msedge',
        headless: true,
      },
    },
    {
      name: 'test',
      testDir,
      testMatch: 'account/user.spec.ts',
      use: {
        ...devices['Desktop chrome'],
        headless: true,
        storageState: sessionDataDir,
      },
    },
  ],
});
