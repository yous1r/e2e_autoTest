import * as os from 'os';
import * as path from 'path';
import { readFile } from 'xlsx';
// import * as dotenv from 'dotenv';
import isDocker from 'is-docker';
import { readWorkbookFromLocal } from '../src/utils/excel/excel';
import { BooleanMap } from '../src/types/global';

// dotenv.config();

process.env.OS = judgeSystem()?.os;
process.env.CI = (isDocker() ? 1 : 0).toString(10) as BooleanMap;

/** * 判断操作系统决定lanuch条件 * @returns */
export function judgeSystem() {
  const osType = os.type();
  if (osType === 'Darwin') {
    /**macOS系统下测试浏览器的配置 */
    return {
      os: 'Mac',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', //浏览器地址 };
    };
  }
  if (osType === 'Linux') {
    return {
      os: 'Linux',
    };
    /**Linux系统下测试浏览器的配置 */
    // return {  devtools: true  }
  }
  if (osType === 'Windows_NT') {
    /**windows系统下测试浏览器的配置 */
    // return {  devtools: true  }
    return {
      os: 'Windows',
    };
  }
}

const baseURL = 'http://10.2.72.1' as const;
// const baseURL = 'http://127.0.0.1:8000' as const;
const rootPATH = path.join(__dirname, '..');
const testDir = path.join(rootPATH, 'src/tests/');
const sessionDataDir = path.resolve(path.join(rootPATH, 'data/context/session.json'));

class Config {
  readonly rootPATH = rootPATH;
  readonly testDir = testDir;
  readonly baseURL = baseURL;
  readonly env = process.env;
  readonly context = {
    sessionDataDir,
  } as const;
}

const ctx = new Config();

export default ctx;

export function getConfig() {
  return ctx;
}

// const test = getConfig();
