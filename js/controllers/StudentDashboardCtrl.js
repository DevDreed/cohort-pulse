"use strict";

app.controller("StudentDashboardCtrl", function ($scope, $rootScope, $location, StudentDashboardFactory) {

  $scope.newCohort = {};

  $scope.addNewCohort = () => {
    $scope.newCohort.uid = $rootScope.user.uid;
    StudentDashboardFactory.postNewCohort($scope.newCohort).then(cohortId => {
      $location.url("/cohorts/list");
      $scope.newCohort = {};
    });
  };
});
