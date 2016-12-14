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
                    $scope.assignments = fbAssignments;
                    AssignmentFactory.getStudentAssignmentsByUserId($rootScope.user.uid).then(function (fbStudentAssignments) {
                        fbStudentAssignments.map((studentAss) => {
                            fbAssignments.map((assignment) => {
                                if (studentAss.assignmentId === assignment.id) {
                                    assignment.studentAss = studentAss;
                                }
                                milestone.assignments = fbAssignments;
                            });
                        });
                    });
                });
            });
        });
    };

    getMilestones();


    $scope.getAssignments = (milestoneId) => {
        AssignmentFactory.getAssignmentListByMilestoneId(milestoneId).then(function (fbAssignments) {
            $scope.assignments = fbAssignments;
            AssignmentFactory.getStudentAssignmentsByUserId($rootScope.user.uid).then(function (fbStudentAssignments) {
                fbStudentAssignments.map((studentAss) => {
                    $scope.assignments.map((assignment) => {
                        if (studentAss.assignmentId === assignment.id) {
                            assignment.studentAss = studentAss;
                        }
                    });
                });
            });
        });

    };

    $scope.deleteMilestone = (milestoneId) => {
        AssignmentFactory.deleteMilestone(milestoneId).then(() => {
            getMilestones();
        });
    };
});