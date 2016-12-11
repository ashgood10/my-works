(function() {
	"use strict";
	angular.module('My.Works')
	.controller('WorksController', WorksController);

	WorksController.$inject = ['$http', 'myConfig', '$timeout'];

	function WorksController($http, myConfig, $timeout) {
		var _this = this;
		//Variables
		_this.myProjects = [];

		//Functions

		function initialize() {
			//Get my works data from the JSON
			$http.get('scripts/my.works.json').then(function(result) {
				_this.myProjects = result.data.works;
			}, function(error) {
				console.log('Something went wrong, please try again');
			});

			$timeout(function() {
// 				$('.project-element').css({'animation' : 'bounce-from-top 2s'});
				$('.project-element').addClass('animated bounceInDown');
				$('.project-element').css({'top' : '20vh'});
			}, 500)
		}

		initialize();
	}
})();
