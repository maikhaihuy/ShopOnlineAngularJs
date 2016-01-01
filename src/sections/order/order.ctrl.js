'use strict';

/* Orders Controller */

var orderController = angular.module('orderController', []);

orderController.controller('Checkout1Controller', function ($scope, $window, CallBackend){
	$scope.nexStep = function(){
		CallBackend.getBackend("/").then(function(dataResponse){
            $scope.a = dataResponse.data;
        });
	};
});

orderController.controller('Checkout2Controller', function ($scope, $window, CallBackend){
	/*$scope.recipient = {
		recipientName: $window.localStorage.recipient.recipientName == null ? "" : $window.localStorage.recipient.recipientName,
		recipientEmail: $window.localStorage.recipient.recipientEmail == null "" : $window.localStorage.recipient.recipientEmail,
		recipientPhoneNumber: $window.localStorage.recipient.recipientPhoneNumber == null ? "" : $window.localStorage.recipient.recipientPhoneNumber,
		recipientAddress: $window.localStorage.recipient.recipientAddress == null ? "" : $window.localStorage.recipient.recipientAddress,
		districtId: $window.localStorage.recipient.districtId == null ? "" : $window.localStorage.recipient.districtId,
	};*/

	$scope.cities = null;
	CallBackend.getBackend("/address/cities").then(function(dataResponse){
        $scope.cities = dataResponse.data;
    });
	
	$scope.recipient = angular.fromJson($window.localStorage['recipient']);

	$scope.districts = null;
	$scope.getDistrict = function (cityId) {
		CallBackend.getBackend("/address/districts/" + cityId).then(function(dataResponse){
            alert(cityId);
            $scope.districts = dataResponse.data;
        });
	};

	$scope.CheckStep2 = function () {
		if($scope.recipient.recipientPhoneNumber == "" || $scope.recipient.recipientAddress == "")
			return false;
		$window.localStorage.recipient = JSON.stringify($scope.recipient);
		return true;
	};
});

orderController.controller('Checkout3Controller', function(){
	
});

orderController.controller('Checkout4Controller', function ($scope, $window){

	$scope.CheckStep4 = function() {
		if ($window.localStorage.cart == null || $window.localStorage.cart.length == 0) 
			return false;
		return true;
	};
});