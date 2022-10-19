<?php 
session_start();
$pdo = new PDO('mysql:host=localhost;dbname=testdb', 'root', '');
 
if(isset($_GET['login'])) {
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];
    
    $statement = $pdo->prepare("SELECT * FROM users WHERE benutzername = :benutzername");
    $result = $statement->execute(array('benutzername' => $benutzername));
    $user = $statement->fetch();
        
    //Überprüfung des Passworts
    if ($user !== false && password_verify($passwort, $user['passwort'])) {
        $_SESSION['userid'] = $user['id'];
        // die('Login erfolgreich. Weiter zu <a href="../index.html">internen Bereich</a>');
        header('Location: ../index.html');
    } else {
        $errorMessage = "E-Mail oder Passwort war ungültig<br>";
    }
    
}
if(isset($errorMessage)) {
    echo $errorMessage;
}
?>

<!DOCTYPE html>
<html>
  <!--
    Login
  -->
<head>
    <meta name="description" content="SQL Statementbuilder Login">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css;" href="login.css">
    <title>SQL Statementbuilder Login</title>
    <link rel="icon" type="image/x-icon" href="../pictures/SB_Logo.JPG">
    <!----===== Boxicons CSS ===== -->
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    
</head>
<body>
  <div class="kopfbereich">
    <button class="ohneLogin" id="ohneLogin">ohne Login weiter</button>
  </div>
  <form action="?login=1" method="post">
    <div class="loginbox">
        <div class="headline">
          <h1>Login</h1>
        </div>
        
        <div class="inputbereich">
          <div class="eingabe">
              <input type="text" required maxlength="20" id="benutzername" name="benutzername">
              <label>Benutzername</label>
              <div class="error"></div>
          </div>

          <div class="eingabe">
              <input type="password" required maxlength="20" id="passwort" name="passwort">
              <label>Passwort</label>
              <div class="error"></div>
          </div>
          
          <label class="pwremember">
            <label class="forgotpassword"><a href="#" class="forgotpassword">Passwort vergessen?</a></label>
            <div class="rememberbox">
              <input type="checkbox" name="remember">
            <div class="remembertext">Remember me</div>
            </div>
          </label>
          
          <div>
            <button type="submit" class="loginbutton" id="login-button">Login</button>
          </div>

          <div class="signup" onclick="window.location.href = '../Register/Registration.php'">
              Noch kein Mitglied? <a href="#">Registriere dich jetzt!</a>
          </div>
        </div>
    </div>
    </form>
   
    <pre id="output"></pre>
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

      <script src="../index.js"></script>
      <script src="login.js"></script>
      <script src="../Register/Registrierung.js"></script>
      <!-- Bilder mit Leerzeichen im Namen bekommen automatisch "_" bei w3 aber NICHT in VSC-->
      <a href="https://www.gisa.de/">
        <img alt="Gisa Logo" class="unteresBild" src="../pictures/GISA_Logo.jpg">
     </a>
  </div>
</body>
</html>