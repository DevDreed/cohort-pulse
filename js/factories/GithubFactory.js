"use strict";

app.factory("GithubFactory", ($q, $http, FIREBASE_CONFIG) => {
    let getGithubUser = (username) => {
        return $q((resolve, reject) => {
            $http.get(`https://api.github.com/users/${username}`)
                .success(function (data) {
                    resolve(data);
                })
                .error(error => {
                    reject(error);
                });
        });
    };

    let getRepos = (url) => {
        return $q((resolve, reject) => {
            $http.get(`${url}?per_page=1000`)
                .success(function (data) {
                    resolve(data);
                })
                .error(error => {
                    reject(error);
                });
        });
    };

        let getRepoByURL = (url) => {
        return $q((resolve, reject) => {
            $http.get(`${url}`)
                .success(function (data) {
                    resolve(data);
                })
                .error(error => {
                    reject(error);
                });
        });
    };

    return {
        getGithubUser: getGithubUser,
        getRepos: getRepos,
        getRepoByURL: getRepoByURL
    };
});