//Darkmode-funktionen NEU
// const body = document.querySelector('body'),
//     icon_switch = document.querySelector('.light-dark-mode');
//     icon_switch.addEventListener("click" , () =>{
//         body.classList.toggle("dark");
// });

function better_get(id) { 
    let e = document.getElementById(id) 
    return e.options[e.selectedIndex]?.text ?? "" 
}

function openTabs(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks = document.getElementsByClassName("tablinks");
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
}

function kopierenFunktion() {
    /* Get the text field */
    var copyText = document.getElementById("ausgabeStatement");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

function history_insert() {
    var history_content = better_get("history");

    if (history_content !== "") {
        document.getElementById("ausgabeStatement").value = history_content;
    }
}

// Fortschrittsbalken
var tablinks = document.getElementsByClassName("tablinks");
for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', progressbar, false);
}
function progressbar() {
    let progressBar = document.getElementById("progressbar");
    let statementTyp = better_get("StatementAuswahl");

    // mit 0 initialiseren bei Start
    // auf 0 zurücksetzen, wenn man Statementtyp wechselt
    progressBar.innerHTML = "";
    progressBar.style.width = "0%";
    progressBar.style.backgroundColor = "green";
    if (statementTyp == "SELECT") {
        if (Zieltabelle.style.display == "flex") {
            progressBar.innerHTML = "33%";
            progressBar.style.width = "33%";
        }
        else if (bedingungenSelect.style.display == "flex") {
            progressBar.innerHTML = "66%";
            progressBar.style.width = "66%";
        }
        else if (fertigesStatement.style.display == "flex") {
            progressBar.innerHTML = "100%";
            progressBar.style.width = "100%";
        }
    }
    else if (statementTyp === "UPDATE") {
        if (Zieltabelle.style.display == "flex") {
            progressBar.innerHTML = "33%";
            progressBar.style.width = "33%";
        }
        else if (bedingungenSelect.style.display == "flex") {
            progressBar.innerHTML = "66%";
            progressBar.style.width = "66%";
        }
        else if (fertigesStatement.style.display == "flex") {
            progressBar.innerHTML = "100%";
            progressBar.style.width = "100%";
        }
    }
    else if (statementTyp === "INSERT") {
        if (insertvalues.style.display == "flex") {
            progressBar.innerHTML = "50%";
            progressBar.style.width = "50%";
        }
        else if (fertigesStatement.style.display == "flex") {
            progressBar.innerHTML = "100%";
            progressBar.style.width = "100%";
        }
    }
}


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

function showOrhide(ids) {
    var y = document.getElementById(ids);
        if (y.style.display = "none") {
            y.style.display = "flex";
        }
        else {
            y.style.display = "none";
        }
}
function hide(ids) {
    var x = document.getElementById(ids);
    x.style.display = "none";
}

function statementchange() {
    var statementtyp = better_get("StatementAuswahl");
    // es fehlt noch, dass der Inhalt der Felder resetet wird
        //in eine Funktion packen und aufrufen
    //jetzt ploppen die neuen Felder anhand des Statementtyps auf
    hide("zieltabelle");
    hide("bedingungenselect");
    hide("insertValues");
    hide("fertigesstatement");
    
    if (statementtyp === "SELECT") {
        //show tabbuttons für SELECT
        // Tabellen + Felder + Wert, Bedingungen, Ausgabe

        //evtl. mit Array lösen
        showOrhide("zieltabelle");
        showOrhide("bedingungenselect");
        showOrhide("fertigesstatement");

        hide("forUpdateOnly");
    }
    else if (statementtyp === "UPDATE") {
        //show tabbuttons für UPDATE
        // Tabellen + Felder, Bedingungen, Ausgabe

        showOrhide("zieltabelle");
        showOrhide("bedingungenselect");
        showOrhide("fertigesstatement");

        showOrhide("forUpdateOnly");
    }
    else if (statementtyp === "INSERT") {
        //show tabbuttons für INSERT
        // Tabellen, Values, Ausgabe
    
        showOrhide("insertValues");
        showOrhide("fertigesstatement");
        
    }
}

function selectedData() {
    var table = better_get("tabellenAuswahl");
    var fieldone = better_get("felderAuswahl");
    // var fieldtwo = better_get("bedingungenTabelle");
    // var operator = better_get("operatorBedingungen");
    // var value = document.querySelector("#werteingabeBedingungen").value;

    var sqlStatement = document.querySelector("#ausgabeStatement").value;

    if(sqlStatement !== ""){
        $.ajax({
            type:'POST',
            url: 'select.php',
            data: { 'table': table, 'fieldone': fieldone},
            success:function(html){
                $('#selectedFromDB').html(html);
            }
        });
    }else{
        $('#selectedFromDB').html('<div>Select Table first</div>');
    }
}

//Reset
// in php "onclick" id übergeben
function deselect(id) {
    document.getElementById(id).selectedIndex = "-1";
}

//order by funktion
$(document).ready(function(){
    $('#tabellenAuswahl').on('change', function() {
        //holt selected Wert und packt ihn in Variable zum übergeben
        var select = document.getElementById('tabellenAuswahl');
        var tableAuswahl = select.options[select.selectedIndex].text;

        if(tableAuswahl){
            $.ajax({
                type:'POST',
                url: '/DB_Connection/anfrage_bedingungen.php',
                data:'name='+tableAuswahl,
                success:function(html){
                    $('#order-by').html(html);
                }
            });
        }else{
            $('#order-by').html('<option value="">Select Table first</option>');
            alert("Fehler bei AJAX")
        }

    });
});

function selectChoice() {

    var zieltabelleInhalt = better_get("tabellenAuswahl");
    var felderauswahlInhalt = better_get("felderAuswahl");
    document.getElementById("ausgabeStatement").value = `SELECT ${felderauswahlInhalt} FROM ${zieltabelleInhalt}`;

}

// weitere Bedingungen hinzufügen

