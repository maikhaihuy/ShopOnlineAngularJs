'use trict';

/* Home Controller */

var homeController = angular.module('homeController', []);

homeController.controller('IndexController', function ($scope, CallBackend){
	/*this.lstNewProducts = [
		{"productId" : 1, "productName" : "Name1", "productPrice" : 750000, "productName" : "Nike2000", "productDescribe" : "Hello"},
		{"productId" : 2, "productName" : "Name2", "productPrice" : 550000, "productName" : "Nike4000", "productDescribe" : "Hello"},
		{"productId" : 3, "productName" : "Name3", "productPrice" : 350000, "productName" : "Nike3000", "productDescribe" : "Hello"}
		];*/

	$scope.filteredTodos = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;

  $scope.makeTodos = function() {
    $scope.todos = [];
    for (i=1;i<=1000;i++) {
      $scope.todos.push({ text:"todo "+i, done:false});
    }
  };
  $scope.makeTodos(); 

  $scope.numPages = function () {
    return Math.ceil($scope.todos.length / $scope.numPerPage);
  };

  $scope.$watch("currentPage + numPerPage", function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    $scope.filteredTodos = $scope.todos.slice(begin, end);
  });
	$scope.lstNewProducts = null;
	CallBackend.getBackend("/product/newproducts").then(function(dataResponse){
		$scope.lstNewProducts = dataResponse.data;
	});
	$scope.lstDiscountProducts = null;
	CallBackend.getBackend("/product/discountproducts").then(function(dataResponse){
		$scope.lstDiscountProducts = dataResponse.data;
	});
	
	$scope.lstProductSearch = null;
	$scope.search = function () {
		CallBackend.getBackend("/product/search").then(function(dataResponse){
			$scope.lstProductSearch = dataResponse.data;
		});
	};
});