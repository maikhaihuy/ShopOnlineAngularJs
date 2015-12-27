'use trict';

/* Home Controller */

var homeController = angular.module('homeController', []);

homeController.controller('IndexController', [function(){
	this.lstNewProducts = [
		{"productId" : 1, "productName" : "Name1", "productPrice" : 750000, "productName" : "Nike2000", "productDescribe" : "Hello"},
		{"productId" : 2, "productName" : "Name2", "productPrice" : 550000, "productName" : "Nike4000", "productDescribe" : "Hello"},
		{"productId" : 3, "productName" : "Name3", "productPrice" : 350000, "productName" : "Nike3000", "productDescribe" : "Hello"}
		];
	this.lstDiscountProducts = [
		{"productId" : 4, "productName" : "Name4", "productPrice" : 2350000, "productName" : "Aike2000", "productDescribe" : "Hello"},
		{"productId" : 5, "productName" : "Name5", "productPrice" : 1250000, "productName" : "Aike2000", "productDescribe" : "Hello"},
		{"productId" : 6, "productName" : "Name6", "productPrice" : 850000, "productName" : "Nike2000", "productDescribe" : "Hello"}
		];
}]);