(function() {
	"use strict";
	angular.module('My.Works')
	.controller('WorksController', WorksController);

	WorksController.$inject = ['$http', 'myConfig', '$timeout', '$scope'];

	function WorksController($http, myConfig, $timeout, $scope) {
		var _this = this;
		//Variables
		var backgroundUrl = '';
		_this.myProjects = [];

		//Functions
		_this.startGIF = startGIF;
		_this.resetBackground = resetBackground;

		$(window).bind('mousewheel', function(e) {
			$scope.$apply( function () {
				if(e.originalEvent.wheelDelta < 0) {
					for(var i = 0; i < _this.myProjects.length; i++) {
						if(_this.myProjects[i].active && (i !== _this.myProjects.length-1)) {
							_this.myProjects[i+1]['active'] = true;
							_this.myProjects[i]['animClass'] = 'animated bounceOutUp';
							_this.myProjects[i+1]['animClass'] = 'animated bounceInUp display-block';
							$timeout(function() {
								_this.myProjects[i].active = false;
							}, 800)
							break;
						}
					}
				} else {
					//Up
					for(var i=0;i<_this.myProjects.length;i++) {
						if(_this.myProjects[i].active && i!==0) {
							_this.myProjects[i-1]['active'] = true;
							_this.myProjects[i]['animClass'] = 'animated bounceOutUp';
							_this.myProjects[i-1]['animClass'] = 'animated bounceInDown display-block';
							$timeout(function() {
								_this.myProjects[i].active = false;
							});
							break;
						}
					}
				}
			});
			return false;
		 });

		function initialize() {
			//Get my works data from the JSON
			$http.get('scripts/my.works.json').then(function(result) {
				_this.myProjects = result.data.works;
			}, function(error) {
				console.log('Something went wrong, please try again');
			});

			$timeout(function() {
				$('.project-element').addClass('animated bounceInUp display-block');
			}, 500)
		}

		function startGIF(event, project) {
			var thisElement = event.currentTarget;
			$(thisElement).css({'background-image' : 'url('+ project.gif + ')', 'transform' : 'scale(1.3)', 'transition' : 'transform ease-in 0.3s'});
			$('.project-img-details').hide();
		}

		function resetBackground(event, project) {
			var thisElement = event.currentTarget;
			$(thisElement).css({'background-image' : 'url('+ project.thumb + ')', 'transform' : 'scale(1)'});
			$('.project-img-details').show();
		}

		initialize();
	}
})();
