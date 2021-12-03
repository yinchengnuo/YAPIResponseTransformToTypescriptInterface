import IPC from './IPC'
import { BrowserWindow, ipcMain } from 'electron'

/**
 * @description: 初始化打印机相关
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // 获取打印机列表
  ipcMain.handle(IPC.GET_PRINTER_LIST, () => {
    return window.webContents.getPrinters()
  })
}
