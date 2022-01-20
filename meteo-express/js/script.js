let getMeteo = function () {
	const ville = document.getElementById('city').value;
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

let insertValues = function (data) {
    document.getElementById('villeAcompleter').innerHTML = "Informations de la ville de " + data.name;
    document.getElementById('temps').innerHTML = `Le temps est ${data.weather[0].description}`;

    document.getElementById('leverSoleil').innerHTML = "Le soleil se lèvera à : " + convertTemps(data.sys.sunrise);
    document.getElementById('coucherSoleil').innerHTML = "Le soleil se couchera à : " + convertTemps(data.sys.sunset);
    document.getElementById('temp').innerHTML = `Température : ${data.main.temp} °C`;
    document.getElementById('tempMin').innerHTML = `Température minimum : ${data.main.temp_min} °C`;
    document.getElementById('tempMax').innerHTML = `Température maximum : ${data.main.temp_max} °C`;
    document.getElementById('vitVent').innerHTML = `La vitesse du vent est de : ${data.wind.speed} m/s`;
    document.getElementById('pression').innerHTML = `La pression atmosphérique est de : ${data.main.pressure} hPa`;
}

let convertTemps = function (unixTime) {
    let a = new Date(unixTime * 1000);
    let heure = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return `${heure}:${min}:${sec}`;
}

let changeVisibiliteInfo = function () {
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
}

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
    // on enlève ce qui était affiché auparavant
    aide = document.getElementById("aide");
    aide.style.display = "none";
    contact = document.getElementById("contact");
    contact.style.display = "none";

    // on affiche la page d'aide
    accueil = document.getElementById("accueil");
    accueil.style.display = "block";
});