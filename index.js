const { app, BrowserWindow } = require('electron')

const dev = (process.env.npm_lifecycle_script || '').includes('--dev')

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow()
  dev ? mainWindow.loadURL('http://localhost:3000') : mainWindow.loadFile('dist/index.html')
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
