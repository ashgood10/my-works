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
		_this.goToWorks = goToWorks;

		function goToHome() {
			$location.path('/');
		}

		function switchLayout() {
			if(_this.layoutHorizontal) {
				$timeout(function() {
					var menuItemWidth = $('.vertical .home-menu-header').outerWidth();
					$('.home.name-header').css({'width' : '18.5vw'});
					$('.home-label').css({'font-size' : '18px'});
					$('.name-header span').css({'font-size' : '18px'});
				}, 100);
				$('.home.name-header').css({'line-height' : '100px', 'transition' : 'all ease-in 0.3s'});
				$('body').addClass('vertical-layout');
			} else {
				$('.home.name-header').removeAttr('style');
				$('.home-label').removeAttr('style');
				$('.name-header span').removeAttr('style');
				$('.home.name-header').removeAttr('style');
				$('body').removeClass('vertical-layout');
			}
			_this.layoutHorizontal = !_this.layoutHorizontal;
		}

		$rootScope.switchColor = function() {
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
			$location.search({});
			$location.path('/works');
		}
	}
})();