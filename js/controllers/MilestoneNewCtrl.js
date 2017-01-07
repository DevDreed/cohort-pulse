"use strict";

app.controller("MilestoneNewCtrl", function ($scope, $location, $routeParams, MilestoneFactory) {
      $scope.newMilestone = {};

    $scope.addNewMilestone = () => {
        MilestoneFactory.postNewMilestone($scope.newMilestone).then(() => {
            $location.url("/dashboard");
            $scope.newMilestone = {};
        });
    };
});