/**
 * author Oleg .
 */


angular.module( 'tracker' )
.controller('paController' , [ '$scope','$rootScope', function ( $scope,$rootScope  ) {

    var $this = this;

    $this.projects = $rootScope.projects;

    $this.selectProject = function (  project ) {
        $rootScope.currentProject = project
    };

    $scope.showCheckBoxes = false;

}]);