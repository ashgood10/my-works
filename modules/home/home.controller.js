/*
Home Module
Author: Ashish Dwivedi
*/

(function() {
	"use strict";
	angular.module('My.Home', [])
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$location'];
	function HomeController($scope, $location) {
		var _this = this;

		// Variables
		_this.layoutHorizontal = true;
		_this.pickColor = false;

		// Functions
		_this.goToHome = goToHome;
		_this.switchLayout = switchLayout;
		_this.switchColor = switchColor;

		function goToHome() {
			$location.path('/');
		}

		function switchLayout() {
			_this.layoutHorizontal = !_this.layoutHorizontal;
			$('.home.name-header').css({'line-height' : '100px', 'transition' : 'all ease-in 0.3s'});
		}

		function switchColor() {
			_this.pickColor = !_this.pickColor;
			if($(".social-connect").hasClass('animation')) {
				$('.social-connect').css({'left' : '50vw', 'animation' : ''});
				$(".social-connect").removeClass("animation");
			} else {
				$('.social-connect').css({'left' : '105vw', 'animation' : 'rotatecolor',  'transition' : 'all ease-in 0.3s'});
				$(".social-connect").addClass("animation");
			}
		}
	}
})();