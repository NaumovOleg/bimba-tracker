/**
 * author Oleg .
 */
angular
    .module( 'tracker', [
        'ui.bootstrap',
        'ngMaterial',
        'ngAnimate',
        'ngCookies',
        'ngFileUpload',
        'ui.router',
        'ngLetterAvatar',
    ]).config( [ '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider', '$locationProvider',

    function ( $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $locationProvider ) {


        $urlRouterProvider.otherwise ( '/projects' );
        $stateProvider
            .state ( {
            name: 'projects',
            url: '/projects',
            templateUrl: '../views/html/projects.html',
        })
        $stateProvider
            .state ( {
                name: 'settings',
                url: '/settings',
                templateUrl: '../views/html/settings.html',
            })
        $stateProvider
            .state ( {
                name: 'activities',
                url: '/activities',
                templateUrl: '../views/html/activities.html',
            })

    }])
    .controller ( 'mainController', [ '$scope', '$http', '$window', function ( $scope, $http, $window ) {
        $scope.logout = function (  ) {
            ipsRenderer.send('logout' );
        }
    }]);