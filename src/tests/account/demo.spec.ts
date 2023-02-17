import path from 'path';
import * as debug from 'debug';
import * as fs from 'fs';
import { test as base } from '@playwright/test';
// import { getConfig } from '../../../config/base';
// import { readWorkbookFromLocal } from '../../utils/excel';

// const { rootPATH } = getConfig();

// const testCaseData = readWorkbookFromLocal(path.join(rootPATH, 'data/testCase'), );

// Note how we mark the fixture as { auto: true }.
// This way it is always instantiated, even if the test does not use it explicitly.
// export const test = base.extend<{ saveLogs: void }>({
//   saveLogs: [
//     // eslint-disable-next-line no-empty-pattern
//     async ({}, use, testInfo) => {
//       const logs: string[] = [];
//       debug.log = (...args) => logs.push(args.map(String).join(''));
//       debug.enable('mycomponent');

//       await use();

//       if (testInfo.status !== testInfo.expectedStatus)
//         fs.writeFileSync(
//           testInfo.outputPath(path.join(rootPATH, 'logs'), 'logs.txt'),
//           logs.join('\n'),
//           'utf8'
//         );
//     },
//     { auto: true },
//   ],
// });

export type TestOptions = {
  version: string;
  backendURL: string;
  saveLogs: void;
};

export const test = base.extend<TestOptions>({
  // Default value for the version.
  version: '1.0',

  // // Use version when starting the backend.
  // backendURL: async ({ version }, use) => {
  //   const app = await startBackend(version);
  //   await use(app.baseUrl());
  //   await app.close();
  // },
  saveLogs: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use, testInfo) => {
      const logs: string[] = [];
      debug.log = (...args) => logs.push(args.map(String).join(''));
      debug.enable('mycomponent');

      await use();

      console.log(testInfo.status, testInfo.expectedStatus);

      if (testInfo.status !== testInfo.expectedStatus)
        fs.writeFileSync(
          testInfo.outputPath(path.join(__dirname, 'logs'), 'logs.txt'),
          logs.join('\n'),
          'utf8'
        );
    },
    { auto: true },
  ],
});
