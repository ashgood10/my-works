/*
	My.Works Module
	Author: Ashish Dwivedi
*/
(function() {
	"use strict";
	angular.module('My.Works', ['ngRoute'])
	.config(WorksConfig);

	WorksConfig.$inject = ['$routeProvider'];

	function WorksConfig($routeProvider) {
		// $routeProvider.when('/works', {
		// 	templateUrl: 'my-works/my-works.html',
		// 	controller: 'WorksController',
		// 	controllerAs: 'wvm'
		// });
	}
})();