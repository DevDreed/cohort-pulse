"use strict";

app.controller("MilestoneEditCtrl", function ($scope, $location, $routeParams, MilestoneFactory) {
  $scope.editMilestone = {};
  let itemId = $routeParams.id;

  MilestoneFactory.getSingleMilestone(itemId).then(function(oneMilestone) {
    oneMilestone.id = itemId;
    $scope.editMilestone = oneMilestone;
  });

  $scope.saveMilestone = () => {
    MilestoneFactory.editMilestone($scope.editMilestone).then(function (response) {
      $scope.editMilestone = {};
      $location.url("/dashboard");
    });
  };
});