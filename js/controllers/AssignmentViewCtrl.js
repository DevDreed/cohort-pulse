"use strict";

app.controller("AssignmentViewCtrl", function ($scope, $rootScope, $routeParams, AssignmentFactory, UserFactory, GithubFactory) {
  $scope.selectedAssignment = {};
  $scope.singleStudentAssignment = {};
  $scope.allStudentAssignments = [];
  let assignmentId = $routeParams.id;
  $scope.userRepos = [];
  $scope.githubRepo = {};

  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  $scope.disable = [false, 1, 7];
  $scope.today = 'Today';
  $scope.clear = 'Clear';
  $scope.close = 'Close';
  var days = 15;
  $scope.minDate = (new Date($scope.currentTime.getTime() - (1000 * 60 * 60 * 24 * days))).toISOString();
  $scope.maxDate = (new Date($scope.currentTime.getTime() + (1000 * 60 * 60 * 24 * days))).toISOString();
  $scope.onStart = function () {
    console.log('onStart');
  };
  $scope.onRender = function () {
    console.log('onRender');
  };
  $scope.onOpen = function () {
    console.log('onOpen');
  };
  $scope.onClose = function () {
    console.log('onClose');
  };
  $scope.onSet = function () {
    console.log('onSet');
  };
  $scope.onStop = function () {
    console.log('onStop');
  };


  $scope.edit = false;
  $scope.toggleEdit = function () {
    $scope.edit = $scope.edit === false ? true : false;
  };

  $scope.saveAssignment = () => {
    AssignmentFactory.editAssignment($scope.selectedAssignment).then(function (response) {
      $scope.edit = false;
    });
  };

  $scope.saveStudentAssignment = () => {
    let assignment = $scope.singleStudentAssignment;
    assignment.assignmentId = $scope.selectedAssignment.id;
    assignment.uid = $rootScope.user.uid;
    console.log('assignment.id', assignment.id);
    if (assignment.id !== undefined) {
      AssignmentFactory.editStudentAssignment(assignment).then(function (response) {
        GithubFactory.getRepoByURL($scope.singleStudentAssignment.repo).then(repo => {
          $scope.singleStudentAssignment.fullRepo = repo;
        });
        $scope.edit = false;
      });
    } else {
      AssignmentFactory.newStudentAssignment(assignment).then(function (response) {
        GithubFactory.getRepoByURL($scope.singleStudentAssignment.repo).then(repo => {
          $scope.singleStudentAssignment.fullRepo = repo;
        });
        $scope.edit = false;
      });
    }

  };

  GithubFactory.getGithubUser($rootScope.user.githubUsername).then(user => {
    GithubFactory.getRepos(user.repos_url).then(repoData => {
      console.log({
        repoData
      });
      $scope.userRepos = repoData;
    });
  });

  AssignmentFactory.getSingleAssignment(assignmentId).then(oneAssignment => {
    oneAssignment.id = assignmentId;
    $scope.selectedAssignment = oneAssignment;
    $scope.selectedAssignment.dueDate = new Date(oneAssignment.dueDate);
  });

  AssignmentFactory.getAllStudentsAssignments(assignmentId).then(allAssignments => {
    $scope.allStudentAssignments = allAssignments;
    allAssignments.map(assignment => {
      UserFactory.getUser(assignment.uid).then(function (user) {
        $scope.allStudentAssignments.map((assignment) => {
          if (assignment.repo !== undefined) {
            GithubFactory.getRepoByURL(assignment.repo).then(repo => {
              assignment.fullRepo = repo;
            });
          }
          if (user.uid === assignment.uid) {
            assignment.user = user;
          }
        });
      });
    });
  });

  AssignmentFactory.getAllStudentsAssignments(assignmentId).then(allAssignments => {
    $scope.allStudentAssignments = allAssignments;
    allAssignments.map(assignment => {
      UserFactory.getUser(assignment.uid).then(function (user) {
        $scope.allStudentAssignments.map((assignment) => {
          if (user.uid === assignment.uid) {
            assignment.user = user;
          }
          if (assignment.uid === $rootScope.user.uid) {
            $scope.singleStudentAssignment = assignment;
            if (assignment.repo !== undefined) {
              GithubFactory.getRepoByURL(assignment.repo).then(repo => {
                assignment.fullRepo = repo;
              });
            }
          }
        });
      });
    });
  });
});