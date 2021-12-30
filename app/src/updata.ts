import IPC from './IPC'
import { BrowserWindow, ipcMain } from 'electron'
import { NsisUpdater, UpdateInfo } from 'electron-updater'

/**
 * @description: 应用检查更新相关逻辑
 * @param {BrowserWindow} window
 * @return {*}
 */
export default (window: BrowserWindow): void => {
  // 实例化 autoUpdater
  const autoUpdater = new NsisUpdater({
    provider: 'generic',
    url: 'https://646d-dmhc-947ccf-1302828448.tcb.qcloud.la/electron'
  })

  // 正在检查更新
  autoUpdater.on('checking-for-update', () => {
    window.webContents.send(IPC.UPDATA_CHECKING, {
      message: '正在检查更新'
    })
  })

  // 检查更新出错
  autoUpdater.on('error', (error: UpdateInfo) => {
    window.webContents.send(
      IPC.UPDATA_ERROR,
      {
        message: '检查更新出错'
      },
      error
    )
  })

  // 检查到新版本
  autoUpdater.on('update-available', (info: UpdateInfo) => {
    window.webContents.send(IPC.UPDATA_AVAILABLE, {
      message: `检查到新版本 v ${info.version}，开始下载`
    })
  })

  // 已经是新版本
  autoUpdater.on('update-not-available', (info: UpdateInfo) => {
    window.webContents.send(IPC.UPDATA_NOT_AVAILABLE, {
      message: `当前版本已经是最新 v ${info.version}`
    })
  })

  // 更新下载中
  autoUpdater.on('download-progress', (info: { percent: string }) => {
    window.webContents.send(IPC.UPDATA_DOWNLOAD_PROGRESS, {
      percent: info.percent
    })
  })

  // 更新下载完毕
  autoUpdater.on('update-downloaded', () => {
    window.webContents.send(IPC.UPDATA_DOWNLOADED, {
      message: '新版本下载完毕'
    })
  })

  // 操作开始更新
  ipcMain.handle(IPC.CHECK_UPDATA, () => {
    autoUpdater.checkForUpdatesAndNotify()
  })

  // 操作立即更新
  ipcMain.handle(IPC.UPDATA_QUITANDINSTALL, () => {
    autoUpdater.quitAndInstall()
  })

  autoUpdater.checkForUpdatesAndNotify()
}
