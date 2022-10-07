// weitere Bedingungen hinzufügen
// Zähler, um data-Attributen eine Zahl zuzuweisen
var selectFieldQuantity = document.querySelectorAll('[data-select]');
var inputFieldQuantitiy = document.querySelectorAll('[data-input]');
var operatorFieldQuantity = document.querySelectorAll('[data-operator]');
var counterSelect = selectFieldQuantity.length + 1;
var counterInput = inputFieldQuantitiy.length + 1;
var counterOperator = operatorFieldQuantity.length + 1;

var counterSelectAdd = 1;

function add_bedingungen() {

    let showAddBereich = document.getElementById('add_bereich');
    showAddBereich.style.display = 'flex';
    let Ausgabebereich = document.getElementById('add_bereich');

    let elems = ['boxfield', 'add_trenner'];
    let types = ['select', 'select', 'input']
    let classes = ['tabellennamen', 'operator', 'werte'];
    let infofelder = ['infofelder'];
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
        newInfobox.setAttribute('class', infofelder[0]);

        let myText = document.createTextNode(infofelderInhalt[i]);
        newInfobox.appendChild(myText);
        newBoxfield.appendChild(newInfobox);

        switch (i) {
            case 0: //muss noch size angepast werden
                var newtable = document.createElement(types[i]);
                newtable.setAttribute('class', classes[i]);
                newtable.size = 10;
                //was auch ginge: newtable.setAttribute('data-field', counter)
                newtable.dataset.selectAdd = counterSelectAdd; //data-attribute mitgeben, damit später abfrage funktioniert
                newBoxfield.appendChild(newtable);
                fragment.appendChild(newBoxfield);

                counterSelectAdd = counterSelectAdd + 1;
                break;
            case 1:
                var newtable = document.createElement(types[i]);
                newtable.setAttribute('class', classes[i]);
                //Auswahlmöglichkeiten setzen
                //default Wert einfügen
                let default_opt = document.createElement('option');
                default_opt.innerHTML = ' -- Wählen Sie einen Operator aus -- ';
                newtable.appendChild(default_opt);
                default_opt.disabled = true;
                //Operatoren einfügen
                for (let j = 0; j < optionsOperator.length; j++) {
                    var opt = document.createElement('option');
                    opt.value = optionsOperator[j];
                    opt.innerHTML = optionsOperator[j];
                    newtable.appendChild(opt);
                }

                newtable.dataset.operatorAdd = counterOperator;
                newBoxfield.appendChild(newtable);
                fragment.appendChild(newBoxfield);

                counterOperator = counterOperator + 1;
                break;
            case 2:
                var newtable = document.createElement(types[i]);
                newtable.setAttribute('class', classes[i]);
                newtable.dataset.valueAdd = counterInput;
                newBoxfield.appendChild(newtable);
                fragment.appendChild(newBoxfield);

                counterInput = counterInput + 1;
                break;
            default:
                break;
        }
    }

    trenner.appendChild(fragment);

}



// // ohne Switch
// let newBoxfield = document.createElement('div');
// newBoxfield.setAttribute('class', 'boxfield');

// var newInfobox = document.createElement('p');
// newInfobox.setAttribute('class', 'infofelder');

// let myText = document.createTextNode('Hier können Sie zusätzliche Bedingungen eintragen.');
// newInfobox.appendChild(myText);
// newBoxfield.appendChild(newInfobox);

// //Select
// var newtable = document.createElement('select');
// newtable.setAttribute('class', 'tabellennamen');
// newtable.size = 10;
// newtable.dataset.selectAdd = counterSelectAdd; //data-attribute mitgeben, damit später abfrage funktioniert
// newBoxfield.appendChild(newtable);
// fragment.appendChild(newBoxfield);

// counterSelectAdd = counterSelectAdd + 1;

// //operator
// var newtable = document.createElement('select');
// newtable.setAttribute('class', 'operator');
// //Auswahlmöglichkeiten setzen
// //default Wert einfügen
// let default_opt = document.createElement('option');
// default_opt.innerHTML = ' -- Wählen Sie einen Operator aus -- ';
// newtable.appendChild(default_opt);
// default_opt.disabled = true;
// //Operatoren einfügen
// for (let j = 0; j < optionsOperator.length; j++) {
//     var opt = document.createElement('option');
//     opt.value = optionsOperator[j];
//     opt.innerHTML = optionsOperator[j];
//     newtable.appendChild(opt);
// }

// newtable.dataset.operatorAdd = counterOperator;
// newBoxfield.appendChild(newtable);
// fragment.appendChild(newBoxfield);

// counterOperator = counterOperator + 1;

// //Werteingabe
// var newtable = document.createElement('input');
// newtable.setAttribute('class', 'werte');
// newtable.dataset.valueAdd = counterInput;
// newBoxfield.appendChild(newtable);
// fragment.appendChild(newBoxfield);

// counterInput = counterInput + 1;