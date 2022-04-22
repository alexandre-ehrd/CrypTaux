<?php
   session_start();
   require('connect_database.php');

   $mail_user = $_SESSION['mail'];

   // Récupérer l'URL de la page
   $url = $_SERVER['REQUEST_URI'];
   // La fonction parse retourne un tableau associatif qui contient les différents composants de l'URL
   $url_components = parse_url($url);
   parse_str($url_components['query'], $urlQuery);
   $idCryptocurrency = $urlQuery['id'];
   $symbolCryptocurrency = $urlQuery['symbol'];

   $reponse=$db->query("SELECT favs FROM cryptaux WHERE mail='$mail_user'")->fetchAll(PDO::FETCH_OBJ);
   
   $favs = $reponse[0]->favs;
   
   // Supprimer la monnaie des fav's
   if (strpos($favs, "$idCryptocurrency,$symbolCryptocurrency") !== false) {
      // Il reste au moins une cryptomonnaie dans la liste des fav's
      if (strpos($favs, "/$idCryptocurrency,$symbolCryptocurrency") !== false) {
         $favs = str_replace("/$idCryptocurrency,$symbolCryptocurrency", "", $favs);
      }
      // Il n'y a qu'une cryptomonnaie dans la liste des fav's
      else {
         $favs = str_replace("$idCryptocurrency,$symbolCryptocurrency", "", $favs);
      }
   }
   // Ajouter la monnaie aux fav's
   else {
      if ($favs == "") {
         $favs = "$idCryptocurrency,$symbolCryptocurrency";
      }
      else {
         $favs = "$idCryptocurrency,$symbolCryptocurrency/$favs";
      }
   }

   $db->query("UPDATE cryptaux SET favs='$favs' WHERE mail='$mail_user'");
?>