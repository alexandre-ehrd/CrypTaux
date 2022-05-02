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
      <link rel="stylesheet" href="src/styles/cryptocurrency.css">
   </head>
   <body>
      <?php
         require('src/backend/header.php');
         $array = [
            "Fav's" => "javascript:history.go(-1)",
            $nameCryptocurrency => $url,
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('src/backend/side_navigation.php');
            sideNavigationCreateElement(1);
         ?>
         <div class="container-page">
            <div class="cryptocurrency-infos">
               <img id="cryptocurrency-logo" src="" alt="">
               <div>
                  <div class="cryptocurrency-infos-name">
                     <h2 id="cryptocurrency-name"></h2>
                     <i id="cryptocurrency-favs-button" class="fav-button bi"></i>
                  </div>
                  <p id="cryptocurrency-symbol"></p>
               </div>
            </div>

            <div class="wrapper">
               <div class="chart-header">
                  <h3 id="cryptocurrency-price"></h3>
                  <div id="chart-period-selector">
                     <a>1 j</a>
                     <a class="period-selected">7 j</a>
                     <a>1 a</a>
                     <a>Max</a>
                  </div>
               </div>
               <canvas id="cryptocurrency-chart"></canvas>
            </div>

            <div class="wrapper">
               <h4>Statistiques</h4>
               <div id="wrapper-statistiques" class="wrapper-grid">
                  <div>
                     <p>Capitalisation boursière</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Niveau historique</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 1 heure)</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 24 heures)</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 7 jours)</p>
                     <p>%</p>
                  </div> 
               </div>
            </div>

            <!-- <div class="wrapper">
               <div>
                  <h4 class="popover-text">Description</h4>
                  <?php
                     require('src/backend/popover.php');
                     popoverCreateElement("popover-bottom", "Cette description est traduite automatiquement.", "");
                  ?>
               </div>
               <div id="wrapper-description">
               </div>
            </div> -->

            <div class="wrapper">
               <h4>Cours le plus élevé</h4>
               <p></p>
            </div>

            <div class="wrapper">
               <h4>Cours le plus bas</h4>
               <p></p>
            </div>
            

            <div class="wrapper">
               <h4>Communauté</h4>
               <div class="wrapper-grid">
                  <div>
                     <p>Capitalisation boursière</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Niveau historique</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 1 heure)</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 24 heures)</p>
                     <p>%</p>
                  </div>
                  <div>
                     <p>Fluctuation de prix (en 7 jours)</p>
                     <p>%</p>
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



      </section>

      


      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      
      <script src="src/scripts/Cryptocurrency.js" type="module"></script>

   </body>
</html>