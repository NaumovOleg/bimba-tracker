/**
 * author Oleg .
 */
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

        $scope.countTask =function ( id ,time) {
            
            console.log( $scope.tasks );
           
           var playButton = document.getElementById( id );

            if(!myTasks[id]){
                myTasks[id] = {active:true,time:0};

            };
            if( myTasks[id].active === true ) {
                myTasks[id].active  = !myTasks[id].active;
                $scope.count = 0;
                playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
                setInterval( function (  ) {
                  $scope.count=$scope.count+1;
                },60*1000 );
            }
            else {
                playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
                myTasks[id].active  = !myTasks[id].active;
                var obj = {
                    task:id,time:time+$scope.count
                };
                ipsRenderer.sendSync('task/setTime',{task:id,time:time+$scope.count} );
                $scope.getTasks (  $scope.currentProjectId ) ;

            }
        }
    } ] );