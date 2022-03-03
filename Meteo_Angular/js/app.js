let app = angular.module("meteo", ["ngRoute"]);

app.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
            .when('/villes', {
                templateUrl: "partials/villes.html",
                controller: "villesController"
            }).when('/previsions/:ville', {
                templateUrl: "partials/previsions.html",
                controller: "previsionsController"
            }).when('/', {
                templateUrl: "partials/meteovilles.html",
                controller: "meteovillesController"
            })
            .otherwise('/');
    }
]);
