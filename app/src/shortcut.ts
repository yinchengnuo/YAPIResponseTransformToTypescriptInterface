import { BrowserWindow, globalShortcut } from 'electron'

/**
 * @description: 为应用注册快捷键
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // F12 打开控制台
  globalShortcut.register('F12', () => {
    if (window.webContents.isDevToolsOpened()) {
      window.webContents.closeDevTools()
    } else {
      window.webContents.openDevTools()
    }
  })
}
