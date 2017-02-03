(function() {
	"use strict";

	angular.module('My.Works.Details')
	.controller('WorksDetailsController', WorksDetailsController);

	WorksDetailsController.$inject = ['$route', 'apiFactory', '$timeout', '$rootScope'];

	function WorksDetailsController($route, apiFactory, $timeout, $rootScope) {
		var _this = this;
		var currentProjectId = '';
		//Variables
		_this.myWorks = [];
		_this.project = {};

		//Functions
		_this.goBack = goBack;


		function initialize() {
			$timeout(function() {
				$rootScope.homeLoading = false;
			}, 1400);
			var projectPromise = apiFactory.getProjects();
			projectPromise.then(function (result) {
				_this.myWorks = result.data;
				currentProjectId = $route.current.params.id;
				angular.forEach(_this.myWorks.works, function (project) {
					if(project.id === currentProjectId) {
						_this.project = project;
					}
				});
				var detailPromise = apiFactory.getDetailsOfProject();
				detailPromise.then( function (result) {
					_this.project['details'] = result.data.works.filter( function (item) {
						return item.id === _this.project.id;
					}).map( function (item) {
						return item.description;
					});
					_this.project['details'] = _this.project['details'][0];
				}, function (error) {
					console.log('Something went wrong, please try again');
				});
			}, function (error) {
				console.log('Something went wrong while fetching records. Please try later!');
			});
		}

		function goBack() {
			history.go(-1);
		}

		initialize();
	}
})();