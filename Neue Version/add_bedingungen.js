// weitere Bedingungen hinzufügen
// Zähler, um data-Attributen eine Zahl zuzuweisen
var selectFieldQuantity = document.querySelectorAll('[data-select]');
var inputFieldQuantitiy = document.querySelectorAll('[data-input]');
var operatorFieldQuantity = document.querySelectorAll('[data-operator]');
var counterSelect = selectFieldQuantity.length + 1;
var counterInput = inputFieldQuantitiy.length + 1;
var counterOperator = operatorFieldQuantity.length + 1;

var counter = 1;

function add_bedingungen() {

    let showAddBereich = document.getElementById('add_bereich');
    showAddBereich.style.display = 'flex';
    let Ausgabebereich = document.getElementById('add_bereich');

    let elems = ['boxfield', 'add_trenner'];
    let infofelderInhalt = ['Hier können Sie zusätzliche Bedingungen eintragen.', 'Wählen Sie hier den Operator aus.', 'Tragen Sie hier den Wert ein.']
    let fragment = document.createDocumentFragment();
    let optionsOperator = ['<', '>', '=', '<=', '>=', 'IN']

    let trenner = document.createElement('div');
    trenner.setAttribute('class', elems[1]);
    Ausgabebereich.appendChild(trenner);


    for (let i = 0; i < 3; i++) {

        let newBoxfield = document.createElement('div');
        newBoxfield.setAttribute('class', elems[0]);

        var newInfobox = document.createElement('p');
        newInfobox.setAttribute('class', 'infofelder');

        let myText = document.createTextNode(infofelderInhalt[i]);
        newInfobox.appendChild(myText);
        newBoxfield.appendChild(newInfobox);

        switch (i) {
            case 0: //muss noch size angepast werden
                var newField = document.createElement('select');
                newField.setAttribute('class', 'tabellennamen');
                newField.setAttribute('onchange', 'selectChoice()')
                newField.size = 10;
                newField.dataset.selectAdd = counter; //data-attribute mitgeben, damit später abfrage funktioniert
                newBoxfield.appendChild(newField);
                fragment.appendChild(newBoxfield);

                break;
            case 1:
                var newField = document.createElement('select');
                newField.setAttribute('class', 'operator');
                newField.setAttribute('onchange', 'selectChoice()')
                //Auswahlmöglichkeiten setzen
                //default Wert einfügen
                let default_opt = document.createElement('option');
                default_opt.innerHTML = ' -- Wählen Sie einen Operator aus -- ';
                newField.appendChild(default_opt);
                default_opt.disabled = true;
                //Operatoren einfügen
                for (let j = 0; j < optionsOperator.length; j++) {
                    var opt = document.createElement('option');
                    opt.value = optionsOperator[j];
                    opt.innerHTML = optionsOperator[j];
                    newField.appendChild(opt);
                }

                newField.dataset.operatorAdd = counter;
                newBoxfield.appendChild(newField);
                fragment.appendChild(newBoxfield);

                break;
            case 2:
                var newField = document.createElement('input');
                newField.setAttribute('class', 'werte');
                newField.setAttribute('oninput', 'selectChoice()')
                newField.dataset.valueAdd = counter;
                newBoxfield.appendChild(newField);
                fragment.appendChild(newBoxfield);

                break;
            default:
                break;
        }

    }

    trenner.appendChild(fragment);
    counter = counter + 1;

}
