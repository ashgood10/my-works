(function() {
	"use strict";

	angular.module('My.Works.Details')
	.controller('WorksDetailsController', WorksDetailsController);

	WorksDetailsController.$inject = ['$http', '$route'];

	function WorksDetailsController($http, $route) {
		var _this = this;
		var currentProjectId = '';
		//Variables
		_this.myWorks = [];
		_this.project = {};

		//Functions

		function initialize() {
			$http.get('scripts/my.works.json').then(function (result) {
				_this.myWorks = result.data;
				currentProjectId = $route.current.params.id;
				angular.forEach(_this.myWorks.works, function (project) {
					if(project.id === currentProjectId) {
						_this.project = project;
					}
				})
			}, function (error) {
				console.log('Something went wrong while fetching records. Please try later!');
			});
		}

		initialize();
	}
})();