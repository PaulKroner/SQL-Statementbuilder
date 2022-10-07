<?php
    //Verbindung zur DB einbinden
    include_once "dbLink.php";
    
    if(!empty($_POST["statement"])){ 
        $update = $link->query($_POST["statement"]);
        // print_r($update);
    } 
?>
