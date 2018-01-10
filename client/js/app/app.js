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


        $urlRouterProvider.otherwise ( '/pa' );
        $urlRouterProvider.when ( '/pa', '/pa/projects' );
        $stateProvider
            .state ( {
                name: 'pa',
                url: '/pa',
                controller:'paController',
                controllerAs:'pa',
                templateUrl: '../views/html/app/pa.html',
        });
        $stateProvider
            .state ( {
                name: 'pa.projects',
                url: '/projects',
                controller:'projectsController',
                controllerAs:'pc',
                templateUrl: '../views/html/app/pa/projects.html',
            });
        $stateProvider
            .state ( {
                name: 'pa.activities',
                url: '/activities',
                controller:'activitiesController',
                controllerAs:'ac',
                templateUrl: '../views/html/app/pa/activities.html',
            });
        $stateProvider
            .state ( {
                name: 'settings',
                url: '/settings',
                templateUrl: '../views/html/app/settings.html',
            })

    }])
    .controller ( 'mainController', [ '$scope', '$http','$rootScope', '$window', function ( $scope, $http,$rootScope, $window ) {
        $scope.logout = function (  ) {
            ipsRenderer.send('logout' );
        };

        $rootScope.companies = ipsRenderer.sendSync('company/getMyList' );
        $rootScope.projects =  ipsRenderer.sendSync('projects/getList' );


    }]);