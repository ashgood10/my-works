(function() {
	"use strict";

	angular.module('My.Works.Details', [])
	.config(routeConfig);

	routeConfig.$inject = ['$routeProvider'];

	function routeConfig($routeProvider) {
		$routeProvider.when('/works/details', {
			templateUrl : 'modules/works/works-details/works-details.html',
			controller: 'WorksDetailsController',
			controllerAs: 'wdvm'
		});
	}
})();