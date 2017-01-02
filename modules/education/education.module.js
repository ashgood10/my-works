(function() {
	"use strict";

	angular.module('Me')
	.config(EducationConfig);

	EducationConfig.$inject = ['$routeProvider'];

	function EducationConfig($routeProvider) {
		$routeProvider.when('/education', {
			templateUrl: 'modules/education/education.html',
			controller : 'EducationController',
			controllerAs : 'evm'
		});
	}
})();