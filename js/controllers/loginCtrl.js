'use strict';

app.controller('loginCtrl', ['$scope', '$rootScope','$cookieStore', '$location', 'loginService', function ($scope, $rootScope,$cookieStore, $location, loginService) {

    /*$scope.login = function (data, callback) {

        $scope.error = '';
        loginService.login(data, function (response) {           

            if (response.length != 0) {
                
                if (response[0].password === data.password) {
                    $rootScope.authenticated = true;
                    if ($rootScope.requestedPath === "" || $rootScope.requestedPath === '/cards') {
                        $location.path('/cards');
                        callback({status:'success', path:$rootScope.requestedPath});
                    } else {
                        $location.path($rootScope.requestedPath);
                        callback({status:'success', path:$rootScope.requestedPath});
                    }
                } else {
                    
                    callback({status:'error', message:'Your user name or password was incorrect'});
                }


            } else {
                callback({status:'error', message:response[0].message});
            }
            
            data.username = '';
            data.password = '';
            data.newPass = '';
            data.newPassConfirm = '';

        }); //call reset reset password service
    };*/

   /* $scope.updatePassword = function (data) {

        $scope.resetPassSuccess = '';
        $scope.error = '';

        loginService.updatePassword(data, $scope, function (response) {

            data.username = '';
            data.password = '';
            data.newPass = '';
            data.newPassConfirm = '';

            if (response == '"TRUE"') {
                $scope.resetPassSuccess = "Your password has been reset successfully, you can now log in using your new password";

            } else {
                $scope.error = "Your user name or old password was incorrect";
            }

        }); //call reset reset password service
    };*/
    
    
    
        //Opens the pop up when application loads for the first time on login page
        $scope.openLoginPopUp = function () {
            if($cookieStore.get("userlogin")){
                console.log("openEditPopUp()");
                $scope.$root.$broadcast("openPopUp", {
                    state:"editState"
                });
            }else{
                console.log("openLoginPopUp()");
                $scope.$root.$broadcast("openPopUp", {
                    state:"loginState"
                });
            }
        };
    
    
    $scope.clearMessages = function () {

        $scope.resetPassSuccess = '';
        $scope.error = '';
    };

}]);