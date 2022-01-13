import { app, BrowserWindow } from 'electron'
import IPC from './IPC'
import { UPDATA_DOWNLOADED_NOT_INSTALLED } from './updata'

/**
 * @description: 初始化 window
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // 打开控制台
  if (!app.isPackaged) {
    window.webContents.openDevTools()
  }
  // 注册外部唤起协议
  app.setAsDefaultProtocolClient('ts')
  // 允许所有权限
  window.webContents.session.setPermissionCheckHandler(() => true)
  window.webContents.session.setDevicePermissionHandler(() => true)
  window.webContents.session.setPermissionRequestHandler((_, __, callback) => {
    const flag = true
    return callback(flag)
  })
  // 自动更新准备就绪关闭时强制更新
  window.once('close', (e) => {
    if (UPDATA_DOWNLOADED_NOT_INSTALLED) {
      window.webContents.send(IPC.UPDATA_DOWNLOADED_QUIT_INSTALL)
      e.preventDefault()
    } else {
      app.quit()
    }
  })
}
