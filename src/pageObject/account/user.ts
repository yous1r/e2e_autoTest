import * as path from 'path';
import { expect, Locator, Page } from '@playwright/test';
import { readWorkbookFromLocal } from '../../utils/excel';
import { getConfig } from '../../../config/base';

const { rootPATH } = getConfig();

const data = readWorkbookFromLocal(
  path.join(rootPATH, 'data/testCase.xlsx'),
  '账号管理',
  'A1:L9'
);

// console.log(data);

export class UniadminAccountUser {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    // await this.getStartedLink.first().click();
  }

  async pageObjectModel() {
    await this.getStarted();
  }
}
