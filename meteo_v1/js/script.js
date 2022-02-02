//le afficher plus s'affiche meme si ville pas valide

//changer la visibilité de ifoSup avec Jquery

$(document).ready(function(){
    $("#nav-mobile").sidenav();
    $("#valid-button").click(function () {
        const ville = $("#city").val();
        if (ville) {
            // $("#infoSupButton").toggle(true);

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric`,
                type: "GET",
                dataType: 'json'
            })
            .done(function (response) {
                $("#error").toggle(false);
                $("#infoSupButton").toggle(true);
                insertValues(response)
            })
            .fail(function (error) {
                $("#error").toggle(true);
                $("#infoSupButton").toggle(false);
                console.log("pas de ville");
                throw new Error(error.statusText);
            });
        }
    });
    
    let insertValues = function (data) {
        $("#villeAcompleter").html("Informations de la ville de " + data.name);
        $("#temps").html(`${data.weather[0].description} <i class="wi wi-owm-${data.weather[0].id}"></i>`);
        $("#temp").html(`Température : ${data.main.temp} °C`);
        
        $("#leverSoleil").html("Heure de lever du soleil : " + convertTemps(data.sys.sunrise));
        $("#coucherSoleil").html("Heure de coucher du soleil : " + convertTemps(data.sys.sunset));
        $("#tempMin").html(`Température minimum : ${data.main.temp_min} °C`);
        $("#tempMax").html(`Température maximum : ${data.main.temp_max} °C`);
        $("#vitVent").html(`Vitesse du vent : ${data.wind.speed} m/s`);
        $("#pression").html(`Pression atmosphérique : ${data.main.pressure} hPa`);
    }
    
    $("#infoSupButton").click(function () {
        $("#infoSup").slideToggle();
        if ($("#infoSupButton").val() == "Afficher plus") {
            $("#infoSupButton").val("Afficher moins");
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#infoSup").offset().top
            }, 1000);

        }
        else {
            $("#infoSupButton").val("Afficher plus");
        }
    });

    // Boutons de menu     
    $(".contactButton").click(function () {
        $("#accueil").toggle(false);
        $("#aide").toggle(false);
        $("#contact").toggle(true);
    });
    
    $(".aideButton").click(function () {
        $("#accueil").toggle(false);
        $("#contact").toggle(false);
        $("#aide").toggle(true);
    });

    $(".accueilButton").click(function () {   
        retourAccueil();
    });


    
    $("#container").click(function () {
        retourAccueil();
    });
    
    let retourAccueil = function () {
        $("#aide").toggle(false);
        $("#contact").toggle(false);
        $("#accueil").toggle(true);
    }
});

let convertTemps = function (unixTime) {
    let a = new Date(unixTime * 1000);
    let heure = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return `${heure}:${min}:${sec}`;
}