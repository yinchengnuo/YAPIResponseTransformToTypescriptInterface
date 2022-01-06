import { autoUpdater } from './updata'
import { app, Menu, BrowserWindow, shell } from 'electron'

export default (window: BrowserWindow): void => {
  // 清除系统默认菜单
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: '操作',
        submenu: [
          {
            label: '哔哔',
            click () {
              shell.beep()
            }
          },
          {
            label: '刷新',
            click () {
              window.reload()
            }
          },
          {
            label: '调试',
            click () {
              window.webContents.toggleDevTools()
            }
          },
          {
            label: '路由',
            submenu: [
              {
                label: '返回',
                click () {
                  window.webContents.goBack()
                }
              },
              {
                label: '打印',
                click () {
                  window.webContents.executeJavaScript("location.hash = '/print'")
                }
              },
              {
                label: '串口',
                click () {
                  window.webContents.executeJavaScript("location.hash = '/port'")
                }
              }
            ]
          },
          {
            label: '检查更新',
            click () {
              if (!autoUpdater.isUpdaterActive()) {
                autoUpdater.checkForUpdatesAndNotify()
              }
            }
          },
          {
            label: '退出应用',
            click () {
              app.exit()
            }
          }
        ]
      },
      {
        label: '窗口',
        submenu: [
          {
            label: '缩放',
            submenu: [
              {
                label: '➕',
                click () {
                  window.webContents.setZoomFactor(window.webContents.getZoomFactor() + 0.1)
                }
              },
              {
                label: '➖',
                click () {
                  window.webContents.setZoomFactor(window.webContents.getZoomFactor() - 0.1)
                }
              }
            ]
          },
          {
            label: '进入/退出全屏',
            click () {
              window.setFullScreen(!window.isFullScreen())
            }
          },
          {
            label: '最小化',
            click () {
              if (window.isFullScreen()) {
                window.on('leave-full-screen', window.minimize)
                window.setFullScreen(!window.isFullScreen())
              } else {
                window.minimize()
              }
            }
          }
        ]
      },
      {
        label: '关于',
        submenu: [
          {
            label: 'README',
            click () {
              shell.openExternal('https://github.com/yinchengnuo/YAPIResponseTransformToTypescriptInterface/blob/main/README.md')
            }
          },
          {
            label: '开源地址',
            click () {
              shell.openExternal('https://github.com/yinchengnuo/YAPIResponseTransformToTypescriptInterface')
            }
          }
        ]
      }
    ])
  )
}
