'use strict';

/* App Module */

var shopOnl = angular.module('app', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'appServices'
]);


shopOnl.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'sections/home/index.html',
                controller: 'HomeController'
            })
            .when('/product/all', {
                templateUrl: 'sections/product/shop.html',
                controller: 'ProductController'
            })
            .otherwise({
                redirectTo: '/'
            });
        //$httpProvider.interceptors.push('AuthInterceptorService');
        //$locationProvider.html5Mode(true);
    }]);