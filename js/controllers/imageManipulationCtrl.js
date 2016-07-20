'use strict';


app.controller('imageManipulationCtrl', ['$scope', '$rootScope',
     function ($scope, $rootScope) {


        var maxScaleRotation = 180; //For Scale and rotation
        var minRotation = -90; //For rotation control
        var maxRotation = 360; //For Scale and rotation
        //var imageManipulation = document.getElementById('imageManipulation');
        /* imageManipulation.addEventListener('mouseenter', function (){

                                    $scope.onMouseEnterDotControl();
                                 });
          imageManipulation.addEventListener('mouseleave', function (){

                                    $scope.onMouseLeaveDotControl();
                                 });*/
        var controlsContainer = document.getElementById('imageManipulation');
        var svgNode = document.getElementById('svg-node');
        var scaleContainer = document.getElementById('scaleContainer');
        var rotationContainer = document.getElementById('rotationContainer');
        var circle1 = document.getElementById('circle1');
        var circle2 = document.getElementById('circle2');
        //var tracker = ThrowPropsPlugin.track(circle1, "x,y"),
        // var dialValue = document.getElementById('dial-value');

        /*var info = document.getElementById('info');*/
        var nullObject = document.getElementById('null-object');
        var dialLine = document.getElementById('dial-line');
        var dialLineBg = document.getElementById('dial-line-bg');
        var outline = document.getElementById('outline');

        var dialLine_3_ = document.getElementById('dial-line_3_');
        var dialLineBg_3_ = document.getElementById('dial-line-bg_3_');
        var outline_3_ = document.getElementById('outline_3_');
        var draggable;
        var originalScaleValue, initialPercent, unscalledImageWidth, unscalledImageHeight, scaleFactor;
        var controlsContainerCenterY;

        $scope.showDot = false;

        $scope.setDefaultState = function () {

            draggable = Draggable.get("#circle1");

            controlsContainerCenterY = controlsContainer.clientHeight / 2 + 40; //40 is padding of the cards container - to nivelate clientY mouse event difference to the middle 

                TweenLite.to(controlsContainer, 1, {alpha:0}); 

            controlsContainer.addEventListener('mouseover', function (event) {

                TweenLite.to(controlsContainer, 1, {alpha:1}); 
            });

            controlsContainer.addEventListener('mousemove', function (event) {

                //console.log("MOUSE OVER CONTROLS CONTAINER Y " + event.layerY);
                if (event.clientY < controlsContainerCenterY) {
                    //is above the middle
                    // console.log("MOUSE OVER MIDDLE CONTAINER Y " + event.layerY); 
                    //console.log("MOUSE OVER MIDDLE CONTAINER  CLIENT Y " + event.clientY);
                    TweenLite.to(scaleContainer, 0, {
                        zIndex: 95
                    });
                    TweenLite.to(rotationContainer, 0, {
                        zIndex: 90
                    });
                } else {
                    //is below middle
                    //console.log("MOUSE UNDER MIDDLE CONTAINER Y " + event.layerY);
                    TweenLite.to(rotationContainer, 0, {
                        zIndex: 95
                    });
                    TweenLite.to(scaleContainer, 0, {
                        zIndex: 90
                    });
                }
            });

            controlsContainer.addEventListener('mouseout', function () {

                TweenLite.to(controlsContainer, 1, {alpha:0}); 
                //console.log("mouse leave");
            });

            //add event listener for mouse over the svg node square
            //Then check which control should be enabled and disabled
            /*svgNode.addEventListener('mousemove', function (event) {                  
                console.log(event);
            });*/


            // Add event listeners to control the z-indexes of the controls 
            /* scaleContainer.addEventListener('mouseenter', function () {
                  
                  TweenLite.to(scaleContainer, 0, {zIndex:95}); 
                  TweenLite.to(rotationContainer, 0, {zIndex:90}); 
                  //console.log("mouse enter");
              });  
              
              outline.addEventListener('mouseenter', function () {
                  
                  TweenLite.to(scaleContainer, 0, {zIndex:95}); 
                  TweenLite.to(rotationContainer, 0, {zIndex:90}); 
                  //console.log("mouse enter");
              });
              
              scaleContainer.addEventListener('mouseout', function () {
                  
                  TweenLite.to(scaleContainer, 0, {zIndex:90}); 
                  //console.log("mouse leave");
              });
            outline.addEventListener('mouseout', function () {
                  
                  TweenLite.to(scaleContainer, 0, {zIndex:90}); 
                  //console.log("mouse leave");
              });
              
              
              //Add event listeners to the rotation controls
              
              rotationContainer.addEventListener('mouseover', function () {
                  
                  TweenLite.to(rotationContainer, 0, {zIndex:95}); 
                  TweenLite.to(scaleContainer, 0, {zIndex:90}); 
                  //console.log("rotationContainer enter");
              });  
              
              outline.addEventListener('mouseover', function () {
                  
                  TweenLite.to(rotationContainer, 0, {zIndex:95}); 
                  TweenLite.to(scaleContainer, 0, {zIndex:90}); 
                  //console.log("rotationContainer enter");
              });
              
              rotationContainer.addEventListener('mouseout', function () {
                  
                  TweenLite.to(rotationContainer, 0, {zIndex:90}); 
                  //console.log("rotationContainer leave");
              });
            outline.addEventListener('mouseout', function () {
                  
                  TweenLite.to(rotationContainer, 0, {zIndex:90}); 
                  //console.log("rotationContainer leave");
              });*/
        };

        TweenMax.set(document.body, {
            userSelect: 'none'
        })

        TweenMax.set(dialLine, {
            drawSVG: '0%'

        });

        TweenMax.set(outline, {

            alpha: 0.8
        });
        TweenMax.set(dialLineBg, {

            alpha: 0.25
        });

        TweenMax.set(dialLine_3_, {
            drawSVG: '0%'

        });

        TweenMax.set(outline_3_, {

            alpha: 0.8
        });
        TweenMax.set(dialLineBg_3_, {

            alpha: 0.25
        });


        TweenMax.set([svgNode], {
            position: 'absolute',
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,

        });


        TweenMax.set([scaleContainer], {
            position: 'absolute',
            left: '50%',
            top: '41%',
            xPercent: -50,
            yPercent: -50,

        });

        TweenMax.set([rotationContainer], {
            position: 'absolute',
            left: '50%',
            top: '61%',
            xPercent: -50,
            yPercent: -50,

        });

        TweenMax.set(svgNode, {
            rotation: '-=0'
        })

        TweenMax.set(nullObject, {
            position: 'absolute',
            x: 0
        })


        Draggable.create(circle1, {
            bounds: circle2,
            throwProps: true,
            onDragStart: function () {
                TweenLite.ticker.addEventListener("tick", updateImageDragPosition);
            },
            onClick: function (event) {
                //console.log("clicked" + event);               
            },
            onThrowComplete: function () {
                TweenLite.ticker.removeEventListener("tick", updateImageDragPosition);
                //TweenLite.to(circle1, 1, {x:0, y:0});
                $scope.$root.$broadcast("dotInteractionEnd", {
                    //Inform the svg controller that the user finished dragging the dot
                });
            }
        });

        //Called when user drags the scale controll 
        function updateImageDragPosition() {

            $scope.$root.$broadcast("updateImagePositionOnDotInteraction", {

                valueX: Math.round(draggable.x),
                valueY: Math.round(draggable.y)
            });
        }


        $scope.onMouseEnterDotControl = function () {

            console.log("onMouseEnterDotControl");
            $scope.showDot = true;
        };

        $scope.onMouseLeaveDotControl = function () {

            console.log("onMouseLeaveDotControl");
            $scope.showDot = false;
        };




        //
        //----------------- SCALE VALUES CONTROLS

        Draggable.create(scaleContainer, {
            //trigger:scaleContainer,
            bounds: {
                maxRotation: maxScaleRotation,
                minRotation: 0
            },
            type: 'rotation',
            throwProps: true,
            onDrag: dragScaleControlsUpdate,
            onThrowUpdate: dragScaleControlsUpdate,
            onThrowComplete: function () {
                $scope.$root.$broadcast("scaleInteractionEnd", {
                    //Inform the svg controller that the user finished scalling image
                });
            }
        })


        //Called when user drags the scale controll 
        function dragScaleControlsUpdate() {

            var percent;
            var val = (scaleContainer._gsTransform.rotation / maxScaleRotation);
            val = val.toFixed(2);
            console.log("Scale value " + val);
            if (val != NaN) {
                percent = val * 100;
                percent = (percent > 100) ? 100 : percent;
                percent = (percent < 0) ? 0 : percent;
                $scope.updateScaleControls(percent);
                $scope.broadcastScaleValue(parseFloat(percent.toFixed(2)));
            }
        }


        //Updates the visual position of the scale controls
        $scope.updateScaleControls = function (percent) {

            TweenMax.set(dialLine, {
                drawSVG: percent + '%'
            })
            TweenMax.set(outline, {
                drawSVG: '100% ' + percent + '%'
            })

            //var prc = Math.floor(percent);
            //dialValue.innerHTML = prc;
            //scaleContainer._gsTransform.rotation = prc;
            //console.log("Rotation" + scaleContainer._gsTransform.rotation);              
        };


        //Informs the canvasCtrl about the change of the scale value
        $scope.broadcastScaleValue = function (scaleNumber) {

            var value, fixed;
            
            if (scaleNumber > initialPercent) {
                    value = scaleNumber - initialPercent;
                    originalScaleValue = originalScaleValue - value / scaleFactor;

                } else {
                    value = initialPercent - scaleNumber;
                    originalScaleValue = originalScaleValue + value / scaleFactor;
                }

                initialPercent = scaleNumber;
                fixed = parseFloat(originalScaleValue * 100 / 100);


            if (fixed != "NaN") {
                $scope.$root.$broadcast("userScaleValueChange", {

                    scaleValue: fixed.toFixed(2),
                    scaleFactor: scaleFactor
                })
            }
        };



        //Sets the scale controls when the image is loaded in canvasCtrl
        $scope.$on("setScaleDotAndRotationControls", function (event, args) {

            var scaleValue, percent;
            if (args.scaleValue != undefined) {

                originalScaleValue = parseFloat(args.scaleValue);
                $scope.setScaleFactor(originalScaleValue);
                $rootScope.currentModel.scaleFactor = scaleFactor;

                if (originalScaleValue === 0) {
                    percent = 100;
                } else {
                    percent = originalScaleValue;
                }
                                
                initialPercent = percent;
                TweenLite.to(scaleContainer, 1, {rotation:percent});
                $scope.updateScaleControls(percent);                      

                /*initialPercent = percent;
                var rotate = (maxScaleRotation / 100) * percent;
                TweenLite.to(scaleContainer, 1, {
                            rotation: rotate
                });                                
                $scope.updateScaleControls(100 - originalScaleValue);*/
            }

            $scope.setRotation(args.rotation);

        });


        $scope.setScaleFactor = function (scaleValue) {

            //scaleFactor = $rootScope.currentModel.scaleFactor;
            var value;
            scaleFactor = 10;
            if (scaleValue > 0) {
                value = 100 - scaleValue;
            }

            while (scaleValue - value / scaleFactor < 0) {
                scaleFactor += 10;
            }
            
            console.log("SCALE FACTOR " + scaleFactor);
        };




        //
        //----------------- ROTATION

        Draggable.create(rotationContainer, {
            //trigger:scaleContainer,
            bounds: {
                maxRotation: maxRotation,
                minRotation: 0
            },
            type: 'rotation',
            throwProps: true,
            onDrag: rotationControlsUpdate,
            onThrowUpdate: rotationControlsUpdate
        })


        $scope.setRotation = function (rotationValue) {

            console.log("ROTATION VALUE " + rotationValue);
            var value;

            if (rotationValue === 0) {
                value = maxRotation / 2;
            } else {
                value = maxRotation / 2 + rotationValue;
            }


            TweenLite.to(rotationContainer, 1, {
                rotation: value
            });
            var prc = value / maxRotation * 100;
            $scope.updateRotationControls(prc);
            console.log("Rotation" + rotationContainer._gsTransform.rotation);
        };


        //Called when user drags the scale controll 
        function rotationControlsUpdate() {

            var percent;
            var val = (rotationContainer._gsTransform.rotation);
            val = val.toFixed(2);
            console.log("Rotation value " + val);
            /* if(val != NaN)
                 {                    
                     percent = val * 100
                     percent = (percent > 100) ? 100 : percent;
                     percent = (percent < 0) ? 0 : percent;                  
                 }*/

            $scope.$root.$broadcast("rotationChange", { //Broadcast the set canvas and ball images event, listened for in svgCtrl

                rotation: val - (maxRotation / 2)
            });


            var prc = val / maxRotation * 100;
            $scope.updateRotationControls(prc);
        }



        //Updates the visual position of the scale controls
        $scope.updateRotationControls = function (percent) {

            TweenMax.set(dialLine_3_, {
                drawSVG: percent + '%'
            })
            TweenMax.set(outline_3_, {
                drawSVG: '100% ' + percent + '%'
            })

        };


        $scope.$on("reset", function (event, args) {

            originalScaleValue = 0;
            initialPercent = 0;

            TweenMax.set(dialLine, {
                drawSVG: 0 + '%'
            })
            TweenMax.set(outline, {
                drawSVG: '100% ' + 0 + '%'
            })


            //Reset rotation 
            var prc = (maxRotation / 2) / maxRotation * 100;
            $scope.updateRotationControls(prc);


            //Reset positioning dot 
            TweenLite.to(circle1, 1, {
                x: 0,
                y: 0
            });

        });



        //INITIALIZE 
        $scope.setDefaultState();

    }]);