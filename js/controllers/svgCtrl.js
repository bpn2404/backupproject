'use strict';
app.controller('svgCtrl', ['$scope', '$rootScope','$cookieStore', '$timeout', '$http', '$location', 'ModelPerson', 'Base64Service', 'cardsScreenService', function ($scope, $rootScope,$cookieStore, $timeout, $http, $location, ModelPerson, Base64Service, cardsScreenService) {

    var mainSvg;
    var mainSvgWidth, mainSvgHeight;
    var maximumImageDisplayWidth = 600;
    var maximumImageDisplayHeight = 587;
    var detailsTextSvg, modelNameSvg;
    var mainImage;
    var mainImageUrl;
    var scalledWidth, scalledHeight, unscalledWidth, unscalledHeight;
    var defaultCanvasBgd = 'images/defaultFrontImage.jpg';
    var defaultImagePath = 'images/uploads/';
    var defaultImageName = "defaultFrontImage.jpg";
    var pdfOutFilePath = "../../images/uploads/";
    var displayScale;
    var modelNameYPositionFromBottom = 130;
    var mainImagePaddngSides = 100;
    var mainImagePaddngTopBottom = 50;
    var mask;
    var hiveY = 83;
    var hiveX;
    var hiveFontSize;
    var modelNameX, modelNameY = 0;
    var details;
    var detailsX, detailsY;
    var detailsSpaceBetweenName = 40;
    var clippingMaskX;
    var clippingMaskY = 165;
    var dotX, dotY = 0;
    var tmpImage = new Image();
    var subHeadignText = 'MANAGEMENT';
    var subHeadingSvg;
    var subHeadingX;
    var subHeadingY = 115;
    var secondSubHeadignText = 'LONDON';
    var secondSubHeadingSvg;
    var secondSubHeadingX;
    var secondSubHeadingY = 140;
    var pdfEdgesPadding = 20;
    var leftClip, rightClip, topClip, bottomClip;
    var centerX, centerY, constantCenterX, constantCenterY, distanceX, distanceY;
    var mainImageGroup, mainImageGroupX, mainImageGroupY;
    var isContinouslyDraggingDot = false;
    var helperCircle;
    var accelerate;
    var textColor = '#000000';
    var topHeadlineSvg;

    $scope.getHostUrl = function () {

        var absUrl = $location.absUrl();
        var path = $location.path();
        return absUrl.replace(path, "/");

    };
if($cookieStore.get("userlogin")){
            console.log("openEditPopUp()");
            $scope.$root.$broadcast("openPopUp", {
                state:"editState"
            });
        }

    //Create a new model person when entering the cards screen
    $scope.initializeNewModelPerson = function () {

        console.log("MAIN SVG CTRL initializeNewModelPerson()");
        $rootScope.currentModel = new ModelPerson();
        $rootScope.currentModel.createNewModelPerson();
    };


    //Function is called when the user enters the cards screen after the successful log in
    //It will draw the main svg elements in their initial state and the position
    $scope.initializeScreen = function () {

        var bbox;
        mainSvg = Snap('#mainSvg');
        mainSvgWidth = mainSvg.attr("width");
        mainSvgHeight = mainSvg.attr("height");


        //BACKGROUND 
        var bgdRect = mainSvg.rect(0, 0, mainSvgWidth, mainSvgHeight).attr({
            fill: '#d3dde3'
        });


        //MAIN IMAGE
        mainImage = mainSvg.image(defaultCanvasBgd, 0, 0, 100, 100).attr({
            id: 'mainPic'
        });

        mainImageGroup = mainSvg.group().append(mainImage);

        mainImageGroup.append(mainImage);
        
       /* helperCircle = mainSvg.circle(100, 50, 10);
        mainImageGroup.append(helperCircle);
        
        helperCircle.attr({
            stroke: 'red',
            fill: 'yellow'
        });
*/
        mainImageGroup.attr({
            id: "mainImgGroup",
            transform: 'translate(0, 0)'
        });


        //CLIPPING MASK workaround
        leftClip = mainSvg.rect(0, 0, 10, mainSvgHeight).attr({
            fill: '#d3dde3'
        });

        rightClip = mainSvg.rect(0, 0, 10, mainSvgHeight).attr({
            fill: '#d3dde3'
        });

        topClip = mainSvg.rect(0, 0, mainSvgWidth, 10).attr({
            fill: '#d3dde3'
        });

        bottomClip = mainSvg.rect(0, 0, mainSvgWidth, 10).attr({
            fill: '#d3dde3'
        });


        //THE HIVE HEADLINE
        topHeadlineSvg = mainSvg.text(10, hiveY, ['THE HIVE']).attr({
            id: 'cardHeadline',
            fontName: 'helvetica',
            fontSize: '50px',
            fill: textColor,
        });

        bbox = topHeadlineSvg.getBBox();
        //console.log(bbox.width);
        hiveX = (mainSvgWidth - bbox.width) / 2;
        topHeadlineSvg.attr({
            x: hiveX
        });


        //SUB HEADING 
        subHeadingX = 0;
        subHeadingSvg = mainSvg.text(subHeadingX, subHeadingY, subHeadignText).attr({
            id: 'subHeading',
            fontName: 'helvetica',
            fontSize: '16px',
            fill: textColor
        });

        bbox = subHeadingSvg.getBBox();
        subHeadingX = (mainSvgWidth - bbox.width) / 2;
        subHeadingSvg.attr({
            x: subHeadingX,
            y: subHeadingY
        });

        secondSubHeadingX = 0;
        secondSubHeadingSvg = mainSvg.text(secondSubHeadingX, secondSubHeadingY, [secondSubHeadignText]).attr({
            id: 'secondSubHeading',
            fontName: 'helvetica',
            fontSize: '12px',
            fill: textColor
        });

        bbox = secondSubHeadingSvg.getBBox();
        secondSubHeadingX = (mainSvgWidth - bbox.width) / 2;
        secondSubHeadingSvg.attr({
            x: secondSubHeadingX,
            y: secondSubHeadingY
        });

        //SET THE MAXIMUM CLIP PATH WIDTH AND HEIGHT
        mainImagePaddngSides = mainSvgWidth - maximumImageDisplayWidth;
        clippingMaskX = (mainSvgWidth - maximumImageDisplayWidth) / 2;

        //CLIPPING MASK                 
        var width = mainImagePaddngSides / 2;
        var topHeight = clippingMaskY;
        var bottomHeight = mainSvgHeight - (clippingMaskY + maximumImageDisplayHeight);
        var bottomY = mainSvgHeight - bottomHeight;

        leftClip.attr({
            width: width
        });
        rightClip.attr({
            width: width,
            x: mainSvgWidth - width
        });

        topClip.attr({
            height: topHeight
        });
        bottomClip.attr({
            height: bottomHeight,
            y: bottomY
        });
        
        $scope.calculateConstantsXandY();

    };
    
    
    $scope.calculateConstantsXandY = function () {
        
        constantCenterX = mainSvgWidth / 2;
        constantCenterY = mainSvgHeight / 2;
        
    }
    

    /*
     * Function requests redraw the canvas with the details taken from the currentModel
     * @method drawCanvasWithImageAndDetails
     */
    $scope.drawDetails = function (resetImage) {

        console.log("MAIN SVG CTRL drawDetails()");
        if ($rootScope.currentModel.uploadedFrontImgName != defaultImageName) {

            //mainImageUrl = $scope.getHostUrl() + defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;
            mainImageUrl = defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;


        } else {

            //mainImageUrl = $scope.getHostUrl() + defaultCanvasBgd;
            mainImageUrl = defaultCanvasBgd;


        }

        if (resetImage === undefined) {

            tmpImage = new Image();
            tmpImage.addEventListener('load', onInitializationImageLoaded);

        };


        function onInitializationImageLoaded() {

            console.log("MAIN SVG CTRL onInitializationImageLoaded()");
            mainImage = document.getElementById('mainPic');
            tmpImage.removeEventListener('load', onInitializationImageLoaded);
            //Get unscalled width and height                
            unscalledWidth = tmpImage.width;
            unscalledHeight = tmpImage.height;
            $scope.setImageScale();
            $scope.broadcastScaleValue($rootScope.currentModel.scale, $scope.getInitialImageScaleToFit(unscalledWidth, unscalledHeight));
            $scope.drawModelDetails();

            mainImageGroupX = parseFloat($rootScope.currentModel.groupX);
            mainImageGroupY = parseFloat($rootScope.currentModel.groupY);
            $scope.updateMainImageScale();           
            $scope.updateRotation();
            $scope.updatePosition();
            accelerate = $scope.calculateAcceleration();
            var box = mainImage.getBBox();
            centerX = box.cx;
            centerY = box.cy; 
            distanceX = undefined;
            distanceY = undefined;      
        };


        if ($rootScope.currentModel.uploadedFrontImgName != defaultImageName) {

            //tmpImage.src = $scope.getHostUrl() + defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;
            tmpImage.src = defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;

        } else {

            tmpImage.src = mainImageUrl;
        }
    };



    //SET IMAGE SCALE   
    $scope.setImageScale = function () {

        console.log("MAIN SVG CTRL setImageScale()");
        displayScale = parseFloat($rootScope.currentModel.scale);

        if (isNaN(displayScale) || displayScale === undefined) {
            displayScale = $scope.getInitialImageScaleToFit(unscalledWidth, unscalledHeight);
            scalledWidth = unscalledWidth / displayScale;
            scalledHeight = unscalledHeight / displayScale;
            mainImageGroupX = (mainSvgWidth - scalledWidth) / 2;
            mainImageGroupY = clippingMaskY;
            $rootScope.currentModel.groupX = mainImageGroupX;
            $rootScope.currentModel.groupY = mainImageGroupY;
        }

        if (displayScale === 0) {
            scalledWidth = unscalledWidth;
            scalledHeight = unscalledHeight;
            mainImageGroupX = parseFloat($rootScope.currentModel.groupX);
            mainImageGroupY = parseFloat($rootScope.currentModel.groupY);
        } else {
            scalledWidth = unscalledWidth / displayScale;
            scalledHeight = unscalledHeight / displayScale;
            mainImageGroupX = parseFloat($rootScope.currentModel.groupX);
            mainImageGroupY = parseFloat($rootScope.currentModel.groupY);
        }

        if ($rootScope.currentModel.groupX === 0 && $rootScope.currentModel.groupY === 0) {
            mainImageGroupX = (mainSvgWidth - scalledWidth) / 2;
            mainImageGroupY = clippingMaskY;
        }

        $rootScope.currentModel.scale = displayScale;        
    };

    
    //Changes the color of the text in the SVG to the supplied color
    //@param newColor i.e. #000000
    $scope.changeTextColor = function (newColor) {

        textColor = newColor;
        topHeadlineSvg.attr({
            fill: textColor
        });
        
        subHeadingSvg.attr({
            fill: textColor
        });

        secondSubHeadingSvg.attr({
            fill: textColor
        });
        $scope.updateModelDisplayDetails();
    };


    //Function updates the details description when it's required
    $scope.updateModelDisplayDetails = function () {

        var bbox;

        modelNameSvg.attr({
            text: $rootScope.currentModel.modelName
        });

        bbox = modelNameSvg.getBBox();

        modelNameX = (mainSvgWidth - bbox.width) / 2;
        modelNameY = clippingMaskY + maximumImageDisplayHeight + 50;
        modelNameSvg.attr({
            x: modelNameX,
            y: modelNameY,
            fill: textColor
        });

        details = $scope.getDetailsArray();
        detailsTextSvg.attr({
            text: details
        });

        var length = details.length;
        var counter = 1;
        var selectP1 = 'tspan:nth-of-type(';
        var iPlusOne;

        for (var i = 0; i < length; i++) {
            iPlusOne = i + 1;
            if (counter === 1) {
                counter++;
                detailsTextSvg.select(selectP1 + iPlusOne + ')').attr({
                    fill: textColor,
                    fontWeight: 'bold',
                    fontName: 'helvetica'
                });
            } else if (counter === 2) {
                counter++;
                detailsTextSvg.select(selectP1 + iPlusOne + ')').attr({
                    fill: textColor,//fill: 'rgb(97, 99, 110)', //same as #61636E
                    fontName: 'helvetica'
                });
            } else if (counter === 3) {
                counter = 1;
                detailsTextSvg.select(selectP1 + iPlusOne + ')').attr({
                    fill: textColor,
                    fontWeight: 'bold',
                    fontName: 'helvetica'
                });
            }
        }

        bbox = detailsTextSvg.getBBox();

        detailsX = (mainSvgWidth - bbox.width) / 2;
        detailsY = modelNameY + bbox.height + detailsSpaceBetweenName;
        detailsTextSvg.attr({
            x: detailsX,
            y: detailsY
        });
    };

    //Function updates the details description when it's required
    $scope.getDetailsArray = function () {

        var height, bust, waist, hips, shoes, hair, eyes;

        height = $rootScope.formatHeight($rootScope.currentModel.height);
        bust = $rootScope.currentModel.bust;
        waist = $rootScope.currentModel.waist;
        hips = $rootScope.currentModel.hips;
        shoes = $rootScope.currentModel.shoes;
        hair = $rootScope.currentModel.hair;
        eyes = $rootScope.currentModel.eyes;

        return ["Height ", height, " | ", "Bust ", bust + '"', " | ", "Waist ", waist + '"', " | ", "Hips ", hips + '"', " | ", "Shoes ", shoes + '"', " | ", "Hair ", hair, " | ", "Eyes ", eyes];
    };


    $scope.updateMainImageScale = function () {

        mainImage = Snap('#mainPic');
        mainImage.attr({
            width: scalledWidth,
            height: scalledHeight
        });
    };


    $scope.updateRotation = function () {
               
     mainImage = Snap('#mainPic');
        var trans = "rotate(" + $rootScope.currentModel.rotation + "," + centerX + "," + centerY + ")";
        mainImage.attr({
            transform: trans
        });
    };

    
    $scope.updatePosition = function () {

        mainImageGroup = Snap('#mainImgGroup');
        var mtx = new Snap.Matrix();
        mtx.translate(mainImageGroupX, mainImageGroupY);
        mainImageGroup.transform(mtx);       
    };


    //Function updates the displayed image url and calls the function to update the image on displayed on the screen.
    $scope.updateMainImageUrl = function () {

        console.log("MAIN SVG CTRL updateMainImageUrl()");
        mainImageUrl = defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;
        var tempMainImg = document.getElementById("mainPic");
        tempMainImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mainImageUrl);
        mainImage.attr({
            src: mainImageUrl
        });
        tmpImage = new Image();
        tmpImage.addEventListener('load', onUpdateUrlLoadComplete);
        tmpImage.src = mainImageUrl;
    };


    function onUpdateUrlLoadComplete() {

        console.log("MAIN SVG CTRL onUpdateUrlLoadComplete()");
        tmpImage.removeEventListener('load', onUpdateUrlLoadComplete);
        //Get unscalled width and height                
        unscalledWidth = tmpImage.width;
        unscalledHeight = tmpImage.height;
        $scope.setImageScale();
        $scope.broadcastScaleValue($rootScope.currentModel.scale, $scope.getInitialImageScaleToFit(unscalledWidth, unscalledHeight));

        mainImageGroupX = parseFloat($rootScope.currentModel.groupX);
        mainImageGroupY = parseFloat($rootScope.currentModel.groupY);
        $scope.updateMainImageScale();        
        $scope.updateRotation();
        $scope.updatePosition();
        var box = mainImage.getBBox();
        centerX = box.cx;
        centerY = box.cy; 
        distanceX = undefined;
        distanceY = undefined;
        accelerate = $scope.calculateAcceleration();
    };


    $scope.drawModelDetails = function () {

        //MODEL NAME
        modelNameX = 0;
        modelNameY = clippingMaskY + maximumImageDisplayHeight + 50;
        modelNameSvg = mainSvg.text(modelNameX, modelNameY, [$rootScope.currentModel.modelName]).attr({
            id: 'modelName',
            fontName: 'helvetica',
            fontSize: '20px',
            fill: textColor,
            fontWeight: 'bold'
        });
        //modelNameX = (mainSvgWidth - modelNameSvg.node.clientWidth) / 2;


        detailsX = 0;
        detailsY = modelNameY + modelNameSvg.node.clientHeight + detailsSpaceBetweenName;
        details = $scope.getDetailsArray();
        detailsTextSvg = mainSvg.text(detailsX, detailsY, details).attr({
            id: 'modelDetails',
            fontName: 'helvetica',
            fontSize: '14px'
        });

        $scope.updateModelDisplayDetails();
    };


    //------------------------------------------------ 
    // UTILS 

    $scope.setRotationCenterXAndY = function () {
                        
        var box = mainImage.getBBox();
        var newCenterX = box.cx;
        var newCenterY = box.cy;
        var distanceDifX, distanceDifY; 
        console.log("OLD CENTER X: " + centerX + " NEW CENTER X: " + newCenterX);
        console.log("OLD CENTER Y: " + centerY + " NEW CENTER Y: " + newCenterY);
        
        console.log("SVG CENTER X: " + constantCenterX);
        console.log("SVG CENTER Y: " + constantCenterY);
        
        if(distanceX === undefined)
            {
                
            }
        /*mainImageGroup = Snap('#mainImgGroup');
        var mtx = mainImageGroup.matrix;
        var difX, difY, visibleWidth, visibleHeight;
        
        
        if(mtx.e > clippingMaskX)//is mainImageGroupX higher than the clippingMaskX?
            {
                difX = mtx.e - clippingMaskX;
                visibleWidth = box.width - (box.width - maximumImageDisplayWidth - difX);
                centerX = visibleWidth / 2 - difX ;
                
                console.log("X is LARGER THAN THE CLIPPING MASK X");
            }else if(clippingMaskX > mtx.e && mtx.e >= 0)
                {
                    difX = clippingMaskX - mtx.e;
                    visibleWidth =  box.width - difX - (box.width - difX - maximumImageDisplayWidth);
                    centerX = (visibleWidth - difX) ;
                    console.log("X is SMALLER THAN THE CLIPPING MASK X");
                }*/
        
        
        
        
        /*if(mtx.f > clippingMaskY)//is mainImageGroupY higher than the clippingMaskY?
            {
                difY = mtx.f - clippingMaskY;
                offsetY =  maximumImageDisplayHeight - difY;
                centerY = (offsetY - difY) / 2;
                
                console.log("Y is LARGER THAN THE CLIPPING MASK Y");
            }else if(mtx.e < clippingMaskY)
                {
                    console.log("Y is SMALLER THAN THE CLIPPING MASK Y");
                }*/
        
        
        
        
        /*var mtx = new Snap.Matrix();
        mtx.translate(mainSvgWidth / 2, mainSvgHeight / 2);
        helperCircle.transform(mtx);  */  
        
        var box = mainImage.getBBox();
        centerX = box.cx;
        centerY = box.cy;

        
    };


    
    
    //Calculates the acceleration for positioning control 
    $scope.calculateAcceleration = function() {  
        mainImageGroup = Snap('#mainImgGroup');
        var box = mainImageGroup.getBBox();
        var speed = Math.abs(box.width / (maximumImageDisplayWidth / 4));
        //console.log("ACCELERATION " + speed);
        return speed;
    }
    
    


    //Function return the initial displayScale for the image to fit the within maximum width and maximumHeight
    $scope.getInitialImageScaleToFit = function (imgWidth, imageHeight) {
        
        //console.log("MAIN SVG CTRL getInitialScaleToFit()");
        
        var alteredWidth, alteredHeight, alteredScale;
        alteredScale = 0.01;

        if (imgWidth > maximumImageDisplayWidth || imageHeight > maximumImageDisplayHeight) {

            if (imgWidth >= imageHeight) {
                alteredWidth = imgWidth / alteredScale;

                while (alteredWidth > maximumImageDisplayWidth) {
                    alteredScale += 0.01;
                    alteredWidth = imgWidth / alteredScale;
                }

                alteredHeight = imageHeight / alteredScale;
                if (alteredHeight > maximumImageDisplayHeight) {

                    while (alteredHeight > maximumImageDisplayHeight) {
                        alteredScale += 0.01;
                        alteredHeight = imageHeight / alteredScale;
                    }

                }
            } else {
                alteredHeight = imageHeight / alteredScale;
                while (alteredHeight > maximumImageDisplayHeight) {
                    alteredScale += 0.01;
                    alteredHeight = imageHeight / alteredScale;
                }

                alteredWidth = imgWidth / alteredScale;
                if (alteredHeight > maximumImageDisplayHeight) {

                    while (alteredWidth > maximumImageDisplayWidth) {
                        alteredScale += 0.01;
                        alteredWidth = imgWidth / alteredScale;
                    }
                }
            }
            return alteredScale.toFixed(2);
        } else {
            return 0;
        }
    };




    //------------------------------------------------ 
    //EVENTS LISTENERS 





    //------------------------------------------------ 
    //INTERFACE FUNCTIONS

    /**
     * @param {SVGElement} svg
     * @param {Function} callback
     * @param {jsPDF} callback.pdf
     * */
    $scope.onGeneratePdf = function (svg) {

        svgAsDataUri(svg, {}, function (svg_uri) {
            var image = document.createElement('img');


            image.src = svg_uri;
            image.onload = function () {

                var width = image.width + (pdfEdgesPadding * 2);
                var height = image.height + (pdfEdgesPadding * 2);

                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var doc = new jsPDF('portrait', 'mm', [193, 246]);
                var dataUrl;

                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, (pdfEdgesPadding / 2), (pdfEdgesPadding / 2), image.width, image.height);
                //store the current globalCompositeOperation
                var compositeOperation = context.globalCompositeOperation;

                //set to draw behind current content
                context.globalCompositeOperation = "destination-over";

                //set background color
                context.fillStyle = "#FFFFFF";

                //draw background / rect on entire canvas
                context.fillRect(0, 0, width, height);
                dataUrl = canvas.toDataURL('image/jpeg', 1.0);
                doc.addImage(dataUrl, 'JPEG', 0, 0);
                doc.output('save', 'modelcard.pdf');
            }
        });
    }


    $scope.onGeneratePdf2 = function (svg, sendEmail) {

        var complience = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
        var find = ' '; //Space
        var re = new RegExp(find, 'g');
        var pdfName = $rootScope.currentModel.modelName.replace(re, '_') + '.pdf';
        cardsScreenService.processSvg(complience + svg, $rootScope.currentModel.uploadedFrontImgName, pdfName, sendEmail, $rootScope.user.email, $rootScope.user.userName, function (response) {
            
            console.log(response);
        });
    }


    //Function resets the canvas to it's initial state 
    $scope.reset = function () {
        console.log("MAIN SVG CTRL reset()");
        displayScale = undefined;
        unscalledWidth = undefined;
        unscalledHeight = undefined;
        scalledWidth = undefined;
        scalledHeight = undefined;
        mainImageGroupX = undefined;
        mainImageGroupY = undefined;
        dotX = undefined;
        dotY = undefined;
        $rootScope.currentModel.scale = undefined;
        $rootScope.currentModel.scaleFactor = undefined;
        $rootScope.currentModel.rotation = 0;
        $rootScope.currentModel.groupX = undefined;
        $rootScope.currentModel.groupY = undefined;
        $rootScope.currentModel.imageMatrix = undefined;
    };


    $scope.broadcastScaleValue = function (scaleNumber, scaleToFit) {

        console.log("MAIN SVG CTRL broadcastScaleValue()");
        $scope.$root.$broadcast("setScaleDotAndRotationControls", {

            scaleValue: scaleNumber,
            initialScaleToFit: scaleToFit,
            rotation: parseFloat($rootScope.currentModel.rotation)
        })
    };

    //----------------------------------------------------
    // Events 


    //Receives the click on the generete pdf button and triggers generating a pdf
    //It quickly changes the mainImage url for a moment so that the pdf generator can find the mainImage in the uploads folder
    $scope.$on("generatePdf", function (event, args) {

        var tempMainImg = document.getElementById("mainPic");
        //tempMainImg.setAttribute('xlink:href', pdfOutFilePath + $rootScope.currentModel.uploadedFrontImgName);
        tempMainImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', pdfOutFilePath + $rootScope.currentModel.uploadedFrontImgName);
        var html = document.getElementById('mainSvgWrapper').innerHTML;

        html = html.split("fontName").join("font-family"); //Could not set it vila Snap earlier on

        if (!(html.indexOf("xlink:href") > -1)) {
            html = html.split("href").join("xlink:href"); //Replace images href with xlink:href for Safari
        }


        var src = 'src="' + defaultImagePath + $rootScope.currentModel.uploadedFrontImgName + '"';
        html = html.split(src).join("");
        html = html.split("NS1:").join("");

        $scope.onGeneratePdf2(html, args.sendEmail); //tempMainImg.setAttribute('xlink:href', mainImageUrl);
        tempMainImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mainImageUrl);

    });

    //When the values in popUp are changed then this function requests the redrawing of the canvas
    $scope.$on("updateModelDetails", function (event, args) {

        $scope.updateModelDisplayDetails();
    });

    
    //
    $scope.$on("updateMainImage", function (event, args) {
        //console.log("MAIN SVG CTRL on upadateMainImage()");
        $scope.updateMainImageUrl();
    });

    
    /* Receives the event instructing the canvas to reset */
    $scope.$on("reset", function (event, args) {

        $scope.reset();
    });

    
    
    //
    $scope.$on("userScaleValueChange", function (event, args) {

        var tempScalledWidth, tempScalledHeight;
        var originalW, originalH, newW, newH, box;

        if (args.scaleValue != undefined) {

            mainImageGroup = Snap('#mainImgGroup');
            box = mainImageGroup.getBBox();
            originalW = box.width;
            originalH = box.height;
            tempScalledWidth = scalledWidth;
            tempScalledHeight = scalledHeight;

            //console.log("userScaleValueChange:: " + args.scaleValue);
            if (args.scaleValue === 100) {
                displayScale = 0;
            } else {
                displayScale = args.scaleValue;
            }
            $rootScope.currentModel.scale = displayScale;
            $rootScope.currentModel.scaleFactor = args.scaleFactor;
            $scope.setImageScale();
            $scope.updateMainImageScale();

            mainImageGroup = Snap('#mainImgGroup');
            var matrix = mainImageGroup.matrix;
            mainImageGroupX = matrix.e;
            mainImageGroupY = matrix.f;
           
            box = mainImageGroup.getBBox();
            newW = box.width;
            newH = box.height;

            if (newW !== originalW && newH !== originalH) {
                if (newW > originalW) {
                    mainImageGroupX = mainImageGroupX - (newW - originalW) / 2;
                    mainImageGroupY = mainImageGroupY - (newH - originalH) / 2;
                    //console.log("scale UP");
                } else if (newW < originalW) {
                    //console.log("scale DOWN");
                    
                    mainImageGroupX = mainImageGroupX + (originalW - newW) / 2;
                    mainImageGroupY = mainImageGroupY + (originalH - newH) / 2;
                    
                }

                mainImageGroupX = Math.round(mainImageGroupX);
                mainImageGroupY = Math.round(mainImageGroupY);
                $rootScope.currentModel.groupX = mainImageGroupX;
                $rootScope.currentModel.groupY = mainImageGroupY;
                $scope.updatePosition();
            }/*else
                {
                    //console.log("scale WIDTH AND HEIGHT SAME");
                }*/

        }
        
        $scope.setRotationCenterXAndY();        
    });


    //
    $scope.$on("scaleInteractionEnd", function (event, args) {
        
        $scope.setRotationCenterXAndY();
        accelerate = $scope.calculateAcceleration();
    });
    


    //
    $scope.$on("rotationChange", function (event, args) {

        if (args.rotation != undefined) {

            $rootScope.currentModel.rotation = Math.round(args.rotation);
            $scope.setRotationCenterXAndY(); 
            $scope.updateRotation();
        }

    });


    //
    $scope.$on("dotInteractionEnd", function (event, args) {

        isContinouslyDraggingDot = false;
        dotX = undefined;
        dotY = undefined;
        $scope.setRotationCenterXAndY();
    });


    //
    $scope.$on("updateImagePositionOnDotInteraction", function (event, args) {

        if (args.valueX !== undefined && args.valueY !== undefined) {

            if (args.valueX !== 0) {
                if (args.valueX > dotX) {
                    //console.log("-------RIGHT ");
                    mainImageGroupX += (args.valueX - dotX) * (accelerate);
                } else if (args.valueX < dotX) {
                    console.log("-----------LEFT ");
                    mainImageGroupX -= (dotX - args.valueX) * (accelerate);
                }

            }

            if (args.valueY !== 0) {
                if (args.valueY > dotY) {
                    //console.log("----------DOWN ");
                    mainImageGroupY += (args.valueY - dotY) * (accelerate);

                } else if (args.valueY < dotY) {
                    //console.log("---------UP ");
                    mainImageGroupY -= (dotY - args.valueY) * (accelerate);
                }

            }

            isContinouslyDraggingDot = true;
            dotX = args.valueX;
            dotY = args.valueY;

            mainImageGroupX = Math.round(mainImageGroupX);
            mainImageGroupY = Math.round(mainImageGroupY);
            $rootScope.currentModel.groupX = mainImageGroupX;
            $rootScope.currentModel.groupY = mainImageGroupY;
            $scope.updatePosition();
        }

    });


    //
    $scope.$on("saveParameters", function (event, args) {

        $scope.saveCurrentModelProperties();

    });
    
    $scope.$on("setUpModelImageForEditing", function (event, args) {

        //console.log("MAIN SVG CTRL  setUpModelImageForEditing()");
        mainImageUrl = defaultImagePath + $rootScope.currentModel.uploadedFrontImgName;
        var tempMainImg = document.getElementById("mainPic");
        tempMainImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mainImageUrl);
        mainImage.attr({
            src: mainImageUrl
        });
        tmpImage = new Image();
        tmpImage.addEventListener('load', $scope.setUpImageOnEdit);
        tmpImage.src = mainImageUrl;

    });
    
    
    
    $scope.setUpImageOnEdit = function () {

        tmpImage.removeEventListener('load', onUpdateUrlLoadComplete);
        //Get unscalled width and height                
        unscalledWidth = tmpImage.width;
        unscalledHeight = tmpImage.height;
        $scope.setImageScale();
        $scope.broadcastScaleValue($rootScope.currentModel.scale, $scope.getInitialImageScaleToFit(unscalledWidth, unscalledHeight));

        mainImageGroupX = parseFloat($rootScope.currentModel.groupX);
        mainImageGroupY = parseFloat($rootScope.currentModel.groupY);
        $scope.updateMainImageScale();
        
        mainImage = Snap('#mainPic');
        mainImage.attr({
            transform: $rootScope.currentModel.imageMatrix
        });
        
        $scope.updatePosition();
        $scope.changeTextColor($rootScope.currentModel.textColor);
    };
    
    
    

    $scope.saveCurrentModelProperties = function () {

         mainImage = Snap('#mainPic');
        var box = mainImage.getBBox();
        $rootScope.currentModel.imageMatrix = mainImage.matrix.toString();
        $rootScope.currentModel.groupX = Math.round(mainImageGroupX);
        $rootScope.currentModel.groupY = Math.round(mainImageGroupY);
        $rootScope.currentModel.scale = displayScale;
        $rootScope.currentModel.textColor = textColor;
    };

    //Receives the image from the pop up with the color to be set to the SVG text,
    $scope.$on("onTextColorChange", function (event, args) {

        $scope.changeTextColor($rootScope.currentModel.textColor);

    });
    

    //On enter state
    $scope.initializeNewModelPerson();
    $scope.initializeScreen();

}]);