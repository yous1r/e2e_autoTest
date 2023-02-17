import * as path from 'path';
import * as fs from 'fs';
import { readFile, utils as XL_utils, writeFile } from 'xlsx';
import { getConfig } from '../../../config/base';

const { rootPATH } = getConfig();

/**
 *
 * @param file 文件路径
 * @param sheetName 工作簿名称
 * @param range 区间
 * @param callback 回调函数
 */
export function readWorkbookFromLocal<T, S extends string>(
  file: string,
  sheetName: S,
  range?: string,
  callback: null | (() => void) = null
): T[] {
  // console.log(file);

  const wb = readFile(file.trim(), { type: 'file' });
  // console.log('workBook', wb);
  const sheet = wb.Sheets[sheetName];
  // console.log(XL_utils.sheet_to_json(sheet));

  //TODO 指定单元格数据
  if (
    typeof range === 'string' &&
    range.indexOf(':') !== -1 &&
    range.split(':').length === 2
  ) {
    const range_area = XL_utils.decode_range(range.trim());

    //循环获取单元格值

    const row_list: T[] = [];
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
        // console.log(sheet[cell]);
        sheet[cell]
          ? (rowData[sheet[header_cell]] = sheet[cell])
          : (rowData[sheet[header_cell]] = '');
      }
      // row_list.push(row_value.slice(0, row_value.length - 2));
    }
    // console.log(row_list);

    return row_list;
  }
  if (typeof callback === 'function') {
    callback();
  }

  return XL_utils.sheet_to_json(sheet);
}

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
