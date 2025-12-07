const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        // 'hiddenInset' gives the Mac traffic light buttons a native look inside the window
        titleBarStyle: 'hiddenInset', 
        webPreferences: {
            // This allows us to use Node.js features if we need them later
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // This loads the HTML file you created earlier
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits explicitly.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})