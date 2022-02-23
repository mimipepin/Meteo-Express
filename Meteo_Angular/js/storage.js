//TODO
//PASSER TOUT CA EN ANGULAR
function store(){

    if (storageAvailable('localStorage')){
        var inputCity = document.getElementById("city");
        var description = document.getElementById("description");
        localStorage.setItem(inputCity, description);
    } else {
        console.log("Stockage non disponible");
    }
}

function remove(){
    if (storageAvailable('localStorage')){
        var id = document.getElementById("title");
        localStorage.removeItem(id);
    } else {
        console.log("Stockage non disponible");
    }
}