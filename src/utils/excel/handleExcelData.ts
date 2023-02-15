import { map } from 'lodash';
import { NormalCaseKey } from '../../types';

export function getHandlerData<T extends NormalCaseKey>(data: T[]) {
  const caseId: Record<string, T> = {};
  map(data, (item) => {
    map(Object.entries(item), (itemPair) => {
      if (itemPair) {
        caseId[[item.TestCase_ID, item.TestProcess_ID].join('_')] = { ...item };
      }
    });
  });
  return caseId;
}
