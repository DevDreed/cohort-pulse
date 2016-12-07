"use strict";

app.controller("CohortEditCtrl", function ($scope, $location, $routeParams, CohortFactory) {
  $scope.newCohort = {};
  let cohortId = $routeParams.id;

  CohortFactory.getSingleCohort(cohortId).then(function(oneCohort) {
    oneCohort.id = cohortId;
    $scope.newCohort = oneCohort;
  });

  $scope.addNewCohort = () => {
    CohortFactory.editCohort($scope.newCohort).then(function (response) {
      $scope.newCohort = {};
      $location.url("/cohorts/list");
    });
  };
});
