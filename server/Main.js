
/*shared js file which is globally used and destined for using main methods related to main and rendered process
exactly for creating windows*/

const { app, BrowserWindow, ipcMain, Tray } = require ( 'electron' );
const path = require ( 'path' );


global.tray = undefined;
global.window = undefined;

let showTray = false;

const createTray = () => {
    tray = new Tray ( iconPath );
    tray.on ( 'click', function ( event ) {
        toggleWindow ()
    } )
};

const createWindow = () => {
    window = new BrowserWindow ( {
        width: 700,
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
    window.setPosition ( width - 900, height - 400, false );
    window.show ();
    window.reload();
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
};

module.exports = MAIN;