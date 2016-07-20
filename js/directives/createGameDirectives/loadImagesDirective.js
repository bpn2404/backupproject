'use strict';
//Triggers loading the images to be selected for a game creation
app.directive('loadImagesDirective', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem, attrs) {

            $scope.loadImages();
        }
    }
});