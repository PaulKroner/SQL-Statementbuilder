function direct() {

        var sqlStatement = document.querySelector("#ausgabeStatement").value;
        // DROP table verhindern
        // hier über JS gesichert (bei SELECT über PHP)        
        if(sqlStatement !== "" && sqlStatement.toUpperCase().indexOf("DROP") === -1 && sqlStatement.toUpperCase().indexOf("DELETE") === -1) {
            $.ajax({
            type: "POST",
            url: "../DB_Connection/directSQL.php",
            data: { statement: sqlStatement },
            // success: alert("hat geklappt"),
            })
        }
        else {
            alert("Fehler: Statement hat nicht funktioniert oder nicht erlaubte Eingabe.");
        }
}