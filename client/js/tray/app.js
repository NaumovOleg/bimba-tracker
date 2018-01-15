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
        $scope.tasks =  ipsRenderer.sendSync('project/getTasks',{projectId:$rootScope.projects[0].id} );

        let myTasks = {};

        $scope.getTasks = function ( id ) {
            $scope.currentProjectId = id;
            $scope.tasks =  ipsRenderer.sendSync('project/getTasks',{projectId:id} );
        };

        $scope.countTask =function ( id ,time) {
            if(!myTasks[id]){
                myTasks[id] = {active:true,time:0};

            };
            if( myTasks[id].active === true ) {
                myTasks[id].active  = !myTasks[id].active;
                $scope.count = 0;
                setInterval( function (  ) {
                  $scope.count=$scope.count+1;
                },1000 );
            }
            else {
                myTasks[id].active  = !myTasks[id].active;
                var obj = {
                    task:id,time:time+$scope.count
                };
                ipsRenderer.sendSync('task/setTime',{task:id,time:time+$scope.count} );
                $scope.getTasks (  $scope.currentProjectId ) ;

            }
        }
    } ] );