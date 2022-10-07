<?php
    $query = "SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'testdb'";
    $result = mysqli_query($link, $query);
    if(mysqli_num_rows($result) > 0){ 
        while($row = $result->fetch_assoc()){  
            echo '<option value="'.$row['id'].'">'.$row['table_name'].'</option>'; 
        } 
    }else{ 
        echo '<option value=""table not available</option>'; 
    } 
?>