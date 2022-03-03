const capitalize = s => s && s[0].toUpperCase() + s.slice(1) || "";

app.controller("meteovillesController", ["$scope", "$http", function ($scope, $http) {
    // $scope.villes = [{title:"Vannes", id: 0}, {title:"Shanghai", id: 1}, {title:"Jerusalem", id: 2}, {title:"Brest", id: 3}, {title:"Bordeaux", id: 4}];
    
    // fonction pour refresh l'ensemble de données
    const refresh = () => {
        $scope.villes = [];
        // On récupère les valeurs du localStorage pour les ranger dans le tableau des villes
        for(let i = 0; i < localStorage.length; i++) {
            $scope.villes.push({title: capitalize(localStorage.key(i)), id: localStorage.getItem(localStorage.key(i))});
        }   
        $scope.villes.forEach(v => {
            $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${v.title}&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
            .then(res => {
                v.data = {};
                v.data.temp = res.data.main.temp;
                v.data.desc = capitalize(res.data.weather[0].description);
                v.data.vVent = res.data.wind.speed;
                v.data.orVent = `wi wi-wind towards-${res.data.wind.deg}-deg`;
                v.data.meteo = `wi wi-owm-${res.data.weather[0].id}`
                v.data.humidite = res.data.main.humidity;
                v.data.pression = res.data.main.pressure;
            });
        });
    }
    refresh();

    // Fonction pour supprimer une ville quand on clique sur le bouton correspondant
    $scope.suppr = function (ville) {
        console.log(ville);

        localStorage.removeItem(ville.toLowerCase());
        refresh();
    }
}])

app.controller("previsionsController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    // let villes = [{title: "Vannes", id:0}, {title:"Shanghai", id: 1}, {title:"Jerusalem", id: 2}, {title:"Brest", id: 3}, {title:"Bordeaux", id: 4}];

    let villes = [];
    for(let i = 0; i < localStorage.length; i++) {
        villes.push({title: capitalize(localStorage.key(i)), id: localStorage.getItem(localStorage.key(i))});
    }  

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
                        date: capitalize(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(elem.dt*1000))),
                        desc: capitalize(elem.weather[0].description),
                        meteo: `wi wi-owm-${elem.weather[0].id}`,
                        min: elem.temp.min,
                        max: elem.temp.max
                    });
                });
            });
        });
}])


app.controller("villesController", ["$scope", "$http", function ($scope, $http) {
    // localStorage.clear();
    $scope.valid = function () {
        let ville = $scope.city;
        if (ville) { 
            $http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${ville},fr&limit=1&appid=2370a9749f38195f07d3bbefd145b74c`)
            .then((res) => {
                if (res.data.length > 0) {
                    console.log(ville)
                    let storeLen = localStorage.length
                    localStorage.setItem(ville.toLowerCase(), storeLen)
                    window.location = "/"
                }
                else {
                    
                    console.log("Ville inexistante erreur");
                }
            });
        }
        else {
            console.log("Ville inexistante");
        }
    }
        
}]);

