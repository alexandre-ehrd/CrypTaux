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
         require('header.php');
         $array = [
            "Tableau de bord" => "index.php",
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('side_navigation.php');
            sideNavigationCreateElement(0);
         ?>
         <div class="container-page">

            <div class="title-tableau-bord">
               <h3>Fav's</h3>
               <a href="favs.php">
                  <i class="bi bi-chevron-right"></i>
               </a>
            </div>
            
            <div class="container-thumbnail-currency">
               <?php 
                  if (isset($_SESSION['favs']) && $_SESSION['favs'] != '' && $_SESSION['username'] == 'Thalex') {
                     $favs = $_SESSION['favs'];
                     // Séparer les monnaies
                     $favs = explode("/", $favs);
                     foreach ($favs as $fav) {
                        $fav = explode(",", $fav);
                        [$name, $symbol] = [$fav[0], $fav[1]];
                        // Créer une vignette de monnaie favorite
                        echo "
                        <div class='thumbnail-currency thumbnail-hide' id='$name' style='visibility: hidden;'>
                           <div class='info-currency'>
                              <img src='' alt='$name' crossorigin='anonymous'>
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
                     echo "Vous devez être administrateur... ✨";
                  }
               ?>
            </div>


            <div class="container-page-bottom">

               <div id="wallet-dashboard">
                  <div class="title-tableau-bord">
                     <h3>Mon portefeille</h3>
                     <a href="wallet.php">
                        <i class="bi bi-chevron-right"></i>
                     </a>
                  </div>
               </div>
               
               <div id="exchange-dashboard">

                  <div class="title-tableau-bord">
                     <h3>Échanges</h3>
                     <a href="exchange.php">
                        <i class="bi bi-chevron-right"></i>
                     </a>
                  </div>
               </div>
               
               <div id="famous-dashboard">

                  <div class="title-tableau-bord" id="test">
                     <h3>Populaires</h3>
                  </div>
               </div>
            </div>
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
      
      <script src="src/scripts/Dashboard.js" type="module"></script>
      <script src="src/scripts/FavThumbnail.js" type="module"></script>
   </body>
</html>