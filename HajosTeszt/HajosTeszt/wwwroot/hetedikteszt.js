var kérdések;
var sorszam = 0;

function letöltés() {

    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );

    function letöltésBefejeződött(d) {
        console.log("Sikeres letöltés")
        console.log(d)
        kérdések = d;


    }
}

window.onload = () => {
    //var sorszam = 1;

    letöltés();

    válaszMegjelenítés(sorszam);

    kérdésMegjelenítés(sorszam);

    document.getElementById("előre").onclick = kelőre;

    document.getElementById("vissza").onclick = kvissza;

    document.getElementById("válasz1").onclick = válasz1;
    document.getElementById("válasz2").onclick = válasz2;
    document.getElementById("válasz3").onclick = válasz3;

    function kérdésMegjelenítés(sorszam) {
        let ide = document.getElementById("kérdés_szöveg");
        ide.innerText = kérdések[sorszam].questionText;

        //kép
        let idekep = document.getElementById("kép1");
        idekep.src = "https://szoft1.comeback.hu/hajo/" + kérdések[sorszam].image;
    }

    function válaszMegjelenítés(sorszam) {
        console.log(kérdések);

        console.log(sorszam);

        let válasz1 = document.getElementById("válasz1");
        válasz1.innerText = kérdések[sorszam].answer1;

        let válasz2 = document.getElementById("válasz2");
        válasz2.innerText = kérdések[sorszam].answer2;

        let válasz3 = document.getElementById("válasz3");
        válasz3.innerText = kérdések[sorszam].answer3;
    }

    function kelőre() {

        if (sorszam < kérdések.length - 1) {
            sorszam = sorszam + 1;
        }
        else {
            sorszam = 0;
        }

        alapszín();
        válaszMegjelenítés(sorszam);
        kérdésMegjelenítés(sorszam);
    }

    function kvissza() {

        if (sorszam > 0) {
            sorszam = sorszam - 1;
        }
        else {
            sorszam = kérdések.length - 1;
        }

        alapszín();
        válaszMegjelenítés(sorszam);
        kérdésMegjelenítés(sorszam);
    }

    function válasz1() {

        if (1 == kérdések[sorszam].correctAnswer) {
            document.getElementById("válasz1").classList.add("jó");
        }
        else {
            document.getElementById("válasz1").classList.add("rossz")
        }

        document.getElementById("válasz1").classList.remove("kattintható");
    }

    function válasz2() {

        if (2 == kérdések[sorszam].correctAnswer) {
            document.getElementById("válasz2").classList.add("jó");
        }
        else {
            document.getElementById("válasz2").classList.add("rossz")
        }

        document.getElementById("válasz2").classList.remove("kattintható");
    }

    function válasz3() {

        if (3 == kérdések[sorszam].correctAnswer) {
            document.getElementById("válasz3").classList.add("jó");
        }
        else {
            document.getElementById("válasz3").classList.add("rossz")
        }

        document.getElementById("válasz3").classList.remove("kattintható");
    }

    function alapszín() {
        document.getElementById("válasz1").classList.remove("jó");
        document.getElementById("válasz1").classList.remove("rossz");
        document.getElementById("válasz2").classList.remove("jó");
        document.getElementById("válasz2").classList.remove("rossz");
        document.getElementById("válasz3").classList.remove("jó");
        document.getElementById("válasz3").classList.remove("rossz");

        document.getElementById("válasz1").classList.add("kattintható");
        document.getElementById("válasz2").classList.add("kattintható");
        document.getElementById("válasz3").classList.add("kattintható");
    }
}