"use strict";

app.factory("UserFactory", ($q, $http, FIREBASE_CONFIG) => {
    let addUser = (authData) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, JSON.stringify({
                uid: authData.uid,
                username: authData.username
            })).success(storeUserSuccess => {
                resolve(storeUserSuccess);
            }).error(storeUserError => {
                reject(storeUserError);
            });
        });
    };

    let getUser = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users/.json?orderBy="uid"&equalTo="${userId}"`)
                .success(userObject => {
                    let users = [];
                    Object.keys(userObject).map(key => {
                        users.push(userObject[key]);
                    });
                    resolve(users[0]);
                }).error(getUserError => {
                    reject(getUserError);
                });
        });
    };

    return {
        addUser: addUser,
        getUser: getUser
    };
});
