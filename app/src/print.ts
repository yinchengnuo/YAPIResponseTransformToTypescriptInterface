import IPC from './IPC'
import { BrowserWindow } from 'electron'

/**
 * @description: 初始化打印机相关
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // 实时更新打印机列表
  setInterval(() => {
    window.webContents.send(IPC.GOT_PRINTER_LIST, window.webContents.getPrinters())
  }, 1000)
}
