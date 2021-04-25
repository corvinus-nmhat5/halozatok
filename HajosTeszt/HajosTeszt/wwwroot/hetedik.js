var id = 1;
var jóVálasz;

window.onload = letöltés(id);

window.onload = () => {

    //válasz színezés
    let v1 = document.getElementById("válasz1");
    v1.onclick = vSz(1);

    let v2 = document.getElementById("válasz2");
    v2.onclick = vSz(2);

    let v3 = document.getElementById("válasz3");
    v3.onclick = vSz(3);

    //vissza kattintás
    let visszakat = document.getElementById("vissza");
    visszakat.onclick = function () {
        if (id == 1) {
            id = 800;
            alap();
            kérdésBetöltés(id);
        }
        else {
            id = id - 1;
            alap();
            kérdésBetöltés(id);
        }
    }

    //előre kattintás
    let előrekat = document.getElementById("előre");
    előrekat.onclick = function () {
        if (id == 800) {
            id = 1;
            alap();
            kérdésBetöltés(id);
        }
        else {
            id = id + 1;
            alap();
            kérdésBetöltés(id);
        }
    }
}

function letöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
        );

}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
} 

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szövege").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    else {
        document.getElementById("kép1").src = "";
    }
    jóVálasz = kérdés.correctAnswer;
    console.log("A jó válasz száma " + jóVálasz);
}

function vSz(a) {
    if (a == jóVálasz) {
        console.log(a);
        document.getElementById("válasz" + a).classList.add("jó");
    }
    else {
        document.getElementById("válasz" + a).classList.add("rossz");
    }
    document.getElementById("válasz1").classList.remove("kerdes");
    document.getElementById("válasz2").classList.remove("kerdes");
    document.getElementById("válasz3").classList.remove("kerdes");
}

function alap() {
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");

    document.getElementById("válasz1").classList.add("kerdes");
    document.getElementById("válasz2").classList.add("kerdes");
    document.getElementById("válasz3").classList.add("kerdes");
}