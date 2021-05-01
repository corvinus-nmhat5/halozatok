var id = 1;
var jóVálasz;
var hotList = [];           
var questionsInHotList = 7;  
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1;       
var timeoutHandler;

window.onload = () => {

    console.log("Oldal betöltve...");

    //Inicializálás
    init();

    //Új kérdés betöltése
    letöltés(id);
}

function letöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
        );

}

//Inicializálás
function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(id, destination) {
    fetch(`/questions/${id}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szövege").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").classList.remove("rejtett");
    }
    else {
        //document.getElementById("kép1").classList.add("rejtett");
        document.getElementById("kép1").src = "";
    }

    //Jó válasz kiíratása
    jóVálasz = kérdés.correctAnswer;
    console.log("A jó válasz száma " + jóVálasz);

    //Válaszok alaphelyzetbe tétele
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");

    document.getElementById(`válasz1`).style.pointerEvents = "auto";
    document.getElementById(`válasz2`).style.pointerEvents = "auto";
    document.getElementById(`válasz3`).style.pointerEvents = "auto";
}


//Válaszra kattintás
function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");

        hotList[displayedQuestion].goodAnswers = 0;
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;

        //Új kérdés betőltése 3 helyes válasznál
        if (hotList[displayedQuestion].goodAnswers == 3) {

            hotList[displayedQuestion].remove;
            if (nextQuestion + 1 !== `questions/count`) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
            }
        }
    }
    document.getElementById(`válasz1`).style.pointerEvents = "none";
    document.getElementById(`válasz2`).style.pointerEvents = "none";
    document.getElementById(`válasz3`).style.pointerEvents = "none";

    //Adatok mentése Local Storage-ba
    localStorage.setItem('myList', hotList);

    //Időzítő elindítása
    timeoutHandler = setTimeout(előre, 3000);
}

//Előre kattintás
function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}