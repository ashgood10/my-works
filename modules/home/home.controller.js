(function() {
	"use strict";

	angular.module('My.Home', [])
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$rootScope', 'myConfig'];

	function HomeController($rootScope, myConfig) {
		var _this = this;
		_this.$rootScope = $rootScope;
		_this.myConfig = myConfig;
	}
})();