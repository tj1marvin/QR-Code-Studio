How to turn this HTML into a macOS AppYou have the code for the web version. To make it a "real" Mac app that runs in your Dock and works offline, we will use a tool called Electron.PrerequisitesNode.js: Download and install it from nodejs.org if you haven't already.Terminal: Open your Mac's Terminal app.Step 1: Set up the ProjectCreate a new folder for your app and open it in Terminal.mkdir qr-code-studio
cd qr-code-studio
npm init -y

Step 2: Install ElectronThis installs the tools needed to wrap the app.npm install --save-dev electron

Step 3: Add the FilesTake the index.html file you generated in the previous step and save it inside this qr-code-studio folder.Create a new file named main.js in the same folder and paste this code:// main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        titleBarStyle: 'hiddenInset', // Gives that native Mac look
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
Step 4: Configure the Launch CommandOpen the package.json file (it was created in Step 1) in a text editor. Find the "scripts" section and change it to look like this:"scripts": {
  "start": "electron ."
}
Step 5: Run It!In your terminal, type:npm start

Your app should launch as a standalone Mac window!Step 6: Create the .app file (Distribute)To create a shareable .app or .dmg file to send to friends:Install Electron Forge:npm install --save-dev @electron-forge/cli
npx electron-forge import

Build the App:npm run make

Once finished, look in the out folder. You will find your native Mac application there!
