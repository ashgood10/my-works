(function() {
	"use strict";
	angular.module('Me')
		.directive('tooltip', tooltip);

	function tooltip() {
		return {
			restrict: 'A',
			link: link,
			scope: {
				tooltip :'@',
				tooltipPlacement: '@'
			}
		};

		function link(scope, element, attr) {
			var position = element[0].getBoundingClientRect();
			var tooltipString = "<span class='tooltip text-uppercase " + scope.tooltipPlacement +"' style= 'top:"+ (position.top+30) + "px;left:" + (position.left) + "px;position:absolute;'>" + scope.tooltip + "</span>";
			element.on('mouseover', function() {
				$("body").append(tooltipString);
			})
			element.on('mouseout', function() {
				$('.tooltip').remove();
			})
			$(document).on('click', function() {
				$('.tooltip').remove();
			})
		}
	}
})();