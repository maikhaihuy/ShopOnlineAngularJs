'use strict';

/* Orders Controller */

var orderController = angular.module('orderController', []);

orderController.controller('Checkout1Controller', function ($scope, $window, CallBackend){
	$scope.recipient = {
		recipientName: "",
		recipientEmail: "",
		recipientPhoneNumber: "",
		recipientAddress: "",
		districtId: 0
	};


	
	$scope.cityId = 1;

	$scope.nexStep = function(){
		CallBackend.getBackend("/").then(function(dataResponse){
            $scope.a = dataResponse.data;
        });
	};

	function lstCities (){
		CallBackend.getBackend("/address/cities").then(function(dataResponse){
            $scope.cities = dataResponse.data;
    	});
	}
	
	function lstDistrict() {
		CallBackend.getBackend("/address/districts/" + $scope.cityId).then(function(dataResponse){
            $scope.districts = dataResponse.data;
        });
	};

	function CheckStep2() {
		if($scope.recipient.recipientPhoneNumber == "" || $scope.recipient.recipientAddress == "")
			//return false;
		return true;
	};
});

/*orderController.controller('Checkout2Controller', ['', function(){
	
}]);

orderController.controller('Checkout3Controller', ['', function(){
	
}]);

orderController.controller('Checkout4Controller', ['', function(){
	
	
}]);

orderController.controller('CheckoutController', ['', function(){
	
}]);*/