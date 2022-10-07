<?php
    // include ("../DB_Connection/dbLink.php");
    // include "dbLink.php";
    include '../DB_Connection/dbLink.php';
    include '../DB_Connection/anfrage.php';

    echo $_SERVER['DOCUMENT_ROOT'].'/DB_Connection/dbLink.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css;" href="test.css">
        <link rel="stylesheet" type="text/css;" href="../navleiste.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        
        <!----===== Boxicons CSS ===== -->
        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    </head>

    <body>

    <!-- Navigationsleiste -->

        <!-- Country dropdown -->
        <select id="tabellenAuswahl" onchange="selectChoice()">
            <option value="">Select Table</option>
            <?php
                include "../DB_Connection/tabellenWahl.php";
            ?>
        </select>

        <!-- hier dann Felder dropdown -->
        <select id="felderAuswahl" class="testfelddings">
            <option value="">Select table first</option>
        </select>

        <input type="text" id="ausgabeStatement" class="statementAusgabefeld" onchange="selectChoice()">

        <button onclick="selectedData()">selectedData()</button>

        <!-- <button id="directButton" class="statementbuttons2 mitteunten" onclick="direct();">Exportieren</button> -->
        <div id="selectedFromDB" class="fieldSelected">

        <script type="text/javascript" src="test.js"></script>
        <script src="../Anfrage.js"></script>
    </body>
</html>