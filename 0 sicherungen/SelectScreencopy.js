//****Ausgabe Statement****
function auswahl() {
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