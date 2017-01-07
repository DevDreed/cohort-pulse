"use strict";

app.factory("MilestoneFactory", ($q, $http, FIREBASE_CONFIG) => {


    const getMilestoneList = () => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/milestones.json`).success(response => {
                let milestones = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        milestones.push(response[key]);
                    });
                }
                resolve(milestones);
            }).error(errorResponse => reject(errorResponse));
        });
    };

    const getSingleMilestone = (milestoneId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/milestones/${milestoneId}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const postNewMilestone = (newMilestone) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/milestones.json`,
                    JSON.stringify({
                        name: newMilestone.name,
                        repoLink: newMilestone.repoLink,
                    }))
                .success(postResponse => resolve(postResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const editMilestone = (editMilestone) => {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/milestones/${editMilestone.id}.json`,
                    JSON.stringify({
                        name: editMilestone.name,
                        repoLink: editMilestone.repoLink
                    }))
                .success(editResponse => resolve(editResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const deleteMilestone = (milestoneId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/milestones/${milestoneId}.json`)
                .success(deletedResponse => resolve(deletedResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    return {
        getMilestoneList: getMilestoneList,
        getSingleMilestone: getSingleMilestone,
        postNewMilestone: postNewMilestone,
        editMilestone: editMilestone,
        deleteMilestone: deleteMilestone
    };
});