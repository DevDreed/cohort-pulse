"use strict";

app.controller("CohortDetailsCtrl", function ($scope, $routeParams, CohortFactory) {
  $scope.selectedCohort = {};
  let cohortId = $routeParams.id;

  CohortFactory.getSingleCohort(cohortId).then(oneCohort => {
    oneCohort.id = cohortId;
    $scope.selectedCohort = oneCohort;
  });
});
