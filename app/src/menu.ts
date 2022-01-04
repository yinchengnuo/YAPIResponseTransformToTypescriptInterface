import { app, Menu, BrowserWindow, shell } from 'electron'

export default (window: BrowserWindow): void => {
  // 清除系统默认菜单
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'TS接口转换器',
        submenu: [
          {
            label: '进入/退出全屏',
            click () {
              window.setFullScreen(!window.isFullScreen())
            }
          },
          {
            label: '退出应用',
            click () {
              app.quit()
            }
          }
        ]
      },
      {
        label: '操作',
        submenu: [
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
            label: '缩放',
            submenu: [
              {
                label: '+',
                click () {
                  window.webContents.setZoomFactor(window.webContents.getZoomFactor() + 0.1)
                }
              },
              {
                label: '-',
                click () {
                  window.webContents.setZoomFactor(window.webContents.getZoomFactor() - 0.1)
                }
              }
            ]
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
          }
        ]
      },
      {
        label: '关于',
        submenu: [
          {
            label: '关于',
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
