/*
Home Module
Author: Ashish Dwivedi
*/

(function() {
	"use strict";
	angular.module('My.Menu', [])
	.controller('MenuController', MenuController);

	MenuController.$inject = ['$scope', '$location', 'myConfig', '$timeout', '$rootScope'];

	function MenuController($scope, $location, myConfig, $timeout, $rootScope) {
		var _this = this;

		// Variables
		_this.layoutHorizontal = true;
		$rootScope.pickColor = false;
		_this.myConfig = myConfig;
		_this.$location = $location;

		// Functions
		_this.goToHome = goToHome;
		_this.switchLayout = switchLayout;
		_this.switchColor = switchColor;
		_this.goToWorks = goToWorks;

		function goToHome() {
			$location.path('/');
		}

		function switchLayout() {
			_this.layoutHorizontal = !_this.layoutHorizontal;
			$timeout(function() {
				var menuItemWidth = $('.vertical .home-menu-header').outerWidth();
				$('.home.name-header').css({'width' : '18.5vw'});
				$('.home-label').css({'font-size' : '18px'});
				$('.name-header span').css({'font-size' : '18px'});
			}, 350);
			$('.home.name-header').css({'line-height' : '100px', 'transition' : 'all ease-in 0.3s'});
		}

		function switchColor() {
			$rootScope.pickColor = !$rootScope.pickColor;
			if($(".social-connect").hasClass('animation')) {
				$('.social-connect').css({'left' : '50vw', 'animation' : ''});
				$(".social-connect").removeClass("animation");
			} else {
				$('.social-connect').css({'left' : '105vw', 'animation' : 'rotatecolor',  'transition' : 'all ease-in 0.3s'});
				$(".social-connect").addClass("animation");
			}
		}

		function goToWorks(proj) {
			$location.path('/works')
		}
	}
})();