import * as path from 'path';
import { Locator, Page } from '@playwright/test';
import { getConfig } from '../../../config/base';
import { NormalCaseKey, PageObjectModal } from '../../types';
import { Enum_Excel_Header, Enum_Selector_Type, getHandlerData, readWorkbookFromLocal } from '../../utils';
import { BasePage } from '../base';
import { Enum_CaseIds, Enum_SheetNames, Enum_TargetEle } from './types';

const { rootPATH } = getConfig();

type T_AccountUser = NormalCaseKey;

type T_CaseData = {
  [k in Pick<T_AccountUser, Enum_Excel_Header.TestCaseID> as string]: {
    [k in Pick<T_AccountUser, Enum_Excel_Header.TestProcessID> as string]: T_AccountUser;
  };
};

const rawData = readWorkbookFromLocal<T_AccountUser, Enum_SheetNames[number]>(
  path.join(rootPATH, 'data/testCase.xlsx'),
  Enum_SheetNames.UserAccount
);

// const currURL = caseData && caseData.length ? caseData[0].Page_URL : '';

export class UniadminAccountUser extends BasePage<T_AccountUser> implements PageObjectModal {
  page: Page;
  caseData: T_CaseData;
  locators!: { [k in Enum_TargetEle[number]]: Locator };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.__init();
  }

  __init() {
    this.caseData = getHandlerData<T_AccountUser>(rawData);

    this.initLocators();
  }

  initLocators() {
    this._getEle_AddAccountBtn();
    this._getEle_AddForm();
    this._getEle_InputName();
    this._getEle_InputPwd();
    this._getEle_InputPwd2();
    this._getEle_InputNameError();
    this._getEle_SubmitFormBtn();
    this._getEle_InputPwdError();
    this._getEle_InputPwd2Error();
  }

  async getStarted() {
    // await this.addUserClick();
  }

  _getEle_AddAccountBtn() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.AddAccountBtn,
      Enum_CaseIds.tc_0001$$ts_0001,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.SelectorInfo
    );
  }
  _getEle_AddForm() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.AddFormEle,
      Enum_CaseIds.tc_0001$$ts_0001,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
  _getEle_InputName() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputUserName,
      Enum_CaseIds.tc_0003$$ts_0001,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.SelectorInfo
    );
  }
  _getEle_InputPwd() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0003$$ts_0001,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.SelectorInfo
    );
  }
  _getEle_InputPwd2() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0003$$ts_0002,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.SelectorInfo
    );
  }
  _getEle_InputNameError() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0003$$ts_0001,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
  _getEle_SubmitFormBtn() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0002$$ts_0007,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.SelectorInfo
    );
  }
  _getEle_InputPwdError() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0003$$ts_0005,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
  _getEle_InputPwd2Error() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0003$$ts_0005,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
  _getEle_SelectionGroup() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0002$$ts_0005,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
  _getEle_SelectionBroker() {
    this.$$genLocator<Enum_TargetEle[number], Enum_CaseIds[number]>(
      Enum_TargetEle.InputPwd,
      Enum_CaseIds.tc_0002$$ts_0006,
      Enum_Selector_Type.XPATH,
      Enum_Excel_Header.ExpectSelectorInfo
    );
  }
}
