let createArray = function(data){
    ret = {};
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
app.controller("meteovillesController", ["$scope", "$http", function ($scope, $http) {
    $scope.villes = [{title:"Vannes", id: 0}, {title:"Shangai", id: 1}, {title:"Jerusalem", id: 2}];
    $scope.villes.forEach(v => {
        $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${v.title}&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
        .then(res => {
            v.data = {};
            v.data.temp = res.data.main.temp;
            v.data.desc = res.data.weather[0].description;
            v.data.vVent = res.data.wind.speed;
            v.data.orVent = `wi wi-wind towards-${res.data.wind.deg}-deg`;
            v.data.meteo = `wi wi-owm-${res.data.weather[0].id}`
            v.data.humidite = res.data.main.humidity;
            v.data.pression = res.data.main.pressure;
        });
    });
}])

app.controller("previsionsController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    let villes = [{title: "Vannes", id:0}, {title:"Shangai", id: 1}, {title:"Jerusalem", id: 2}];
    $scope.ville = villes.find(elem => elem.id.toString() === $routeParams.ville); // sort l'objet ville pour lequel l'id correspond à celui passé en param
    $scope.title = $scope.ville.title;
    $scope.ville.data = [];
    $http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${$scope.ville.title},fr&limit=1&appid=2370a9749f38195f07d3bbefd145b74c`)
        .then(cooRes => {
            $http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cooRes.data[0].lat}&lon=${cooRes.data[0].lon}&exclude=current,minutely,hourly,alerts&appid=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
            .then(res => {
                //pour chaque jour, ajoute un objet avec les infos
                res.data.daily.forEach(elem => {
                    $scope.ville.data.push({
                        date: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(elem.dt*1000)),
                        desc: elem.weather[0].description,
                        meteo: `wi wi-owm-${elem.weather[0].id}`,
                        min: elem.temp.min,
                        max: elem.temp.max
                    });
                });
            });
        });
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

