/**
 * author Oleg .
 */


angular.module( 'tracker' )
.controller('paController' , [ '$scope','$rootScope', function ( $scope,$rootScope  ) {

    var $this = this;

    $scope.company = {};



    $this.selectProject = function (  project ) {
        $rootScope.currentProject = project
    };

    $this.selectCompany = function(  ){

        var company = JSON.parse( $scope.company );

        $rootScope.projects =  ipsRenderer.sendSync('projects/changeCompany',{ id: company.id,title: company.title} );

    };

    $scope.showCheckBoxes = false;

}]);