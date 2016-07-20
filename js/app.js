'use strict';

// declare modules

angular.module('Base64', []);
angular.module('angularModalService', []);
angular.module('splashScreenService', []);
angular.module('ngScrollbar', []);
angular.module('ui.bootstrap.demo', ['ui.bootstrap']);

var app = angular.module('Cards', [
    'Base64',
    'ngResource',
    'ngRoute',
    'ngCookies',
    'angularModalService',
    'Base64',
    'ui.bootstrap.demo',
    'ui.bootstrap.datetimepicker',
    'ngAnimate',
    'ngDialog',
    'smart-table',
    'frapontillo.bootstrap-switch'
]);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'partials/login.html'
        })
        .when('/cards', {
            controller: 'cardsScreenCtrl',
            templateUrl: 'partials/cards.html',
        })

    .otherwise({
        redirectTo: '/login'
    });


}]);

 // User Model   
 app.factory('ModelPerson', function ModelPersonFactory() {
    var ModelPerson = function(id, modelName, height, hair, eyes, bust, waist, hips, shoes, uploadedFrontImgName, uploadedBackImgName, scale, scaleFactor, groupX, groupY, rotation, quantity, reference, imageMatrix, textColor) {
    this.id = id;
    this.modelName = modelName;    
    this.height = height;   
    this.hair = hair;    
    this.eyes = eyes;    
    this.bust = bust;        
    this.waist = waist;        
    this.hips = hips;    
    this.shoes = shoes;
    this.uploadedFrontImgName = uploadedFrontImgName;
    this.uploadedBackImgName = uploadedBackImgName;
    this.scale = scale;    
    this.scaleFactor = scaleFactor;
    this.groupX = groupX;
    this.groupY = groupY;
    this.rotation = rotation;
    this.quantity = quantity;    
    this.reference = reference;
    this.imageMatrix = imageMatrix;    
    this.textColor = textColor;    
    };

    ModelPerson.prototype.getModelName = function() {
        var self = this;
        return self.modelName;
    };
     
     ModelPerson.prototype.getModelHair = function() {
        var self = this;
        return self.hair;
    };
     ModelPerson.prototype.getModelBust = function() {
        var self = this;
        return self.bust;
    };
     
     ModelPerson.prototype.setUploadedImgName = function(value) {
        var self = this;
        self.uploadedFrontImgName = value;
    };
     
    ModelPerson.prototype.castObjectToModelPerson = function(value) {
        var self = this;
        self.id = value.id;
        self.modelName = value.model_Name;    
        self.height = value.height;   
        self.hair = value.hair;    
        self.eyes = value.eyes;    
        self.bust = value.bust;        
        self.waist = value.waist;        
        self.hips = value.hips;    
        self.shoes = value.shoes;
        self.uploadedFrontImgName = value.uploaded_front_img_name;
        self.uploadedBackImgName = value.uploaded_back_img_name;
        self.scale = value.scale;    
        self.scaleFactor = parseFloat(value.scaleFactor);
        self.groupX = parseFloat(value.groupX);
        self.groupY = parseFloat(value.groupY);
        self.rotation = parseFloat(value.rotation); 
        self.quantity = value.quantity;
        self.reference = value.reference;
        self.imageMatrix = value.imageMatrix;
        self.textColor = value.textColor;
        
    };
     
     ModelPerson.prototype.createNewModelPerson = function() {
        var self = this;
        self.id = undefined;
        self.modelName = "";    
        self.height = 4.5;   
        self.hair = "Select";    
        self.eyes = "Select";    
        self.bust = 20;        
        self.waist = 20;        
        self.hips = 20;    
        self.shoes = 4;
        self.uploadedFrontImgName = "defaultFrontImage.jpg";
        self.uploadedBackImgName =  "defaultBackImage.jpg";
        self.scale = undefined;    
        self.scaleFactor = 0;
        self.groupX = 0;//default center
        self.groupY = 0;//Default center
        self.rotation = 0;//Default 0 
        self.quantity = '25';
        self.reference = "bpmFC-002345";
        self.imageMatrix = undefined;
        self.textColor = undefined;
         
    };

    return ModelPerson;
});


app.run(function ($rootScope, $location,$cookieStore) {
    console.log("app run"+$cookieStore.get("userlogin"))
    $rootScope.popUpState = "";
    //$rootScope.authenticated = false;
    $rootScope.requestedPath = "";
    $rootScope.user = {userName: '', 
                      email:''};

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
       
        var nextUrl = $location.path();
        if (nextUrl === '/login' || $cookieStore.get("userlogin") === false) {
            $location.path("/login");
        } else if ($cookieStore.get("userlogin") === true) {
            $location.path(nextUrl);
        } 
        
        //else {

        //            loginService.checkSession(function (results) {
        //                if (results.status === "success") {
        //                    if (results.uid === sessionStorage.getItem('uid')) {
        //                        $rootScope.authenticated = true;
        //                        $rootScope.uid = results.uid;
        //                        $rootScope.name = results.user;
        //
        //                        //backupsService.AutoLoadBackupList();
        //                        $location.path("/register");
        //                    } else {
        //
        //                        $rootScope.authenticated = false;
        //                        event.preventDefault();
        //                        $location.path("/splashScreen");
        //                    }
        //
        //                } else {
        //
        //                    $rootScope.authenticated = false;
        //                    event.preventDefault();
        //                    $location.path("/splashScreen");
        //                }
        //            });
        // }

    });


});