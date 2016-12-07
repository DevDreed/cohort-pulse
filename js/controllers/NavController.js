"use strict";

app.controller("NavController", function ($scope) {
    $scope.navItems = [
        {
            name: "Logout",
            url: "#/logout"
        }, {
            name: "All Cohorts",
            url: "#/cohorts/list"
        }, {
            name: "New Cohort",
            url: "#/cohorts/new"
        }
    ];
});
