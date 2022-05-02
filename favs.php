<!DOCTYPE html>
<html lang="fr">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- Polices d'écritures -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <!-- Icônes Bootstrap -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
      <title>Cryptaux</title>
      <link rel="stylesheet" href="src/styles/style.css">
      <link rel="stylesheet" href="src/styles/header.css">
      <link rel="stylesheet" href="src/styles/navigation.css">
      <link rel="stylesheet" href="src/styles/favs.css">
      <link rel="stylesheet" href="src/styles/thumbnailFav.css">
      <?php
         session_start();
         
         // Impossible d'accéder à la session de l'utilisateur
         if (!isset($_SESSION['username'])) {
            // Redirigier l'utilisateur vers la page de connexion
            header("Location: connexion.php");
            exit();
         }
      ?>
   </head>
   <body>
      <?php
         require('src/backend/header.php');
         $array = [
            "Fav's" => "favs.php",
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('src/backend/side_navigation.php');
            sideNavigationCreateElement(1);
         ?>
         <div class="container-page">
            <div class="container-search-bar">
               <div class="search-bar-wrapper" title="Rechercher des crypto-monnaies ou des exchanges">
                  <input id="search-bar" type="text" name="" placeholder="Rechercher des crypto-monnaies ou des exchanges">
                  <i class="bi bi-search" id="search-button"></i>
               </div>
            </div>
            <!-- Cryptomonnaies -->
            <h3 id="cryptocurrency-text-result" style="display: none;">Cryptomonnaies</h3>
            <div id="cryptocurrency-search-result" class="container-thumbnail-currency" style="display: none;"></div>

            <!-- Exchange -->
            <div id="exchange-text-result-parent" style="display: none;">
               <h3 id="exchange-text-result" class="popover-text">Exchanges</h3>
               <?php
                  require('src/backend/popover.php');
                  popoverCreateElement("popover-bottom", "Un exchange est une plateforme spécialisée qui permet d’acheter ou de vendre des cryptomonnaies.", "https://en.wikipedia.org/wiki/Cryptocurrency_exchange");
               ?>
            </div>
            <div id="exchange-search-result" style="display: none;"></div>         
            <h3>Mes fav's</h3>
            <div class="container-thumbnail-currency">
               <?php 
                  require('src/backend/connect_database.php');
                  $mail_user = $_SESSION['mail'];
                  $reponse=$db->query("SELECT favs FROM cryptaux WHERE mail='$mail_user'")->fetchAll(PDO::FETCH_OBJ);
                  $favs = $reponse[0]->favs;

                  if (isset($favs) && $favs != '') {
                     // Séparer les monnaies
                     $favs = explode("/", $favs);
                     
                     foreach ($favs as $fav){
                        $fav = explode(",", $fav);
                        [$name, $symbol] = [$fav[0], $fav[1]];
                        // Créer une vignette de monnaie favorite
                        echo "
                        <div class='thumbnail-currency' id='$name' style='visibility: hidden;'>
                           <div class='info-currency'>
                              <img src='' alt='$name' crossorigin='anonymous'>
                              <div>
                                 <p class='fav-price'></p>
                                 <p class='fav-symbol'>". strtoupper($symbol). "</p>
                              </div>
                              <p class='fav-taux'></p>   
                           </div>
                           <canvas class='fav-chart'></canvas>
                        </div>
                        ";
                     }
                  }
                  else {
                     echo "Vous n'avez pas de fav's";
                  }
               ?>
            </div>

      </section>
      
      <!-- <div class="skeleton-container">
         <div class="skeleton skeleton-title">
            <p></p>
         </div>
         <div class="skeleton skeleton-text"></div>
         <div class="skeleton skeleton-text"></div>
         <div class="skeleton skeleton-text"></div>
         <div class="skeleton skeleton-text"></div>
      </div> -->


      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>
      
      <script src="src/scripts/Favs.js" type="module"></script>
      <script src="src/scripts/Recherche.js" type="module"></script>

      <script src="src/scripts/FavThumbnail.js" type="module"></script>
   </body>
</html>