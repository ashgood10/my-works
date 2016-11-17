angular.module('Me', [
	'ngRoute',
	'My.Works',
	'My.Profile'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home/home.html',
			controller: 'HomeController',
			controllerAs: 'hvm'
		})
		.when('/profile', {
			templateUrl: 'my-profile/my-profile.html',
			controller: 'ProfileController',
			controllerAs: 'pvm'
		})
		.when('/works', {
			templateUrl: 'my-works/my-works.html',
			controller: 'WorksController',
			controllerAs: 'wvm'
		})
		.otherwise({redirectTo: '/'})
		}
	]);