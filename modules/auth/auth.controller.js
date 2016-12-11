(function() {
	"use strict";
	angular.module('My.Auth')
	.controller('AuthController', AuthController);

	AuthController.$inject = ['$location', '$http', '$timeout', 'myConfig'];

	function AuthController($location, $http, $timeout, myConfig) {
		var _this = this;
		_this.creds = {
			username: '',
			password: ''
		};
		_this.errorText = '';

		//Functions
		_this.login = login;

		$('#authModal').modal({backdrop: 'static', keyboard: false, show: true});

		function login() {
			if(_this.creds.username && _this.creds.password) {
				$http.get('scripts/auth.data.json').then(function(result) {
					// var result = {
					// 	"data" : {
					// 		"authData" : {
					// 			"username" : ["ashish_dwivedi", "guest"],
					// 			"password" : ["ashish1909", "guest"]
					// 		}
					// 	}
					// } 
					if(result.data.authData.username.indexOf(_this.creds.username)!==-1) {
						if(result.data.authData.password[result.data.authData.username.indexOf(_this.creds.username)] ===_this.creds.password) {
							$('#authModal').modal('hide');
							sessionStorage.setItem('username', _this.creds.username);
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
	}
})();
