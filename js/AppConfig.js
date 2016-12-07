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
        .when('/cohorts/list', {
            templateUrl: 'partials/cohort-list.html',
            controller: 'CohortListCtrl',
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
