angular.module('Me', ['ngRoute',
					'ngAnimate',
					'ui.bootstrap',
					'My.Auth',
					'My.Menu',
					'My.Home', 
					'My.Works',
					'My.Works.Details'
				])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/home/home.html',
			controller: 'HomeController',
			controllerAs: 'hvm'
		})
		$routeProvider.when('/profile', {
			templateUrl: 'modules/profile/profile.html',
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
			'bg-indigo','bg-orange','bg-red'],
		apiBase : "https://github.com/ashish-dwivedi/my-works/blob/master/",
		color : ['red', 'grass', 'blue', 'cyan', 'brown']
	}).run(appRun);

	appRun.$inject = ['$location', '$rootScope'];

	function appRun($location, $rootScope) {
		$rootScope.$on('$routeChangeStart', function (event, current, next) {
			var username = '';
			var cookies = document.cookie.split(';');
			angular.forEach(cookies, function(cookie) {
				if(cookie.indexOf('username_mw') !== -1) {
					username = cookie.substr(cookie.indexOf('=')+1, cookie.length);
				}
			});
			if(angular.isUndefined(username) || username === '') {
				$location.path('/auth');
			} else {
				if(localStorage.getItem('user-theme')) {
					$rootScope.theme = localStorage.getItem('user-theme');
				}
			}
		});
	}
