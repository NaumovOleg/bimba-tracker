'use strict';
const electron = require('electron');
var { app, BrowserWindow } = require('electron');
var async = require('async');
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
app.on('ready', function() {



    global.mainWindow = new BrowserWindow({width: 1200, height: 900});

    mainWindow.webContents.openDevTools();

    storage.get('bimba-tracker-user', function(error, data) {
        console.log( data );
        if (error) throw error;
        if( ! data.email ) {
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

                })
            // mainWindow.loadURL( indexUrl );
        }

    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
Routers.setRoutes( ipcMain );




