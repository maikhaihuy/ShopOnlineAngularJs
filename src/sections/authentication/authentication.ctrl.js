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

auController.controller('ForgotpasswordController', ['$scope', 'CallBackend', 'AuthenticationService', function ($scope, CallBackend, AuthenticationService) {
    $scope.isForgot = true;

    $scope.resetPassword = function () {
        var data = {
            "userEmail": $scope.user.userEmail
        };

        CallBackend.postBackend("/user/forgotpassword", data).then(function(dataResponse){
                $scope.messages = dataResponse.data;
                $scope.isForgot = false;
        });
    };
}]);

auController.controller('ResetpasswordController', ['$scope', '$routeParams', 'CallBackend', function ($scope, $routeParams, CallBackend) {
    $scope.messages = "Verify failure.";

    CallBackend.getBackend("/token/" + $routeParams.tokenStr + "/forgotpassword/" + $routeParams.username).then(function(dataResponse){
            $scope.messages = dataResponse.data;
    });

/*    $scope.forgotPassword = function () {
        if ($scope.isResetPassword == false){
            $scope.isResetPassword = true;
            return;
        }
        else {
            $scope.isResetPassword = false;
        }
    };*/

    $scope.resetPassword = function() {
        $scope.user.userName = $routeParams.username;
        $scope.user.token = $routeParams.tokenStr;
        $scope.loading = true;
        
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.loginError = 'Passwords do not match.';
            return;
        }

        var data = {
            "userName" : $scope.user.userName,
            "userPassword": $scope.user.password
        };
        CallBackend.putBackend("/user/update/token/" + $scope.user.token, $scope.user).then(function (respone) {
            if (response.data) {
                $scope.loading = false;
                $scope.loginError = response.data.message;
            }
        });
    };
}]);