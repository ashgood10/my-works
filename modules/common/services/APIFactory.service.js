(function() {
	"use strict";

	angular.module('Me')
	.factory('apiFactory', apiFactory);

	apiFactory.$inject = ['$http'];

	function apiFactory($http) {
		return {
			getAuthData : getAuthData,
			getProjects : getProjects,
			getDetailsOfProject : getDetailsOfProject,
			getEducation : getEducation,
			getJobs : getJobs,
			getAwards : getAwards,
			getHighlights : getHighlights
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

		function getEducation() {
			var promise = $http.get('scripts/user-data/my.education.json');
			return promise;
		}

		function getJobs() {
			var promise = $http.get('scripts/user-data/my.jobs.json');
			return promise;
		}

		function getAwards() {
			var promise = $http.get('scripts/user-data/my.awards.json');
			return promise;
		}

		function getHighlights() {
			var promise = $http.get('scripts/user-data/my.highlights.json');
			return promise;
		}
	}
})();