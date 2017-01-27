(function() {
	"use strict";

	angular.module('My.Home', [])
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$rootScope', 'myConfig'];

	function HomeController($rootScope, myConfig) {
		var _this = this;
		_this.$rootScope = $rootScope;
		_this.myConfig = myConfig;

		$rootScope.switchColor = function() {
			$rootScope.pickColor = !$rootScope.pickColor;
			if($(".social-connect").hasClass('animation')) {
				var width = $('.social-connect').width();
				$('.social-connect').css({'left' : '44vw', 'animation' : ''});
				$(".social-connect").removeClass("animation");
			} else {
				$('.social-connect').css({'left' : '105vw', 'animation' : 'rotatecolor',  'transition' : 'all ease-in 0.3s'});
				$(".social-connect").addClass("animation");
			}
			if($rootScope.theme) {
				localStorage.setItem('user-theme', $rootScope.theme);
			}
		}

		$rootScope.clearTheme = function() {
			$rootScope.theme = '';
			localStorage.removeItem('user-theme');
		}
	}
})();