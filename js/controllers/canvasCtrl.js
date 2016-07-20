'use strict';

app.controller('canvasCtrl', ['$scope', '$rootScope', '$timeout', '$http', 'ModelPerson', function ($scope, $rootScope, $timeout, $http, ModelPerson) {

    var mainCanvas;
    var mainContext;
    var mainCanvasWidth, mainCanvasHeight, maximumImageDisplayWidth, maximumImageDisplayHeight;
    var cursorCanvas;
    var cursorContext;
    var mainImage = new Image();
    var mainImageX, mainImageY, imageCenterX, imageCenterY, scalledWidth, scalledHeight;
    var defaultCanvasBgd = 'images/defaultFrontImage.jpg';
    var defaultImagePath = 'images/uploads/';
    var defaultImageName = "defaultFrontImage.jpg";
    var displayScale;
    var modelNameYPositionFromBottom = 80;
    var mainImagePaddngSides = 100;
    var mainImagePaddngTopBottom = 50;
    var hiveY = 60;
    var hiveX;
    var hiveFontSize = 36;
    var modelNameX, modelNameY;
    var details, detailsX, detailsY;
    var clippingMaskX, clippingMaskY;
    var dotX, dotY;


    $scope.UrlExists = function (urlSup) {
        $http({
            method: 'GET',
            url: urlSup
        }).then(function successCallback(response) {
            return true;
        }, function errorCallback(response) {
            return false;
        });
    }

    //Create a new model person when entering the cards screen
    $scope.initializeNewModelPerson = function () {

        $rootScope.currentModel = new ModelPerson();
        $rootScope.currentModel.createNewModelPerson();
    };


    /*
     * Function gets the background canvas and cursor canvas elements and their contexts.
     * @method setCanvas
     */
    $scope.setCanvas = function () {

        $scope.initializeNewModelPerson();
        mainCanvas = document.getElementById('mainCanvas');
        mainContext = mainCanvas.getContext('2d');
        
        mainCanvasWidth = mainCanvas.width;
        mainCanvasHeight = mainCanvas.height;
        maximumImageDisplayWidth = mainCanvasWidth - mainImagePaddngSides; //100 is 50 padding each side
        maximumImageDisplayHeight = mainCanvasHeight - modelNameYPositionFromBottom - (hiveY + hiveFontSize) - mainImagePaddngTopBottom;        
        
        var hiveWidth = mainContext.measureText("THE HIVE").width;
        hiveX = (mainCanvasWidth - hiveWidth) / 2;
        console.log("hive X: " + hiveX);
        modelNameX = mainCanvasWidth / 2 - mainContext.measureText($rootScope.currentModel.modelName).width / 2;
        modelNameY = mainCanvasHeight - modelNameYPositionFromBottom;

        clippingMaskX = (mainCanvas.width - maximumImageDisplayWidth) / 2;
        clippingMaskY = hiveY + hiveFontSize;        
    };


    /*
     * Function requests redraw the canvas with the details taken from the currentModel
     * @method drawCanvasWithImageAndDetails
     */
    $scope.drawCanvasWithImageAndDetails = function (resetImage) {

        /*mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

        mainContext.fillStyle = "#d3dde3";
        mainContext.fillRect(0, 0, mainCanvasWidth, mainCanvasHeight);*/
        $scope.setCanvas();
        
        if (resetImage === undefined) {
            mainImage = new Image();
            mainImage.addEventListener('load', function () {

                $scope.setImageScale();
                $scope.updateModelDisplayDetails();
                $scope.drawBackgroundImageAndText();
            });
        };


        if ($rootScope.currentModel.uploadedFrontImgName != defaultImageName) {

            mainImage.src = defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;

        } else {
            mainImage.src = defaultCanvasBgd;
        }
    };

    //SET IMAGE SCALE   
    $scope.setImageScale = function () {
        
        displayScale = $rootScope.currentModel.scale;

        if (displayScale === undefined) {
            displayScale = $scope.getInitialImageScaleToFit(mainImage.width, mainImage.height);
            $scope.broadcastScaleValue(displayScale, $rootScope.currentModel.scaleFactor, $rootScope.currentModel.imageX, $rootScope.currentModel.imageY);
        }

        if (displayScale === 0) {
            scalledWidth = mainImage.width;
            scalledHeight = mainImage.height;
        } else {
            scalledWidth = mainImage.width / displayScale;
            scalledHeight = mainImage.height / displayScale;
        }
    };

    //Function updates the details description when it's required
    $scope.updateModelDisplayDetails = function () {

        var height, bust, waist, hips, shoes, hair, eyes;
        var feet, inches;
        
        feet = Math.floor($rootScope.currentModel.height);
        inches = Math.round(($rootScope.currentModel.height - feet) * 12);
        height = String(feet + "'" + inches);
        
        bust = $rootScope.currentModel.bust;
        waist = $rootScope.currentModel.waist;
        hips = $rootScope.currentModel.hips;
        shoes = $rootScope.currentModel.shoes;
        hair = $rootScope.currentModel.hair;
        eyes = $rootScope.currentModel.eyes;

        details = String("Height " + height + " | Bust " + bust + " | waist " + waist + " | Hips " + hips + " | Shoes " + shoes + " | Hair " + hair + " | Eyes " + eyes);
        detailsX = (mainCanvasWidth - mainContext.measureText(details).width) / 2;
        console.log("details X: " + detailsX);
        detailsY = modelNameY + 25;
    };



    $scope.drawBackgroundImageAndText = function () {

        mainContext.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);

        //BACKGROUND COLOR
        mainContext.fillStyle = "#d3dde3";
        mainContext.fillRect(0, 0, mainCanvasWidth, mainCanvasHeight);

        //THE HIVE TEXT
        mainContext.font = "36px Georgia";
        mainContext.fillStyle = 'black';
        mainContext.fillText("THE HIVE", hiveX, hiveY);

        //MODEL NAME TEXT
        mainContext.font = "20px Georgia";
        mainContext.fillStyle = 'black';

        mainContext.fillText($rootScope.currentModel.modelName, modelNameX, modelNameY);

        //MODEL DETAILS
        mainContext.font = "12px Georgia";
        mainContext.fillStyle = 'black';
        mainContext.fillText(details, detailsX, detailsY);

        mainContext.save();
        //Clipping mask
        mainContext.beginPath();
        mainContext.rect(clippingMaskX, clippingMaskY, maximumImageDisplayWidth, maximumImageDisplayHeight); // 36 is the hive font size 
        mainContext.closePath();
        mainContext.clip();

        if (mainImageX != undefined && mainImageY != undefined) //set to undefined on reset
        {
            mainContext.drawImage(mainImage, mainImageX, mainImageY, scalledWidth, scalledHeight);

        } else {
            imageCenterX = mainCanvasWidth / 2 - scalledWidth / 2;
            imageCenterY = hiveY + hiveFontSize;
            mainImageX = imageCenterX
            mainImageY = imageCenterY;
            mainContext.drawImage(mainImage, imageCenterX, imageCenterY, scalledWidth, scalledHeight);
        }

        mainContext.restore();
    };


    //------------------------------------------------ 
    // UTILS 


    //Function return the initial displayScale for the image to fit the within maximum width and maximumHeight
    $scope.getInitialImageScaleToFit = function (imgWidth, imageHeight) {
        var alteredWidth, alteredHeight, alteredScale;


        if (imgWidth > maximumImageDisplayWidth) {
            alteredScale = 0.1;
            alteredWidth = imgWidth / alteredScale;
            while (alteredWidth > maximumImageDisplayWidth) {
                alteredScale += 0.1;
                alteredWidth = imgWidth / alteredScale;
            }

            alteredHeight = imageHeight / alteredScale;
            if (alteredHeight > maximumImageDisplayHeight) {

                while (alteredHeight > maximumImageDisplayHeight) {
                    alteredScale += 0.1;
                    alteredHeight = imageHeight / alteredScale;
                }

            }
            
            return alteredScale;
        } else {
            return 0;
        }
    };




    //------------------------------------------------ 
    //EVENTS LISTENERS 


    $scope.addCanvasEventListenrs = function () {

        if (hasEventListeners === false) {

            hasEventListeners = true;
            mainImage.addEventListener('load', function () {


            });
        }

    };


    //------------------------------------------------ 
    //INTERFACE FUNCTIONS

    $scope.onGeneratePdf = function () {

        $scope.$log = "generatePdf()";
        // only jpeg is supported by jsPDF
        var imgData = mainCanvas.toDataURL("image/jpeg", 1.0);
        var jspdf = new jsPDF();


        jspdf.addImage(imgData, 'JPEG', 0, 0);
        //var pdf = jspdf.output();
        jspdf.save("download.pdf");

    };


    //Function resets the canvas to it's initial state 
    $scope.reset = function () {
        //mainImage = new Image();
        displayScale = undefined;
        mainImageX = undefined;
        mainImageY = undefined;
        dotX = undefined;
        dotY = undefined;
    };


    $scope.broadcastScaleValue = function (scaleNumber, sFactor, imageX, imageY) {

        $scope.$root.$broadcast("setScaleAndDotWithValues", {

            scaleValue: scaleNumber,
            scaleFactor: sFactor,
            imageX: imageX,
            imageY: imageY
        })
    };

    //----------------------------------------------------
    // Events 


    //Receives an event from the createGameCtrl when the user selected the main picture and ball picture
    //Sets the canvas with the main picture and flips the flag to indicate that the ball will be now placed on the picture.
    $scope.$on("generatePdf", function (event, args) {

        $scope.onGeneratePdf();

    });

    //When the values in popUp are changed then this function requests the redrawing of the canvas
    $scope.$on("redrawCanvas", function (event, args) {

        modelNameX = mainCanvasWidth / 2 - mainContext.measureText($rootScope.currentModel.modelName).width / 2;
        $scope.updateModelDisplayDetails();
        $scope.drawCanvasWithImageAndDetails(false);
    });

    /* Receives the event instructing the canvas to reset */
    $scope.$on("resetCanvasEvent", function (event, args) {

        if (args.resetCanvas !== undefined) {

            $scope.reset();
        };

    });


    $scope.$on("userScaleValueChange", function (event, args) {

        if (args.scaleValue != undefined) {

            console.log("userScaleValueChange:: " + args.scaleValue);
            if (args.scaleValue === 100) {
                displayScale = 0;
            } else {
                displayScale = args.scaleValue;
            }

            $rootScope.currentModel.scale = displayScale;
            $rootScope.currentModel.scaleFactor = args.scaleFactor;
            $scope.setImageScale();
            $scope.drawBackgroundImageAndText();
        }

    });

    $scope.$on("updateImagePositionOnDotInteraction", function (event, args) {


        var valueX, valueY;

        if (args.valueX != undefined && args.valueY != undefined) {                

            if(dotX != undefined && dotY != undefined)
                {
                    if(args.valueX != 0)
                        {
                            valueX = args.valueX - dotX;
                            dotX = args.valueX;
                            mainImageX = Math.floor(mainImageX + valueX);
                        }else
                            {
                                dotX = args.valueX;
                            }        
                    
                    if(args.valueY != 0)
                        {
                            valueY = args.valueY - dotY;
                            dotY = args.valueY;
                            mainImageY = Math.floor(mainImageY + valueY);
                        }else
                            {
                                dotY = args.valueY;
                            }
                    
                     
                }else
                    {
                        dotX = args.valueX;
                        valueX = args.valueX;
                        dotY = args.valueY;  
                        valueY = args.valueY;
                    }
            
                console.log("args.valueX: " + args.valueX);
                console.log("args.valueY: " + args.valueY);                
                
                //mainImageY = Math.floor(mainImageY + dotY);
                $rootScope.currentModel.imageX = mainImageX;
                $rootScope.currentModel.imageY = mainImageY;
                console.log("mainImageX: " + mainImageX);
                console.log("mainImageY: " + mainImageY);
                window.requestAnimationFrame($scope.drawBackgroundImageAndText);            
        }

    });


    $scope.setCanvas();

}]);