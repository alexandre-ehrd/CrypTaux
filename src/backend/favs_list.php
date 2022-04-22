<?php
   session_start();
   require('connect_database.php');
   
   $mail_user = $_SESSION['mail'];
   
   $reponse=$db->query("SELECT favs FROM cryptaux WHERE mail='$mail_user'")->fetchAll(PDO::FETCH_OBJ);
   $favs = $reponse[0]->favs;
   echo $favs;
?>