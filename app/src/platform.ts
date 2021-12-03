import { BrowserWindow } from 'electron'

/**
 * @description: 根据不同平台设置app打开后的表现
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // window 打开最大化
  if (process.platform === 'win32') {
    window.maximize()
  }
  // mac 打开全屏
  if (process.platform === 'darwin') {
    window.setFullScreen(true)
  }
}
