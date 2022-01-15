let getMeteo = function (city) {
    alert(city);

    // var request = new XMLHttpRequest();
    // var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=vannes,fr&APPID=ee07e2bf337034f905cde0bdedae3db8";

    // request.open('GET', requestURL);
    // request.responseType = 'json';
    // request.send();
    // alert(city);
    // request.onload = function() {
    //     var meteo = request.response;
    //     alert(meteo);
    // }

    //-> utiliser fetch
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Vannes,fr&APPID=ee07e2bf337034f905cde0bdedae3db8&lang=fr`;
    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        console.log(url);  
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert(data);
    }).catch(error => console.error(error));
}


  