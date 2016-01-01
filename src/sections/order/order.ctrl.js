'use strict';

/* Orders Controller */

var orderController = angular.module('orderController', []);

orderController.controller('Checkout1Controller', function ($scope, $window){
	$scope.nexStep = function(){
		CallBackend.getBackend("/").then(function(dataResponse){
            $scope.a = dataResponse.data;
        });
	};

	$scope.lstCities = function(){
		CallBackend.getBackend("/").then(function(dataResponse){
            return dataResponse.data;
    	});
	}
	
	$scope.lstDistrict = function(cityId) {
		CallBackend.getBackend("/").then(function(dataResponse){
            return = dataResponse.data;
        });
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