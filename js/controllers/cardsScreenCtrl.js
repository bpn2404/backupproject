'use strict';


app.controller('cardsScreenCtrl', ['$scope', '$rootScope',
     function ($scope, $rootScope) {
           
       $scope.openEditPopUp = function () {
           
           $scope.$root.$broadcast("openPopUp", {
                
                state:"editState"
            }); 
       };
         
                            
         //Receives the click to generate pdf
         $scope.generatePdf = function () {
            $scope.$root.$broadcast("generatePdf", { //Broadcast the set canvas and ball images event, listened for in canvasCtrl

                                    sendEmail:true
            });
        };
       
                   
}]);