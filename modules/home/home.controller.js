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
		_this.goToHome = goToHome;

		function goToHome() {
			$location.path('/');
		}
	}
})();