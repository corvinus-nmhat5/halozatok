var kérdések = [];
var sorszam = 0;

window.onload = () => {
    letöltés();
}

kérdésMegjelenítés(sorszam);

//gombok
document.getElementById("vissza").click = function () {
    
}
document.getElementById("elore").click = function () {

}

//letöltés
function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );

    function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés")
        kérdések = d;
        console.log(kérdések);
    }
}

//kérdés megjelenítés
function kérdésMegjelenítés(kérdés) {
    
}