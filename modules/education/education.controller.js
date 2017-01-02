(function() {
	"use strict";

	angular.module('Me')
	.controller('EducationController', EducationController);

	EducationController.$inject = ['$http'];

	function EducationController($http) {
		var _this = this;

		function initialize() {
			$http.get('scripts/user-data/my.education.json').then(function(result) {
				_this.educationData = result.data.graduation;
				_this.trainingData = result.data.trainings;
			}, function(error) {
				console.log('Something went wrong while fetching details. Please try again!');
			});
		}
		initialize();
	}
})();