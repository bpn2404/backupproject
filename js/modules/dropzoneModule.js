'use strict';

app.directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);
      
      scope.$on("resetDropZoneEvent", function(event, args) {       
        //Reset the drop zone
        dropzone.removeAllFiles( true );
    });

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

app.controller('SomeCtrl', ['$scope', '$rootScope', 'uploadService',  function ($scope, $rootScope, uploadService) {
  $scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
      'url': 'api/upload/upload.php'
    },
    'eventHandlers': {
        'drop': function (file, xhr, formData) {
        $scope.$root.$broadcast("reset", { //Reset the image manipulation controls and svgCtrl

        });
          $scope.$root.$broadcast("resetDropZoneEvent", {
           //Reset the drop zone in the pop up by sending message to the dropzone controller 
        });
          $scope.$log = "addedfile";
      },
      'addedfile': function (file, xhr, formData) {          
          $scope.$log = "addedfile";
      },
      'sending': function (file, xhr, formData) {
          $scope.$log = "sending";
          if (this.files.length > 1) {
                this.removeFile(this.files[0]);
            }
      },
      'success': function (file, response) {
          $scope.$log = "success";
          var serverResponse = JSON.parse(response);          
          $scope.$root.$broadcast("frontImageUploadSuccess", { //Broadcast the set canvas and ball images event, listened for in canvasCtrl

              uploadedImageName: {
                    mainPic: serverResponse.fileName
                }
              
            });
      }
    }
  };   
    
}]);