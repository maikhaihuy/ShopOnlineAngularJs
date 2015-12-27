'use strict';

/* App services */
/* Get regular data */

var globalServices = angular.module('globalServices', []);

/* Factories */
globalServices.factory('CallBackend', ['$http', function ($http) {
	var mainUrl = 'localhost:8080/ShopOnline',
		CallBackend = {};

	CallBackend.getQuery = function(query) {
		return $http.get(mainUrl + query);
	}

	CallBackend.postQuery = function(query, data) {
		return $http.post(baseUrl + query, data);
	}
	return CallBackend;
}]);

globalServices.service('Service', [function (CallBackend) {
	this.getAllBrand = function(query){
		return [{
			"brandId": 1,
			"brandName": "Nike"
		}, {
			"brandId": 2,
			"brandName": "Converse"
		}];
	};

	this.getAllCategory = function(query){
		//return CallBackend.getQuery(query);
		return [{
			"categoryId": 1,
			"categoryName": "Nam"
		}, {
			"categoryId": 2,
			"categoryName": "Nu"
		}];
	};
	this.getAllColor = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"colorId": 1,
			"colorName": "Red"
		}, {
			"colorId": 2,
			"colorName": "Green"
		}];
	};
	this.getAllSize = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"sizeId": 1,
			"sizeName": "S"
		}, {
			"sizeId": 2,
			"sizeName": "L"
		}];
	}
}]);

globalServices.service('ProductService', [function () {
	this.getProduct = function (productId) {
		return {};
	}
	this.getProductByBrand = function (brandId) {
		return {};
	}
	this.getProductByCategory = function (categoryId) {
		return {};
	}
	this.getProductBySearch = function (categoryId, nameProduct) {
		return {};
	}
	this.getAllProduct = function () {
		return {};
	}
	this.getDetailProduct = function (productId, sizeId, colorId) {
		return {};
	}
}]);

globalServices.service('UserService', [function () {
	this.getAccount = function (username) {

	}

	this.login = function ()
}])
/*
globalServices.service('CategoryService', [function (CallBackend) {
	this.getAllCategory = function(query){
		//return CallBackend.getQuery(query);
		return [{
			"categoryId": 1,
			"categoryName": "Nam"
		}, {
			"categoryId": 2,
			"categoryName": "Nu"
		}];
	}
}]);

globalServices.service('ColorService', [function (CallBackend) {
	this.getAllColor = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"colorId": 1,
			"colorName": "Red"
		}, {
			"colorId": 2,
			"colorName": "Green"
		}];
	}
}]);

globalServices.service('SizeService', [function (CallBackend) {
	this.getAllSize = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"sizeId": 1,
			"sizeName": "S"
		}, {
			"sizeId": 2,
			"sizeName": "L"
		}];
	}
}]);
*/
