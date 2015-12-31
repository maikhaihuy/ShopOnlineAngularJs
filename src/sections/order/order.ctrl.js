'use strict';

/* Orders Controller */

var orderController = angular.module('orderController', []);

orderController.controller('Checkout1Controller', function ($scope, $window){
	$scope.nexStep = function(){
		CallBackend.getBackend("/").then(function(dataResponse){
            $scope.a = dataResponse.data;
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