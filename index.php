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
      <link rel="stylesheet" href="src/style.css">
      <link rel="stylesheet" href="src/header.css">
      <link rel="stylesheet" href="src/navigation.css">
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
                        echo "Anonymous";
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
            <a href="connexion.php" class="bi bi-box-arrow-left" id="">Se déconnecter</a>
         </aside>

         <div class="contenu-wrapper">
            <div class="tableau-bord-wrapper">
               
               <div class="dashboard-favs">


                  <?php 
                     if (isset($_SESSION['favs']) && $_SESSION['username'] == 'admin') {
                        $favs = $_SESSION['favs'];
                  
                        $favs = explode(",", $favs);
                        foreach ($favs  as $fav){
                           echo $fav;
                           // Appeller la fonction qui créer une vignette de monnaie favorite
                        }
                     }
                     else {
                        echo "Pas d'accès au Fav's";
                     }

                  
                  ?>
                  <h3>Fav's</h3>
                  <div class="container" id="one">
                     <div class="info">
                        <div class="info-logo">
                           <img src="src/img/logo.png" alt="BTC">
                        </div>
                        <div class="info-price-name">
                           <p>47418.52$</p>
                           <p>BTC</p>
                        </div>
                        <div>
                           <p>+4,71%</p>
                        </div>
                     </div>
                     <canvas id="graphique1"></canvas>
                  </div>
                  
      
      
                  <div class="container" id="two">
                     <div class="info"></div>
                     <canvas id="graphique2"></canvas>
                  </div>
               </div>

               <input id="search-bar" type="text" name="" id="">
               
               <p id="log"></p>


               </div>

            
            </div>

            
            

      </section>








      <section class="header">
         

         <!-- <div class="header-right-side">
            <div class="path">
               <p>Thalex</p>
               <p>Tableau de bord</p>
               <p>Test</p>
            </div>
         </div>
      </section> -->
      <!-- <p></p>
      <p></p>
      <p></p>
      <p></p>

      <section id="test">

         <section class="side-navigation">
            <input type="text" name="">
            <nav>
               <div id="select">
                  <p><span class="bi bi-grid"></span>Tableau de bord</p>
               </div>
               <div>
                  <p><span class="bi bi-suit-heart"></span>Fav's</p>
               </div>
               <div>
                  <p><span class="bi bi-wallet"></span>Mon portefeuille</p>
               </div>
               <div>
                  <p><span class="bi bi-arrow-left-right"></span>Échanges</p>
               </div>
            </nav>
            <a href="connexion.html" class="bi bi-box-arrow-left" id=""></a>
         </section>
         

         <section id="right-container">
            <section class="dashboard-favs">
               <div class="dashboard-favs-title">
                  <h2>Fav's</h2>
                  <a href="#"><span class="bi bi-chevron-right"></span></a>
               </div>
               
               <div class="dashboard-favs-container">
                  <div class="container" id="one">
                     <div class="info">
                        <h3>BTC  </h3>
                     </div>
                     <canvas id="graphique1"></canvas>
                  </div>
                  <div class="container" id="two">
                     <div class="info"></div>
                     <canvas id="graphique2"></canvas>
                  </div>
                  <div class="container" id="three">
                     <div class="info"></div>
                     <canvas id="graphique3"></canvas>
                  </div>
               </div>
            </section>
            

            <div>

               <div class="popover">
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
      <script src="./src/App.js"></script>
      <script src="./src/Recherche.js"></script>
      <script src="./src/FavThumbnail.js"></script>
   </body>
</html>