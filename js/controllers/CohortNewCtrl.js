"use strict";

app.controller("CohortNewCtrl", function ($scope, $rootScope, $location, CohortFactory) {

  $scope.newCohort = {};

  $scope.addNewCohort = () => {
    $scope.newCohort.uid = $rootScope.user.uid;
    CohortFactory.postNewCohort($scope.newCohort).then(cohortId => {
      $location.url("/cohorts/list");
      $scope.newCohort = {};
    });
  };
});
