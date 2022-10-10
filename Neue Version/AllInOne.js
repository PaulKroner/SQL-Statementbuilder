//Darkmode-funktionen NEU
const body = document.querySelector('body'),
    icon_switch = document.querySelector('.light-dark-mode');
    icon_switch.addEventListener("click" , () =>{
        body.classList.toggle("dark");
})


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
    document.getElementById("ausgabeStatement").value = ""
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
        showOrhide("SelectedDisplay");

        hide("forUpdateOnly");
    }
    else if (statementtyp === "UPDATE") {
        //show tabbuttons für UPDATE
        // Tabellen + Felder, Bedingungen, Ausgabe

        showOrhide("zieltabelle");
        showOrhide("bedingungenselect");
        showOrhide("fertigesstatement");

        showOrhide("forUpdateOnly");
        hide("SelectedDisplay");
    }
    else if (statementtyp === "INSERT") {
        //show tabbuttons für INSERT
        // Tabellen, Values, Ausgabe
    
        showOrhide("insertValues");
        showOrhide("fertigesstatement");
        hide("SelectedDisplay");
        
    }
}


function selectedData() {
    var table = better_get("tabellenAuswahl");
    var fieldone = better_get("felderAuswahl");
    var fieldtwo = better_get("bedingungenTabelle");
    var operator = better_get("operatorBedingungen");
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

// Reset
// in php "onclick" id übergeben
function deselect(id) {
    document.getElementById(id).selectedIndex = "-1";
}

// order-by Feld wird mit Spaltennamen befüllt
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

// order-by onchange soll Selected Data ausführen
$('#order-by').on('change', function() {
    selectedData();
});


function selectChoice() {
    // Statementtyp speichern
    let statementtyp = better_get("StatementAuswahl");
    // select Felder
    var zieltabelleInhalt = better_get("tabellenAuswahl");
    var felderauswahlInhalt = better_get("felderAuswahl");
    var bedingungenInhalt = better_get("bedingungenTabelle");
    var operatorBedingungenInhalt = better_get("operatorBedingungen");
    var wertEingabeBedingungen = document.querySelector("#werteingabeBedingungen").value;
    // update Felder
    var zieltabelleInhalt = better_get("tabellenAuswahl");
    var felderauswahlInhalt = better_get("felderAuswahl");
    var wertEingabeFelder= document.querySelector("#wertEingabeFelder").value;
    var bedingungenInhalt = better_get("bedingungenTabelle");
    var operatorBedingungenInhalt = better_get("operatorBedingungen");
    var wertEingabeBedingungen = document.querySelector("#werteingabeBedingungen").value;
    // insert Felder
    var zieltabelleInhaltI = better_get("tabellenAuswahlInsert");
    var bedingungenInhaltI = better_get("felderAuswahlInsert");
    var wertEingabeBedingungenI = document.querySelector("#wertEingabeFelderInsert").value;

    // für zusätzliche Bedingungen
    // prüfen, wie viele zusätzliche Bedingungen hinzugefügt wurden

    var zählerSelectAdd = document.querySelectorAll('[data-select-add]');
    var zählerOperatorAdd = document.querySelectorAll('[data-operator-add]');
    var zählerValueAdd = document.querySelectorAll('[data-value-add]');

    const addBedingungen = [];
    for (let i = 1; i <= zählerSelectAdd.length; i++) {
    // Ausgabe Inhalt der zusätzlichen Select-Felder
        let x = document.querySelectorAll('[data-select-add = "'+ i +'"]')[0];
        let xx = x.options[x.selectedIndex]?.text ?? "";

        // Ausgabe Inhalt der zusätzlichen Operator-Felder
        let y = document.querySelectorAll('[data-operator-add = "'+ i +'"]')[0];
        let yy = y.options[y.selectedIndex]?.text ?? "";

        // Ausgabe Inhalt der zusätzlichen Werte-Felder
        let z = document.querySelector('[data-value-add = "'+ i +'"]').value;


        // Abbruchbedingung
        if (xx == "" || yy == "-- Wählen Sie einen Operator aus --" || z == "") {
            i = zählerSelectAdd.length + 1;
            console.log("variable ist leer!")
        }
        else {
            if (i !== zählerSelectAdd.length) {
                console.log(`${xx} ${yy} ${z} AND `);
            }
            else {
                console.log(`${xx} ${yy} ${z}`);
            }
        }

        // Inhalte in ein Array packen
        
        addBedingungen.push(xx,yy,z);

    }
    // Durchlaufen des Arrays
    if (addBedingungen !== 0) {
        for (let j = 0; j < addBedingungen.length; j++) {
            console.log(addBedingungen[j]);
        }
    }
    


    if (statementtyp === "SELECT") {
        if (zieltabelleInhalt !== "" && felderauswahlInhalt !== "" && bedingungenInhalt !== "" && (operatorBedingungenInhalt == "-- Wählen Sie einen Operator aus --" || wertEingabeBedingungen == "")) {
            document.getElementById("ausgabeStatement").value = `SELECT ${felderauswahlInhalt} FROM ${zieltabelleInhalt}`;
        }
        else if (zieltabelleInhalt !== "" && felderauswahlInhalt !== "" && bedingungenInhalt == "" || (operatorBedingungenInhalt == "-- Wählen Sie einen Operator aus --" || wertEingabeBedingungen == "")) {
            document.getElementById("ausgabeStatement").value = `SELECT ${felderauswahlInhalt} FROM ${zieltabelleInhalt}`;
        }
        else if (zieltabelleInhalt !== "" && felderauswahlInhalt !== "" && bedingungenInhalt !== ""  &&  operatorBedingungenInhalt !== "-- Wählen Sie einen Operator aus --" && wertEingabeBedingungen !== "") {
            document.getElementById("ausgabeStatement").value = `SELECT ${felderauswahlInhalt} FROM ${zieltabelleInhalt} WHERE ${bedingungenInhalt} ${operatorBedingungenInhalt} ${wertEingabeBedingungen}`;
        }
        else {
            document.getElementById("ausgabeStatement").value = "";
        }
    }
    else if (statementtyp === "UPDATE") {
        if (zieltabelleInhalt !== "" && felderauswahlInhalt !== "" && wertEingabeFelder !== "" && bedingungenInhalt !== "" && operatorBedingungenInhalt !== "-- Wählen Sie einen Operator aus --" && wertEingabeBedingungen !== "") {
            document.getElementById("ausgabeStatement").value = `UPDATE ${zieltabelleInhalt} SET ${felderauswahlInhalt} = ${wertEingabeFelder} WHERE ${bedingungenInhalt} ${operatorBedingungenInhalt} ${wertEingabeBedingungen}`;
        }
        else {
            document.getElementById("ausgabeStatement").value == "";
        }
    }
    else if (statementtyp === "INSERT") {
        if (zieltabelleInhaltI !== "" && bedingungenInhaltI !== "" && wertEingabeBedingungenI !== "") {
            document.getElementById("ausgabeStatement").value = `INSERT INTO ${zieltabelleInhaltI} (${bedingungenInhaltI}) VALUES (${wertEingabeBedingungenI})`;
        }
        else {
            document.getElementById("ausgabeStatement").value == "";
        }
    }    
}