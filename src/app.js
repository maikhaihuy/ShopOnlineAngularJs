'use strict';

/* App Module */

var shopOnl = angular.module('appShopOnline', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'globalServices',
    'mainController',
    'homeController',
    'productController',
    'authenticationController'
]);


shopOnl.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/ShopOnline', {
                templateUrl: 'sections/home/index.tpl.html',
                controller: 'IndexController'
            })
            .when('/ShopOnline/home', {
                templateUrl: 'sections/home/index.tpl.html',
                controller: 'IndexController'
            })
            .when('/ShopOnline/shop', {
                templateUrl: 'sections/product/shop.tpl.html',
                controller: 'ShopController'
            })
            .when('/ShopOnline/products/:productId', {
                templateUrl: 'sections/product/product.tpl.html',
                controller: 'DetailProductController'
            })
            .when('/ShopOnline//products/brand/:brandId', {
                templateUrl: 'sections/product/shop.tpl.html',
                controller: 'ShopController'
            })
            .when('/ShopOnline//products/category/:categoryId', {
                templateUrl: 'sections/product/shop.tpl.html',
                controller: 'ShopController'
            })
            .when('/ShopOnline/account/my-account', {
                templateUrl: 'sections/account/my-account.tpl.html',
                controller: 'AccountController'
            })
            .when('/ShopOnline/order/checkout-step-1', {
                templateUrl: 'sections/order/checkout-step-1.tpl.html',
                controller: 'OrderController'
            })
            .when('/ShopOnline/order/checkout-step-2', {
                templateUrl: 'sections/order/checkout-step-1.tpl.html',
                controller: 'OrderController'
            })
            .when('/ShopOnline/order/checkout-step-3', {
                templateUrl: 'sections/order/checkout-step-1.tpl.html',
                controller: 'OrderController'
            })
            .when('/ShopOnline/order/checkout-step-4', {
                templateUrl: 'sections/order/checkout-step-1.tpl.html',
                controller: 'OrderController'
            })*/
            .otherwise({
                redirectTo: '/ShopOnline'
            });
        //$httpProvider.interceptors.push('AuthInterceptorService');
        //$locationProvider.html5Mode(true);
    }]);

shopOnl.run(function ($http, AuthenticationService) {
    AuthenticationService.clientId = '5648048f62bd961100878525';
    $http.defaults.headers.common.Authorization = 'Basic NTY0ODA0OGY2MmJkOTYxMTAwODc4NTI1OnZlcnkgc2VjdXJl==';
});