'use strict';

/* App Module */

var shopOnl = angular.module('appShopOnline', [
    'ngRoute',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'ngMdIcons',
    'globalServices',
    'mainController',
    'homeController',
    'productController',
    'authenticationController',
    'accountController',
    'orderController',
    'bw.paging'
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
                controller: 'AllProductsController'
            })
            .when('/ShopOnline/products/brand/:brandId', {
                templateUrl: 'sections/product/shopbybrand.tpl.html',
                controller: 'ProductsByBrandController'
            })
            .when('/ShopOnline/products/category/:categoryId', {
                templateUrl: 'sections/product/shopbycategory.tpl.html',
                controller: 'ProductsByCategoryController'
            })
            .when('/ShopOnline/products/search/category/:categoryId/nameProduct/:nameProduct', {
                templateUrl: 'sections/product/search.tpl.html',
                controller: 'SearchProductController'
            })
            .when('/ShopOnline/products/:productId', {
                templateUrl: 'sections/product/product.tpl.html',
                controller: 'DetailProductController'
            })
            .when('/ShopOnline/account/:username', {
                templateUrl: 'sections/account/my-account.tpl.html',
                controller: 'AccountController'
            })
            .when('/ShopOnline/resetpassword', {
                templateUrl: 'sections/authentication/forgotpassword.tpl.html',
                controller: 'ForgotpasswordController'
            })
            .when('/ShopOnline/order/checkout-step-1', {
                templateUrl: 'sections/order/checkout-step-1.tpl.html',
                controller: 'Checkout1Controller'
            })
            .when('/ShopOnline/order/checkout-step-2', {
                templateUrl: 'sections/order/checkout-step-2.tpl.html',
                controller: 'Checkout2Controller'
            })
            .when('/ShopOnline/order/checkout-step-3', {
                templateUrl: 'sections/order/checkout-step-3.tpl.html',
                controller: 'Checkout3Controller'
            })
            .when('/ShopOnline/order/checkout-step-4', {
                templateUrl: 'sections/order/checkout-step-4.tpl.html',
                controller: 'Checkout4Controller'
            })
            .when('/ShopOnline/token/:tokenStr/registration/:username', {
                templateUrl: 'sections/authentication/registration.tpl.html',
                controller: 'RegistrationController'
            })
            .when('/ShopOnline/token/:tokenStr/forgotpassword/:username', {
                templateUrl: 'sections/authentication/resetpassword.tpl.html',
                controller: 'ResetpasswordController'
            })
            .otherwise({
                redirectTo: '/ShopOnline'
            });
        //$httpProvider.interceptors.push('AuthInterceptorService');
        //$locationProvider.html5Mode(true);
    }]);

shopOnl.run(function ($http, AuthenticationService) {
    AuthenticationService.clientId = '5648048f62bd961100878525';
    $http.defaults.headers.common.Authorization = 'Basic NTY0ODA0OGY2MmJkOTYxMTAwODc4NTI1OnZlcnkgc2VjdXJl==';
    $http.defaults.headers.post['Content-Type'] = 'application/json';
});