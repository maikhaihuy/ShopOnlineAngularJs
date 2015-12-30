'use strict';

/* Main controller */
var appController = angular.module('mainController', []);

appController.controller('GlobalController', GlobalController);
	
	function AuthenticationController ($scope, $mdDialog, AuthenticationService){
	    $scope.isLogin = true;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        function login() {
            AuthenticationService.login($scope.user)
                .then(function (response) {
                        $scope.loading = false;
                        AuthenticationService.handleResponse(response.data);
                        $mdDialog.hide();
                        //$scope.isLoggedIn = true;
                }, function () {
                    $scope.loading = false;
                    $scope.loginError = 'Login failed. Or. Check mail and verify';
                });
        }
        $scope.login = function () {
            if (!$scope.isLogin) {
                $scope.isLogin = true;
                return;
            }
            $scope.loading = true;
            login();
        };
        $scope.signup = function () {
            if ($scope.isLogin) {
                $scope.isLogin = false;
                return;
            }
            if ($scope.user.password !== $scope.user.confirmPassword) {
                $scope.loginError = 'Passwords do not match.';
                return;
            }
            $scope.loading = true;
            AuthenticationService.signup($scope.user)
                .then(function (response) {
                    if (response.data.error) {
                        $scope.loading = false;
                        $scope.loginError = response.data.message;
                    } else {
                        login();
                    }
                }, function () {
                    $scope.loading = false;
                    $scope.loginError = 'Error during register.';
                });
        };
};

	function GlobalController ($scope, $mdDialog, $window, CallBackend, AuthenticationService) {
    	$scope.urlBase = 'http://localhost:8080/ShopOnline';

        $scope.brands = null;
        CallBackend.getBackend("/brand/all").then(function(dataResponse){
            $scope.brands = dataResponse.data;
        });

        $scope.colors = null;
        CallBackend.getBackend("/color/all").then(function(dataResponse){
            $scope.colors = dataResponse.data;
        });

        $scope.sizes = null;
        CallBackend.getBackend("/size/all").then(function(dataResponse){
            $scope.sizes = dataResponse.data;
        });

        $scope.categories = null;
        CallBackend.getBackend("/category/all").then(function(dataResponse){
            $scope.categories = dataResponse.data;
        });

        $scope.isLoggedIn = false;
    	$scope.logout = function () {
    		if ($scope.user) {
    			//AuthenticationService.token = null;
                //$cookies.remove('user');
                delete $window.localStorage.user;
                alert('logout');
    		}
            
    	};
    	$scope.showLoginSignUpDialog = function () {
    		$mdDialog.show({
    			controller: AuthenticationController,
    			templateUrl: 'sections/authentication/authentication.tpl.html',
    			parent: angular.element(document.body),
    			clickOutsideToClose: true,
    		});
    	};

        $scope.checkCookiesLogined = function() {
            $scope.user = angular.fromJson($window.localStorage['user']); 
            if($scope.user) {
                return true;
            }
            return false;
        };

        $scope.cart = angular.fromJson($window.localStorage['cart']);
        $scope.Total = function() {
            var total = 0;
            for (var key in $scope.cart) {
                total += $scope.cart[key].product.productPrice;
            }
            return total;
        };
        $scope.AddCart = function(productId) {
            var product = null;
            CallBackend.getBackend("/product/" + productId).then(function(dataResponse){
                product = dataResponse.data;
                if(product != null) {
                    if($scope.cart) {
                        /*for (var key in $scope.cart) {
                            if (key.product.productId === product.product.productId){
                                $scope.cart[key].product.qty = $scope.cart[key].product.qty + 1;
                                product = null;
                                break;
                            }
                        }
                        if (product != null)*/
                            $scope.cart.push(product);
                    }
                    else {
                        $scope.cart = [];
                        $scope.cart.push(product);
                    }
                    $window.localStorage.cart = JSON.stringify($scope.cart);
                }
            });
        };

        $scope.EditCart = function(productId) {
            $scope.cart = JSON.parse($window.localStorage.cart);
            for (var key in $scope.cart) {
                if ($scope.cart[key].product['productId'] === productId) {
                    $scope.cart.splice(key, 1);
                    break;
                }
            }
            $window.localStorage.cart = JSON.stringify($scope.cart);
        };
};