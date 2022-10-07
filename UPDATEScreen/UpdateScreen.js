//****Ausgabe Statement****
function auswahl() {
  //Listfelder
  var zieltabelleInhalt = better_get("tabellenAuswahl");
  var einstellenInhalt = better_get("felderAuswahl");
  var felderInhalt = better_get("felderTabelle");
  var operatorFelderInhalt = better_get("operatorFelder");
  //Texteingabefelder
  var werteingabeEinstellenInhalt = document.querySelector("#werteingabeEinstellen").value;
  var werteingabeFelderInhalt = document.querySelector("#werteingabeFelder").value;

    //Ausgabe für Update
    if (zieltabelleInhalt == "" || einstellenInhalt == "" || werteingabeEinstellenInhalt == "") {
        document.getElementById("ausgabeStatement").value = "";
    }
    else if (zieltabelleInhalt !== "" && einstellenInhalt !== "" && werteingabeEinstellenInhalt !== "" && (felderInhalt == "" || operatorFelderInhalt == "-- Wählen Sie einen Operator aus --" || werteingabeFelderInhalt == "")) {
        document.getElementById("ausgabeStatement").value = "";
    }
    else if (zieltabelleInhalt !== "" && einstellenInhalt !== "" && werteingabeEinstellenInhalt !== ""  && felderInhalt !== "" && operatorFelderInhalt !== "-- Wählen Sie einen Operator aus --" && werteingabeFelderInhalt !== "") {
        document.getElementById("ausgabeStatement").value = `UPDATE ${zieltabelleInhalt} SET ${einstellenInhalt} = ${werteingabeEinstellenInhalt} WHERE ${felderInhalt} ${operatorFelderInhalt} ${werteingabeFelderInhalt}`;
    }
    else if (zieltabelleInhalt !== "" && einstellenInhalt !== "" && werteingabeEinstellenInhalt !== ""  && felderInhalt !== "" && operatorFelderInhalt !== "-- Wählen Sie einen Operator aus --" && werteingabeFelderInhalt !== "") {
        document.getElementById("ausgabeStatement").value = `UPDATE ${zieltabelleInhalt} SET ${einstellenInhalt} = ${werteingabeEinstellenInhalt} WHERE ${felderInhalt} ${operatorFelderInhalt} ${werteingabeFelderInhalt}`;
    }
}

function better_get(id) { 
  let e = document.getElementById(id) 
  return e.options[e.selectedIndex]?.text ?? "" 
}

// Fortschrittsbalken
var tablinks = document.getElementsByClassName("tablinks");
var progressBar = document.getElementById("progressbar");

var dings = function() {
    if (Zieltabelle.style.display == "grid") {
        progressBar.innerHTML = "25%";
        progressBar.style.width = "25%";
        progressBar.style.backgroundColor = "green";
    }
    else if (einstellen.style.display == "grid") {
        progressBar.innerHTML = "50%";
        progressBar.style.width = "50%";
        progressBar.style.backgroundColor = "green";
    }
    else if (felder.style.display == "grid") {
        progressBar.innerHTML = "75%";
        progressBar.style.width = "75%";
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

//Resetbuttons
for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', dings, false);
}

function deselectField() {
    document.getElementById("felderTabelle").selectedIndex = "-1";
}

function deselectOperator() {
    document.getElementById("operatorFelder").selectedIndex = "-1";
}



//Importknopf Funktion (JQuery?)
Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function(button) {
      const hiddenInput = button.parentElement.querySelector(
        ".file-upload__input"
      );
      const label = button.parentElement.querySelector(".file-upload__label");
      const defaultLabelText = "No file(s) selected";
  
      // Set default text for label
      label.textContent = defaultLabelText;
      label.title = defaultLabelText;
  
      button.addEventListener("click", function() {
        hiddenInput.click();
      });
  
      hiddenInput.addEventListener("change", function() {
        const filenameList = Array.prototype.map.call(hiddenInput.files, function(
          file
        ) {
          return file.name;
        });
  
        label.textContent = filenameList.join(", ") || defaultLabelText;
        label.title = label.textContent;
      });
    }
  );