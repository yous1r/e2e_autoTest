import * as path from 'path';
import { Locator, Page } from '@playwright/test';
import { getConfig } from '../../../config/base';
import { NormalCaseKey } from '../../types';
import { getHandlerData, readWorkbookFromLocal } from '../../utils';
import { BaseForm, BasePage } from '../base';

const { rootPATH } = getConfig();

type T_AccountUser = NormalCaseKey;

const caseData = readWorkbookFromLocal<T_AccountUser>(
  path.join(rootPATH, 'data/testCase.xlsx'),
  '账号管理'
);

// const currURL = caseData && caseData.length ? caseData[0].Page_URL : '';

export class UniadminAccountUser extends BasePage {
  page: Page;
  caseData: Record<string, T_AccountUser>;
  formInstance: Locator;
  formTitle: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    // this.caseData = handledData;
    this._init();
  }

  private _init() {
    this.caseData = getHandlerData<T_AccountUser>(caseData);
  }

  async getStarted() {
    // await this.addUserClick();
  }

  async addUserClick() {
    const { Selector_Info, Expect_Selector_Info } =
      this.caseData['TC_0001_TS_0001'];
    this.formInstance = this.getLocator('xpath', Expect_Selector_Info);
    const addBtn = this.getLocator('xpath', Selector_Info);
    await addBtn.click();
  }

  async getFormTitle() {
    const { Selector_Info } = this.caseData['TC_0001_TS_0002'];
    const formTitleEle = this.getLocator('xpath', Selector_Info);
    this.formTitle = await formTitleEle.innerText();
  }
}
