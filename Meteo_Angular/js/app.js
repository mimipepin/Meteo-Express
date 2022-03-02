let app = angular.module("meteo", ["ngRoute"]);

app.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
        .when('/villes', {
            templateUrl: "partials/villes.html",
            controller: "testController"
        }).when('/previsions', {
            templateUrl: "partials/previsions.html/:ville",
            controller: "previsionsController"
        }).when('/meteovilles', {
            templateUrl: "partials/meteovilles.html",
            controller: "meteovillesController"
        });
    }
]);

// récupère la valeur de l'input
// app.controller("testController", ["$scope", function($scope) {
//     $scope.valid = function () {
//         console.log($scope.city);
//     }
//     // $scope.test = "hey";
//     // console.log("heeey");
// }]);

getInfo = function ($http, city) {
    $http({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric`
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        return response;

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("pas de ville");
        throw new Error(error.statusText);
    });
}

// permet de passer un argument en paramètre
// doc : https://docs.angularjs.org/api/ngRoute/service/$route 
// et https://github.com/angular/angular.js/issues/11063 mais lui il met son controller direct dans le app.config
app.controller("meteovillesController", ["$scope", "$http", "$route", function ($scope, $http, $routeParams) {
    $scope.prev = function () {
        // quand on clique sur un lien
        $routeParams.updateParams({ville: "Vannes"});
    }
    $scope.stored = [
        { title: 'Vannes', text: "Une petite ville de Bretagne" },
        { title: 'Shangaï', text: "Une métropole chinoise" },
        { title: 'Jérusalem', text: "WE WILL TAKE IT" }
      ];

    
}])

app.controller("previsionsController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    console.log($routeParams.ville);
    info = getInfo($http, $routeParams.ville);
    console.log(info.weather[0].description);
}])


// Récup la valeur de l'input et les infos correspondantes quand on appuie sur valider
app.controller("testController", ["$scope", "$http", function($scope, $http) {
    $scope.valid = function () {
        console.log($scope.city);
        let city = $scope.city;
        $http({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric`
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data.weather[0].description)
            $scope.test = response.data.weather[0].description;
    
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("pas de ville");
            throw new Error(error.statusText);
        });
    }
}]);

