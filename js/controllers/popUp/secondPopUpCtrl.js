'use strict';

angular.module('angularModalService')

app.controller('SecondPopUpController', [ '$scope', '$element', 'title',
		'close', function($scope, $element, title, close) {

			$scope.name = null;
			$scope.secPass = null;
			$scope.title = title;

			// This close function doesn't need to use jQuery or bootstrap,
			// because
			// the button has the 'data-dismiss' attribute.
			$scope.commitRestore = function() {
				close({
					name : $scope.name,
					secPass : $scope.secPass
				}, 500); // close, but give 500ms for bootstrap to animate
			};

			// This cancel function must use the bootstrap, 'modal' function
			// because
			// the doesn't have the 'data-dismiss' attribute.
			$scope.cancel = function() {

				// Manually hide the modal.
				$element.modal('hide');

				// Now call close, returning control to the caller.
				close({
					name : null,
					secPass : null
				}, 500); // close, but give 500ms for bootstrap to animate
			};

		} ]);