//handle setupevents as quickly as possible
const setupEvents = require("../../installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require("electron");
const menuTemplate = require('./electron-menu');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const Menu = electron.Menu;

const menu = Menu.buildFromTemplate(menuTemplate.menu);

Menu.setApplicationMenu(menu);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 700,
    show: false
  });

  // Splash screen
  splashWindow = new BrowserWindow({
    width: 450,
    height: 450,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: 'transparent'
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  splashWindow.loadURL(`file://${__dirname}/../splash/splash.html`);
  mainWindow.loadURL(startUrl);

  // When mainWindow is ready
  mainWindow.once("ready-to-show", () => setTimeout(() =>{
    splashWindow.destroy();
    mainWindow.show();
  }, 1800));

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => setTimeout(createWindow));

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
