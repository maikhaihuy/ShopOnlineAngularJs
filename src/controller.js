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

appController.controller('GlobalController', function ($scope, Service) {
	$scope.urlBase = 'http://localhost:8080/ShopOnline/';
	$scope.brands = Service.getAllBrand("");
	$scope.colors = Service.getAllColor("");
	$scope.sizes = Service.getAllSize("");
	$scope.categories = Service.getAllCategory("");
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