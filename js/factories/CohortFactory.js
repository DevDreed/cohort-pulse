"use strict";

app.factory("CohortFactory", ($q, $http, FIREBASE_CONFIG) => {

    const getCohortList = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/cohorts.json`).success(response => {
                let cohorts = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        cohorts.push(response[key]);
                    });
                }
                resolve(cohorts);
            }).error(errorResponse => reject(errorResponse));
        });
    };

    const getSingleCohort = (cohortId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/cohorts/${cohortId}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const getStudentListByCohortId = (cohortId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="cohortId"&equalTo="${cohortId}"`).success(response => {
                let users = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        users.push(response[key]);
                    });
                }
                resolve(users);
            }).error(errorResponse => reject(errorResponse));
        });
    }

    return {
        getCohortList: getCohortList,
        getSingleCohort: getSingleCohort,
        getStudentListByCohortId: getStudentListByCohortId
    };
});
