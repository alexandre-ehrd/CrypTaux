<?php
require('login_key.php');

$mail = $_POST["username"];
echo "Bonjour " . $mail . "<br>";

try {
   echo "Connecting to $server...<br>";
   $db = new PDO("mysql:$server;dbname=$dbname;charset=utf8", $user, $password);
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Connected to $server<br>";
   $db->query("use thalex");
} catch (PDOException $e) {
   print ("Erreur ! : " . $e->getMessage() . "<br/>");
   die();
}



$reponse=$db->query("SELECT password FROM cryptaux WHERE mail='$mail'")->fetchAll(PDO::FETCH_OBJ);
$password = $reponse[0]->password;
// On hash le password stocké sur le serveur car on ne la pas fait au login
$hash = password_hash($password, PASSWORD_DEFAULT);

$password_user = "admin12";

echo "Real password : " . $password . "<br>";
echo "Input password : " . $password_user . "<br>";



//echo "hash : " . $hash . "<br>";
//echo password_verify($password, $hash)

if (password_verify($password_user, $hash)) {
   echo 'Le mot de passe est valide !';
} else {
   echo 'Le mot de passe est invalide.';
}


//header("Location: page2.html");
//exit();



?>