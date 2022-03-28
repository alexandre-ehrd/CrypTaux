<?php
require('login.php');

try {
   echo "Connecting to $server...<br>";
   $db = new PDO("mysql:$server;dbname=$dbname;charset=utf8", $user, $password);
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Connected to $server <br>";
   $db->query("use thalex");
} catch (PDOException $e) {
   print ("Erreur ! : " . $e->getMessage() . "<br/>");
   die();
}


$reponse=$db->query('SELECT mail FROM cryptaux')->fetchAll(PDO::FETCH_OBJ);
foreach ($reponse as $row) {
   echo 'le nom est '.$row->mail.'<br>'; 
} 
?>