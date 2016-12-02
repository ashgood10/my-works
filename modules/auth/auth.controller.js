(function() {
	"use strict";
	angular.module('My.Auth')
	.controller('AuthController', AuthController);

	AuthController.$inject = ['$location'];

	function AuthController($location) {
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
			if(_this.creds) {
				if(_this.creds.username === 'ashish' && _this.creds.password === 'ashish') {
					$('#authModal').modal('hide');
					sessionStorage.setItem('username', _this.creds.username);
					$location.path('/');
				} else {
					_this.errorText = 'Please provide valid credentials';
				}
			}
		}
	}
})();