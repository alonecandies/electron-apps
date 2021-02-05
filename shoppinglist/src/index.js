const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron');
const electron = require("electron");
const path = require('path');
let mainWindow;
let addWindow;
//Template toolbar menu
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item.',
        accelerator:'Ctrl+T',
        click()
          {
            createNewItemWindow();
          }
      },
      {
        label: 'Clear Items.',
        click(){
          mainWindow.webContents.send("clearItem");
        }
      },
      {
        label: 'Quit.',
        accelerator:'Ctrl+Q',
        click()
          {app.quit()}
      }
    ]
  }
]

//create add new item function
function createNewItemWindow() {
  addWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Add new item to shopping list',
    webPreferences: {
      nodeIntegration:true,
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  addWindow.loadFile(path.join(__dirname, 'addWindow.html'));
  addWindow.webContents.openDevTools();
}



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed',function(){
    app.quit();
  })
  //create menu from template
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  //Insert menu
  Menu.setApplicationMenu(mainMenu);

  //catch item from ipcRenderer
  ipcMain.on('addItem',function(event, item){
    mainWindow.webContents.send('addItemValue',item);
  })
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

