'use trict';

/* Product Controller */

var productController = angular.module('productController', []);

productController.controller('ShopController', function ($scope) {
	$scope.prices = {};
	$scope.filterCate = {};
	$scope.filterSize = {};
	$scope.filterColor = {};
	$scope.filterBrand = {};

	$scope.filterByCategory = function (product) {
        return $scope.filterCate[product.categoryId] || noFilter($scope.filterCate);
    };

    $scope.filterBySize = function (product) {
        return $scope.filterSize[product.sizeId] || noFilter($scope.filterSize);
    };

    $scope.filterByColor = function (product) {
        return $scope.filterColor[product.colorId] || noFilter($scope.filterColor);
    };

    $scope.filterByBrand = function (product) {
        return $scope.filterBrand[product.brandId] || noFilter($scope.filterBrand);
    };

    $scope.predicate = 'productPrice';
    $scope.reverse = true;
    $scope.order = function(predicate, reverse) {
    	$scope.reverse = reverse;
    	$scope.predicate = predicate;
    };

    function noFilter(filterObj) {
        for (var key in filterObj) {
            if (filterObj[key]) {
                return false;
            }
        }
        return true;
    }

    this.products = [
		{"productId" : 4, "productName" : "Name4", "productPrice" : 2350000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : 1},
		{"productId" : 5, "productName" : "Name5", "productPrice" : 1250000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 2, "sizeId" : 1},
		{"productId" : 6, "productName" : "Name6", "productPrice" : 850000, "productName" : "NAke2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : 2}
		];
});

productController.controller('DetailProductController', [function ($scope, $routeParams) {
	this.productsByBrand = [
		{"productId" : 4, "productName" : "Name4", "productPrice" : 2350000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : 1},
		{"productId" : 5, "productName" : "Name5", "productPrice" : 1250000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 2, "sizeId" : 1},
		{"productId" : 6, "productName" : "Name6", "productPrice" : 850000, "productName" : "NAke2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : 2}
		];
	this.sizeofproduct = [
	{"sizeId": 1, "sizeName": "S"},
	{"sizeId": 1, "sizeName": "M"},
	{"sizeId": 1, "sizeName": "L"}
	];
	this.colorOfProduct = [
	{"colorId" : 1, "colorName": "Red"},
	{"colorId" : 2, "colorName": "Blue"},
	{"colorId" : 3, "colorName": "Green"}
	];
	this.product = {"productId" : 4, "productName" : "Name4", "productPrice" : 2350000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : 1}
}]);