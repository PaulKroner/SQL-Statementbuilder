<?php
    include '../DB_Connection/dbLink.php';
    include '../DB_Connection/anfrage.php';
?>
<!DOCTYPE html>
<html>
  <!--
    SELECT Dokument
  -->
  <head>
    <meta name="description" content="SQL Statementbuilder Startseite">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css;" href="SelectScreen.css">
    <link rel="stylesheet" type="text/css;" href="../tab.css">
    <link rel="stylesheet" type="text/css;" href="../navleiste.css">
    <title>SQL Statementbuilder Select</title>
    <link rel="icon" type="image/x-icon" href="../pictures/SB_Logo.JPG">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!----===== Boxicons CSS ===== -->
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
  </head>

<body>
    <!-- Navigationsleiste -->
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                    <!--<img src="logo.png" alt="">-->
                </span>

                <div class="text logo-text">
                    <span class="name">SQL-</span>
                    <span class="name">Statementbuilder</span>
                    <!--<span class="profession">Statementbuilder</span>-->
                </div>
            </div>

            <i class='bx bx-chevron-right toggle'></i>
        </header>

        <div class="menu-bar">
            <div class="menu">

                <li class="search-box">
                    <i class='bx bx-search icon'></i>
                    <input type="text" placeholder="Suchen...">
                </li>

                <ul class="menu-links">
                    <li class="nav-link" onclick="window.location.href = '../index.html'">
                        <a href="#">
                            <i class='bx bx-home-alt icon' ></i>
                            <span class="text nav-text">Startseite</span>
                        </a>
                    </li>

                    <li class="nav-link" onclick="window.location.href = 'SelectScreen.php'">
                        <a href="#">
                            <i class='bx bx-pointer icon' ></i>
                            <span class="text nav-text">SELECT</span>
                        </a>
                    </li>

                    <li class="nav-link" onclick="window.location.href = '../UPDATEScreen/UpdateScreen.php'">
                      <a href="#">
                          <i class='bx bxs-upvote icon' ></i>
                          <span class="text nav-text">UPDATE</span>
                      </a>
                    </li>
                    
                    <li class="nav-link" onclick="window.location.href = '../InsertScreen/InsertScreen.php'">
                        <a href="#">
                            <i class='bx bx-injection icon' ></i>
                            <span class="text nav-text">INSERT</span>
                        </a>
                    </li>

                    <li class="nav-link">
                      <a href="#">
                          <i class='bx bx-dots-horizontal-rounded icon' ></i>
                          <span class="text nav-text">Mehr</span>
                      </a>
                    </li>
                </ul>
            </div>

            <div class="bottom-content">
                <li class="">
                    <a href="#">
                        <i class='bx bx-log-out icon' ></i>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>

                <li class="mode">
                    <div class="sun-moon">
                        <i class='bx bx-moon icon moon'></i>
                        <i class='bx bx-sun icon sun'></i>
                    </div>
                    <span class="mode-text text">Dark mode</span>

                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>

            </div>
        </div>
    </nav>
    <section class="hauptScreen">
    <!-- Tab links -->
        <div class="tab">
            <button class="tablinks" onclick="openTabs(event, 'Zieltabelle')">Tabellen- und Felderauswahl</button>
            <button class="tablinks" onclick="openTabs(event, 'bedingungenSelect')">Bedingungen</button>
            <button class="tablinks" onclick="openTabs(event, 'fertigesStatement')">Export der Anfrage</button>

            <div class="progress">
                <div id="progressbar" class="progressbar"></div>
            </div>
        </div>

        <!-- Tab content -->
        <div id="Zieltabelle" class="tabcontent tabellenFelderAuswahldings">
            <p class="infofelder linksoben">Bitte wählen Sie die Tabelle aus, welche sie Selektieren wollen.</p>
            <select name="tabellenAuswahl" id="tabellenAuswahl" class="tabellennamen linksunten" size=10 onchange="auswahl()">
            <?php
                include "../DB_Connection/tabellenWahl.php";
            ?>
            </select>
        
            <p class="infofelder mitteoben">Bitte wählen Sie die Felder aus.</p>
            <select name="felderAuswahl" id="felderAuswahl" class="tabellennamen mitteunten" size=10 onchange="auswahl()">
            <option>Wählen Sie eine Tabelle aus!</option>
            </select>
            <script type="text/javascript" src="../Anfrage.js"></script> 
            
        </div>
        <div id="bedingungenSelect" class="tabcontent zweiMalDreiSpalten">
            <p class="infofelder linksoben">Hier können Sie zusätzliche Bedingungen eintragen.</p>
            <select id="bedingungenTabelle" size="10" class="tabellennamen linksunten" onchange="auswahl()">
                <option value="">Wählen Sie eine Tabelle aus!</option>
            </select>

            <button class="resetbutton ganzlinksunten" onclick="deselectField()">Eingabe zurücksetzen</button>
            
            <p class="infofelder mitteoben">Wählen Sie hier den Operator aus.</p>
            <label for="operatorBedingungen"></label>
            <select name="operatorBedingungen" id="operatorFelder" size="1" class="operator mitteunten">
                <option disabled selected value> -- Wählen Sie einen Operator aus -- </option>
                <option><</option>
                <option>></option>
                <option>=</option>
                <option><=</option>
                <option>>=</option>
                <option><=</option>
                <option>IN</option>
            </select>

            <button class="resetbutton ganzmitteunten" onclick="deselectOperator()">Eingabe zurücksetzen</button>
        
            <p class="infofelder rechtsoben"> Tragen Sie hier den Wert ein.</p>
            <input type="text" maxlength=20 id="werteingabeBedingungen" class="werte rechtsunten" oninput="auswahl()">
        </div>

        <div id="fertigesStatement" class="tabcontent zweiMalDreiSpalten">
            <p class="statementInfofeld linksoben">Hier können Sie das SELECT-Statement kopieren und ins PMA eingeben.</p>
            <input type="text" id="ausgabeStatement" class="statementAusgabefeld linksunten">
            <button class="statementbuttons1 mitteunten" onclick="kopieren()">Kopieren</button>

            <button id="directButton" class="statementbuttons2 mitteunten" onclick="selectedData();">Direkt im PMA ausführen</button>
            
            <p class="statementInfofeld rechtsoben">Historie/Verlauf <br> anklicken, um es automatisch in Ausgabefeld einzufügen</p>
        <select id="history" class="history rechtsunten" size="10" onchange="history_insert()">
            <?php 
                include "../DB_Connection/history_load.php";
            ?>
        </select>

            <!-- hier kommt selectiertes rein -->
            <!-- 1. Sortierung nach Feld -> 2. Sortierung aufsteigend oder absteigend -->
            <div id="selectedFromDB" class="fieldSelected linksunten">
            </div>

            <div class="sortierung ganzlinksunten">
                <div>
                    <p>Sortieren nach:</p>
                </div>
                <div class="sortierung-select">
                    <select name="order-by" id="order-by" onchange="auswahl()">
                        <option>Select Table First</option>
                    </select>
                </div>
            </div>

        </div>
    </section>
    
    <!-- functions.js muss hier als letztes, damit die Funktionen erst "später" geladen werden -->
    <script type="text/javascript" src="../functions.js"></script>
    <script src="SelectScreen.js"></script>
    <script src="../Anfrage.js"></script>
    <script src="../DB_Connection/directSQL.js"></script>
</body>
</html>