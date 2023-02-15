import { Locator, Page } from '@playwright/test';
import { NormalCaseKey } from '../../types';
import { Selector_Type } from '../../utils';

export abstract class BasePage {
  page: Page;
  pageTitle: string;
  caseData: Record<string, unknown>;
  constructor(page: Page) {
    this.page = page;
  }

  getLocator(type: Selector_Type, selector: string): Locator {
    let locator!: Locator;
    if (!selector) {
      throw new Error('the Selector_Info is empty, please check!!');
    }
    switch (type) {
      case 'label':
        locator = this.page.getByLabel(selector);
        break;
      case 'xpath':
        locator = this.page.locator(selector);
        break;
      default:
    }
    return locator;
  }
}
