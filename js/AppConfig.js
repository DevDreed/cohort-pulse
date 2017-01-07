"use strict";

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.run(($rootScope, $location, FIREBASE_CONFIG, AuthFactory) => {
    firebase.initializeApp(FIREBASE_CONFIG);

    $rootScope.$on('$routeChangeStart', (event, currRoute, prevRoute) => {
        let logged = AuthFactory.isAuthenticated();
        let appTo;
        if (currRoute.originalPath) {
            appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        }
        if (!appTo && !logged) {
            event.preventDefault();
            $location.url('/auth');
        }
    });
});

app.config($routeProvider => {
    $routeProvider
        .when('/auth', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {isAuth}
        })
        .when('/milestone/new', {
            templateUrl: 'partials/milestone-new.html',
            controller: 'MilestoneNewCtrl',
            resolve: {isAuth}
        })
        .when('/milestone/edit/:id', {
            templateUrl: 'partials/milestone-edit.html',
            controller: 'MilestoneEditCtrl',
            resolve: {isAuth}
        })
        .when('/milestone/:milestoneId/assignment/new', {
            templateUrl: 'partials/assignment-new.html',
            controller: 'AssignmentNewCtrl',
            resolve: {isAuth}
        })
        .when('/assignment/view/:id', {
            templateUrl: 'partials/assignment-view.html',
            controller: 'AssignmentViewCtrl',
            resolve: {isAuth}
        })
        .when('/logout', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl',
            resolve: {
                isAuth
            }
        })
        .otherwise('/auth');
});
