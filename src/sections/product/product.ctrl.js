'use strict';

/* Product Controller */

var productController = angular.module('productController', []);

productController.controller('ShopController', function ($scope, CallBackend) {
	$scope.prices = {};
	$scope.filterCate = {};
	$scope.filterSize = {};
	$scope.filterColor = {};
	$scope.filterBrand = {};
$scope.Size = {};
	$scope.filterByCategory = function (product) {
        return $scope.filterCate[product.category.categoryId] || noFilter($scope.filterCate);
    };

    $scope.filterBySize = function (product) {
        $scope.Size = product.listSize;
        return filterSizeValue($scope.filterSize, product.listSize, "sizeId") || noFilter($scope.filterSize);
    };

    $scope.filterByColor = function (product) {
        return filterColorValue($scope.filterColor, product.listColor, "colorId") || noFilter($scope.filterColor);
    };

    $scope.filterByBrand = function (product) {
        return $scope.filterBrand[product.brand.brandId] || noFilter($scope.filterBrand);
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
    
    function filterSizeValue(filterObj, arrayValue) {
        var res = false;
    	for (var key in arrayValue) {
    		if (filterObj[arrayValue[key].sizeId]){
    			res = true;
    		}
    	};
    	return res;
    }

    function filterColorValue(filterObj, arrayValue) {
        var res = false;
        for (var key in arrayValue) {
            if (filterObj[arrayValue[key].colorId]){
                res = true;
            }
        };
        return res;
    }

/*   // $scope.lstProductByBrand = null;
    $scope.getProductByBrand = function (brandId) {
        CallBackend.getBackend("/product/brand/" + brandId + "/session/1").then(function(dataResponse){
            $scope.lstAllProduct = dataResponse.data;
        }); 
    }

    //$scope.lstProductByCategtory = null;
    $scope.getProductByCategory = function (categoryId) {
        CallBackend.getBackend("/product/category/" + categoryId + "/session/1").then(function(dataResponse){
            $scope.lstAllProduct = dataResponse.data;
        });
    }*/
});

productController.controller('AllProductsController', function ($scope, CallBackend) {
    $scope.lstAllProduct = null;
    CallBackend.getBackend("/product/getAllProduct/session/1").then(function(dataResponse){
        $scope.lstAllProduct = dataResponse.data;
    });
});

productController.controller('ProductsByBrandController', ['$scope', '$routeParams', 'CallBackend' , function ($scope, $routeParams, CallBackend) {
    $scope.lstProductByBrand = null;
    CallBackend.getBackend("/product/brand/" + $routeParams.brandId + "/session/1").then(function(dataResponse){
            $scope.lstProductByBrand = dataResponse.data;
        });
}]);

productController.controller('ProductsByCategoryController', ['$scope', '$routeParams', 'CallBackend' , function ($scope, $routeParams, CallBackend) {
    $scope.lstProductByCategtory = null;
    CallBackend.getBackend("/product/category/" + $routeParams.categoryId + "/session/1").then(function(dataResponse){
        $scope.lstProductByCategtory = dataResponse.data;
    });
}]);


productController.controller('DetailProductController', function ($scope, CallBackend) {
	this.productsByBrand = [
		{"productId" : 4, "productName" : "Name4", "productPrice" : 2350000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : [1,2]},
		{"productId" : 5, "productName" : "Name5", "productPrice" : 1250000, "productName" : "Aike2000", "productDescribe" : "Hello", "categoryId" : 2, "sizeId" : [1,3]},
		{"productId" : 6, "productName" : "Name6", "productPrice" : 850000, "productName" : "NAke2000", "productDescribe" : "Hello", "categoryId" : 1, "sizeId" : [2,3]}
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


    /*$scope.productsByBrand = null;
    CallBackend.getBackendParams("").then(function(dataResponse){
        $scope.productsByBrand = dataResponse.data;
    });

    $scope.sizeofproduct = null;
    CallBackend.getBackendParams("").then(function(dataResponse){
        $scope.sizeofproduct = dataResponse.data;
    });

    $scope.colorOfProduct = null;
    CallBackend.getBackendParams("").then(function(dataResponse){
        $scope.colorOfProduct = dataResponse.data;
    });*/
    $scope.detailProduct = null;
    CallBackend.getBackendParams("").then(function(dataResponse){
        $scope.detailProduct = dataResponse.data;
    });
});