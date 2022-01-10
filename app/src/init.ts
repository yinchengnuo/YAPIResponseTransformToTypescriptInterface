import { app, BrowserWindow } from 'electron'
import IPC from './IPC'
import { UPDATA_DOWNLOADED_NOT_INSTALLED } from './updata'

/**
 * @description: 初始化 window
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  app.setAsDefaultProtocolClient('ts')
  // 关闭提示
  window.once('close', (e) => {
    if (UPDATA_DOWNLOADED_NOT_INSTALLED) {
      window.webContents.send(IPC.UPDATA_DOWNLOADED_QUIT_INSTALL)
      e.preventDefault()
    } else {
      app.quit()
    }
  })
}
