(function() {
	"use strict";

	angular.module('Me')
	.controller('AboutMeController', AboutMeController);

	AboutMeController.$inject = ['$http', '$location', 'apiFactory', '$timeout', '$rootScope'];

	function AboutMeController($http, $location, apiFactory, $timeout, $rootScope) {
		var _this = this;
		_this.educationData = {};
		_this.trainingData = {};

		_this.goBack = goBack;

		function initialize() {
			$timeout(function() {
				$rootScope.homeLoading = false;
			}, 1400);
			var path = $location.path();
			path = path.substr(path.indexOf('/')+1, path.length);
			switch(path) {
				case 'education' : {
					var educationPromise = apiFactory.getEducation();
					educationPromise.then(function(result) {
						_this.educationData = result.data.graduation;
						_this.trainingData = result.data.trainings;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
				case 'jobs' : {
					var jobsPromise = apiFactory.getJobs();
					jobsPromise.then(function(result) {
						_this.jobsData = result.data.jobs;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
				case 'awards' : {
					var awardPromise = apiFactory.getAwards();
					awardPromise.then(function(result) {
						_this.awardsData = result.data;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
			}
		}

		function goBack() {
			history.go(-1);
		}

		initialize();
	}
})();