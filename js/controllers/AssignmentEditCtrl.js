"use strict";

app.controller("AssignmentEditCtrl", function ($scope, $location, $routeParams, AssignmentFactory) {
  $scope.editAssignment = {};
  
  let assignmentId = $routeParams.id;

  AssignmentFactory.getSingleAssignment(assignmentId).then(function(oneAssignment) {
    oneAssignment.id = assignmentId;
    $scope.editAssignment = oneAssignment;
    $scope.editAssignment.dueDate = new Date(oneAssignment.dueDate);
  });

  $scope.saveAssignment = () => {
    AssignmentFactory.editAssignment($scope.editAssignment).then(function (response) {
      $scope.editAssignment = {};
      $location.url("/dashboard");
    });
  };
});
