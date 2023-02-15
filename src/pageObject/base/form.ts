import { Locator } from '@playwright/test';

export abstract class BaseForm {
  formTitle: string;
  formInstance: Locator;
}
