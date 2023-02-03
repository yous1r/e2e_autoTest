import * as os from 'os';
import * as path from 'path';

/** * 判断操作系统决定lanuch条件 * @returns */
export function judgeSystem() {
  const osType = os.type();
  if (osType === 'Darwin') {
    /**macOS系统下测试浏览器的配置 */
    return {
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', //浏览器地址 };
    };
    if (osType === 'Linux') {
      /**Linux系统下测试浏览器的配置 */
      // return {  devtools: true  }
    }
    if (osType === 'Windows_NT') {
      /**windows系统下测试浏览器的配置 */
      // return {  devtools: true  }
    }
  }
}

const baseURL = 'http://10.2.69.242' as const;

class Config {
  readonly rootPATH = path.join(__dirname, '..');
  readonly baseURL = baseURL;
  context = { fileName: { sheetNames: [] } };
}

export function getConfig() {
  return new Config();
}
