(function() {
	"use strict";

	angular.module('My.Auth', [])
	.config(authConfig);

	authConfig.$inject = ['$routeProvider'];

	function authConfig($routeProvider) {
		$routeProvider.when('/auth', {
			templateUrl: 'modules/auth/auth.modal.html',
			controller: 'AuthController',
			controllerAs: 'auvm'
		});
	}
})();