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
		_this.goBack = goBack;

		function initialize() {
			$http.get('scripts/my.works.json').then(function (result) {
				_this.myWorks = result.data;
				currentProjectId = $route.current.params.id;
				angular.forEach(_this.myWorks.works, function (project) {
					if(project.id === currentProjectId) {
						_this.project = project;
					}
				});
				$http.get('scripts/my.works.desc.json').then( function (result) {
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