<?php

require('login_key.php');

try {
   // echo "Connexion au serveur : $server...<br>";
   $db = new PDO("mysql:$server;dbname=$dbname;charset=utf8", $user, $password);
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "✅ Connecté au serveur : $server<br>";
   $db->query("use thalex");
} catch (PDOException $e) {
   // print ("❌ Erreur ! : " . $e->getMessage() . "<br>");
   die();
}
?>