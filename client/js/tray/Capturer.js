const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const shell = electron.shell;
const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('request');
const storage = require( 'electron-json-storage' );





 function takeScreenShot  ( emploee,task ) {


	const thumbSize = determineScreenShotSize();
	  let options = { types: ['screen'], thumbnailSize: thumbSize };
	
	  desktopCapturer.getSources(options, function (error, sources) {
	    if (error) return console.log(error);
	
	    sources.forEach(function (source) {
	      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
	      	var imageName = `emploee-${emploee}_${Math.random()}date.png`;
	        const screenshotPath = path.join(__dirname, imageName );
		    var buf = new Buffer(source.thumbnail.toPng(), 'base64');
		    
		    var params = {
		    	date:new Date(),
			    emploee:emploee,
			    screen:buf,
			    taskId:task
			    
		    };
		    
		      storage.get('bimba-tracker-user', function ( error,response  ) {
			      params.uid = response.id;
			      params.session = response.session;
			      sendMe( params );
			      
		      });
		    
		    
	        //fs.writeFile(screenshotPath,buf, function (error) {
	        //  if (error) return console.log( error );
	        //  shell.openExternal('file://' + screenshotPath)
	        //
	        //})
	      }
	    })
	  });

	function determineScreenShotSize () {
	  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize;
	  const maxDimension = Math.max(screenSize.width, screenSize.height);
	  return {
	    width: maxDimension * window.devicePixelRatio,
	    height: maxDimension * window.devicePixelRatio
	  }
	}
};

 function sendMe ( params ) {
 	
 	var options = {
	    method:'POST',
	    url:'http://192.168.88.250:3005/api/employees/tracker/screen',
	    form:params
    };
 	
	
	request( options, function ( error,response  ) {
		console.log(error, '-----',response )
	} )
		//.then( function ( response  ) {
		//
		//	console.log( response )
		//
		//})
		//.catch( function ( error  ) {
		//	console.log( error )
		//})

};

exports.capturer = takeScreenShot;