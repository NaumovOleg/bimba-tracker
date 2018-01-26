// start point

'use strict';
const electron = require('electron');
const { app, BrowserWindow ,Tray,clipboard,Menu,desktopCapturer } = require('electron');
const async = require('async');
const path = require( 'path' );

app.commandLine.appendSwitch( "js-flags", "--harmony-async-await");
app.commandLine.appendSwitch( "js-flags", "enable-file-cookies");
global.storage = require('electron-json-storage');
global.redisDB = require('./server/db/redis/Connection.js' );
const Routers = require('./server/routers/Router.js' );
const ipcMain = electron.ipcMain;
const netWorkAuth = require('./server/core/network/Auth.js' );

global.loginUrl = 'file://' + __dirname + '/client/views/LoginPage.html';
global.indexUrl = 'file://' + __dirname + '/client/views/index.html';

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});



//
var appIcon = null;
var pathIc = path.join('./assets/icon.png');
app.on('ready', function() {
    //build main window and creates shared global objects
    global.width = electron.screen.getAllDisplays()[0].size.width;
    global.height = electron.screen.getAllDisplays()[0].size.height;
    global.iconPath = path.join(__dirname+'/assets/', 'icon.png');
    global.mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        resizable:false,
        icon: './client/assets/icon.png',
         frame:true
    });
    mainWindow.webContents.openDevTools();

    storage.get('bimba-tracker-user', function(error, data) {
        if (error) throw error;
        if(! data.email ) {
            mainWindow.loadURL( loginUrl );
        } else {
            netWorkAuth.login( data )
                .then( function ( response ) {
                    if( ! response.error ) {
                        mainWindow.loadURL( indexUrl );
                       require('./server/Main.js').createTray();
                    } else {
                        mainWindow.loadURL( loginUrl )
                    }

                }).catch( function ( error  ) {
                    mainWindow.loadURL( loginUrl )
                })
        }

    });

    mainWindow.on('closed', function() {
        mainWindow = null;
        window = null;
    });
});
Routers.setRoutes( ipcMain );







