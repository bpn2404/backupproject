'use strict';

app.factory('popUpService', function ($http, $location, $rootScope) {


    return {

        createNewModelPerson: function (modelPerson, callback) {

            var data = {
                modelPerson: modelPerson
            };

            $http.post('api/app/add_modelPerson', modelPerson).success(function (msg) {

                callback(msg);
            });
        },

        updateModelPerson: function (modelPerson, callback) {

            var data = {
                modelPerson: modelPerson
            };

            $http.put('api/app/update_modelPerson/' + modelPerson.id, modelPerson).success(function (msg) {

                callback(msg);
            });
        },

        getAllModelPersons: function (callback) {

            $http.get('api/app/modelPersons').success(function (msg) {

                callback(msg);
            });
        }

    };


});