'use strict';

/* Product services */

var productServices = angular.module('productServices', []);

productServices.service('ProductService', function ($http) {
	/*this.getProduct = function (productId) {
		return {};
	}*/
	delete $http.defaults.headers.common['X-Requested-With'];
	this.getNewProducts = function (id) {
		var url = 'http://localhost:8080/ShopOnline/product' + id;
		return $http({
			method: 'GET',
			url: url
		});
		/*return [
		{"productId" : 1, "productName" : "Name1", "productPrice" : 750000, "productName" : "Nike2000", "productDescribe" : "Hello"},
		{"productId" : 2, "productName" : "Name2", "productPrice" : 550000, "productName" : "Nike4000", "productDescribe" : "Hello"},
		{"productId" : 3, "productName" : "Name3", "productPrice" : 350000, "productName" : "Nike3000", "productDescribe" : "Hello"}
		];*/
	};
	this.getDiscountProducts = function (callbackFunction) {
		var url = 'http://localhost:8080/ShopOnline/product/discountproducts';

		return $http({
			method: 'GET',
			url: url
		});
	};
	
	this.getProductByBrand = function (brandId) {
		var url = 'http://localhost:8080/ShopOnline/product/discountproducts';

		return $http({
			method: 'GET',
			url: url
		});
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
});
