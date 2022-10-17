<?php
    include '../DB_Connection/dbLink.php';
    include '../DB_Connection/anfrage.php';
?>
<!DOCTYPE html>
<html>

  <head>
    <meta name="description" content="SQL Statementbuilder Startseite">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Statementbuilder Select</title>
    
    <link rel="stylesheet" type="text/css;" href="AllInOne.css">
    <link rel="icon" type="image/x-icon" href="../pictures/SB_Logo.JPG">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>

<body>
    <header class="kopfzeile">
        <div class="kopfzeile_links">  
            <p class="working-title" onclick="window.location.href = '../index.html'">SQL-Statementbuilder</p>
        </div>

        <div class="kopfzeile_rechts">
            <div class="light-dark-mode">
                <div class="sun-moon">
                    <i class='bx bx-moon icon moon'></i>
                    <i class='bx bx-sun icon sun'></i>
                </div>
            </div>
            <div id="profile-icon" class="profile-icon"></div>
            <button class="login-button" onclick="window.location.href = '../Login/login.php'">Login</button>
        </div>
    </header>

    <section class="hauptScreen">
    <!-- Tab links -->
        <div class="tab">
            <button class="tablinks" id="statementfeld" onclick="openTabs(event, 'Statementtyp')">Statementtyp</button>
            <button class="tablinks tabbutton" id="zieltabelle" onclick="openTabs(event, 'Zieltabelle')">Tabellen- und Felderauswahl</button>
            <button class="tablinks tabbutton" id="bedingungenselect" onclick="openTabs(event, 'bedingungenSelect')">Bedingungen</button>
            <button class="tablinks tabbutton" id="insertValues" onclick="openTabs(event, 'insertvalues')">Insert</button>
            <button class="tablinks tabbutton" id="fertigesstatement" onclick="openTabs(event, 'fertigesStatement')">Export der Anfrage</button>
            <button class="tablinks test" id="testbutton" onclick="openTabs(event, 'fertigesStatement')">Export der Anfrage</button>

            <div class="progress">
                <div id="progressbar" class="progressbar"></div>
            </div>
        </div>

        <!-- Tab content -->
        <div id="Statementtyp" class="tabcontent">

            <div class="boxfield">
                <p class="infofelder">
                    Bitte wählen Sie das Statement aus, welches benötigt wird. <br>
                    SELECT = auswählen und anzeigen <br>
                    UPDATE = aktualisieren <br>
                    INSERT = Daten einfügen
                </p>
                <select data-statement="1" name="StatementAuswahl" id="StatementAuswahl" class="statementTabellennamen" size=3 onchange="statementchange();">
                    <option>SELECT</option>
                    <option>UPDATE</option>
                    <option>INSERT</option>
                </select>
            </div>
            
        </div>

        <!-- Zieltabelle und Felder -->
        <div id="Zieltabelle" class="tabcontent">

            <div class="boxfield">
                <p class="infofelder">Bitte wählen Sie die Tabelle aus, welche sie Selektieren wollen.</p>
                <select data-table="1" name="tabellenAuswahl" id="tabellenAuswahl" class="tabellennamen" size=10 onchange="selectChoice()">
                <?php
                    include "../DB_Connection/tabellenWahl.php";
                ?>
                </select>
            </div>
            <div class="boxfield">
                <p class="infofelder">Bitte wählen Sie die Felder aus.</p>
                <select data-select="1" name="felderAuswahl" id="felderAuswahl" class="tabellennamen" size=10 onchange="selectChoice()">
                <option>Wählen Sie eine Tabelle aus!</option>
                </select>
                <!-- <script type="text/javascript" src="../Anfrage.js"></script>  -->
            </div>

            <!-- nur für Update wichtig -->
            <div class="boxfield" id="forUpdateOnly">
                <p class="infofelder"> Tragen Sie hier den Wert ein.</p>
                <input data-input="1" type="text" maxlength=20 id="wertEingabeFelder" class="werte" oninput="selectChoice()">
            </div>

        </div>

        <!-- Bedingungen -->
        <div id="bedingungenSelect" class="tabcontent">

            <div class="boxfield">
                <p class="infofelder">Hier können Sie zusätzliche Bedingungen eintragen.</p>
                <select data-select="2" id="bedingungenTabelle" size="10" class="tabellennamen" onchange="selectChoice()">
                    <option value="">Wählen Sie eine Tabelle aus!</option>
                </select>
                <button class="resetbutton" onclick="deselect('bedingungenTabelle')">Eingabe zurücksetzen</button>
            </div>
            <div class="boxfield">
                <p class="infofelder">Wählen Sie hier den Operator aus.</p>
                <label for="operatorBedingungen"></label>
                <select data-operator="1" name="operatorBedingungen" id="operatorBedingungen" size="1" class="operator" onchange="selectChoice()">
                    <option disabled selected value> -- Wählen Sie einen Operator aus -- </option>
                    <option><</option>
                    <option>></option>
                    <option>=</option>
                    <option><=</option>
                    <option>>=</option>
                    <option>IN</option>
                </select>

                <button class="resetbutton" onclick="deselect('operatorBedingungen')">Eingabe zurücksetzen</button>
            </div>
            <div class="boxfield">
                <p class="infofelder"> Tragen Sie hier den Wert ein.</p>
                <input data-input="2" type="text" maxlength=20 id="werteingabeBedingungen" class="werte" oninput="selectChoice()">
            </div>

            <div id="add_bereich">

            </div>

            <!-- weitere Bedingungen -->
            <div class="boxfield">
                <p class="infofelder"> Wollen Sie weitere Bedingungen eingeben?</p>
                <div class="add_bedingungen">
                    <button id="add_bedingungen_button" class="add_bedingungen_button" onclick="add_bedingungen()">+</button>
                </div>
            </div>
            
        </div>

        <!-- INSERT -->
        <div id="insertvalues" class="tabcontent">

            <div class="boxfield">
                <p class="infofelder">Bitte wählen Sie die Tabelle aus, welche sie Selektieren wollen.</p>
                <select name="tabellenAuswahlInsert" id="tabellenAuswahlInsert" class="tabellennamen" size=10 onchange="selectChoice()">
                <?php
                    include "../DB_Connection/tabellenWahl.php";
                ?>
                </select>
            </div>
            <div class="boxfield">
                <p class="infofelder">Bitte wählen Sie die Felder aus.</p>
                <select name="felderAuswahlInsert" id="felderAuswahlInsert" class="tabellennamen" size=10 onchange="selectChoice()">
                <option>Wählen Sie eine Tabelle aus!</option>
                </select>
                <script type="text/javascript" src="../Anfrage.js"></script> 
            </div>

            <div class="boxfield">
                <p class="infofelder"> Tragen Sie hier den Wert ein.</p>
                <input type="text" maxlength=20 id="wertEingabeFelderInsert" class="werte" oninput="selectChoice()">
            </div>

        </div>

        <!-- Ausgabe und Stuff -->
        <div id="fertigesStatement" class="tabcontent">
            <div class="boxfield">
                <p class="statementInfofeld">Hier können Sie das SELECT-Statement kopieren und ins PMA eingeben.</p>
                <input type="text" id="ausgabeStatement" class="statementAusgabefeld">
            </div>
            <div class="boxfield statementbutton12">
                <button class="statementbuttons1" onclick="kopierenFunktion()">Kopieren</button>
                <button id="directButton" class="statementbuttons2" onclick="direct(); selectedData();">Direkt im PMA ausführen</button>
            </div>

            <!-- hier kommt selectiertes rein -->
            <div class="boxfield" id="SelectedDisplay">
                <p class="statementInfofeld">Hier wird das Selektierte angezeigt.</p>
                <div id="selectedFromDB" class="fieldSelected"></div>

                <div class="sortierung">
                    <div>
                        <p>Sortieren nach:</p>
                    </div>
                    <div class="sortierung-select">
                        <select name="order-by" id="order-by" onchange="selectChoice()">
                            <option>Select Table First</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Historie -->
            <div class="boxfield">
                <p class="statementInfofeld">Historie/Verlauf <br> anklicken, um es automatisch in Ausgabefeld einzufügen</p>
                <select id="history" class="history" size="10" onchange="history_insert()">
                    <?php 
                        include "../DB_Connection/history_load.php";
                    ?>
                </select> 
            </div>

            <button class="statementbuttons1" onclick="testCounter()">TestCounter()</button>

        </div>
    </section>
    

    <script src="AllInOne.js"></script>
    <script src="add_bedingungen.js"></script>
    <script src="../Anfrage.js"></script>
    <script src="../DB_Connection/directSQL.js"></script>
</body>
</html>