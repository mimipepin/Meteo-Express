//Une fonction utilisée pour rajouter une majuscule en début de mot
const capitalize = s => s && s[0].toUpperCase() + s.slice(1) || "";

/**
 * Ce controller est celui utilisé par météovilles/la page d'accueil
 * Il sert notamment à transmettre à la vue les informations nécessaires au remplissage des cartes
 * Les informations passées à la vue via le scope sont :
 * la température, la description, la vitesse du vent, son orientation, l'icône de météo, l'humidité et la pression
 * @param $scope
 * @param $http
 */
app.controller("meteovillesController", ["$scope", "$http", function ($scope, $http) {
    //Ici, on peut voir le modèle d'une liste de villes que l'on avait crée pour le stockage "en dur" par array
    //Cette variable servait à enregistrer le nom de certaines villes afin qu'elles soient affichées sur la page d'accueil.
    
    // $scope.villes = [{title:"Vannes", id: 0}, {title:"Shanghai", id: 1}, {title:"Jerusalem", id: 2}, {title:"Brest", id: 3}, {title:"Bordeaux", id: 4}];
    
    // fonction pour refresh l'ensemble de données
    const refresh = () => {
        $scope.villes = [];
        // On récupère les valeurs du localStorage pour les ranger dans le tableau des villes
        for(let i = 0; i < localStorage.length; i++) {
            $scope.villes.push({title: capitalize(localStorage.key(i)), id: localStorage.getItem(localStorage.key(i))});
        } 
        //Ici on remplit les informations, pour chaque ville, afin de pouvoir ensuite les passer à la vue  
        $scope.villes.forEach(v => {
            $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${v.title}&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
            .then(res => {
                //Initialisation de notre "sous-variable" data, qu'on va ensuite remplir
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
        //on remove simplement la ville du localStorage. On la met en minuscule car c'est ainsi que sont stockées nos données
        localStorage.removeItem(ville.toLowerCase());
        refresh();
    }
}])

/**
 * Ce controller est celui de previsions.html, qui requête l'API OpenWeather afin d'obtenir la météo de la semaine.
 * Les valeurs de chaque jour sont ensuite transmises à la vue, qui les affichera sous la forme de cartes.
 * @param $scope
 * @param $http
 * @param $routeParams un paramètre passé dans l'URL afin d'identifier la ville que l'on cherche via un id
 */
app.controller("previsionsController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    
    //Même raisonnement que plus tôt, cette fois pour les prévisions de la semaine
    // let villes = [{title: "Vannes", id:0}, {title:"Shanghai", id: 1}, {title:"Jerusalem", id: 2}, {title:"Brest", id: 3}, {title:"Bordeaux", id: 4}];

    //Au final, il s'agit d'un array vide...
    let villes = [];
    //...qui est complété par une récupération de ce que l'on a sotcké dans le localStorage !
    for(let i = 0; i < localStorage.length; i++) {
        villes.push({title: capitalize(localStorage.key(i)), id: localStorage.getItem(localStorage.key(i))});
    }  

    // sort l'objet ville pour lequel l'id correspond à celui passé en paramètre dans l'url de la page
    $scope.ville = villes.find(elem => elem.id.toString() === $routeParams.ville); 
    //On récupère son titre et on crée un tableau data...
    $scope.title = $scope.ville.title;
    $scope.ville.data = [];
    //Que l'on complète en requêtant l'API openweather !
    $http.get(`https://api.openweathermap.org/geo/1.0/direct?q=${$scope.ville.title},fr&limit=1&appid=2370a9749f38195f07d3bbefd145b74c`)
        .then((cooRes) => {
            $http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cooRes.data[0].lat}&lon=${cooRes.data[0].lon}&exclude=current,minutely,hourly,alerts&appid=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
            .then((res) => {
                //pour chaque jour de la semaine, on ajoute un objet avec les informations nécessaires, 
                //qui serront exploitées dans les prévisions de la semaine
                res.data.daily.forEach(elem => {
                    $scope.ville.data.push({
                        //On a donc la date
                        date: capitalize(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full'}).format(new Date(elem.dt*1000))),
                        //La description...
                        desc: capitalize(elem.weather[0].description),
                        //La météo...
                        meteo: `wi wi-owm-${elem.weather[0].id}`,
                        //Et les températures minimales et maximales !
                        min: elem.temp.min,
                        max: elem.temp.max
                    });
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
}])


/**
 * Enfin nous avons le controller de villes.html, la page permettant d'ajouter des villes à notre localStorage.
 * Le controller se contente de récupérer la valeur passée par un input lorsqu'on appuie sur le bouton "valider" et l'ajouter au localStorage.
 * @param $scope
 * @param $http
 */
app.controller("villesController", ["$scope", "$http", function ($scope, $http) {
    $scope.valid = function () {
        //on récupère la ville dans l'input de la vue
        let ville = $scope.city;
        //Puis on vérifie que la ville existe ou non dans l'API openweather
        if (ville) { 
            //On requête l'API...
            $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=2370a9749f38195f07d3bbefd145b74c&units=metric&lang=fr`)
            .then((res) => {
                let storeLen = localStorage.length
                //On stocke les villes en minuscules afin d'éviter les doublons
                localStorage.setItem(ville.toLowerCase(), storeLen)
                window.location = "#!"
            })
            .catch((err) => {
                console.log(err);
                $scope.city = "";
                $scope.erreur = "Erreur : ville inexistante";
            });
        }
        //Si on a pas récupéré la ville, on affiche une autre erreur
        else {
            console.log("Ville inexistante");
            $scope.city = "";
            $scope.erreur = "Erreur : ville inexistante";
        }
    }
        
}]);

