"use strict";

app.controller("DashboardCtrl", function ($scope, $rootScope, $location, AssignmentFactory) {

    $scope.milestones = [];
    $scope.assignments = [];
    $scope.selectedMilestone = {};

    let getMilestones = () => {
        AssignmentFactory.getMilestoneList().then(fbMilestones => {
            $scope.milestones = fbMilestones;
            $scope.milestones.map(milestone => {
                AssignmentFactory.getAssignmentListByMilestoneId(milestone.id).then(function (fbAssignments) {
                    milestone.assignments = fbAssignments;
                });
            });
        });
    };

    getMilestones();

    $scope.deleteMilestone = (milestoneId) => {
        AssignmentFactory.deleteMilestone(milestoneId).then(() => {
            getMilestones();
        });
    };
});