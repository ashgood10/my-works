(function() {
	"use strict";
	angular.module('Me')
		.directive('tooltip', tooltip);

	tooltip.$inject = ['$timeout'];
	function tooltip($timeout) {
		return {
			restrict: 'A',
			link: link,
			scope: {
				tooltip :'@',
			}
		};

		function link(scope, element, attr) {
			element.on('mouseover', function() {
				var position = element[0].getBoundingClientRect();
				var tooltipString = "<span class='tooltip text-uppercase " + scope.tooltipPlacement +"' style= 'top:"+ (position.top+30) + "px;left:" + (position.left) + "px;position:absolute;'>" + scope.tooltip + "</span>";
					$("body").append(tooltipString);
			});
			element.on('mouseout', function() {
				$('.tooltip').remove();
			});
			$(document).on('click', function() {
				$('.tooltip').remove();
			});
		}
	}
})();