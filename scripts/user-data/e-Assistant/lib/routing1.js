var routeModule = angular.module('routeModule', ['myModule','ngRoute']);
routeModule.config(['$routeProvider',   function($routeProvider) 
                    { 
			$routeProvider.when('/main', {
				
				templateUrl:'LoginDiv',
				controller: 'getControl'
			}).
			otherwise({redirectTo: '/main'});
		}]);