"use strict";

app.factory("AssignmentFactory", ($q, $http, FIREBASE_CONFIG) => {

    const getMarkdown = (assignment) => {
        const repoURL = assignment.repoLink;
        const reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
        let pathname = reg.exec(repoURL)[1];
        pathname = pathname.replace('/blob', '');
        return $q((resolve, reject) => {
            $http.get(`https://raw.githubusercontent.com${pathname}`).success(response => {
                resolve(response);
            }).error(errorResponse => reject(errorResponse));
        });
    };


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

    const postNewAssignment = (newAssignment) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/assignments.json`,
                    JSON.stringify({
                        name: newAssignment.name,
                        dueDate: newAssignment.dueDate,
                        milestoneId: newAssignment.milestoneId,
                        repoLink: newAssignment.repoLink
                    }))
                .success(postResponse => resolve(postResponse))
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

    const deleteAssignment = (assignment) => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/assignments/${assignment.id}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const deleteStudentAssignment = (assignment) => {
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/studentAssignments/${assignment.id}.json`)
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
        getSingleMilestone: getSingleMilestone,
        getAssignmentListByMilestoneId: getAssignmentListByMilestoneId,
        getStudentAssignmentsByUserId: getStudentAssignmentsByUserId,
        postNewAssignment: postNewAssignment,
        editAssignment: editAssignment,
        editStudentAssignment: editStudentAssignment,
        getSingleAssignment: getSingleAssignment,
        getAllStudentsAssignments: getAllStudentsAssignments,
        newStudentAssignment: newStudentAssignment,
        deleteAssignment: deleteAssignment,
        deleteStudentAssignment: deleteStudentAssignment,
        getMarkdown: getMarkdown
    };
});