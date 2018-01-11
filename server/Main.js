const { app, BrowserWindow, ipcMain, Tray } = require ( 'electron' )
const path = require ( 'path' );


global.tray = undefined;
global.window = undefined;

const createTray = () => {
    tray = new Tray ( iconPath );
    tray.on ( 'click', function ( event ) {
        toggleWindow ()
    } )
};

const createWindow = () => {
    window = new BrowserWindow ( {
        width: 250,
        height: 310,
        show: false,
        frame: true,
        fullscreenable: false,
        resizable: true,
        transparent: false,
    } );
    window.loadURL ( 'file://' + __dirname + '/../client/views/Tray.html' );
};

const toggleWindow = () => {
    if ( window.isVisible () ) {
        window.hide ()
    } else {
        showWindow ()
    }
};

const showWindow = () => {
    window.setPosition ( width - 300, height - 400, false );
    window.show ();
    window.focus ();
};

ipcMain.on ( 'show-window', () => {
    showWindow ();
} );


const MAIN = {
    createTray:()=>{
        'use strict';
        createTray();
        createWindow();
    }
}

module.exports = MAIN;