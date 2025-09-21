const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false,
    titleBarStyle: 'hidden',
    frame: false
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:8080');
  } else {
    win.loadFile('dist/index.html');
    // Try to enable auto-updater for production builds
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { updateElectronApp } = require('update-electron-app');
      updateElectronApp();
    } catch (error) {
      console.log('Auto-updater not available:', error.message);
    }
  }

  win.once('ready-to-show', () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
