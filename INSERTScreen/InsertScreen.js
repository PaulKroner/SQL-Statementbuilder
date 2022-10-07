//****Ausgabe Statement****
function auswahl() {
    //Listfelder
    var zieltabelleInhalt = better_get("tabellenAuswahl");
    var einstellenInhalt = better_get("bedingungenTabelle");
    //Texteingabefelder
    var werteingabeEinstellenInhalt = document.querySelector("#werteingabeEinstellen").value;

  
      //Ausgabe für Insert
    if (zieltabelleInhalt == "" || einstellenInhalt == "" || werteingabeEinstellenInhalt == "") {
      document.getElementById("ausgabeStatement").value = "";
    }
    else if (zieltabelleInhalt !== "" && einstellenInhalt !== "" && werteingabeEinstellenInhalt !== "") {
        document.getElementById("ausgabeStatement").value = `INSERT INTO ${zieltabelleInhalt} (${einstellenInhalt}) VALUES (${werteingabeEinstellenInhalt})`;
    }
}

function better_get(id) { 
    let e = document.getElementById(id) 
    return e.options[e.selectedIndex]?.text ?? "" 
}

function test() {
    alert("Copied the text: " + copyText.value);
}

// Fortschrittsbalken
var tablinks = document.getElementsByClassName("tablinks");
var progressBar = document.getElementById("progressbar");

var dings = function() {
    if (Zieltabelle.style.display == "grid") {
        progressBar.innerHTML = "33%";
        progressBar.style.width = "33%";
        progressBar.style.backgroundColor = "green";
    }
    else if (bedingungen.style.display == "grid") {
        progressBar.innerHTML = "66%";
        progressBar.style.width = "66%";
        progressBar.style.backgroundColor = "green";
    }
    else if (fertigesStatement.style.display == "grid") {
        progressBar.innerHTML = "100%";
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "green";
    }
    else {
        progressBar.innerHTML = "0%";
        progressBar.style.width = "0%";
        progressBar.style.backgroundColor = "orange";
    }
};

for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', dings, false);
}