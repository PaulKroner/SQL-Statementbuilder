<?php
    //Verbindung zur DB einbinden
    include_once "../DB_Connection/dbLink.php";

    // Check connection
    if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
    }

    //Statement in DB speichern
    $history_statement = $_POST['history_statement'];
    $history_string = strval( $history_statement );
    //funktioniert nur für "select id from tabelle" und nicht mehr
    if(!empty($history_string)){ 

        $sqlBefehl = "INSERT INTO `history` (`statement`) VALUES ('$history_string')";
        $result = $link->query($sqlBefehl);
    
    } 

    $sqlBefehl2 = "SELECT `statement` FROM `history`";
    $result = $link->query($sqlBefehl2);

    while($row = $result->fetch_assoc()){
        // in row muss die gesuchte Spalte rein aus dem Statement
        echo '<option>'.$row['statement'].'</option>';}
?>