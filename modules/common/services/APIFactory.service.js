(function() {
	"use strict";

	angular.module('Me')
	.factory('APIFactory', APIFactory);

	APIFactory.$inject = ['$http'];

	function APIFactory($http) {
		return {
			getAuthData : getAuthData,
			getProjects : getProjects,
			getDetailsOfProject : getDetailsOfProject
		}

		function getAuthData() {
			var promise = $http.get('scripts/user-data/auth.data.json');
			return promise;
		}

		function getProjects() {
			var promise = $http.get('scripts/user-data/my.works.json');
			return promise;
		}

		function getDetailsOfProject () {
			var promise = $http.get('scripts/user-data/my.works.details.json');
			return promise;
		}
	}
})();