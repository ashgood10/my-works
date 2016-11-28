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
		}

		function switchColor() {
			_this.pickColor = !_this.pickColor;
		}
	}
})();