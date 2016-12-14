"use strict";

app.factory("AssignmentFactory", ($q, $http, FIREBASE_CONFIG) => {

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

    const getAssignmentListByMilestoneId = (milestoneId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/assignments.json?orderBy="milestoneId"&equalTo="${milestoneId}"`).success(response => {
                let assignments = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        assignments.push(response[key]);
                    });
                }
                resolve(assignments);
            }).error(errorResponse => reject(errorResponse));
        });
    };

    const getStudentAssignmentsByUserId = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/studentAssignments.json?orderBy="uid"&equalTo="${userId}"`).success(response => {
                let assignments = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        assignments.push(response[key]);
                    });
                }
                resolve(assignments);
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

    const editAssignment = (editAssignment) => {
        return $q((resolve, reject) => {
            $http.patch(`${FIREBASE_CONFIG.databaseURL}/assignments/${editAssignment.id}.json`,
                    JSON.stringify({
                        name: editAssignment.name,
                        dueDate: editAssignment.dueDate
                    }))
                .success(editResponse => resolve(editResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const editStudentAssignment = (editAssignment) => {
        console.log({
            editAssignment
        });
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/studentAssignments/${editAssignment.id}.json`,
                    JSON.stringify({
                        assignmentId: editAssignment.assignmentId,
                        repo: editAssignment.repo,
                        status: editAssignment.status,
                        uid: editAssignment.uid
                    }))
                .success(editResponse => resolve(editResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const newStudentAssignment = (editAssignment) => {
        console.log({
            editAssignment
        });
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/studentAssignments.json`,
                    JSON.stringify({
                        assignmentId: editAssignment.assignmentId,
                        repo: editAssignment.repo,
                        status: editAssignment.status,
                        uid: editAssignment.uid
                    }))
                .success(editResponse => resolve(editResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const getSingleStudentAssignment = (assignmentId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/assignments/${assignmentId}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };


    const getSingleAssignment = (assignmentId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/assignments/${assignmentId}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const getAllStudentsAssignments = (assignmentId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/studentAssignments.json?orderBy="assignmentId"&equalTo="${assignmentId}"`)
                .success(response => {
                    let studentAssignments = [];
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        studentAssignments.push(response[key]);
                    });
                    resolve(studentAssignments);
                })
                .error(errorResponse => reject(errorResponse));
        });
    };

    return {
        getMilestoneList: getMilestoneList,
        getSingleMilestone: getSingleMilestone,
        getAssignmentListByMilestoneId: getAssignmentListByMilestoneId,
        getStudentAssignmentsByUserId: getStudentAssignmentsByUserId,
        editAssignment: editAssignment,
        editStudentAssignment: editStudentAssignment,
        getSingleAssignment: getSingleAssignment,
        getAllStudentsAssignments: getAllStudentsAssignments,
        newStudentAssignment: newStudentAssignment
    };
});