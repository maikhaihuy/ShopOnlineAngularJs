'use strict';

/* Authentication Controller */

var auController = angular.module('authenticationController', []);

/*auController.controller('AuthenticationController', function ($scope, $mdDialog, AuthenticationService) {
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
});*/

auController.controller('RegistrationController', ['$scope', '$routeParams', 'CallBackend', function ($scope, $routeParams, CallBackend) {
    $scope.messages = "Verify failure.";

    CallBackend.getBackend("/token/" + $routeParams.tokenStr + "/registration/" + $routeParams.username).then(function(dataResponse){
            $scope.messages = dataResponse.data;
    });
}]);

auController.controller('ForgotpasswordController', ['$scope', '$routeParams', 'CallBackend', 'AuthenticationService', function ($scope, $routeParams, CallBackend, AuthenticationService) {
    $scope.messages = "Verify failure.";

    CallBackend.getBackend("/token/" + $routeParams.tokenStr + "/forgotpassword/" + $routeParams.username).then(function(dataResponse){
            $scope.messages = dataResponse.data;
    });

    $scope.resetPassword = function() {
        $scope.user.userName = $routeParams.username;
        $scope.user.token = $routeParams.tokenStr;
        $scope.loading = true;
        
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.loginError = 'Passwords do not match.';
            return;
        }

        AuthenticationService.reset($scope.user).then(function (respone) {
            if (response.data.error) {
                $scope.loading = false;
                $scope.loginError = response.data.message;
            }
        });
    };
}]);