'use strict';

/* App services */
/* Get regular data */

var appServices = angular.module('appServices', []);

appServices.factory('lstBrand', [function () {
	

	return {
		"lstBrand": [{
			"brandId": 1,
			"braindName": "Nike"
		}, {
			"brandId": 2,
			"braindName": "Converse"
		}]
	};
}])

