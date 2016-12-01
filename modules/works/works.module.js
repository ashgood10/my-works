(function() {
	"use strict";
	angular.module('My.Works', [])
	.config(routeConfig);

	routeConfig.$inject = ['$routeProvider'];
	
	function routeConfig($routeProvider) {
		$routeProvider.when('/works', {
			templateUrl: '/modules/works/works.html',
			controller: 'WorksController',
			controllerAs: 'wvm'
		})
	}
})();