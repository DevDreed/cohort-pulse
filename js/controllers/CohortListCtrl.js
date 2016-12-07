"use strict";

app.controller("CohortListCtrl", function ($scope, $rootScope, CohortFactory) {

    $scope.cohorts = [];
    $scope.students = [];
    $scope.selectedCohort = {};

    let getCohorts = () => {
        CohortFactory.getCohortList($rootScope.user.uid).then(fbCohorts => {
            $scope.cohorts = fbCohorts;
        });
    };

    getCohorts();

    $scope.getStudents = (cohortId) => {
        console.log('got here');
        CohortFactory.getStudentListByCohortId(cohortId).then(fbStudents => {
            $scope.students = fbStudents;
        })
    }

    $scope.deleteCohort = (cohortId) => {
        CohortFactory.deleteCohort(cohortId).then(() => {
            getCohorts();
        });
    };
});
