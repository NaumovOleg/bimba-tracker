'use strict';
const electron = require('electron');
var { app, BrowserWindow ,Tray,clipboard,Menu} = require('electron');
var async = require('async');
var path = require( 'path' );
app.commandLine.appendSwitch( "js-flags", "--harmony-async-await");
app.commandLine.appendSwitch( "js-flags", "enable-file-cookies");
global.storage = require('electron-json-storage');
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

    const iconName = process.platform === 'win32' ? 'app.ico' : 'app.ico';
    const iconPath = path.join(__dirname+'/assets/', iconName);

    // appIcon = new Tray(iconPath);


    global.mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        icon: './client/assets/icon.png',
        // frame:false
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
    });
});
Routers.setRoutes( ipcMain );






