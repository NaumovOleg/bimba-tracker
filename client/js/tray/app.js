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

        $scope.getTasks = function ( id ) {

            $scope.tasks =  ipsRenderer.sendSync('project/getTasks',{projectId:id} );

            console.log( $scope.tasks )
        };


    } ] );