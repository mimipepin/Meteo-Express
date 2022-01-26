$(document).ready(function(){
    $("#valid-button").click(function () {
        console.log("hehe");
        const ville = document.getElementById('city').value;
        if (ville) {
            document.getElementById('infoSupButton').style.display = "block";
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&lang=fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric`
            
            fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                console.log(url);
                return resp.json();
            })
            .then(data => insertValues(data))
            .catch(console.error);
        }
    });
    
    let insertValues = function (data) {
        $("#villeAcompleter").append("Informations de la ville de " + data.name);
        $("#temps").append(`${data.weather[0].description} <i class="wi wi-owm-${data.weather[0].id}"></i>`);
        $("#temp").append(`Température : ${data.main.temp} °C`);
        
        $("#leverSoleil").append("Heure de lever du soleil : " + convertTemps(data.sys.sunrise));
        $("#coucherSoleil").append("Heure de coucher du soleil : " + convertTemps(data.sys.sunset));
        $("#tempMin").append(`Température minimum : ${data.main.temp_min} °C`);
        $("#tempMax").append(`Température maximum : ${data.main.temp_max} °C`);
        $("#vitVent").append(`Vitesse du vent : ${data.wind.speed} m/s`);
        $("#pression").append(`Pression atmosphérique : ${data.main.pressure} hPa`);
    }
    
    
    
    $("#infoSupButton").click(function () {
        console.log("1");
        let bouton = document.getElementById("infoSupButton");
        if (bouton.value == "Afficher plus") {
            console.log("2");
            document.getElementById("infoSup").style.display = "block"; 
            bouton.value = "Afficher moins";
        }
        else {
            console.log("3");
            document.getElementById("infoSup").style.display = "none"; 
            bouton.value = "Afficher plus";
        }
    });
    
    contactButton = document.getElementById("contactButton");
    contactButton.addEventListener("click", event => { 
        // on enlève ce qui était affiché auparavant
        article = document.getElementById("accueil");
        article.style.display = "none";
        aide = document.getElementById("aide");
        aide.style.display = "none";
        
        // on affiche la page de contact
        contact = document.getElementById("contact");
        contact.style.display = "block";
    });
    
    aideButton = document.getElementById("aideButton");
    aideButton.addEventListener("click", event => { 
        // on enlève ce qui était affiché auparavant
        article = document.getElementById("accueil");
        article.style.display = "none";
        contact = document.getElementById("contact");
        contact.style.display = "none";
        
        // on affiche la page d'aide
        aide = document.getElementById("aide");
        aide.style.display = "block";
    });
    
    accueilButton = document.getElementById("accueilButton");
    accueilButton.addEventListener("click", event => { 
        retourAccueil();
    });
    
    accueilLogo = document.getElementById("logo-container");
    accueilLogo.addEventListener("click", event => { 
        retourAccueil();
    });
    
    let retourAccueil = function () {
        // on enlève ce qui était affiché auparavant
        aide = document.getElementById("aide");
        aide.style.display = "none";
        contact = document.getElementById("contact");
        contact.style.display = "none";
        
        // on affiche la page principale
        accueil = document.getElementById("accueil");
        accueil.style.display = "block";
    }
});

let convertTemps = function (unixTime) {
    let a = new Date(unixTime * 1000);
    let heure = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return `${heure}:${min}:${sec}`;
}