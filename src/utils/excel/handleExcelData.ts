import { assign, map } from 'lodash';
import { NormalCaseKey } from '../../types';
import { Enum_Excel_Header } from '../selector';

export function getHandlerData<T extends NormalCaseKey>(
  data: T[]
): {
  [k in Pick<T, Enum_Excel_Header.TestCaseID> as string]: {
    [k in Pick<T, Enum_Excel_Header.TestProcessID> as string]: T;
  };
} {
  const caseData: {
    [k in Pick<T, Enum_Excel_Header.TestCaseID> as string]: {
      [k in Pick<T, Enum_Excel_Header.TestProcessID> as string]: T;
    };
  } = {};
  let prevCaseId = '';
  let caseTestId = '';
  let caseProcessId = '';
  map(data, (item) => {
    // 如果是合并单元格就拿上次保存的TC_ID
    if (item.TestCase_ID) {
      prevCaseId = item.TestCase_ID.toLowerCase();
    }
    caseProcessId = item.TestProcess_ID.toLowerCase();
    item.TestCase_ID ? (caseTestId = item.TestCase_ID.toLowerCase()) : prevCaseId;
    caseData[caseTestId] = assign(caseData[caseTestId], {
      [caseProcessId]: { ...item },
    });
  });

  // console.log(caseData);

  return caseData;
}
