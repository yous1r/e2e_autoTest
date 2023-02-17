import { Locator } from '@playwright/test';

// TODO 提取表单抽象类，供page实现
export abstract class BaseForm {
  formInstance: Locator;
  formTitleEle: Locator;
}
