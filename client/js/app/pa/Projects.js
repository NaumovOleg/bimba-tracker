/**
 * author Oleg .
 */
angular.module( 'tracker' )
    .controller('projectsController' , [ '$scope','$rootScope', function ( $scope,$rootScope ) {

        $scope.$parent.showCheckBoxes = false;

        var $this = this;

        this.project = $rootScope.project;

        $rootScope.$watch('project', function ( value ) {

            $this.project = value;

        } )


    }]);