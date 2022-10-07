//****Ausgabe Statement****
function auswahl() {
  // document.getElementById("ausgabeStatement").value = "";
  //Listfelder
  var tabellenAuswahlInhalt = better_get("tabellenAuswahl");
  var felderAuswahlInhalt = better_get("felderAuswahl");
  var bedingungenInhalt = better_get("bedingungenTabelle");
  var operatorInhalt = better_get("operatorFelder");
  //Texteingabefelder
  var werteingabeBedingungenInhalt = document.querySelector("#werteingabeBedingungen").value;

  //Ausgabe
  if (tabellenAuswahlInhalt == "" && felderAuswahlInhalt == "" && bedingungenInhalt == "" && operatorInhalt == "" && werteingabeBedingungenInhalt == "") {
    document.getElementById("ausgabeStatement").value = "";
  }
  else if (tabellenAuswahlInhalt !== "" && felderAuswahlInhalt !== "" && bedingungenInhalt == "" && operatorInhalt == "-- Wählen Sie einen Operator aus --" && werteingabeBedingungenInhalt == "") {
    document.getElementById("ausgabeStatement").value = `SELECT ${felderAuswahlInhalt} FROM ${tabellenAuswahlInhalt}`;
  }
  else if (tabellenAuswahlInhalt !== "" && felderAuswahlInhalt !== "" && bedingungenInhalt !== "" && operatorInhalt !== "-- Wählen Sie einen Operator aus --" && werteingabeBedingungenInhalt !== "") {
    document.getElementById("ausgabeStatement").value = `SELECT ${felderAuswahlInhalt} FROM ${tabellenAuswahlInhalt} WHERE ${bedingungenInhalt} ${operatorInhalt} ${werteingabeBedingungenInhalt}`;
  }
}

function better_get(id) { 
  let e = document.getElementById(id) 
  return e.options[e.selectedIndex]?.text ?? "" 
}

function test() {
    alert("noch keine Funktion!")
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
    else if (bedingungenSelect.style.display == "grid") {
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

function selectedData() {
    var table = better_get("tabellenAuswahl");
    var fieldone = better_get("felderAuswahl");
    var fieldtwo = better_get("bedingungenTabelle");
    var operator = better_get("operatorFelder");
    var value = document.querySelector("#werteingabeBedingungen").value;

    var sqlStatement = document.querySelector("#ausgabeStatement").value;

    var orderby = better_get("order-by");

    if(sqlStatement !== ""){
        $.ajax({
            type:'POST',
            url: 'select.php',
            data: { 'table': table, 'fieldone': fieldone, 'fieldtwo': fieldtwo, 'operator': operator, 'value': value, 'order-by': orderby},
            success:function(html){
                $('#selectedFromDB').html(html);
            }
        });
    }else{
        $('#selectedFromDB').html('<div>Select Table first</div>');
    }
}

function deselectField() {
    document.getElementById("bedingungenTabelle").selectedIndex = "-1";
    document.getElementById("felderAuswahl").selectedIndex = "-1";
}

function deselectOperator() {
    document.getElementById("operatorFelder").selectedIndex = "-1";
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

