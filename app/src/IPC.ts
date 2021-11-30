/*
 * @Author: 尹成诺
 * @Date: 2021-11-24 19:57:29
 * @LastEditTime: 2021-11-30 14:45:13
 * @LastEditors: Please set LastEditors
 * @Description: IPC 通信 channel 表
 * @FilePath: /yapiresponsetransformtotypescriptinterface/app/src/IPC.ts
 */

export default {
  // 开始检查更新
  UPDATA_CHECKING: 'UPDATA_CHECKING',
  // 检查更新出错
  UPDATA_ERROR: 'UPDATA_ERROR',
  // 检查到新版本
  UPDATA_AVAILABLE: 'UPDATA_AVAILABLE',
  // 已经是新版本
  UPDATA_NOT_AVAILABLE: 'UPDATA_NOT_AVAILABLE',
  // 更新下载中
  UPDATA_DOWNLOAD_PROGRESS: 'UPDATA_DOWNLOAD_PROGRESS',
  // 更新下载完毕
  UPDATA_DOWNLOADED: 'UPDATA_DOWNLOADED',
  // 立即更新
  UPDATA_QUITANDINSTALL: 'UPDATA_QUITANDINSTALL',
  // 获取打印机列表
  GOT_PRINTER_LIST: 'GOT_PRINTER_LIST'
}
