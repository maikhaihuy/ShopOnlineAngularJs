'use strict';

/* Authentication Controller */

var auController = angular.module('authenticationController', []);

auController.controller('AuthenticationController', function ($scope, $mdDialog, AuthenticationService) {
    $scope.isLogin = true;
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    function login() {
        AuthenticationService.login($scope.user)
        .then(function (response) {
            $scope.loading = false;
            //AuthenticationService.handleResponse(response.data);
            $mdDialog.hide();
        }, function () {
            $scope.loading = false;
            $scope.loginError = 'Login failed.';
        });
    }
    $scope.login = function () {
        if (!$scope.isLogin) {
            $scope.isLogin = true;
            return;
        }
        $scope.loading = true;
        login();
    };
    $scope.signup = function () {
        if ($scope.isLogin) {
            $scope.isLogin = false;
            return;
        }
        if ($scope.user.password !== $scope.user.confirmPassword) {
                $scope.loginError = 'Mật khẩu nhập lại không trùng khớp.';
                return;
            }
        $scope.loading = true;
        AuthenticationService.signup($scope.user)
        .then(function (response) {
            if (response.data.error) {
                $scope.loading = false;
                $scope.loginError = response.data.message;
            } else {
                login();
            }
        }, function () {
            $scope.loading = false;
            $scope.loginError = 'Đã có lỗi xảy ra khi đăng ký tài khoản.';
        });
    };
});