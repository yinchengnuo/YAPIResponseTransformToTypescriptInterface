import { BrowserWindow } from 'electron'

/**
 * @description: 根据不同平台设置app打开后的表现
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  const platform: string = process.platform || ''
  // window 打开最大化
  if (platform.startsWith('win')) {
    window.maximize()
  }
  // mac 打开全屏
  if (platform.startsWith('darwin')) {
    window.setFullScreen(true)
  }
}
