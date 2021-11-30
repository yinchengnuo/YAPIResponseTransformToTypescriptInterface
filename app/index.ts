import path from 'path'
import { app, BrowserWindow } from 'electron'

import updata from './src/updata'
import shortcut from './src/shortcut'
import platform from './src/platform'

import './src/init'

app.whenReady().then(() => {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      webviewTag: true, // 允许使用 webview 标签
      nodeIntegration: true, // 在浏览器环境使用 node
      contextIsolation: false, // 取消 node 和 浏览器隔离
      preload: path.join(__dirname, './preload.js') // preload.js
    }
  })

  window.once('ready-to-show', () => {
    window.show()
    // 检查更新
    updata(window)
  })

  app.isPackaged ? window.loadFile('dist/index.html') : window.loadURL('http://localhost:3000')

  // 注册快捷键
  shortcut(window)
  // 不同平台的处理
  platform(window)

  setTimeout(() => {
    console.log(window.webContents.getPrinters(), 'window.webContents.getPrinters()')
  }, 2333)
})

app.on('window-all-closed', () => {
  app.quit()
})
