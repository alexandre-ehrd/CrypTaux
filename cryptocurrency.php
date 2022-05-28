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
      <title>Cryptaux - <?php echo $nameCryptocurrency?></title>
      <!-- Styles -->
      <link rel="stylesheet" href="src/styles/style.css">
      <link rel="stylesheet" href="src/styles/header.css">
      <link rel="stylesheet" href="src/styles/navigation.css">
      <link rel="stylesheet" href="src/styles/cryptocurrency.css">
      <!-- Styles Mobile -->
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/cryptocurrency_mobile.css"/>
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/header_mobile.css"/>
      <link rel="stylesheet" media="screen and (max-width: 1024px)" href="src/styles/mobile/navigation_mobile.css"/>
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
               <img id="cryptocurrency-logo" src="" alt="" crossorigin="anonymous">
               <div>
                  <div class="cryptocurrency-infos-name">
                     <h2 id="cryptocurrency-name"></h2>
                     <i id="cryptocurrency-favs-button" class="fav-button bi"></i>
                  </div>
                  <div id="data-last-update-wrapper">
                     <p id="data-last-update"></p>
                     <i id="refresh-button" class="bi bi-arrow-clockwise"></i>
                  </div>
               </div>
            </div>

            <div class="wrapper-top-page">
               <div id="wrapper-chart" class="wrapper">
                  <div class="chart-header">
                     <div class="cryptocurrency-price-wrapper">
                        <h3 id="cryptocurrency-price"></h3>
                        <span id="cryptocurrency-fluctuation-price"></span>
                     </div>
                     <div id="chart-period-selector">
                        <a>1 j</a>
                        <a id="chart-period-selector-7d" class="period-selected">7 j</a>
                        <a>1 a</a>
                        <a>Max</a>
                     </div>
                  </div>
                  <canvas id="cryptocurrency-chart"></canvas>
               </div>
               
               <div id="wrapper-statistiques" class="wrapper">
                  <h4>Statistiques du marché</h4>
                  <div id="cryptocurrency-statistiques" class="wrapper-grid">
                     <div>
                        <div>
                           <p class="cryptocurrency-statistiques-categorie popover-text">Capitalisation boursière</p>
                           <?php
                              require('src/backend/popover.php');
                              popoverCreateElement("popover-bottom", "Capitalisation boursière = Cours actuel x Offre en circulation<br><br>Désigne la valeur marchande totale de l’offre en circulation d’une crypto-monnaie. Semblable à la mesure du marché boursier qui multiplie le cours par action par les actions facilement disponibles sur le marché (non détenues ni bloquées).", "https://www.bdc.ca/fr/articles-outils/boite-outils-entrepreneur/gabarits-documents-guides-affaires/glossaire/capitalisation-boursiere");
                           ?>
                        </div>
                        <p id="cryptocurrency-capitalisation" class="cryptocurrency-statistiques-value"></p>
                     </div>
                     <div>
                        <p class="cryptocurrency-statistiques-categorie">Niveau historique</p>
                        <p id="cryptocurrency-high-price" class="cryptocurrency-statistiques-value"></p>
                     </div>
                     <div>
                        <p class="cryptocurrency-statistiques-categorie">Fluctuation de prix (en 24 heures)</p>
                        <p id="cryptocurrency-fluctuation-24h" class="cryptocurrency-statistiques-value"></p>
                     </div>
                     <div>
                        <p class="cryptocurrency-statistiques-categorie">Fluctuation de prix (en 7 jours)</p>
                        <p id="cryptocurrency-fluctuation-7d" class="cryptocurrency-statistiques-value"></p>
                     </div>
                  </div>
               </div>
            </div>
               
            <div class="wrapper">
               <h4>Cours le plus élevé</h4>
               <p id='cryptocurrency-higher-price'></p>
            </div>

            <div class="wrapper">
               <h4>Cours le plus bas</h4>
               <p id='cryptocurrency-lower-price'></p>
            </div>
            
            <div class="wrapper">
               <h4>Communauté</h4>
               <div id='cryptocurrency-community' class="wrapper-grid"></div>
            </div>

            <div class="wrapper">
               <div>
                  <h4 class="popover-text">Feedback</h4>
                  <?php
                     popoverCreateElement("popover-top", "Ressenti de la communauté pour cette crypto-monnaie.<br><br>Cet indicateur s'actualise automatiquement.", "");
                  ?>
               </div>
               <div class="container-sentiment">
                  <div class="sentiment-wrapper">
                     <div id="sentiment-downvote"></div>
                  </div>
                  <div class="sentiment-legende">
                     <i class="bi bi-emoji-frown"></i>
                     <i class="bi bi-emoji-smile"></i>
                  </div>
               </div>
            </div>    
         </div>
      </section>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>
      
      <script src="src/scripts/Cryptocurrency.js" type="module"></script>
      <script src="src/scripts/Navigation.js"></script>
   </body>
</html>