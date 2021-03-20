window.onload = () => {
    console.log("Oldal betöltve...")

    //dobozok
    let hova = document.getElementById("szamok");
    for (var o = 0; o < 10; o++) {
        let doboz = document.createElement("div");
        doboz.classList.add("ize");
        doboz.style.background = `rgb(${o * 25},0,0)`
        doboz.innerText = (o + 1);
        hova.appendChild(doboz);
    }

    //faktoriális
    var faktoriális = function (n) {
        let er = 1;
        for (let i = 2; i <= n; i++) {
            er = er * i;
        }
        return er;
    }

    //pascal
    let sz = document.getElementById("pascal");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        sz.appendChild(sor);
        for (var o = 0; o < s; o++) {
            let e = document.createElement("div");
            e.classList.add("elem");
            e.innerHTML = faktoriális(s - 1) / (faktoriális(o) * faktoriális((s - 1) - o));
            sor.appendChild(e);
        }
    }
}