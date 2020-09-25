import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow = null;

const fileURL = path.join('file:', __dirname, 'index.html');
const winURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : new URL(fileURL).href;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(winURL);
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
