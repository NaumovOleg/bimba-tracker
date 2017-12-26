/**
 * author Oleg .
 */

angular
    .module( 'login', [
        'ui.bootstrap',
        'ngMaterial',
        'ngAnimate',
        'ui.router',
    ]).controller ( 'loginController', [ '$scope', '$http', '$window', function ( $scope, $http, $window ) {

    $scope.credentials = {
        email:'',
        password:''
    };

    $scope.error = '';

    $scope.login = function (  ) {

      var response = ipsRenderer.sendSync( 'login', $scope.credentials );

      if( response.error ) {
          $scope.error = response.error;
      }


    }


}]);
