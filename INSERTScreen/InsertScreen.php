<?php
    include '../DB_Connection/dbLink.php';
    include '../DB_Connection/anfrage.php';
?>
<!DOCTYPE html>
<html>
  <!--
    Insert Dokument
  -->
  <head>
    <meta name="description" content="SQL Statementbuilder Insert">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="InsertScreen.css">
    <link rel="stylesheet" href="../tab.css">
    <link rel="stylesheet" href="../navleiste.css">
    <title>SQL Statementbuilder Insert</title>
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

                <li class="nav-link" onclick="window.location.href = '../UpdateScreen/UpdateScreen.php'">
                  <a href="#">
                      <i class='bx bxs-upvote icon' ></i>
                      <span class="text nav-text">UPDATE</span>
                  </a>
                </li>

                <li class="nav-link" onclick="window.location.href = 'InsertScreen.php'">
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
      <!-- <button class="tablinks" onclick="openTabs(event, 'import')">Import</button> -->
      <button class="tablinks" onclick="openTabs(event, 'Zieltabelle')">Zieltabelle</button>
      <button class="tablinks" onclick="openTabs(event, 'bedingungen')">Felder</button>
      <button class="tablinks" onclick="openTabs(event, 'fertigesStatement')">fertiges Statement</button>
      
        <div class="progress">
            <div id="progressbar" class="progressbar"></div>
        </div>
    </div>

    <!-- Tab content -->

    <div id="Zieltabelle" class="tabcontent zweiMalDreiSpalten">
        <p class="infofelder linksoben">Bitte wählen Sie die Zieltabelle aus.</p>
        <select id="tabellenAuswahl" name="tabellenAuswahl" size="10" class="tabellennamen linksunten" onchange="auswahl()">
        <?php
            include "../DB_Connection/tabellenWahl.php";
        ?>
        </select>
    </div>

    <div id="bedingungen" class="tabcontent zweiMalDreiSpalten">
      <p class="infofelder linksoben">Stellen Sie hier das Feld ein, was Sie einfügen wollen.</p>
      <select id="bedingungenTabelle" name="bedingungenTabelle" size="10" class="tabellennamen linksunten" onchange="auswahl()">
        <option>Wählen Sie eine Tabelle aus!</option>
      </select>

      <p class="infofelder mitteoben"> Tragen Sie hier den Wert ein.</p>
      <input type="text" maxlength=20 id="werteingabeEinstellen" class="werte mitteunten" oninput="auswahl()">
    </div>

    <div id="fertigesStatement" class="tabcontent zweiMalDreiSpalten">
        <p class="statementInfofeld linksoben">Hier können Sie das fertige Statement kopieren und ins PMA eingeben.</p>
        <input type="text" id="ausgabeStatement" class="statementAusgabefeld linksunten">
        <button class="statementbuttons1 mitteunten" onclick="kopierenFunktion();">Kopieren</button>
        <button id="directButton" class="statementbuttons2 mitteunten" onclick="direct();">Direkt im PMA ausführen</button>
        <p class="statementInfofeld rechtsoben">Historie/Verlauf <br> anklicken, um es automatisch in Ausgabefeld einzufügen</p>
        <select id="history" class="history rechtsunten" size="10">
            <?php 
                include "../DB_Connection/history_load.php";
            ?>
        </select>
    </div>
  </section>
    <!-- functions.js muss hier als letztes, damit die Funktionen erst "später" geladen werden -->
    <script type="text/javascript" src="../functions.js"></script>
    <script type="text/javascript" src="InsertScreen.js"></script>
    <script src="../Anfrage.js"></script>
    <script src="../DB_Connection/directSQL.js"></script>
</body>
</html>