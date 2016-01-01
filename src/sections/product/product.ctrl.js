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
    $scope.orderBy = function(predicate, reverse) {
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
});

productController.controller('AllProductsController', function ($scope, CallBackend) {
    $scope.lstAllProduct = null;
    CallBackend.getBackend("/product/getAllProduct/session/1").then(function(dataResponse){
        $scope.lstAllProduct = dataResponse.data;
    });
});

productController.controller('SearchProductController', ['$scope', '$routeParams', 'CallBackend' , function ($scope, $routeParams, CallBackend){
    $scope.lstSearchProduct = null;
    CallBackend.getBackend("/product/category/" + $routeParams.categoryId + "/name/" + $routeParams.nameProduct + "/session/1").then(function(dataResponse){
        $scope.lstSearchProduct = dataResponse.data;
    });
}]);

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

productController.controller('DetailProductController', ['$scope', '$routeParams', 'CallBackend', function ($scope, $routeParams, CallBackend) {
    $scope.detailProduct = null;
    $scope.mainImage = null;
    CallBackend.getBackend("/product/" + $routeParams.productId).then(function(dataResponse){
        $scope.detailProduct = dataResponse.data;
        $scope.selected.color = $scope.detailProduct.listColor[0];
        $scope.selected.size = $scope.detailProduct.listSize[0];
        $scope.mainImage = $scope.detailProduct.listImages[0];
    });

    $scope.changeImage = function (image) {
        $scope.mainImage = image;
    }

    $scope.lstProductRelated = null;
    CallBackend.getBackend("/product/newproducts").then(function(dataResponse){
        $scope.lstProductRelated = dataResponse.data;
    });

    $scope.selected = {
        "color" : {},
        "size" : {}
    };
    $scope.qty = 1;
}]);