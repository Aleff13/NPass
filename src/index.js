const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { UserRepository } = require('./repositories/user')
const { PasswordRepository } = require('./repositories/password')
const { Crypt } = require('./services/crypt')
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const loadDb = (event, username, password) => {
  const userRepository = new UserRepository()
  const passwordRepository = new PasswordRepository()

  userRepository.init()
  userRepository.createOne(username, password)

  passwordRepository.init()
  passwordRepository.createOne(username, password)
  passwordRepository.getOne(username)
  passwordRepository.getAll(username)

  const crypt = new Crypt()

  crypt.generateKeys()
  crypt.loadKeys()

  console.log(1)

  const encryptMsg = crypt.encrypt('olaaa')
  
  console.log(2)

  const decryptMsg = crypt.decrypt(encryptMsg)
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  ipcMain.on('createDb', loadDb)

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
