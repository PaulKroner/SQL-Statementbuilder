$(document).ready(function(){
    $('#tabellenAuswahl').on('change', function() {
        //holt selected Wert und packt ihn in Variable zum übergeben
        var select = document.getElementById('tabellenAuswahl');
        var tableAuswahl = select.options[select.selectedIndex].text;

        // für Auswahl mit *
        if(tableAuswahl){
            $.ajax({
                type:'POST',
                url: '/DB_Connection/anfrage.php',
                data:'name='+tableAuswahl,
                success:function(html){
                    $('#felderAuswahl').html(html);
                }
            });
        }else{
            $('#felderAuswahl').html('<option value="">Select Table first</option>');
            alert("Fehler bei AJAX")
        }

        // für Auswahl ohne *
        if(tableAuswahl){
            $.ajax({
                type:'POST',
                url: '/DB_Connection/anfrage_Bedingungen.php',
                data:'name='+tableAuswahl,
                success:function(html){
                    $('#bedingungenTabelle').html(html);
                    $('#felderTabelle').html(html);
                    $('#felderTabelleI').html(html);
                }
            });
        }else{
            $('#bedingungenTabelle').html('<option value="">Select Table first</option>');
            $('#felderTabelle').html('<option value="">Select Table first</option>');
            $('#felderTabelleI').html('<option value="">Select Table first</option>');
            alert("Fehler bei AJAX")
        }
    });
    //für Insert
    $('#tabellenAuswahlInsert').on('change', function() {
        //holt selected Wert und packt ihn in Variable zum übergeben
        var select = document.getElementById('tabellenAuswahlInsert');
        var tableAuswahl = select.options[select.selectedIndex].text;

        // für Auswahl ohne *
        if(tableAuswahl){
            $.ajax({
                type:'POST',
                url: '/DB_Connection/anfrage_Bedingungen.php',
                data:'name='+tableAuswahl,
                success:function(html){
                    $('#felderAuswahlInsert').html(html);
                }
            });
        }else{
            $('#felderAuswahlInsert').html('<option value="">Select Table first</option>');
            alert("Fehler bei AJAX")
        }
    });
});

//das muss hier sein, da sonst die Funktion 2x ausgeführt wird
$('#directButton').on('click', function() {
    var history_statement = document.querySelector("#ausgabeStatement").value;
    
    if(history_statement){
        $.ajax({
            type:'POST',
            url: '/DB_Connection/history_save.php',
            data: {history_statement : history_statement},
            success:function(html){
                $('#history').html(html);
            }
        });
    }
    // else {
    //     alert("Fehler.");
    // }
});


// für add_weitere Bedingungen
$('#add_bedingungen_button').on('click', function() {
    //holt selected Wert und packt ihn in Variable zum übergeben
    var select = document.getElementById('tabellenAuswahl');
    var tableAuswahl = select.options[select.selectedIndex]?.text ?? "";

    // bereits hinzugefügte SelectAdds zählen
    var zählerSelectAdd = document.querySelectorAll('[data-select-add]');
    var i = zählerSelectAdd.length;

    // für Auswahl ohne *
    if(tableAuswahl){
        $.ajax({
            type:'POST',
            url: '/DB_Connection/anfrage_Bedingungen.php',
            data:'name='+tableAuswahl,
            success:function(html){
                $('[data-select-add = "'+ i +'"]').html(html);
            }
        });
    }else{
        $('[data-select-add]').html('<option value="">Select Table first</option>');
        alert("Fehler bei AJAX");
    }
});