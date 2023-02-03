import * as path from 'path';
import * as fs from 'fs';
import { readFile, writeFileAsync, utils as XL_utils, writeFile } from 'xlsx';
import { getConfig } from '../../config/base';

const { rootPATH } = getConfig();

/**
 *
 * @param file 文件路径
 * @param sheetName 工作簿名称
 * @param range 区间
 * @param callback 回调函数
 */
export function readWorkbookFromLocal(
  file: string,
  sheetName: string,
  range?: string,
  callback: null | (() => void) = null
) {
  // console.log(file);

  const wb = readFile(file, { type: 'file' });
  // console.log(wb);
  const sheet = wb.Sheets[sheetName];
  // console.log(XL_utils.sheet_to_json(sheet));

  const ddd = [
    {
      TestCase_ID: 'TC_0001',
      TestCase_Desp: '新增账号',
      TestProcess_ID: 'TS_0001',
      Test_Desp: '点击新增，弹出新增表单',
      Page_URL: '/account/user',
      Selector_Type: 'xpath',
      Selector_Info: '//*[@id="addUserBtn"]',
      Action_Type: 'click',
      Check_Type: '点击',
      Expect: '显示弹窗',
    },
  ];

  if (typeof range === 'string') {
    const range_area = XL_utils.decode_range(range);

    //循环获取单元格值

    const row_list: unknown[] = [];
    for (let R = range_area.s.r; R <= range_area.e.r; ++R) {
      const rowData = {};
      // let row_value = '';
      for (let C = range_area.s.c; C <= range_area.e.c; ++C) {
        const header_cell = XL_utils.encode_cell({ c: C, r: 0 });
        // console.log(sheet[header_cell].v);

        const cell_address = { c: C, r: R }; //获取单元格地址

        const cell = XL_utils.encode_cell(cell_address); //根据单元格地址获取单元格
        //获取单元格值

        // if (sheet[cell]) {
        //   // 如果出现乱码可以使用iconv-lite进行转码
        //   // row_value += iconv.decode(sheet1[cell].v, 'gbk') + ", ";
        //   console.log(sheet[cell]);
        //   rowData[sheet[header_cell]] = sheet[cell];

        //   // row_value += sheet[cell].v + ', ';
        // } else {
        //   row_value += ', ';
        // }

        // if (sheet[cell]) {
        // 如果出现乱码可以使用iconv-lite进行转码
        // row_value += iconv.decode(sheet1[cell].v, 'gbk') + ", ";
        console.log(sheet[cell]);
        sheet[cell]
          ? (rowData[sheet[header_cell]] = sheet[cell])
          : (rowData[sheet[header_cell]] = '');
      }
      // row_list.push(row_value.slice(0, row_value.length - 2));
    }
    console.log(row_list);

    return row_list;
  }
  if (typeof callback === 'function') {
    callback();
  }

  return XL_utils.sheet_to_json(sheet);
}

// readWorkbookFromLocal(
//   path.join(rootPATH, 'data/Presidents.xlsx'),
//   'Dates',
//   'A2:B6'
// );

// readWorkbookFromLocal(
//   path.join(rootPATH, 'data/Presidents.xlsx'),
//   '一',
//   'A2:B6'
// );

/**
 *
 * @param data 需写入的数据
 * @param fileName 文件名
 * @param sheetName 工作表名
 * @param roll
 */
export function generateWorkBookByAtoA<T extends unknown[][]>(
  data: T,
  fileName: string,
  sheetName: string,
  roll?: boolean
) {
  const wb = XL_utils.book_new();

  const sheet = XL_utils.aoa_to_sheet(data);
  XL_utils.book_append_sheet(wb, sheet, sheetName, roll);

  writeFile(wb, fileName);
}

const demo_data = [
  [
    'TestCase_ID',
    'TestCase_Desp',
    'TestProcess_ID',
    'Test_Desp',
    'Selector_Type',
    'Selector_Info',
    'Action_Type',
    'Test_Data',
    'Check_Type',
    'Expect',
    'Test_Result',
  ],
];

// generateWorkBookByAtoA(
//   demo_data,
//   path.join(rootPATH, 'data/test.xlsx'),
//   'name'
// );

/**
 *
 * @param data 需写入的数据
 * @param sheetName 工作表名
 * @param fileName 文件名
 * @param roll
 */
export function generateWorkBookByJson(
  filePath: string,
  sheetName: string,
  fileName?: string,
  roll?: boolean
) {
  fs.readFile(
    path.join(rootPATH, filePath),
    {
      encoding: 'utf-8',
    },
    (err, data) => {
      if (err) throw err;
      const wb = XL_utils.book_new();

      const sheet = XL_utils.json_to_sheet(JSON.parse(data));

      XL_utils.book_append_sheet(wb, sheet, sheetName, roll);

      const file_arr = filePath.split('/');
      const wbName = (fileName ??
        file_arr[file_arr.length - 1].split('.')[0] + '.xlsx') as string;

      writeFile(wb, `data/${wbName}`);
    }
  );
}

// generateWorkBookByJson('data/json/demo.json', 'name');
