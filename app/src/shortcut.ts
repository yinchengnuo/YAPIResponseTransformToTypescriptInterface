import { BrowserWindow, globalShortcut } from 'electron'

/**
 * @description: 为应用注册快捷键
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // F12 打开控制台
  globalShortcut.register('F12', () => {
    window.webContents.toggleDevTools()
  })

  // ESC 返回上级页面
  globalShortcut.register('ESC', () => {
    window.webContents.goBack()
  })

  // 打印
  globalShortcut.register('Control+P', () => {
    console.log(window.webContents.getPrinters())
    console.log(2333)
  })
}
