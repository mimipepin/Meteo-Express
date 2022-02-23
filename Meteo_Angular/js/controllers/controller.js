// function controllerMeteo($scope) {
//     console.log("ici");
//     $scope.test = "hey";
// }

// function getMeteo ($scope) {
//     $http({
//         method: 'GET',
//         url: `https://api.openweathermap.org/data/2.5/weather?q=vannes&lang=fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric`
//     }).then(function successCallback(response) {
//         // this callback will be called asynchronously
//         // when the response is available
//         console.log("yay");
//         console.log(response);

//     }, function errorCallback(response) {
//         // called asynchronously if an error occurs
//         // or server returns response with an error status.
//         console.log("pas de ville");
//         throw new Error(error.statusText);
//     });
// }

// function test ($scope) {
//     console.log("teeeeeeeeeeeest");
//     $scope.test = "hey";
// }

// angular.module("meteo", []) 
// .controller("controlMeteo", test);

// let controlMeteo = angular.module("mainController", []);
// controlMeteo.controller("mainController", ["$scope", function($scope) {
//     $scope.test = "hey";
//     console.log("heeey");
// }]);


