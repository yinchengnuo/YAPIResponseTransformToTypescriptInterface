import path from 'path'
import { app, BrowserWindow } from 'electron'

import init from './src/init'
import menu from './src/menu'
import print from './src/print'
import updata from './src/updata'
import shortcut from './src/shortcut'
import platform from './src/platform'

app.whenReady().then(() => {
  const window = new BrowserWindow({
    show: false, // 默认隐藏渲染进程，防止打开后闪白屏
    webPreferences: { // 渲染进程页面配置
      webviewTag: true, // 允许使用 webview 标签
      nodeIntegration: true, // 在浏览器环境使用 node
      contextIsolation: false, // 取消 node 和 浏览器隔离
      preload: path.join(__dirname, './preload.js') // preload.js
    }
  })

  // 渲染进程渲染完成
  window.once('ready-to-show', () => {
    // 显示渲染进程
    window.show()
    // 检查更新
    updata(window)
  })

  // 根据 app.isPackaged 判断应用是否打包
  app.isPackaged ? window.loadFile('dist/index.html') : window.loadURL('http://localhost:3000')

  // 仅 x86 架构芯片支持串口通信
  if (process.arch.startsWith('x')) {
    // 初始化串口
    import('./src/port').then(module => {
      module.default(window)
    })
  }

  // 初始化 window
  init(window)
  // 初始化菜单
  menu(window)
  // 初始化打印机
  print(window)
  // 注册快捷键
  shortcut(window)
  // 不同平台的处理
  platform(window)
})

// 全部渲染进程关闭退出应用
app.on('window-all-closed', () => {
  app.exit()
})
