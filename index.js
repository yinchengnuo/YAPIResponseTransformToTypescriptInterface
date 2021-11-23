const { app, BrowserWindow, Menu } = require('electron')

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([]))

  const mainWindow = new BrowserWindow({
    show: false, // 默认不显示
    resizable: false, // 不允许调整窗口尺寸
    // fullscreen: true, // 默认全屏
    // alwaysOnTop: true, // 窗口置顶
    useContentSize: true // 使用内容区域宽高作为窗口宽高
  })

  // 页面加载完成后显示
  mainWindow.once('ready-to-show', mainWindow.show)

  app.isPackaged ? mainWindow.loadFile('build/index.html') : mainWindow.loadURL('http://localhost:3000')
})

app.on('window-all-closed', app.quit)
