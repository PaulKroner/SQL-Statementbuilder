<?php
    include '../DB_Connection/dbLink.php';
    include '../DB_Connection/anfrage.php';
?>
<!DOCTYPE html>
<html>
  <!--
    Update Dokument
  -->
  <head>
    <meta name="description" content="SQL Statementbuilder Update">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="UpdateScreen.css">
    <link rel="stylesheet" href="../tab.css">
    <link rel="stylesheet" href="../navleiste.css">
    <title>SQL Statementbuilder Update</title>
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
            <!--<<span class="image">
              hier kann das SB Bild rein
                img src="logo.png" alt="">
            </span>-->

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

                <li class="nav-link" onclick="window.location.href = '../SELECTScreen/SelectScreen.php'">
                    <a href="#">
                        <i class='bx bx-pointer icon' ></i>
                        <span class="text nav-text">SELECT</span>
                    </a>
                </li>

                <li class="nav-link" onclick="window.location.href = 'UpdateScreen.php'">
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
        <button class="tablinks" onclick="openTabs(event, 'import')">Import</button>
        <button class="tablinks" onclick="openTabs(event, 'Zieltabelle')">Zieltabelle</button>
        <button class="tablinks" onclick="openTabs(event, 'einstellen')">Einstellen</button>
        <button class="tablinks" onclick="openTabs(event, 'felder')">Felder</button>
        <button class="tablinks" onclick="openTabs(event, 'fertigesStatement')">fertiges Statement</button>

        <div class="progress">
            <div id="progressbar" class="progressbar"></div>
        </div>
    </div>

    <!-- Tab content -->
    <div id="import" class="tabcontent import">
      <input class="file-upload__input linksoben" type="file" name="myFile[]" id="myFile" multiple>
      <button class="file-upload__button importbutton linksoben" type="button">Datei auswählen</button>
      <p class="file-upload__label linksoben"></p>
      <p class="importinfofeld linksunten">Importieren sie, falls vorhanden, die benötigte CSV aus dem PMA.</p>
    </div>

    <div id="Zieltabelle" class="tabcontent zweiMalDreiSpalten">
    <p class="infofelder linksoben">Bitte wählen Sie die Zieltabelle aus.</p>
    <select id="tabellenAuswahl" name="tabellenAuswahl" size="10" class="tabellennamen linksunten" onchange="auswahl()">
    <?php 
        include "../DB_Connection/tabellenWahl.php";
    ?>
    </select>
    </div>

    <div id="einstellen" class="tabcontent zweiMalDreiSpalten">
      <p class="infofelder linksoben">Stellen Sie hier das Feld ein, was Sie verändern wollen.</p>
      <select id="felderAuswahl" name="felderAuswahl" size="10" class="tabellennamen linksunten" onchange="auswahl()">
        <option>Wählen Sie eine Tabelle aus!</option>
      </select>
      <script type="text/javascript" src="../Anfrage.js"></script>

      <p class="infofelder mitteoben"> Tragen Sie hier den Wert ein.</p>
      <input type="text" maxlength=20 id="werteingabeEinstellen" class="werte mitteunten" oninput="auswahl()">
    </div>

    </div>
    
    <div id="felder" class="tabcontent zweiMalDreiSpalten">
      <p class="infofelder linksoben">Hier tragen Sie die Bedingungen ein.</p>
      <select id="felderTabelle" size="10" class="tabellennamen linksunten" onchange="auswahl()">
        <option>Wählen Sie eine Tabelle aus!</option>
      </select>

      <button class="resetbutton ganzlinksunten" onclick="deselectField()">Eingabe zurücksetzen</button>
      
      <p class="infofelder mitteoben">Wählen Sie hier den Operator aus.</p>
      <label for="operatorFelder"></label>
      <select name="operatorFelder" id="operatorFelder" size="1" class="operator mitteunten">
        <option disabled selected value>-- Wählen Sie einen Operator aus --</option>
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
      <input type="text" maxlength=20 id="werteingabeFelder" class="werte rechtsunten" oninput="auswahl()">
    </div>

    <div id="fertigesStatement" class="tabcontent zweiMalDreiSpalten">
        <p class="statementInfofeld linksoben">Hier können Sie das fertige Statement kopieren und ins PMA eingeben.</p>
        <input type="text" id="ausgabeStatement" class="statementAusgabefeld linksunten">
        <button class="statementbuttons1 mitteunten" onclick="kopierenFunktion();">Kopieren</button>
        <button id="directButton" class="statementbuttons2 mitteunten" onclick="direct();">Direkt im PMA ausführen</button>
        <p class="statementInfofeld rechtsoben">Historie/Verlauf <br> anklicken, um es automatisch in Ausgabefeld einzufügen</p>
        <select id="history" class="history rechtsunten" size="10" onchange="history_insert()">
            <?php 
                include "../DB_Connection/history_load.php";
            ?>
        </select>
    </div>

  </section>
  
    <!-- functions.js muss hier als letztes, damit die Funktionen erst "später" geladen werden -->
    <script type="text/javascript" src="../functions.js"></script>
    <script type="text/javascript" src="UpdateScreen.js"></script>
    <script type="text/javascript" src="../Anfrage.js"></script>
    <script src="../DB_Connection/directSQL.js"></script>
</body>
</html>