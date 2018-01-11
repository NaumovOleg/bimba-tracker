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

        console.log( $rootScope.projects )

    } ] );