'use strict';

/* Main controller */
var appController = angular.module('mainController', []);

/*
appController.service('BrandService', [function () {
	this.getAllBrand = function(){
		//return CallBackend.getQuery(query);
		return [{
			"brandId": 1,
			"braindName": "Nike"
		}, {
			"brandId": 2,
			"braindName": "Converse"
		}]
	};
}]);*/

appController.controller('GlobalController', function ($scope, $mdDialog, Service, AuthenticationService) {
	$scope.urlBase = 'http://localhost:8080/ShopOnline/';

	$scope.brands = Service.getAllBrand("");
	$scope.colors = Service.getAllColor("");
	$scope.sizes = Service.getAllSize("");
	$scope.categories = Service.getAllCategory("");

	$scope.logout = function () {
		if ($scope.isLoggedIn) {
			AuthenticationService.token = null;
		}
	};
	$scope.showLoginSignUpDialog = function () {
		$mdDialog.show({
			controller: AuthenticationController,
			templateUrl: '/sections/authentication/authentication.tpl.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true
		});
	};
});

appController.controller('AuthenticationController', function ($scope, $mdDialog, AuthenticationService){
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
                }, function () {
                    $scope.loading = false;
                    $scope.loginError = 'Login failed.';
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
});

/*appController.controller('BrandController', function ($scope, BrandService) {
	$scope.brands = BrandService.getAllBrand("");
});

appController.controller('ColorController', function ($scope, ColorService) {
	$scope.colors = ColorService.getAllColor("");
});

appController.controller('SizeController', function ($scope, SizeService) {
	$scope.sizes = SizeService.getAllSize("");
});

appController.controller('CategoryController', function ($scope, CategoryService) {
	$scope.categories = CategoryService.getAllCategory("");
});*/