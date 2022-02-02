angular.module("meteo", ["ngRoute"]);

angular.module('meteo').config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
        .when('/villes', {
            templateUrl: "partials/villes.html"
        }).when('/previsions', {
            templateUrl: "partials/previsions.html"
        }).when('/meteovilles', {
            templateUrl: "partials/meteovilles.html"
        });
    }
]);