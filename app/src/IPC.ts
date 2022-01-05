/*
 * @Author: 尹成诺
 * @Date: 2021-11-24 19:57:29
 * @LastEditTime: 2022-01-05 19:52:25
 * @LastEditors: Please set LastEditors
 * @Description: IPC 通信 channel 表
 * @FilePath: /yapiresponsetransformtotypescriptinterface/app/src/IPC.ts
 */

export default {
  // 点击关闭应用
  CLOSE_APP: 'CLOSE_APP',
  // 确认关闭应用
  DO_CLOSE_APP: 'DO_CLOSE_APP',
  // 开始检查更新
  CHECK_UPDATA: 'UPDATA_CHECKING',
  // 正在检查更新
  UPDATA_CHECKING: 'UPDATA_CHECKING',
  // 检查更新出错
  UPDATA_ERROR: 'UPDATA_ERROR',
  // 检查到新版本
  UPDATA_AVAILABLE: 'UPDATA_AVAILABLE',
  // 已经是新版本
  UPDATA_NOT_AVAILABLE: 'UPDATA_NOT_AVAILABLE',
  // 更新下载完毕
  UPDATA_DOWNLOADED: 'UPDATA_DOWNLOADED',
  // 更新下载完毕但用户取消安装
  UPDATA_DOWNLOADED_NOT_INSTALLED: 'UPDATA_DOWNLOADED_NOT_INSTALLED',
  // 更新下载完毕但用户取消安装后关闭强制更新
  UPDATA_DOWNLOADED_QUIT_INSTALL: 'UPDATA_DOWNLOADED_QUIT_INSTALL',
  // 立即更新
  UPDATA_QUITANDINSTALL: 'UPDATA_QUITANDINSTALL',
  // 获取打印机列表
  GET_PRINTER_LIST: 'GET_PRINTER_LIST',
  // 获取串口列表
  GET_PORT_LIST: 'GET_PORT_LIST',
  // 打开串口
  OPEN_PORT: 'OPEN_PORT',
  // 关闭串口
  CLOSE_PORT: 'CLOSE_PORT',
  // 向串口发送数据
  SEND_DATA_TO_PORT: 'SEND_DATA_TO_PORT',
  // 从串口接受数据
  ACCEPT_DATA_FROM_PORT: 'ACCEPT_DATA_FROM_PORT'
}
