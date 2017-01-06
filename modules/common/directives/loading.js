(function() {
	"use strict";

	angular.module('Me')
	.directive('customLoading', customLoading);

	customLoading.$inject = ['$timeout'];

	function customLoading($timeout) {
		return {
			restrict : "EA",
			templateUrl : 'modules/common/loading.html',
			controller : controller,
			scope : {
				loadingText : "@",
				pageLoading : "="
			}
		}

		function controller($scope) {
			var scope = $scope;
			loadWithDelay();
			var loadInterval = setInterval(function() {
				for(var i=0; i<scope.loadingText.length; i++) {
					$('.loading-letter-'+ i).css('display', 'none');
				}
				loadWithDelay();
			}, scope.loadingText.length*200);

			function loadWithDelay() {
				var timeoutArray = [];
				$timeout(function() {
					for(var i=0; i<scope.loadingText.length; i++) {
						if(i === 0) {
							$('.loading-letter-'+ i).css('display', 'inherit');
						} else {
							timeoutArray.push(i);
							$timeout(function() {
								$('.loading-letter-'+ timeoutArray[0]).css('display', 'inherit');
								timeoutArray.shift();
							}, i*200);
						}
					}
				});
			}

			scope.$on('$destroy', function () {
				clearInterval(loadInterval);
			});
		}
	}
})();