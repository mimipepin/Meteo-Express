//La variable app correspond à l'intégralité de notre application. Ici on l'appelle pour effectuer le routage
let app = angular.module("meteo", ["ngRoute"]);

app.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
            //Si on appelle villes dans l'url, on sera renvoyé vers la page villes, qui permet d'ajouter des villes à notre liste
            .when('/villes', {
                templateUrl: "partials/villes.html",
                controller: "villesController"
            })
            //Si on appelle /previsions/:ville, :ville pouvant varier, on affiche la page previsions.html, qui permet d'observer les
            //prévisions sur une semaine pour la ville qui aura été sélectionnée.
            .when('/previsions/:ville', {
                templateUrl: "partials/previsions.html",
                controller: "previsionsController"
            })
            //Si on ne spécifie pas de paramètre dans l'url, on est envoyé par défaut vers la page meteovilles.html, qui nous affiche
            //la liste des villes que l'on a enregistrées. 
            .when('/', {
                templateUrl: "partials/meteovilles.html",
                controller: "meteovillesController"
            })
            .otherwise('/');
    }
]);
