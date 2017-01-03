(function() {
	"use strict";

	angular.module('Me')
	.controller('AboutMeController', AboutMeController);

	AboutMeController.$inject = ['$http', '$location'];

	function AboutMeController($http, $location) {
		var _this = this;
		_this.educationData = {};
		_this.trainingData = {};

		function initialize() {
			var path = $location.path();
			path = path.substr(path.indexOf('/')+1, path.length);
			switch(path) {
				case 'education' : {
					$http.get('scripts/user-data/my.education.json').then(function(result) {
						_this.educationData = result.data.graduation;
						_this.trainingData = result.data.trainings;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
				case 'jobs' : {
					$http.get('scripts/user-data/my.jobs.json').then(function(result) {
						_this.jobsData = result.data.jobs;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
				case 'awards' : {
					$http.get('scripts/user-data/my.awards.json').then(function(result) {
						_this.awardsData = result.data.awards;
					}, function(error) {
						console.log('Something went wrong while fetching details. Please try again!');
					});
					return;
				}
			}
		}

		initialize();
	}
})();