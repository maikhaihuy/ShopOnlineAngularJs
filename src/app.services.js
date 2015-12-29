'use strict';

/* App services */
/* Get regular data */

var globalServices = angular.module('globalServices', []);

// Call back end
globalServices.service('CallBackend', function ($http) {
	this.getBackend = function (subUrl) {
		var url = 'http://localhost:8080/ShopOnline' + subUrl;
		return $http({
			method: 'GET',
			url: url
		});
	};

	this.getBackendParams = function (subUrl, params) {
		var url = 'http://localhost:8080/ShopOnline' + subUrl;
		return $http({
			method: 'GET',
			url: url,
			params: params
		});
	};

	this.postBackend = function (subUrl, data) {
		var url = 'http://localhost:8080/ShopOnline' + subUrl;
		return $http({
			method: 'POST',
			url: url,
			data: data
		});
	}
});

globalServices.factory('AuthenticationService', function ($http, $cookies) {
	var loginUrl = 'http://localhost:8080/ShopOnline/user/login',
        signupUrl = 'http://localhost:8080/ShopOnline/user/new',
        AuthenticationService = {};

        //AuthenticationService.token = 'abc';//$cookies.get('access_token');

        /*AuthenticationService.getBearerHeader = function () {
            if (AuthenticationService.token) {
                return {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                };
            }
            return null;
        };*/

        AuthenticationService.login = function (user) {
        	var data = {
                "userName":   user.username,
                "userPassword":   user.password
            };
            return $http({
				method: 'POST',
				url: loginUrl,
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data) {
			    return data;
		 	}).error(function(data) {
			    alert("error");
		  	});
        };

        AuthenticationService.signup = function (user) {
            var data = {
                "userName":   user.username,
                "userPassword":   user.password,
                "userEmail":       user.email
            };
		  	return $http({
				method: 'POST',
				url: signupUrl,
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data) {
			    return data;
		 	}).error(function(data) {
			    alert("error");
		  	});
        };

        /*AuthenticationService.handleResponse = function (data) {
            AuthenticationService.token = data.access_token;
            AuthenticationService.expirationDate = new Date(Date.now() + data.expires_in * 1000);
            AuthenticationService.refreshToken = data.refresh_token;
            $cookies.put('access_token', AuthenticationService.token, { expires: AuthenticationService.expirationDate });
        };*/

        /*AuthenticationService.refreshAccessToken = function () {
            return $http.post(loginUrl, {
                refresh_token:  AuthenticationService.refreshToken,
                grant_type:     'refresh_token',
                client_id:      AuthenticationService.clientId
            }).then(function (response) {
                AuthenticationService.handleResponse(response.data);
            });
        };*/

        return AuthenticationService;
});