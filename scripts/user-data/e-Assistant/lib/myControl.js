var myModule = angular.module('myModule', [ 'ngRoute', 'ngStorage','ngCookies' ]);

myModule.run(function($rootScope,$http,$cookieStore,$location)
		{
			var globals= $cookieStore.get('globals') || {};
			var userInfo= $cookieStore.get('userInfo') || {};
			if(globals.currentUser)
				{
					$rootScope.globals= globals;
					$rootScope.info= userInfo;
					$http.defaults.headers.common['Authorization']='Basic'+globals.currentUser.encodedData;
				}
			$rootScope.$on('$locationChangeStart', function()
					{
						if($location.path()!=='/main' && !$rootScope.globals)
							{
								$location.path('/main');
							}
					});
		});

//ROUTING MODULE
myModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/main', {
		templateUrl : 'partials/login.html',
		controller : 'getControl'
	}).when('/', {
		templateUrl : 'partials/welcome.html',
		controller : 'welcomeCtrl'
	}).when('/food', {
		templateUrl : 'partials/food.html',
		controller : 'foodCtrl'
	}).when('/veg', {
		templateUrl : 'partials/veg.html',
		controller : 'vegCtrl'
	}).when('/nonVeg', {
		templateUrl : 'partials/veg.html',
		controller : 'vegCtrl'
	}).when('/cart', {
		templateUrl : 'partials/showCart.html',
		controller : 'cartCtrl'
	}).when('/messenger', {
		templateUrl : 'partials/messenger.html',
		controller : 'messengerCtrl'
	}).when('/map', {
		templateUrl : 'partials/map.html',
		controller : 'mapCtrl'
	}).when('/library', {
		templateUrl : 'partials/welcome.html',
		controller : 'welcomeCtrl'
	}).otherwise({
		redirectTo : '/main'
	});
}]);

// CONTROLLER FOR LOGGING IN
myModule.controller('getControl',
		function($scope, $http, $location, $rootScope,Authenticate,$cookieStore) {
			$location.path("/main");
			$scope.flag = false;
			$scope.arr = [];
			$rootScope.userInfo = {username:"",password: "",imgUrl: ""};
			$scope.getData = function() {
				$scope.dataLoading = true;
				$http.get('JSON/login.json').success(function(data) {
					$scope.arr = data;
					angular.forEach($scope.arr, function(item) 
					{ 					
						if (item.user == $rootScope.userInfo.username) 
						{	
							if (item.pass == $rootScope.userInfo.password) 
							{
								$scope.flag = true;
							}
						}
					})
					if ($scope.flag == true) 
					{
						$location.path("/");
						Authenticate.saveDetails($rootScope.userInfo.username, $rootScope.userInfo.password);
						$rootScope.userInfo.imgUrl= "images/"+$rootScope.userInfo.username+".jpg";
						$scope.flag = false;
					} 
					else
					{
						alert("Enter valid credentials");
					}
					$scope.dataLoading = false;
				});

			}

		});

// CONTROLLER FOR WELCOME SCREEN
myModule.controller('welcomeCtrl',
		function($scope, $location, $rootScope, $localStorage,Authenticate) 
		{	
			$scope.order = function(action) 
			{
				$location.path('/' + action);
			}
			$scope.logOut= function()
			{
				if(confirm("Are you sre you want to logout?"))
					{
						Authenticate.logOut();
					}
				
			}
		});

// CONTROLLER FOR ORDERING FOOD
myModule.controller('foodCtrl', [ '$scope', '$location',
		function($scope, $location) {
			$scope.veg = function() {
				$location.path('/veg');
			}
			$scope.nonVeg = function() {
				$location.path('/nonVeg');
			}
}
]);

// CONTROLLER FOR VEG FOOD
myModule.controller('vegCtrl', ['$scope','$location','$http','$rootScope',
		function($scope, $location, $http, $rootScope) {
			$scope.quantity = 0;
			$scope.foodCourt = [];
			$http.get("JSON/foodcourt.json").success(function(response) {
				$scope.foodCourt = response;
			}).error(function() {
				alert("Couldn't get the necessary files");
			});
			$scope.getFood = function() {
				if ($location.path() == '/veg') {
					$http.get('JSON/foodList.json').success(function(response) {
						$rootScope.orderList = response;
					});
				} else if ($location.path() == '/nonVeg') {
					$http.get('JSON/foodListN.json').success(
							function(response) {
								$rootScope.orderList = response;
							});
				}
				$rootScope.grandPrice = 0;
				$scope.priceCalc = function(id, qty) {
					if (qty >= 0 || qty < 9) {
						angular.forEach($rootScope.orderList, function(ordEle) {
							if (ordEle.id == id && ordEle.qty == 0) 
							{
								ordEle.qty = qty;
								$rootScope.grandPrice = $rootScope.grandPrice + (ordEle.price * ordEle.qty);

							} else if (ordEle.id == id && ordEle.qty != 0) 
							{
								$rootScope.grandPrice = $rootScope.grandPrice + (ordEle.price * (qty - ordEle.qty));
							}
						});
					}

				}
			}
			$rootScope.cartArray = [];
			$scope.foodCart = function(id, quant) {
			$scope.flag = false;
				if (quant >= 0 || quant > 9) {
					angular.forEach($rootScope.orderList, function(ele) {
						if (id == ele.id) {
							ele.selectStatus = true;
							$scope.arrEle = [ {
								"id" : "",
								"status" : ""
							} ];
							$scope.arrEle["id"] = ele.id;
							$scope.arrEle["status"] = ele.selectStatus;
							$scope.arrEle["quantity"] = ele.qty;
							if ($rootScope.cartArray.length != 0) {
								angular.forEach($rootScope.cartArray, function(element) 
								{
									if (element.id == id && element.qty == quant) 
									{
										alert("Item already added!");
										$scope.flag = true;
									} 
									else 
									{
										if (element.id == id && element.qty != quant) 
										{
											element.qty = quant;
											ele.qty = quant;
											$scope.flag = true;
										}
									}
								});
								if ($scope.flag != true) 
								{
									$rootScope.cartArray.push($scope.arrEle);
								}
							} 
							else if ($rootScope.cartArray.length == 0) 
							{
								$rootScope.cartArray.push($scope.arrEle);
							}
						}
					});
				} 
				else alert("Please provide the quantity of the selected item!");
			}
			$scope.showMessage = function(item) {
				var msgElement = angular.element(document
						.querySelector('#display'));
				msgElement.append("<br><div>" + item
						+ " added to your cart. Continue!</div><br>");
			}

			$scope.showCart = function() {
				if ($rootScope.cartArray.length == 0) {
					alert("You haven't added anything in the cart!");

				} else
					$location.path('/cart');
			}
		}
]);

//CONTROLLER FOR DISPLAYING CART
myModule.controller('cartCtrl', [ '$scope', '$rootScope',
		function($scope, $rootScope) {
			$scope.finalCart = [];
			angular.forEach($rootScope.cartArray, function(cart) {
				angular.forEach($rootScope.orderList, function(ele) {
					if (cart.id == ele.id) {
						$scope.finalCart.push({
							"item" : ele.item,
							"price" : ele.price,
							"image" : ele.image
						});
					}
				});
			});
		} ]);

//CONTROLLER FOR MESSENGER MODULE
myModule.controller('messengerCtrl',['$scope','$rootScope', '$location',
		function($scope, $rootScope,$location) {
				$rootScope.messageText={"data": ""};
	
				$scope.logOut = function() {
					alert("Messenger is now exiting.");
					$location.path('/');
				}
				$rootScope.postMessage = function(message) {
					var msgElement = angular.element(document.querySelector('#chatWindow'));
					msgElement.append("<br><div id= 'msgTxt'>&nbsp;&nbsp;"+ message	+ "&nbsp;&nbsp;</div><br>");
					if (message.indexOf($rootScope.globals.currentUser.username) > -1) 
					{
						msgElement.append("<br><div id= 'msgTxtReply'>&nbsp;&nbsp;This contains the username.&nbsp;&nbsp;</div><br>");
					}
					if (message.indexOf("what") > -1 || message.indexOf("why") > -1	|| message.indexOf("where") > -1 || message.indexOf("how") > -1) 
					{
						msgElement.append("<br><div id= 'msgTxtReply'>&nbsp;&nbsp;I've not been instructed to reply to queries.&nbsp;&nbsp;</div><br>");
					}
				}
			} 
	]);

//CUSTOM DIRECTIVE FOR RECORDING ENTER KEYPRESS AND POST MESSAGE ON THE SAME
myModule.directive("enterPress", function($rootScope){
    return{
        link:function(scope,elem,attrs){
            elem.on('keypress', function(event){
                if(event.which===13)
                	{
                		$rootScope.postMessage($rootScope.messageText.data);
                		$rootScope.messageText.data= "";
                	}
            })
        }
   }
})

//CONTROLLER FOR DISPLAYING MAP
myModule.controller("mapCtrl", function($scope, $http) {
	console.log('mapctrl');
});

// DIRECTIVE FOR DISPLAYING MAP
myModule.directive('helloMaps', function() {
	var map, mapOptions;
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			mapOptions = {
				zoom : 18,
				center : new google.maps.LatLng(12.361784, 76.595046),
				mapTypeId : google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById(attrs.id),
					mapOptions);
			console.dir(map);
		}

	}
});


//FACTORY METHOD FOR PERFORMING VARIOUS LOGIN AUTHENTICATION FUNCTIONALITIES
myModule.factory('Authenticate', function($http, $rootScope,$cookieStore,$location,$window)
		{
			var service={};
			service.saveDetails= function(username, password)
			{
				var encoded= service.encode(username, password);
				$rootScope.globals= {
							currentUser: {
											username: username,
											encodedData: encoded
							}
				};
				$rootScope.info={username: username, password: password};
				$cookieStore.put('globals',$rootScope.globals);
				$cookieStore.put('userInfo',$rootScope.info);
				$http.defaults.headers.common['Authorize']='Basic'+encoded;
			}
			
			service.encode= function(userame,password)
			{
				var encoded= {};
				angular.forEach('username', function(user)
						{
							encoded+=user+1+'*';
						});
				angular.forEach('password', function(pass)
						{
							encoded+=password+1+'*';
						});
				return encoded;
			}
			
			service.logOut= function()
			{
				$cookieStore.remove('globals');
				$cookieStore.remove('userInfo');
				$location.path('/main');
				$rootScope.globals=undefined;
				$rootScope.info=undefined;
				$http.defaults.headers.common['Authorization']= 'Basic';
				$window.location.reload();
			}
			return service;
		});
