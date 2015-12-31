'use strict';

/* Main controller */
var appController = angular.module('mainController', []);

appController.controller('GlobalController', GlobalController);
	
	function AuthenticationController ($scope, $mdDialog, $location, AuthenticationService){
	    $scope.isLogin = true;
        $scope.isResetPassword = false;

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
        $scope.forgotPassword = function() {
            $mdDialog.hide();
            $location.path('/ShopOnline/resetpassword');
        }
};

	function GlobalController ($scope, $mdDialog, $window, $location, CallBackend, AuthenticationService) {
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
                            
                    }
                    else {
                        $scope.cart = [];
                    }
                    product['qty'] = 1;
                    $scope.cart.push(product);

                    //check discount Product and add cart
                    var discountProductId = CheckDiscount(product);

                    if(discountProductId != null && discountProductId != 0) {
                        var productDiscount = null;
                        CallBackend.getBackend("/product/" + discountProductId).then(function(dataResponse){
                            productDiscount = dataResponse.data;
                            productDiscount.discountInfo.discountInfoId = 0;
                            productDiscount.discountInfo.discountPercentValue = 0;
                            productDiscount.product.productPrice = 0;
                            $scope.cart.push(productDiscount);
                        });
                    }

                    $window.localStorage.cart = JSON.stringify($scope.cart);
                }
            });
        };

        $scope.AddCartDetail = function(productId, size, color, qty) {
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
                            
                    }
                    else {
                        $scope.cart = [];
                    }
                    product.qty = qty;
                    product.listSize = angular.fromJson("[" + size + "]");
                    product.listColor = angular.fromJson("[" + color + "]");
                    $scope.cart.push(product);

                    //check discount Product and add cart
                    var discountProductId = CheckDiscount(product);

                    if(discountProductId != null && discountProductId != 0) {
                        var productDiscount = null;
                        CallBackend.getBackend("/product/" + discountProductId).then(function(dataResponse){
                            productDiscount = dataResponse.data;
                            productDiscount.discountInfo.discountInfoId = 0;
                            productDiscount.discountInfo.discountPercentValue = 0;
                            productDiscount.product.productPrice = 0;
                            $scope.cart.push(productDiscount);
                        });
                    }

                    $window.localStorage.cart = JSON.stringify($scope.cart);
                }
            });
        };

        $scope.EditCart = function(productId) {
            var productIdTemp = productId;
            $scope.cart = JSON.parse($window.localStorage.cart);
            for (var key in $scope.cart) {
                if ($scope.cart[key].product['productId'] === productIdTemp) {
                    
                    productIdTemp = CheckDiscount($scope.cart[key]);
                    if (productIdTemp == 0)
                        break;

                    $scope.cart.splice(key, 1);
                }
            }
            $window.localStorage.cart = JSON.stringify($scope.cart);
        };

        // parrams is added productId
        // return { !null: discount ; null: undiscount}
        function CheckDiscount(product) {
            var isGetFree = null;
            if (product.discountInfo.discountInfoId != 0 || product.discountInfo.discountPercentValue != 0) {
                isGetFree = product.discountInfo.discountInfoId;
            }
            return isGetFree;
        };

        $scope.goTo = function(path) {
            $location.path(path);
        }

        $scope.search = function(categoryId, nameProduct) {
            $location.path('/ShopOnline/products/search/category/' + categoryId + '/nameProduct/' + nameProduct);
        }
};