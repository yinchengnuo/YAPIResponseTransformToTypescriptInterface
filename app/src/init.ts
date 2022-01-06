import { app, BrowserWindow, ipcMain } from 'electron'
import IPC from './IPC'
import { UPDATA_DOWNLOADED_NOT_INSTALLED } from './updata'

/**
 * @description: 初始化 window
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // 关闭提示
  window.on('close', (e) => {
    window.webContents.send(IPC.CLOSE_APP)
    e.preventDefault()
  })
  // 确认关闭
  ipcMain.handle(IPC.DO_CLOSE_APP, () => {
    if (UPDATA_DOWNLOADED_NOT_INSTALLED) {
      window.webContents.send(IPC.UPDATA_DOWNLOADED_QUIT_INSTALL)
    } else {
      app.exit()
    }
  })
}
