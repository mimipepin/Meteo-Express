function store(str){

    if (storageAvailable('localStorage')){
        localStorage.setItem(str, str);
    } else {
        console.log("Stockage non disponible");
    }
}

function remove(str){
    if (storageAvailable('localStorage')){
        localStorage.removeItem(str);
    } else {
        console.log("Stockage non disponible");
    }
}