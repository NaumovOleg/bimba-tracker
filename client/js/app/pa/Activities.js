/**
 * author Oleg .
 */
angular.module( 'tracker' )
    .controller('activitiesController' , [ '$scope', function ( $scope  ) {

       $scope.$parent.showCheckBoxes = true;

    }]);