angular.module('Me', ['ngRoute',
					'My.Auth',
					'My.Menu',
					'My.Home', 
					'My.Works',
				])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/home/home.html',
			controller: 'HomeController',
			controllerAs: 'hvm'
		})
		$routeProvider.when('/profile', {
			templateUrl: 'profile/profile.html',
			controller: 'ProfileController',
			controllerAs: 'pvm'
		})
		.otherwise({redirectTo: '/'})
		}
	])
	.constant('myConfig' , {
		bgThemes : [
			'bg-black','bg-white','bg-blue',
			'bg-teal','bg-mars','bg-lime',
			'bg-green','bg-amber','bg-grey',
			'bg-indigo','bg-orange','bg-red']
	}).run(appRun);

	appRun.$inject = ['$location', '$rootScope'];
	function appRun($location, $rootScope) {
		$rootScope.$on('$routeChangeStart', function (event, current, next) {
			if(!sessionStorage.getItem('username')) {
				$location.path('/auth');
			}
		});
	}