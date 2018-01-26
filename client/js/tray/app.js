/**
 * author Oleg .
 */
const takeScreen = require( '../js/tray/Capturer.js' ).capturer;


angular.module ( 'tray', [
    'ui.bootstrap',
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
] )
    .controller ( 'trayController', ['$rootScope', '$scope',  function ( $rootScope, $scope ) {
        $scope.userCredentials = {};
    

	    $scope.emploee =  ipsRenderer.sendSync( 'emploee/getMe'  );
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
	            takeScreen( $scope.emploee,$scope.tasks[i].id );
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