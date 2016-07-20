'use strict';

app.controller('PopUpController', ['$scope', '$rootScope','$cookieStore', '$timeout', '$location', 'ngDialog', 'ModelPerson', 'popUpService', 'loginService', function ($scope, $rootScope,$cookieStore, $timeout, $location, ngDialog, ModelPerson, popUpService, loginService) {

    // $scope.close = function(result) {
    // 	close(result, 100); // close, but give 100ms for bootstrap to animate
    // };

    console.log("POPU UP CONTROLLER ");

    $scope.states = {};
    $scope.states.editState = false;
    $scope.states.showLoginState = false;
    $scope.states.summaryState = false;
    $scope.states.selectForEdit = false;
    $scope.states.showComfortIndicatorState = false;
    $scope.userName = '';
    $scope.password = '';
    $scope.error = '';
    $scope.success = '';
    $scope.popUpState = "";
    $scope.quantities = ["25", "50", "100", "200", "400"];
    $scope.quantity = '100';
    $scope.statuses = ["PROOF", "FINAL"];
    $scope.status = 'PROOF';
    $scope.deliveryAddresses = ["London"];
    $scope.deliveryAddress = 'London';
    $scope.emailPdfOptions = ["Yes", "No"];
    $scope.emailPdf = 'Yes';
    $scope.hairColors = ["Select", "Brown", "Blonde", "Black"];
    $scope.eyesColors = ["Select", "Brown", "Blue", "Green"];
    $rootScope.modelPersons = [];
    $scope.rowCollection = [];
    $scope.footerButtonText = "";

    $scope.ref = '06386-AN';
    $scope.height = undefined;
    $scope.heightDisplay = undefined;
    $scope.bust = undefined;
    $scope.waist = undefined;
    $scope.hips = undefined;
    $scope.shoes = undefined;
    $scope.hairColor = undefined;
    $scope.eyesColor = undefined;
    
    $scope.textColors = [
        {name: "Select",
         value:'#000000'}, {name: "Black",
         value:'#000000'}, {name: "Grey",
         value:'#CCCCCC'}, {name: "White",
         value:'#FFFFFF'}];
    
    $scope.textColor = {name: "Black",
         value:'#000000'};
    
    $scope.isBlack = true;
    
    $scope.defaultImagePath = 'images/uploads/';
    $scope.fronImageName;
    $scope.row = undefined;

    $scope.setUpPopUp = function () {

        if ($rootScope.currentModel === undefined) {
            $rootScope.currentModel = new ModelPerson();
            $rootScope.currentModel.createNewModelPerson();
        }
        //
        if ($rootScope.currentModel.hair === undefined) {
            $scope.hairColor = $scope.hairColors[0];
            $rootScope.currentModel.hair = $scope.hairColor;
        } else
            $scope.hairColor = $rootScope.currentModel.hair;
        //
        if ($rootScope.currentModel.eyes === undefined) {
            $scope.eyesColor = $scope.eyesColors[0];
            $rootScope.currentModel.eyes = $scope.eyesColors[0];
        } else
            $scope.eyesColor = $rootScope.currentModel.eyes;
        //
        if ($rootScope.currentModel.height === undefined) {
            $scope.height = 0.0;
            $rootScope.currentModel.height = $scope.height;
        } else
            $scope.height = $rootScope.currentModel.height;
        //
        if ($rootScope.currentModel.bust === undefined) {
            $scope.bust = 0.0;
            $rootScope.currentModel.bust = $scope.bust;
        } else
            $scope.bust = $rootScope.currentModel.bust;
        //
        if ($rootScope.currentModel.waist === undefined) {
            $scope.waist = 0.0;
            $rootScope.currentModel.waist = $scope.waist;
        } else
            $scope.waist = $rootScope.currentModel.waist;
        //
        if ($rootScope.currentModel.hips === undefined) {
            $scope.hips = 0.0;
            $rootScope.currentModel.hips = $scope.hips;
        } else
            $scope.hips = $rootScope.currentModel.hips;
        //
        if ($rootScope.currentModel.shoes === undefined) {
            $scope.shoes = 0.0;
            $rootScope.currentModel.shoes = $scope.shoes;
        } else
            $scope.shoes = $rootScope.currentModel.shoes;

        if ($rootScope.currentModel.uploadedBackImgName === undefined) {
            $rootScope.currentModel.uploadedBackImgName = "defaultFrontImage.jpg";
        } else
            $scope.shoes = $rootScope.currentModel.shoes;

        if($rootScope.currentModel.textColor !== undefined)
            {
                if($rootScope.currentModel.textColor === '#000000')
                    {
                        $scope.isBlack = true;
                    }else
                        {
                            $scope.isBlack = false;//Meaning white
                        }
            }else
                {
                    $rootScope.currentModel.textColor = '#000000';
                    $scope.isBlack = true;
                }
        

        $scope.quantity = $rootScope.currentModel.quantity;
        $scope.heightDisplay = $rootScope.formatHeight($scope.height);
        $scope.fronImageName = $rootScope.currentModel.uploadedFrontImgName;       
        
    };


    $scope.onModelPersonDetailsChange = function () {

        $scope.$log = "onModelPersonDetailsChange()";
        $timeout(function () {
            $scope.$root.$broadcast("updateModelDetails", { //Broadcast to update model details 

            });
        }, 1000);

    };

    $scope.onModelPersonImageChange = function () {

        $scope.$log = "onModelPersonImageChange()";
        $timeout(function () {
            $scope.$root.$broadcast("updateMainImage", { //Broadcast to update the main image in svg

            });
        }, 1000);

    };



    $scope.onModelNameChange = function () {

        $scope.onModelPersonDetailsChange();
    };

    $scope.onHairChange = function () {

        $rootScope.currentModel.hair = $scope.hairColor;
        $scope.onModelPersonDetailsChange();
    };

    $scope.onEyesChange = function () {

        $rootScope.currentModel.eyes = $scope.eyesColor;
        $scope.onModelPersonDetailsChange();
    };

    $scope.onHeightChange = function () {

        $rootScope.currentModel.height = $scope.height;
        $scope.heightDisplay = $rootScope.formatHeight($scope.height);
        $scope.onModelPersonDetailsChange();
    };

    $scope.onBustChange = function () {

        $rootScope.currentModel.bust = $scope.bust;
        $scope.onModelPersonDetailsChange();
    };

    $scope.onWaistChange = function () {

        $rootScope.currentModel.waist = $scope.waist;
        $scope.onModelPersonDetailsChange();
    };

    $scope.onHipsChange = function () {

        $rootScope.currentModel.hips = $scope.hips;
        $scope.onModelPersonDetailsChange();
    };

    $scope.onShoesChange = function () {

        $rootScope.currentModel.shoes = $scope.shoes;
        $scope.onModelPersonDetailsChange();
    };


    $scope.onQuantityChange = function () {

        $rootScope.currentModel.quantity = $scope.quantity;
    };
    
    
    $scope.onTextColorChange = function () {

        if($scope.isBlack === true)
            {
                $rootScope.currentModel.textColor = '#000000';
            }else
                {
                    $rootScope.currentModel.textColor = '#FFFFFF';
                }
        $scope.$root.$broadcast("onTextColorChange", { //Re render the text in the new color

            });
    };


    $scope.onEmailPdfChange = function () {

        if ($scope.emailPdf === "Yes") {
            $scope.footerButtonText = "Save/Submit";
        } else {
            $scope.footerButtonText = "Save";
        }
    };



    $scope.setLoginState = function () {


        $scope.userName = '';
        $scope.password = '';
        $scope.popUpState = "loginState";
        $rootScope.popUpState = "loginState";
        $scope.states.editState = false;
        $scope.states.summaryState = false;
        $scope.states.selectForEdit = false;
        $scope.states.showLoginState = true;
        $scope.states.showComfortIndicatorState = false;
        document.getElementById('dot1').className = "dot-number dot-active";
        document.getElementById('dot2').className = "dot-number";
        document.getElementById('dot3').className = "dot-number";
        document.getElementById('dot1caption').className = "dotCaption dot-caption-active";
        document.getElementById('dot2caption').className = "dotCaption dot-caption-inactive";
        document.getElementById('dot3caption').className = "dotCaption dot-caption-inactive";
        $scope.footerButtonText = "Login";
        var popContent = document.getElementsByClassName("ngdialog-content");
        /*TweenLite.to(popContent, 1, {marginLeft:"auto", 
                                    marginRight:"auto"});*/
    };


    $scope.setEditState = function () {
        console.log("aahi to ave che"+$rootScope.authenticated);
        if ($cookieStore.get("userlogin") === true) {
            $scope.popUpState = "editState";
            $rootScope.popUpState = "editState";
            document.getElementById('dot1').className = "dot-number";
            document.getElementById('dot2').className = "dot-number dot-active";
            document.getElementById('dot3').className = "dot-number";
            document.getElementById('dot1caption').className = "dotCaption dot-caption-inactive";
            document.getElementById('dot2caption').className = "dotCaption dot-caption-active";
            document.getElementById('dot3caption').className = "dotCaption dot-caption-inactive";
            $scope.footerButtonText = "Next";
            $scope.states.editState = true;
            $scope.states.summaryState = false;
            $scope.states.selectForEdit = false;
            $scope.states.showLoginState = false;
            $scope.states.showComfortIndicatorState = false;
        }

        /*var popContent = document.getElementsByClassName("ngdialog-content");
        TweenLite.to(popContent, 1, {marginLeft:"10%"});*/
    };

    $scope.setSelectForEditState = function () {

        var model;
        var modelPerson;
        $scope.rowCollection = [];
        document.getElementById('dot1').className = "dot-number";
        document.getElementById('dot2').className = "dot-active";
        document.getElementById('dot3').className = "dot-number";
        document.getElementById('dot1caption').className = "dotCaption dot-caption-inactive";
        document.getElementById('dot2caption').className = "dotCaption dot-caption-active";
        document.getElementById('dot3caption').className = "dotCaption dot-caption-inactive";
        $scope.states.editState = false;
        $scope.states.summaryState = false;
        $scope.states.showLoginState = false;
        $scope.states.selectForEdit = true;
        $scope.states.showComfortIndicatorState = false;
        $scope.footerButtonText = "Edit";
        popUpService.getAllModelPersons(function (results) {
            $scope.$log = "getAllModelPersons callbackFunction";
            angular.forEach(results, function (result) {

                model = result;
                modelPerson = new ModelPerson();
                modelPerson.castObjectToModelPerson(model)
                $rootScope.modelPersons.push(modelPerson);
                $scope.rowCollection.push(modelPerson)

            });
        });
    };

    $scope.setSummaryState = function () {

        if ($cookieStore.get("userlogin") === true) {
            document.getElementById('dot1').className = "dot-number";
            document.getElementById('dot2').className = "dot-number";
            document.getElementById('dot3').className = "dot-number dot-active";
            document.getElementById('dot1caption').className = "dotCaption dot-caption-inactive";
            document.getElementById('dot2caption').className = "dotCaption dot-caption-inactive";
            document.getElementById('dot3caption').className = "dotCaption dot-caption-active";
            $scope.states.editState = false;
            $scope.states.summaryState = true;
            $scope.states.selectForEdit = false;
            $scope.states.showLoginState = false;
            $scope.states.showComfortIndicatorState = false;
            $scope.onEmailPdfChange();

        }
    };

    //When user clicks one of the two buttons in the pop up "New and Edit" this is event handler for edit, sets the select for editing state
    $scope.onEditButtonClick = function () {
        $scope.setSelectForEditState();
    };

    $scope.onEditModelPersonButtonClick = function (row) {
        $scope.$root.$broadcast("reset", { //Reset the image manipulation controls and svgCtrl
        });
        $rootScope.currentModel = row;
        $scope.setEditState();
        $scope.setUpPopUp();
        $scope.onModelPersonDetailsChange();
        $scope.$root.$broadcast("setUpModelImageForEditing", { //Broadcast the event that the model person has been selected for editing, receiver in svgCtrl

        });
    };


    //ON NEW BUTTON CLICK
    $scope.onNewButtonClick = function () {
        $scope.$root.$broadcast("reset", { //Reset the image manipulation controls and svgCtrl
        });
        $rootScope.currentModel = new ModelPerson();
        $rootScope.currentModel.createNewModelPerson();
        $scope.$root.$broadcast("resetDropZoneEvent", {
            //Reset the drop zone in the pop up by sending message to the dropzone controller 
        });
        $scope.setUpPopUp();
        $scope.setEditState();
        $scope.textColor = $scope.textColors[1];//Black
        $scope.onTextColorChange();
    };


    //Function will change the state of the pop up dependably on in which state the pop up is now,
    //Will call the service to create or update 
    $scope.onNextSubbmitClick = function () {
        var emailPdf = false;

        if ($scope.states.showLoginState === true) {
            if ($scope.userName == '' || $scope.password == '') {
                $scope.error = 'Please enter user name and password';
            } else {
                $scope.error = '';
                $scope.login({
                    username: $scope.userName,
                    password: $scope.password
                }, $scope.loginCallback);
            }

        } else if ($scope.states.editState === true) {

            $scope.setSummaryState();
        } else if ($scope.states.selectForEdit === true) {
            $scope.onEditModelPersonButtonClick($scope.row);
        } else if ($scope.states.summaryState === true) {
            //Save/ close / update

            if ($scope.emailPdf == 'Yes') {
                emailPdf = true;
            } else {
                emailPdf = false;
            }

            if ($rootScope.currentModel.id === undefined) {
                $scope.$root.$broadcast("saveParameters", { //Save changed properties in the current model

                });
                popUpService.createNewModelPerson($rootScope.currentModel, function (response) {

                    $scope.$log = "createNewModelPerson callbackFunction";
                    $scope.setSelectForEditState();

                    if (emailPdf === true) {
                        $scope.$root.$broadcast("generatePdf", { //Broadcast the set canvas and ball images event, listened for in svgCtrl

                            sendEmail: emailPdf
                        });
                    }

                });
            } else {

                $scope.$root.$broadcast("saveParameters", { //Save changed properties in the current model

                });
                popUpService.updateModelPerson($rootScope.currentModel, function (response) {

                    $scope.$log = "updateModelPerson callbackFunction";
                    $scope.setSelectForEditState();

                    if (emailPdf === true) {
                        $scope.$root.$broadcast("generatePdf", { //Broadcast the set canvas and ball images event, listened for in svgCtrl

                            sendEmail: emailPdf
                        });
                    }
                });
            }
        }
    };

    $scope.onLoginKeyPress = function (event) {
        if (event.charCode === 13) //If the user hits enter while in one of the login input fields 
        {
            $scope.login({
                username: $scope.userName,
                password: $scope.password
            }, $scope.loginCallback);
        }
    };

    $scope.login = function (data, callback) {

        $scope.error = '';
        loginService.login(data, function (response) {

            if (response.length != 0) {

                if (response[0].password === data.password) {

                    //Set user in root
                    $rootScope.user = {
                        userName: response[0].first_name,
                        email: response[0].email
                    };
                    $cookieStore.put("userlogin",true);
                    //$rootScope.authenticated = true;
                    if ($rootScope.requestedPath === "" || $rootScope.requestedPath === '/cards') {
                        $location.path('/cards');
                        callback({
                            status: 'success',
                            path: $rootScope.requestedPath
                        });
                    } else {
                        $location.path($rootScope.requestedPath);
                        callback({
                            status: 'success',
                            path: $rootScope.requestedPath
                        });
                    }
                } else {

                    $cookieStore.put("userlogin",false);
                    callback({
                        status: 'error',
                        message: 'Your user name or password was incorrect'
                    });
                }


            } else {
                callback({
                    status: 'error',
                    message: 'Your user name or password was incorrect'
                });
            }

        }); //call reset reset password service
    };

    $scope.loginCallback = function (response) {

        if (response.status === 'success') {
            $scope.userName = '';
            $scope.password = '';
            $scope.setEditState();
            $scope.setUpPopUp();
        } else {
            $scope.error = response.message;
        }

    };


    $scope.logOutBtnClick = function () {

        $cookieStore.put("userlogin",false);
        $location.path("/login");
        $scope.setLoginState();
    };


    /* Receives the event instructing the canvas to reset */
    $scope.$on("frontImageUploadSuccess", function (event, args) {

        if (args.uploadedImageName !== undefined) {

            $rootScope.currentModel.setUploadedImgName(args.uploadedImageName.mainPic);
            $scope.fronImageName = args.uploadedImageName.mainPic;
            $rootScope.currentModel.scale = undefined;
            $scope.onModelPersonImageChange();
        };

    });



    $scope.setPopUpState = function () {

        console.log("popUp setPopUpState " + $rootScope.popUpState);
        $scope.error = '';
        $scope.success = '';
        if ($rootScope.popUpState === "loginState") {
            $timeout(function () {

                $scope.setLoginState();
            }, 500);

        }
        if ($rootScope.popUpState === "editState") {
            $timeout(function () {
                $scope.setEditState();
            }, 500);

            $scope.setUpPopUp();
        }
    };



    $scope.$on('scrollbar.show', function () {
        console.log('Scrollbar show');
    });

    $scope.$on('scrollbar.hide', function () {
        console.log('Scrollbar hide');
    });
    
    
    // fired when table rows are selected
$scope.$watch('modelPersons', function(row) {
  // get selected row
  row.filter(function(r) {
     if (r.isSelected) {
       //console.log(r);
         $scope.row = r;
     }
  })
}, true);


}]);