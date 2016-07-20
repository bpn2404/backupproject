'use strict';

app.factory('loginService', function ($http, $location, $rootScope, sessionService, Base64Service) {

    return {

        //Call LOGIN service
        login: function (data, callback) {
            var sendUser = (JSON.parse(JSON.stringify(data))); //Copy data object and encode credentials 
            //sendUser.username = Base64Service.encode(sendUser.username);
            //sendUser.password = Base64Service.encode(sendUser.password);
            //sendUser.functionName = 'login';


            $http.get('api/app/user/' + sendUser.username).success(function (msg) {
               callback(msg);
            });
        },

        //Call LOGOUT service
        logout: function () {

            $cookieStore.put("userlogin",false);
            $rootScope.backupsCollection = null;

            var data = new Object();
            data.functionName = 'logout';

            var $promise = $http.post('api/middlewareService.php', data); 

        },


        //Call UPDATE PASSWORD service
        /*updatePassword: function (data, scope, callback) {
            var resetUser = (JSON.parse(JSON.stringify(data))); //Copy data object and encode credentials 
            resetUser.username = Base64Service.encode(resetUser.username);
            resetUser.oldPassword = Base64Service.encode(resetUser.password);
            resetUser.newPassword = Base64Service.encode(resetUser.newPass);
            resetUser.functionName = 'resetUserPassword';

            var $promise = $http.post('api/middlewareService.php', resetUser); // send data to

            $promise.then(function (msg) {

                var parsedData = JSON.parse(msg.data);
                callback(parsedData);
            });
        },*/


        //CHECK IF LOGGED IN
        checkSession: function (callback) {

            var data = new Object();
            data.functionName = 'checkSession';
            var $promise = $http.post('api/app/middlewareService.php', data); // send data to

            $promise.then(function (msg) {
                callback(msg.data);

            });
        },

    };


});