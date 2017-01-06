(function() {
	"use strict";
	angular.module('My.Auth')
	.controller('AuthController', AuthController);

	AuthController.$inject = ['$location', '$timeout', 'myConfig', 'apiFactory', '$rootScope'];

	function AuthController($location, $timeout, myConfig, apiFactory, $rootScope) {
		var _this = this;
		_this.creds = {
			username: '',
			password: ''
		};
		_this.errorText = '';

		//Functions
		_this.login = login;
		_this.checkEnterKey = checkEnterKey;

		$('#authModal').modal({backdrop: 'static', keyboard: false, show: true});

		function login() {
			$rootScope.homeLoading = true;
			if(_this.creds.username && _this.creds.password) {
				var authPromise = apiFactory.getAuthData();
				authPromise.then(function(result) {
					if(result.data.authData.username.indexOf(_this.creds.username)!==-1) {
						if(result.data.authData.password[result.data.authData.username.indexOf(_this.creds.username)] === _this.creds.password) {
							$rootScope.homeLoading = false;
							$('#authModal').modal('hide');
							var date = new Date();
							//Set the cookie to expire in 1 day.
							date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
							var expires = "expires=" + date.toUTCString();
							document.cookie = "username_mw=" + _this.creds.username + "; expires=" + expires + ";";
							$location.path('/');
						}
						else {
						_this.errorText = 'Please provide valid credentials';
						}
					} else {
						_this.errorText = 'Username does not exist in the database';
					}
				}, function(error) {
					_this.errorText = 'Could not authenticate, please try again after reloading the page';
				})
			} else {
				_this.errorText = 'Credentials are manatory fields. Please input values!';
			}
			$timeout(function() {
				_this.errorText = '';
			}, 3000);
		}

		function checkEnterKey(event) {
			if(event.which === 13) {
				login();
			} else {
				return;
			}
		}
	}
})();
