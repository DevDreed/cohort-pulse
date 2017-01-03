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
        .when('/assignment/edit/:id', {
            templateUrl: 'partials/assignment-edit.html',
            controller: 'AssignmentEditCtrl',
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
