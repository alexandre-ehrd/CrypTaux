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
      <!-- Styles -->
      <link rel="stylesheet" href="src/styles/style.css">
      <link rel="stylesheet" href="src/styles/header.css">
      <link rel="stylesheet" href="src/styles/navigation.css">
      <link rel="stylesheet" href="src/styles/dashboard.css">
      <link rel="stylesheet" href="src/styles/thumbnailFav.css">
      <!-- Styles Mobile -->
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/header_mobile.css"/>
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/navigation_mobile.css"/>
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
            "Tableau de bord" => "index.php",
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('src/backend/side_navigation.php');
            sideNavigationCreateElement(0);
         ?>
         <div class="container-page">

            <div class="title-tableau-bord">
               <h3>Fav's</h3>
               <a href="favs.php">
                  <i class="bi bi-chevron-right"></i>
               </a>
            </div>
            
            <div class="container-thumbnail-currency"></div>
            <div>
               <h3 class="popover-text">Populaires</h3>
               <?php
                  require('src/backend/popover.php');
                  popoverCreateElement("popover-bottom", "Cours des crypto-monnaies par capitalisation boursière.<br><br>Capitalisation boursière = Cours actuel x Offre en circulation", "https://www.bdc.ca/fr/articles-outils/boite-outils-entrepreneur/gabarits-documents-guides-affaires/glossaire/capitalisation-boursiere");
               ?>
            </div>
            <div class="container-cryptocurrency-trending">
               <table id="cryptocurrency-trending">
                  <thead>   
                     <tr>
                        <th></th>
                        <th style="text-align: left;">Nom</th>
                        <th>Prix</th>
                        <th>1 heure</th>
                        <th>24 heures</th>
                        <th>7 jours</th>
                     </tr>
                  </thead>
                  <tbody id="cryptocurrency-trending-body"></tbody>
               </table>
            </div>
         </div>
      </section>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>
      
      <script src="src/scripts/Dashboard.js" type="module"></script>
      <script src="src/scripts/FavThumbnail.js" type="module"></script>
      <script src="src/scripts/FavsManagerHeart.js" type="module"></script>
      <script src="src/scripts/LivePrice.js" type="module"></script>
      <script src="src/scripts/Navigation.js"></script>
   </body>
</html>