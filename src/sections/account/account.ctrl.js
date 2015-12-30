'use trict'

/* Account Controller */

var accountController = angular.module('accountController', []);

accountController.controller('AccountController', ['$scope', '$routeParams', '$window', 'CallBackend', function ($scope, $routeParams, $window, CallBackend){
	// Region of User
	$scope.InfoUser = null;
	CallBackend.getBackend("/user/" + $routeParams.username).then(function(dataResponse){
           $scope.InfoUser = dataResponse.data;
    });

    $scope.Carts = $window.localStorage.cart;

    $scope.acceptInfoUser = function() {
    	$scope.isEdit = false;
    };

    $scope.cancelInfoUser = function() {
    	$scope.isEdit = false;
    };

    $scope.editInfoUser = function() {
    	$scope.isEdit = true;
    };

    function updateUnfoUser() {
    	// Cập nhật lại InfoUser
      /*CallBackend.getBackend("" + $routeParams.username).then(function(dataResponse){
           $scope.Orders = dataResponse.data;
      });*/ 
    }

    // Region of Orders
    $scope.Orders = null;
    CallBackend.getBackend("/order/username/" + $routeParams.username).then(function(dataResponse){
           $scope.Orders = dataResponse.data;
    });

    $scope.cancelOrder = function(orderId) {
    	CallBackend.getBackend("" + orderId).then(function(dataResponse){
           $scope.Orders = dataResponse.data;
    	});
    };
}]);

accountController.controller('ListCtrl', ['$scope','$mdDialog', function($scope, $mdDialog) {
  $scope.toppings = [
    { name: 'Pepperoni', wanted: true },
    { name: 'Sausage', wanted: false },
    { name: 'Black Olives', wanted: true },
    { name: 'Green Peppers', wanted: false }
  ];
  $scope.settings = [
    { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
    { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
  ];
  $scope.messages = [
    {id: 1, title: "Message A", selected: false},
    {id: 2, title: "Message B", selected: true},
    {id: 3, title: "Message C", selected: true},
  ];
  $scope.people = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
  ];
  $scope.goToPerson = function(person, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
  $scope.navigateTo = function(to, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Imagine being taken to ' + to)
        .ariaLabel('Navigation demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
  $scope.doPrimaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Primary Action')
        .textContent('Primary actions can be used for one click actions')
        .ariaLabel('Primary click demo')
        .ok('Awesome!')
        .targetEvent(event)
    );
  };
  $scope.doSecondaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .textContent('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
}]);