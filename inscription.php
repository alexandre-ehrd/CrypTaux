<?php

require('login_key.php');



try {
   echo "Connexion au serveur : $server...<br>";
   $db = new PDO("mysql:$server;dbname=$dbname;charset=utf8", $user, $password);
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "✅ Connecté au serveur : $server<br>";
   $db->query("use thalex");
} catch (PDOException $e) {
   print ("❌ Erreur ! : " . $e->getMessage() . "<br>");
   die();
}


$mail_user = $_POST["mail"];
$username_user = $_POST["username"];
$password_user = $_POST["password"];
$password_user = password_hash($password_user, PASSWORD_DEFAULT);

/* $select=$db->query("SELECT count(mail) FROM cryptaux WHERE mail='$mail_user'")->fetchAll(PDO::FETCH_OBJ);
print_r($select);

print_r($select); */

$result = $db->query("SELECT count(mail) FROM cryptaux WHERE mail='$mail_user'");
$count = $result->fetchColumn();

if ($count == 0) {
   $db->query("INSERT INTO cryptaux VALUES ('$mail_user', '$username_user', '$password_user', 'favs')");
   echo "Inscription réussie ! ✅";
} else {
   echo "Cette adresse mail est déjà utilisée ! ❌";
}


//header("Location: page2.html");
//exit();
?>