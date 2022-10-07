<?php
    //Verbindung zur DB einbinden
    include_once "../DB_Connection/dbLink.php";

    // Check connection
    if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
    }
    
    $query = "SELECT `statement` FROM history";
    $result = mysqli_query($link, $query);

    if(mysqli_num_rows($result) > 0){ 
        while($row = $result->fetch_assoc()){  
            echo '<option value="'.$row['statement'].'">'.$row['statement'].'</option>'; 
        } 
    }else{ 
        echo '<option value=""table not available</option>'; 
    } 
?>