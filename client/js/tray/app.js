/**
 * author Oleg .
 */
const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
const electronScreen = electron.screen;
const shell = electron.shell;
const fs = require('fs');
const os = require('os');
const path = require('path');






function takeScreenShot (  ) {
	
	const thumbSize = determineScreenShotSize();
	  let options = { types: ['screen'], thumbnailSize: thumbSize };
	
	  desktopCapturer.getSources(options, function (error, sources) {
	    if (error) return console.log(error);
	
	    sources.forEach(function (source) {
	      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
	        const screenshotPath = path.join(__dirname, 'screeeeeeeeeeeeenshot.png');
	        console.log( screenshotPath );
	        
		      //var u8 = new Uint8Array([ source.thumbnail.toPng()]);
		      //var decoder = new TextDecoder('utf8');
		      //var b64encoded = btoa(decoder.decode(u8));
		      
		      var buffer = new Buffer( source.thumbnail.toPng()).toString('base64');
		      
		      var buf = new Buffer(source.thumbnail.toPng(), 'base64');
		      console.log( buf );
		      //fs.writeFile('imageeeeeeeeeeeeee.png', buf);
	
	        fs.writeFile(screenshotPath,buf, function (error) {
	          if (error) return console.log( error );
	          shell.openExternal('file://' + screenshotPath)

	        })
	      }
	    })
	  });

	function determineScreenShotSize () {
	  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
	  const maxDimension = Math.max(screenSize.width, screenSize.height)
	  return {
	    width: maxDimension * window.devicePixelRatio,
	    height: maxDimension * window.devicePixelRatio
	  }
	}
}






angular.module ( 'tray', [
    'ui.bootstrap',
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
] )
    .controller ( 'trayController', ['$rootScope', '$scope',  function ( $rootScope, $scope ) {
        $rootScope.projects =  ipsRenderer.sendSync('projects/getList' );
        $scope.currentProjectId =  $rootScope.projects[0].id;
        $scope.tasks =  ipsRenderer.sendSync('project/getTasks',{projectId:$rootScope.projects[0].id} );

        let myTasks = {};
	   
	
        $scope.getTasks = function ( id ) {
            $scope.currentProjectId = id;
            $scope.tasks =  ipsRenderer.sendSync('project/getTasks',{projectId:id} );
        };

        $scope.countTask =function ( id ,time,i) {
     
           var playButton = document.getElementById( id );
           var consumedTimeBlock = document.getElementById( `consumed-time-${i}` );

            if(!myTasks[id]){
                myTasks[id] = {active:true,time:0};

            };
            if( myTasks[id].active === true ) {
                myTasks[id].active  = !myTasks[id].active;
                playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
                $scope.interval = setInterval( function (  ) {
                $scope.count=$scope.count+1;
                $scope.tasks[i].consumedTime = $scope.tasks[i].consumedTime +1;
                consumedTimeBlock.innerText = $scope.tasks[i].consumedTime
	               
	               
                
                },1000 );
                takeScreenShot();
            }
            else {
                playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
                myTasks[id].active  = !myTasks[id].active;
                clearInterval( $scope.interval );
                ipsRenderer.sendSync('task/setTime',{task:id,time:$scope.tasks[i].consumedTime } );
                $scope.getTasks (  $scope.currentProjectId ) ;
            }
        }
    } ] );