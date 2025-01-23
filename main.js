// Modules to control application life and create native browser window
const { app, BrowserWindow, session } = require('electron')
const path = require('path')

app.commandLine?.appendSwitch('remote-debugging-port', '9222')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const ext = await session.defaultSession.loadExtension(path.resolve('./testExtension'))
  console.log('ext ', ext.id)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const openNewBrowserGameWindowListener = async (
  ev,
  contents
) => {
    contents.setWindowOpenHandler((handler) => {
      const { url } = handler
      console.log('window open handler called with url ', url)
      return { action: 'allow' }
    })
}

app.on('web-contents-created', openNewBrowserGameWindowListener)
