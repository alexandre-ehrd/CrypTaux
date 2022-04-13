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
      <?php
         // Récupérer l'URL de la page
         $url = $_SERVER['REQUEST_URI'];
         // La fonction parse retourne un tableau associatif qui contient les différents composants de l'URL
         $url_components = parse_url($url);
         parse_str($url_components['query'], $urlQuery);
         $nameCryptocurrency = $urlQuery['name'];
         $symbolCryptocurrency = $urlQuery['symbol'];
         $idCryptocurrency = $urlQuery['id'];

         // Impossible d'accéder à la cryptomonnaie demandée
         if (!isset($idCryptocurrency)) {
            header("Location: favs.php");
            exit();
         }

         // Récupérer les données de l'utilisateur
         session_start();
         
         // Impossible d'accéder à la session de l'utilisateur
         if (!isset($_SESSION['username'])) {
            // Redirigier l'utilisateur vers la page de connexion
            header("Location: connexion.php");
            exit();
         }
      ?>
      <title>
         Cryptaux - <?php echo $nameCryptocurrency ?>
      </title>
      <link rel="stylesheet" href="src/styles/style.css">
      <link rel="stylesheet" href="src/styles/header.css">
      <link rel="stylesheet" href="src/styles/navigation.css">
      <link rel="stylesheet" href="src/styles/dashboard.css">
   </head>
   <body>
      <?php
         require('header.php');
         $array = [
            "Fav's" => "favs.php",
            $nameCryptocurrency => $url,
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="contenu">
         <?php
            require('side_navigation.php');
            sideNavigationCreateElement(1);
         ?>
      </section>








      <section class="header">
         <div>

               <!-- <div class="popover">
                  <i class="bi bi-question-circle">
                     <div class="popover-content-container">
                        <h4>Lorem.</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quae rem laborum ab atque deleniti?</p>
                     </div>
                  </i>
               </div> -->
               
               
               <!-- <div class="popover">
                  <i class="bi bi-question-circle first-popover"></i>
                  <div class="popover-container">
                     <h4>Lorem.</h4>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quae rem laborum ab atque deleniti?</p>
                  </div>
               </div> -->
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



      </section>

      


      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      
      <script src="src/scripts/Recherche.js"></script>
      <script src="src/scripts/FavThumbnail.js"></script>
      <script src="src/scripts/App.js"></script>


      
   </body>
</html>