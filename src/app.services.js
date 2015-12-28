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

globalServices.factory('AuthenticationService', [function ($http, $cookies) {
	var loginUrl = 'http://localhost:8080/',
            signupUrl = 'http://localhost:8080/',
            AuthenticationService = {};

        AuthenticationService.token = 'abc';//$cookies.get('access_token');

        AuthenticationService.getBearerHeader = function () {
            if (AuthenticationService.token) {
                return {
                    headers: {
                        'Authorization': 'Bearer ' + AuthenticationService.token
                    }
                };
            }
            return null;
        };

        AuthenticationService.login = function (user) {
            return $http.post(loginUrl, {
                username:   user.username,
                password:   user.password,
                grant_type: 'password',
                client_id:  AuthenticationService.clientId
            });
        };

        AuthenticationService.signup = function (user) {
            return $http.post(signupUrl, {
                username:   user.username,
                password:   user.password,
                name:       user.name
            });
        };

        AuthenticationService.handleResponse = function (data) {
            AuthenticationService.token = data.access_token;
            AuthenticationService.expirationDate = new Date(Date.now() + data.expires_in * 1000);
            AuthenticationService.refreshToken = data.refresh_token;
            $cookies.put('access_token', AuthenticationService.token, { expires: AuthenticationService.expirationDate });
        };

        AuthenticationService.refreshAccessToken = function () {
            return $http.post(loginUrl, {
                refresh_token:  AuthenticationService.refreshToken,
                grant_type:     'refresh_token',
                client_id:      AuthenticationService.clientId
            }).then(function (response) {
                AuthenticationService.handleResponse(response.data);
            });
        };

        return AuthenticationService;
}]);

/*globalServices.service('UserService', [function () {
	this.getAccount = function (username) {

	}

	this.login = function ()
}])*/
/*
globalServices.service('CategoryService', [function (CallBackend) {
	this.getAllCategory = function(query){
		//return CallBackend.getQuery(query);
		return [{
			"categoryId": 1,
			"categoryName": "Nam"
		}, {
			"categoryId": 2,
			"categoryName": "Nu"
		}];
	}
}]);

globalServices.service('ColorService', [function (CallBackend) {
	this.getAllColor = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"colorId": 1,
			"colorName": "Red"
		}, {
			"colorId": 2,
			"colorName": "Green"
		}];
	}
}]);

globalServices.service('SizeService', [function (CallBackend) {
	this.getAllSize = function(query){
		// return CallBackend.getQuery(query);
		return [{
			"sizeId": 1,
			"sizeName": "S"
		}, {
			"sizeId": 2,
			"sizeName": "L"
		}];
	}
}]);
*/
