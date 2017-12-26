/**
 * author Oleg .
 */


angular.module( 'tracker' )
.controller('paController' , [ '$scope','$rootScope', function ( $scope,$rootScope  ) {

    var $this = this;

    $this.projects = [
        {
            projectName:'bimba',
            trelloLink:'link',
            checked:false
        },
        {
            projectName:'bimba2',
            trelloLink:'link',
            checked:false
        },
        {
            projectName:'bimba3',
            trelloLink:'link',
            checked:false
        },
        {
            projectName:'bimba4',
            trelloLink:'link',
            checked:true
        },
        {
            projectName:'bimba5',
            trelloLink:'link',
            checked:false
        },
        {
            projectName:'bimba6',
            trelloLink:'link',
            checked:false
        }
    ];

    $rootScope.project = $this.projects[0];

    $this.selectProject = function (  project ) {
        $rootScope.project = project
    };

    $scope.showCheckBoxes = false;

}]);