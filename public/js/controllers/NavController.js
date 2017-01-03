"use strict";

app.controller("NavController", function ($scope) {
    $scope.navItems = [
        {
            name: "Logout",
            url: "#/logout"
        }, {
            name: "Dashboard",
            url: "#/dashboard"
        }
    ];
});
