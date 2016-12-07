"use strict";

app.factory("ContactFactory", ($q, $http, FIREBASE_CONFIG) => {

    const getContactList = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userId}"`).success(response => {
                let contacts = [];
                if (response) {
                    Object.keys(response).map(key => {
                        response[key].id = key;
                        contacts.push(response[key]);
                    });
                }
                resolve(contacts);
            }).error(errorResponse => reject(errorResponse));
        });
    };

    const postNewContact = (newContact) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`,
                    JSON.stringify({
                        name: newContact.name,
                        email: newContact.email,
                        birthday: newContact.birthday,
                        phone: newContact.phone,
                        mobile: newContact.mobile,
                        uid: newContact.uid
                    }))
                .success(postResponse => resolve(postResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const deleteContact = (contactId) => {
        console.log({
            contactId
        });
        return $q((resolve, reject) => {
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`)
                .success(deletedResponse => resolve(deletedResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const getSingleContact = (contactId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`)
                .success(getSingleResponse => resolve(getSingleResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    const editContact = (editContact) => {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/contacts/${editContact.id}.json`,
                    JSON.stringify({
                        name: editContact.name,
                        email: editContact.email,
                        birthday: editContact.birthday,
                        phone: editContact.phone,
                        mobile: editContact.mobile,
                        uid: newContact.uid
                    }))
                .success(editResponse => resolve(editResponse))
                .error(errorResponse => reject(errorResponse));
        });
    };

    return {
        getContactList: getContactList,
        postNewContact: postNewContact,
        deleteContact: deleteContact,
        getSingleContact: getSingleContact,
        editContact: editContact
    };
});
