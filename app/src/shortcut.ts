import { BrowserWindow, globalShortcut } from 'electron'

/**
 * @description: 为应用注册快捷键
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // Control+R 打开控制台
  globalShortcut.register('Control+R', () => {
    window.webContents.toggleDevTools()
  })

  // ESC 返回上级页面
  globalShortcut.register('ESC', () => {
    window.webContents.goBack()
  })
}
