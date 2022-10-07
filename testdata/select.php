<?php
    //Verbindung zur DB einbinden
    include_once "../DB_Connection/dbLink.php";
   
    // Variablen werden überprüft gegen Injection
    $table = mysqli_real_escape_string($link, $_POST["table"]);
    $fieldone = mysqli_real_escape_string($link, $_POST["fieldone"]);
    $fieldtwo = mysqli_real_escape_string($link, $_POST["fieldtwo"]);
    $operator = mysqli_real_escape_string($link, $_POST["operator"]);
    $value = mysqli_real_escape_string($link, $_POST["value"]);
    $orderby = mysqli_real_escape_string($link, $_POST["order-by"]);

    // so funzt die Query, aber ist wohl nicht sicher gegen Injection
    //muss noch zu prepared Statement
    if ($table !== "" && $fieldone !== "" && $fieldtwo == "") {
        $sql = "SELECT $fieldone FROM $table";
        $result = mysqli_query($link, $sql);
    } elseif ($table !== "" && $fieldone !== "" && $fieldtwo !== "" && $operator !== "" && $value !== "") {
        $sql = "SELECT $fieldone FROM $table WHERE $fieldtwo $operator $value";
        $result = mysqli_query($link, $sql);
    } elseif ($table !== "" && $fieldone !== "" && $fieldtwo == "" || $operator == "" || $value == "") {
        $sql = "SELECT $fieldone FROM $table";
        $result = mysqli_query($link, $sql);
    } else {
        //hier muss Abbruchkriterium rein
        //fehlt
        $result = "";
    }

    if ($orderby !== "") {
        $sql .= " ORDER BY $orderby ASC";
        $result = mysqli_query($link, $sql); 
    }
    //Result darf nicht leer sein und es darf kein "drop" und "delete" vorkommen
    // obsolet, da nur das aus den Feldern gewählte abgeschickt wird
    // || ist hier eigentlich falsch
    if ($result !== "" ||  str_contains($result, 'drop') == false || str_contains($result, 'delete') == false) {
        echo "<br>";
        // echo $table;
        echo("<table style='padding: 20px; text-align: left; overflow-x: scroll;'>");
        $first_row = true;
        while ($row = mysqli_fetch_assoc($result)) {
            if ($first_row) {
                $first_row = false;
                // Output header row from keys.
                echo '<tr>';
                foreach($row as $key => $field) {
                    echo '<th>' . htmlspecialchars($key) . '</th>';
                }
                echo '</tr>';
            }
            echo '<tr>';
            foreach($row as $key => $field) {
                echo '<td style="width: 200px">' . htmlspecialchars($field) . '</td>';
            }
            echo '</tr>';
        }
        echo("</table>");
    } else {
        echo("Keine Auswahl getroffen.");
    }
    //backups
    
    // $sql = "SELECT $fieldone FROM $table WHERE $fieldtwo $operator $value";
    // $result = mysqli_query($link, $sql);
?>

