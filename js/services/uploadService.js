'use strict';

app.factory('uploadService', function ($http, $location, $rootScope) {

        
    return {           
        
         uploadFrontImage: function (image, callback) {

            var data = {img: image};              
            
            /*$http.post('api/upload.php/', data).success(function (msg) {
                callback(msg);
            });*/
        },       
        
    };


});