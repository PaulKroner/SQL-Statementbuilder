// Abfrage aller elemente mit data-Attribute data-select usw.
function testCounter() {
    var zählerSelect = document.querySelectorAll('[data-select]');
    var zählerOperator = document.querySelectorAll('[data-operator]');
    var zählerInput = document.querySelectorAll('[data-input]');
    var zählerSelectAdd = document.querySelectorAll('[data-select-add]');
    var zählerOperatorAdd = document.querySelectorAll('[data-operator-add]');
    var zählerValueAdd = document.querySelectorAll('[data-value-add]');
    
   
    var zahl = 1;

    // better_getData(zahl);

    for (let i = 1; i <=zählerSelectAdd.length; i++) {
        // Ausgabe Inhalt der zusätzlichen Select-Felder
        let x = document.querySelectorAll('[data-select-add = "'+ i +'"]')[0];
        let xx = x.options[x.selectedIndex]?.text ?? "";
        console.log(xx);

        // Ausgabe Inhalt der zusätzlichen Operator-Felder
        let y = document.querySelectorAll('[data-operator-add = "'+ i +'"]')[0];
        let yy = y.options[y.selectedIndex]?.text ?? "";
        console.log(yy);

        // Ausgabe Inhalt der zusätzlichen Werte-Felder
        let z = document.querySelector('[data-value-add = "'+ i +'"]').value;
        console.log(z);

        // hier muss noch was passieren
        //
        //
        console.log(`${xx} ${yy} ${z} AND `);
    }
    
    
    
}

function better_getData(zahl) {
    // Ausgabe für alle Select-Felder 
    let a = document.querySelectorAll('[data-statement = "'+zahl+'"]')[0];
    let b = document.querySelectorAll('[data-table]')[0];
    let c = document.querySelectorAll('[data-select]')[0];
    // let d = document.querySelectorAll('[data-input]')[0];
    console.log(a.options[a.selectedIndex]?.text ?? "");
    console.log(b.options[b.selectedIndex]?.text ?? "");
    console.log(c.options[c.selectedIndex]?.text ?? "");
    // console.log(d.options[d.selectedIndex]?.text ?? "");

}