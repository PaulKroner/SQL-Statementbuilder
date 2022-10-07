<!-- Quelle: https://www.php-einfach.de/experte/php-codebeispiele/loginscript/ -->
<?php 
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=testdb', 'root', '');

$showFormular = true; //Variable ob das Registrierungsformular anezeigt werden soll
 
if(isset($_GET['register'])) {
    $error = false;
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];
    $passwort2 = $_POST['passwort2'];
  
    if(!filter_var($benutzername)) {
        echo 'Bitte einen gültigen Benutzernamen eingeben<br>';
        $error = true;
    }     
    if(strlen($passwort) == 0) {
        echo 'Bitte ein Passwort angeben<br>';
        $error = true;
    }
    if($passwort != $passwort2) {
        echo 'Die Passwörter müssen übereinstimmen<br>';
        $error = true;
    }
    
    //Überprüfe, dass der benutzername noch nicht registriert wurde
    if(!$error) { 
        $statement = $pdo->prepare("SELECT * FROM users WHERE benutzername = :benutzername");
        $result = $statement->execute(array('benutzername' => $benutzername));
        $user = $statement->fetch();
        
        if($user !== false) {
            echo 'Dieser Benutzername ist bereits vergeben<br>';
            $error = true;
        }    
    }
    
    //Keine Fehler, wir können den Nutzer registrieren
    if(!$error) {    
        $passwort_hash = password_hash($passwort, PASSWORD_DEFAULT);
        
        $statement = $pdo->prepare("INSERT INTO users (benutzername, passwort) VALUES (:benutzername, :passwort)");
        $result = $statement->execute(array('benutzername' => $benutzername, 'passwort' => $passwort_hash));
        
        if($result) {        
            echo 'Du wurdest erfolgreich registriert. <a href="../Login/login.php">Zum Login</a>';
            $showFormular = false;
            header('Location: ../Login/login.php');
        } else {
            echo 'Beim Abspeichern ist leider ein Fehler aufgetreten<br>';
        }
    } 
}
 
if($showFormular) {
?>

<!DOCTYPE html>
<html>
  <!--
    Registrierung
  -->
  <head>
    <meta name="description" content="SQL Statementbuilder Registration">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css;" href="registration.css">
    <title>SQL Statementbuilder Registration</title>
    <link rel="icon" type="image/x-icon" href="SB_Logo.JPG">
    <!----===== Boxicons CSS ===== -->
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
  </head>
<body>
    <form action="?register=1" method="post">
        <div class="regbox" id="regbox">
            <div class="headline">
                <h1>Registrierung</h1>
            </div>
                
            <form class="inputbereich" id="inputbereich">
                <div class="eingabe">
                    <input type="text" required maxlength="20" id="benutzername" name="benutzername">
                    <label>Benutzername</label>
                    <div class="error"></div>
                </div>
                <!-- <div class="eingabe">
                    <input type="email" required maxlength="20" id="email" name="email">
                    <label>Email</label>
                    <div class="error"></div>
                </div> -->
                <div class="passwordbox">
                    <div class="eingabe">
                    <input type="password" required maxlength="20" id="passwort" name="passwort">
                    <label>Passwort</label>
                    <div class="error"></div>
                    </div>
                    <div class="eingabe">
                    <input type="password" required maxlength="20" id="passwort2" name="passwort2">                    
                    <label>Passwort bestätigen</label>
                    <div class="error"></div>
                    </div>
                </div>
                <div>
                <button type="submit" class="loginbutton" value="Abschicken">Registrierung abschließen</button>
                </div>
            </form>
        </div>
    </form>
  <div class="footer">
      <div class="light-dark">
        <div class="mode">
            <div class="sun-moon">
                <i class='bx bx-moon icon moon'></i>
                <i class='bx bx-sun icon sun'></i>
            </div>
            <span class="mode-text text">Dark mode</span>
    
            <div class="toggle-switch">
                <span class="switch"></span>
            </div>
        </div>
      </div>

      <!-- Bilder mit Leerzeichen im Namen bekommen automatisch "_" bei w3 aber NICHT in VSC-->
      <a href="https://www.gisa.de/">
        <img alt="Gisa Logo" class="unteresBild" src="../pictures/GISA_Logo.jpg">
     </a>
  </div>
  <script src="registration.js"></script>


  <?php
    } //Ende von if($showFormular)
    ?>
</body>
</html>