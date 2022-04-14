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
      <link rel="stylesheet" href="src/styles/dashboard.css">
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
         require('header.php');
         $array = [
            "Fav's" => "favs.php",
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('side_navigation.php');
            sideNavigationCreateElement(1);
         ?>
         <div class="container-page">
            <div class="tableau-bord-wrapper">
               <input id="search-bar" type="text" name="" id="">
               <p id="log"></p>
            </div>
            <div class="container-thumbnail-currency">
               <?php 
                  if (isset($_SESSION['favs']) && $_SESSION['favs'] != '') {
                     $favs = $_SESSION['favs'];
                     // Séparer les monnaies
                     $favs = explode("/", $favs);
                     
                     foreach ($favs as $fav){
                        $fav = explode(",", $fav);
                        [$name, $symbol] = [$fav[0], $fav[1]];
                        // Créer une vignette de monnaie favorite
                        echo "
                        <div class='thumbnail-currency' id='$name' style='visibility: hidden;'>
                           <div class='info-currency'>
                              <div class='info-logo-currency'>
                                 <img src='' alt='$name' crossorigin='anonymous'>
                              </div>
                              <div>
                                 <p class='fav-price'></p>
                                 <p class='fav-symbol'>$symbol</p>
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
      
      <script src="src/scripts/Recherche.js"></script>
      <script src="src/scripts/FavThumbnail.js"></script>
      <script src="src/scripts/App.js"></script>
   </body>
</html>