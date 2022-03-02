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

createArray = function(data){
    ret = array();
    ret['title'] = data.name;
    ret['text'] = data.weather[0].description;
    ret['temp'] = data.main.temp;
    ret['vitesseVent'] = data.wind.speed;
    ret['orientationVent'] = data.wind.deg;
    ret['icone'] = data.weather[0].icon;
    ret['humidite'] = data.main.humidity;
    ret['pression'] = data.main.pressure;
    return ret;
}

// permet de passer un argument en paramètre
// doc : https://docs.angularjs.org/api/ngRoute/service/$route 
// et https://github.com/angular/angular.js/issues/11063 mais lui il met son controller direct dans le app.config
app.controller("meteovillesController", ["$scope", "$http", "$route", function ($scope, $http, $routeParams) {
    $scope.prev = function () {
        // quand on clique sur un lien
        $routeParams.updateParams({ ville: "Vannes" });
    }
    $scope.stored = [
        //On retrouve ici les informations météo "en dur", que l'on devra remplacer par les résultats de requêtes à l'API plus tard
        //TODO
        { title: 'Vannes', text: "couvert", temp:"20°C",vitesseVent:"50km/h",orientationVent:"Nord-Ouest",icone:"wi wi-owm-800",humidite:"12%", pression:"1 HPA"  },
        { title: 'Shangaï', text: "ensoleillé", temp:"22°C",vitesseVent:"72km/h",orientationVent:"Nord-Est",icone:"wi wi-owm-800",humidite:"14%", pression:"1 HPA"  },
        { title: 'Jérusalem', text: "couvert" , temp:"36°C",vitesseVent:"13km/h",orientationVent:"Sud-Est",icone:"wi wi-owm-800",humidite:"26%", pression:"1 HPA"  }
    ];


}])

app.controller("previsionsController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    console.log($routeParams.ville);
    info = getInfo($http, $routeParams.ville);
    console.log(info.weather[0].description);
}])



// Récup la valeur de l'input et les infos correspondantes quand on appuie sur valider
app.controller("testController", ["$scope", "$http", function ($scope, $http) {
    $scope.valid = function () {
        console.log($scope.city);
        let city = $scope.city;
        $http({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric`
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data);
            var a = createArray(response.data);
            localStorage.setItem($scope.city, a);


            $scope.test = response.data.weather[0].description;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("pas de ville");
            throw new Error(error.statusText);
        });
        
    }
        
}]);

