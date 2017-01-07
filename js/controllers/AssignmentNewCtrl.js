"use strict";

app.controller("AssignmentNewCtrl", function ($scope, $location, $routeParams, AssignmentFactory) {
  $scope.newAssignment = {};
 let milestoneId = $routeParams.milestoneId;

    $scope.addNewAssignment = () => {
        $scope.newAssignment.milestoneId = milestoneId;
        AssignmentFactory.postNewAssignment($scope.newAssignment).then(() => {
            $location.url("/dashboard");
            $scope.newAssignment = {};
        });
    };
});