<?php
    //Verbindung zur DB einbinden
    include_once "../DB_Connection/dbLink.php";

    if(!empty($_POST["name"])){ 
        //erneute Datenbankanfrage -> Spaltennamen der angeklickten Tabelle
        $sqlBefehl = "SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE 
            TABLE_SCHEMA = Database()
            AND TABLE_NAME = '{$_POST["name"]}' ;";
        $result = $link->query($sqlBefehl);
        
        echo '<option>*</option>'; 
        while($row = $result->fetch_assoc()){
            // in row muss die gesuchte Spalte rein aus dem Statement
            echo '<option>'.$row['COLUMN_NAME'].'</option>';}
    } 
?>