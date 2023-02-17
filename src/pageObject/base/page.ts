import { Locator, Page } from '@playwright/test';
import { NormalCaseKey } from '../../types';
// import { NormalCaseKey } from '../../types';
import { Enum_Excel_Header, Enum_Selector_Type } from '../../utils';

export abstract class BasePage<T extends NormalCaseKey> {
  page: Page;
  locators: { [k in string]: Locator };
  caseData: {
    [k in Pick<T, 'TestCase_ID'> as string]: {
      [k in Pick<T, 'TestProcess_ID'> as string]: NormalCaseKey;
    };
  };
  caseIdList: string[];
  constructor(page: Page) {
    this.page = page;
  }

  /**
   *
   * @param type 选择器类型，目前仅支持xpath
   * @param selector 具体的选择器内容
   * @returns
   */
  protected $$getLocator(type: Enum_Selector_Type[number], selector: string): Locator {
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

  /**
   *
   * @param locatorName 对应的locator名称，用于检索元素，不能重复
   * @param caseId 在一个测试案例中对应的流程id，对应excel中的TestProcess_ID
   * @param selectorType 对应选择器的类型，从excel中获取，目前仅支持xpath
   * @param selectorInfo 对应的选择器，从excel中获取
   */
  protected $$genLocator<T, I extends string>(
    locatorName: T,
    caseId: I,
    selectorType: Enum_Selector_Type[number],
    selectorInfo: Enum_Excel_Header[number]
  ) {
    if (caseId.indexOf('$$') === -1) {
      throw new Error('please check the caseId, something wrong with it!!');
    }
    const caseIds = caseId.split('$$');
    this.locators = this.locators ?? {};
    this.locators[locatorName as string] = this.$$getLocator(
      selectorType,
      this.caseData[caseIds[0]][caseIds[1]][selectorInfo]
    );
    // }
  }
}
