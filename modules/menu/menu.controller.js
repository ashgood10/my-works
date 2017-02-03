/*
Home Module
Author: Ashish Dwivedi
*/

(function() {
	"use strict";
	angular.module('My.Menu', [])
	.controller('MenuController', MenuController)
	.controller('HighlightController', HighlightController);

	MenuController.$inject = ['$scope', '$location', 'myConfig', '$timeout', '$rootScope', '$uibModal', 'apiFactory'];

	function MenuController($scope, $location, myConfig, $timeout, $rootScope, $uibModal, apiFactory) {
		var _this = this;

		// Variables
		var highlightData = {};
		_this.layoutHorizontal = true;
		$rootScope.pickColor = false;
		_this.myConfig = myConfig;
		_this.$location = $location;

		// Functions
		_this.goToHome = goToHome;
		_this.switchLayout = switchLayout;
		_this.goToWorks = goToWorks;
		_this.goToMyDetails = goToMyDetails;
		_this.goToHighlights = goToHighlights;
		_this.broadCastIntro = broadCastIntro;
		_this.expandMenu = expandMenu;

		function goToHome() {
			if($location.path() === '/') {
				return;
			}
			$location.search({redirected:'true'});
			$location.path('/');
			location.reload();
		}

		function switchLayout() {
			if(_this.layoutHorizontal) {
				$timeout(function() {
					var menuItemWidth = $('.vertical .home-menu-header').outerWidth();
					$('.home.name-header').css({'width' : '18.5vw'});
					$('.home-label').css({'font-size' : '18px'});
					$('.name-header span').css({'font-size' : '18px'});
				}, 100);
				$('.home.name-header').css({'line-height' : '100px', 'transition' : 'all ease-in 0.3s'});
				$('body').addClass('vertical-layout');
			} else {
				$('.home.name-header').removeAttr('style');
				$('.home-label').removeAttr('style');
				$('.name-header span').removeAttr('style');
				$('.home.name-header').removeAttr('style');
				$('body').removeClass('vertical-layout');
			}
			_this.layoutHorizontal = !_this.layoutHorizontal;
		}

		function goToWorks(proj) {
			if((!proj && $location.path() === '/works') || (proj && window.location.href.indexOf('/works/details?id='+proj) !== -1)) {
				return;
			}
			$rootScope.homeLoading = true;
			$location.search({});
			if(!proj) {
				$location.path('/works');
			} else {
				var urlParams = {
					id : proj
				}
				$location.search(urlParams);
				$location.path('/works/details');
			}
		}

		function goToMyDetails(page) {
			if($location.path().indexOf(page) !== -1) {
				return;
			}
			var path = '/' + page;
			$rootScope.homeLoading = true;
			$location.search({});
			$location.path(path);
		}

		function goToHighlights() {
			var highlightPromise = apiFactory.getHighlights();
			highlightPromise.then(function(result) {
				highlightData = result;
				var modalInstance = $uibModal.open({
					templateUrl : 'modules/menu/highlights.html',
					backdrop : true,
					keyboard : false,
					windowClass : 'fade highlights-modal',
					controller : 'HighlightController',
					controllerAs : 'hvm',
					resolve : {
						modalData : highlightData
					}
				});
			}, function(error) {
				console.log('Something went wrong while getting site highlights!');
			});
		}

		function broadCastIntro() {
			introJs().start($location.path());
		}

		function initialize() {
			$timeout(function() {
				if(!localStorage.getItem('alreadyLoaded')) {
					var path = $location.path();
					introJs().start(path);
					localStorage.setItem('alreadyLoaded' , true);
				}
			}, 500);
		}

		function expandMenu() {
			if(!angular.element(document.querySelector('.home-menu.vertical')).hasClass('expanded')) {
				angular.element(document.querySelector('.menu-collapse')).css({'transform':'rotate(90deg)'});
				angular.element(document.querySelector('.home-menu.vertical')).css({'margin-top':'0'});
				angular.element(document.querySelector('.home-menu.vertical')).addClass('expanded');
			} else {
				angular.element(document.querySelector('.menu-collapse')).css({'transform':'rotate(0deg)'});
				angular.element(document.querySelector('.home-menu.vertical')).css({'margin-top':'-150vh'});
				angular.element(document.querySelector('.home-menu.vertical')).removeClass('expanded');
			}
		}

		initialize();
	}

	HighlightController.$inject = ['modalData', '$uibModalInstance'];

	function HighlightController(modalData, $uibModalInstance) {
		var _this = this;

		//Variables
		_this.modalData = modalData.data;

		//Functions
		_this.closeModal = closeModal;

		function closeModal() {
			$uibModalInstance.close();
		}
	}
})();