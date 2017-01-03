(function() {
	"use strict";

	angular.module('Me')
	.config(AboutMeConfig);

	AboutMeConfig.$inject = ['$routeProvider'];

	function AboutMeConfig($routeProvider) {
		$routeProvider.when('/education', {
			templateUrl: 'modules/about-me/education.html',
			controller : 'AboutMeController',
			controllerAs : 'amvm'
		})
		.when('/jobs', {
			templateUrl: 'modules/about-me/jobs.html',
			controller : 'AboutMeController',
			controllerAs : 'amvm'
		})
		.when('/awards', {
			templateUrl: 'modules/about-me/awards.html',
			controller : 'AboutMeController',
			controllerAs : 'amvm'
		});
	}
})();