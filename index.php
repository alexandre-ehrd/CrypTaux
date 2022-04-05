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
      <?php session_start();?>
   </head>
   <body>
      <header>
         <div class="header-left-side">
            <a href="connexion.html">
               <h1 id="title">Cryp<span id="title-orange">taux</span>.</h1>
            </a>
         </div>
         <div class="header-right-side">
            <div class="path">
               <h2 id='path-username'>
                  <?php
                     if (isset($_SESSION['username'])) {
                        echo $_SESSION['username'];
                     }
                     else {
                        // Impossible d'accéder à la session de l'utilisateur
                        header("Location: connexion.php");
                        exit();
                     }
                  ?>
               </h2>
               <a href="#">Tableau de bord</a>
            </div>
         </div>
      </header>

      <section class="contenu">
         <aside class="side-navigation">
            <nav>
               <ul id="navigation-list">
                  <li class="select">
                     <i class="bi bi-grid"></i>
                     <p>Tableau de bord</p>
                  </li>
                  <li>
                     <i class="bi bi-suit-heart"></i>
                     <p>Fav's</p>
                  </li>
                  <li>
                     <i class="bi bi-wallet"></i>
                     <p>Mon portefeuille</p>
                  </li>
                  <li>
                     <i class="bi bi-arrow-left-right"></i>
                     <p>Échanges</p>
                  </li>
               </ul>
            </nav>
            <a href="connexion.php" >
               <i class="bi bi-box-arrow-left"></i>
               Se déconnecter
            </a>
         </aside>

         <div class="contenu-wrapper">
            <div class="tableau-bord-wrapper">

               <div class="dashboard-favs">

                  <h3>Fav's</h3>
                  <div class="dashboard-favs-container">

                     <?php 
                     if (isset($_SESSION['favs']) && $_SESSION['username'] == 'Thalex') {
                        
                        $favs = $_SESSION['favs'];
                        // Séparer les monnaies
                        $favs = explode("/", $favs);
                        
                        foreach ($favs as $fav){
                           $fav = explode(",", $fav);
                           [$name, $symbol] = [$fav[0], $fav[1]];
                           // Créer une vignette de monnaie favorite
                           echo "
                           <div class='container' id='$name'>
                              <div class='info'>
                                 <div class='info-logo'>
                                    <img src='' alt='$name'>
                                 </div>
                                 <div class='info-price-name'>
                                    <p class='fav-price'></p>
                                    <p class='fav-symbol'>$symbol</p>
                                 </div>
                                 <div>
                                    <p class='fav-taux'></p>
                                 </div>
                              </div>
                              <canvas class='fav-chart'></canvas>
                           </div>
                           ";
                        }
                     }
                     else {
                        echo "Vous n'êtes pas admin...";
                     }
                     ?>
                  </div>
               </div>

               <input id="search-bar" type="text" name="" id="">
               
               <p id="log"></p>


               </div>

            
            </div>

            
            

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

      


      
      
      <script src="src/Recherche.js"></script>
      <script src="src/FavThumbnail.js"></script>


      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      <script src="src/App.js"></script>
      
   </body>
</html>