<?php
   require('login_key.php');

   try {
      // echo "Connexion au serveur : $server...<br>";
      $db = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8", $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //$db->query("use $dbname");
      //echo "✅ Connecté au serveur : $server<br>";
   } catch (PDOException $e) {
      //echo "❌ Erreur ! : " . $e->getMessage() . "<br>";
      die();
   }
?>