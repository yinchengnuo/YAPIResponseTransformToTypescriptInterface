import { app, BrowserWindow } from 'electron'
import shortcut from './src/shortcut'
import platform from './src/platform'

import './src/init'

app.whenReady().then(() => {
  const window = new BrowserWindow({ show: false })

  window.once('ready-to-show', window.show)

  app.isPackaged ? window.loadFile('build/index.html') : window.loadURL('http://localhost:3000')

  shortcut(window)
  platform(window)
})

app.on('window-all-closed', app.quit)
