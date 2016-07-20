'use strict';


app.controller('mainCtrl', ['$scope', '$rootScope','$cookieStore', '$location', '$timeout', 'ngDialog',
     function ($scope, $rootScope,$cookieStore, $location, $timeout, ngDialog) {

        var draggableContent, myDraggable, isMouseDown, popUpContent;
   
        console.log("MAIN CONTROLLER ");

        $rootScope.isPopUpOpen = false;
        $rootScope.popUpState = "";
        var draggablePopUp, closeBtn;

        
        //Function formats the height which is passed here as a number i.e 6.75
        //and returns the string with value formated to inches i.e. 6’ 9” 
        $rootScope.formatHeight = function (height) {

            //console.log("HEIGHT IN " + height);
            var feet, inches;
            feet = Math.floor(height);
            inches = (height - feet) * 12;
            inches = parseFloat(inches);
            inches = parseFloat((Math.round(inches * 2) / 2).toFixed(1)); //To output i.e 5.5 instead of 5.3
            var roundedInches = Math.round(inches);

            //if true then the inches is not a whole number i.e. 4.5 so we return it as it is
            if (roundedInches > inches) {
                // console.log("HEIGHT OUT" + String(feet + "'" + inches + '"'));
                return String(feet + "'" + inches + '"');
            }

            //Otherwise return rounded inches so that there will be no .0 shown i.e instead 6’ 9.0” well output 6’ 9”  
            //console.log("HEIGHT roundedInches OUT " + String(feet + "'" + roundedInches + '"'));
            return String(feet + "'" + roundedInches + '"');

        };

        $scope.setIsPopUpOpen = function (value) {

            $rootScope.isPopUpOpen = value;
        };

        $scope.openLoginPopUp = function () {
            $rootScope.popUpState = "loginState";
            $scope.openModelSettingsPopUp();
        };

        //Function opens the ngDialog popUp and sets the timeout for a function 
        //to make the po up draggable once it appeared on the screen
        $scope.openModelSettingsPopUp = function () {
            $scope.$log = "openModelSettingsPopUp()";
            $rootScope.theme = 'ngdialog-theme-plain';

            if ($rootScope.isPopUpOpen != true) {
                $scope.setIsPopUpOpen(true);

                $timeout(function () {

                    $scope.makePopUpDraggable();
                }, 500);

                ngDialog.openConfirm({
                        template: 'partials/tpl/popUp.tpl.html',
                        controller: 'PopUpController',
                        controllerAs: 'ctrl',
                        className: 'ngdialog-theme-plain',
                        scope: $scope,
                        cache: false,
                        overlay: false,
                        preCloseCallback: function (value) {

                            /*var nestedConfirmDialog = ngDialog.openConfirm({
                                template: '<p>Are you sure you want to close the parent dialog?</p>' +
                                    '<div class="ngdialog-buttons">' +
                                    '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No' +
                                    '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes' +
                                    '</button></div>',
                                plain: true,
                                className: 'ngdialog-theme-default'
                            });*/
                            $scope.cleanUpDraggable();
                            return $scope.setIsPopUpOpen(false);
                        },
                        //scope: $scope
                    })
                    .then(function (value) {
                        console.log('resolved:' + value);
                        // Perform the save here
                    }, function (value) {
                        console.log('rejected:' + value);

                    });
            }


        };


        $scope.makePopUpDraggable = function () {
            console.log("makePopUpDraggable function call");
            draggableContent = document.getElementsByClassName("ngdialog-content");
            
            myDraggable = Draggable.create(draggableContent, {
                bounds: document.body,
                dragClickables: false,
                throwProps: true
                    /*onDragStart: function (event) {
                        console.log("POP UP DRAG START");
                        //TweenLite.ticker.addEventListener("tick", updateImageDragPosition);
                    },*/
                    /*onClick: function (event) {
                        console.log("POP UP ON CLICK");
                        if(event.currentTarget.className === "ngdialog-close")
                        {
                            console.log("Close pop up click");
                        }
                    }*/
                    /*onThrowComplete: function () {
                        console.log("POP UP DRAG COMPLETE");
                        //TweenLite.ticker.removeEventListener("tick", updateImageDragPosition);
                        //TweenLite.to(circle1, 1, {x:0, y:0});

                    }*/
            });

            myDraggable[0].disable(); //Dosable drag initialy until the user hovers over

            //Need to listen for mouse enter and leave ti disable or enable the drag
            draggablePopUp = document.getElementsByClassName("ngdialog ngdialog-no-overlay ngdialog-theme-plain ng-scope");
            closeBtn = document.getElementsByClassName("ngdialog-close");
            closeBtn[0].addEventListener('mouseover', $scope.onCloseBtnMouseOver);
            draggablePopUp[0].addEventListener('mouseover', $scope.onMouseOver);
            document.addEventListener('mousedown', $scope.onMouseDown);
            document.addEventListener('mouseup', $scope.onMouseUp);
            draggablePopUp[0].addEventListener('mouseout', $scope.onMouseOut);

        }

        //When user hovers over the pop up, then check if the myDraggable is not alredy enabled
        //Enables the drag on the pop if the user mose is over the pop up on mouse over 
        $scope.onMouseOver = function () {

            if (myDraggable !== undefined && !myDraggable[0].enabled()) {
                myDraggable[0].enable();
                //console.log("mouse enter");
            }
        };
         
         $scope.onCloseBtnMouseOver = function () {

            if (myDraggable !== undefined && myDraggable[0].enabled()) {
                myDraggable[0].disable();//Disable dragg on mouse over the close button
            }
        };

        $scope.onMouseDown = function () {

            isMouseDown = true;
            //console.log("mouse down");
        };

        $scope.onMouseUp = function () {

            isMouseDown = false;
            //console.log("mouse up");
        };


        //Disable the dragging functionality if the mouse is out of the pop up window 
        //or over one of the controls in the pop up i.e button or slider
        $scope.onMouseOut = function () {

            if (isMouseDown === false) {
                myDraggable[0].disable();
                //console.log("myDraggable[0].disable()");
            }
        };

        //Remove event listeners and kill current instance of the ngDialog pop up
        $scope.cleanUpDraggable = function () {

            draggablePopUp[0].removeEventListener('mouseover', $scope.onMouseOver);
            closeBtn[0].removeEventListener('mouseover', $scope.onCloseBtnMouseOver);
            document.removeEventListener('mousedown', $scope.onMouseDown);
            document.removeEventListener('mouseup', $scope.onMouseUp);
            draggablePopUp[0].removeEventListener('mouseout', $scope.onMouseOut);
            draggablePopUp = undefined;
            myDraggable[0].kill();
            myDraggable = undefined;
            //console.log("CLEAN UP DRAGGABLE");
        };



        /* Receives the event instructing the canvas to reset */
        $scope.$on("openPopUp", function (event, args) {

            console.log("on openPopUp event + state " + args.state);

            if (args.state !== undefined) {

                $rootScope.popUpState = args.state;
                $scope.openModelSettingsPopUp();

            };

        });


    }]);