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
      <link rel="stylesheet" href="src/styles/exchange.css">
      <?php
         // Récupérer les données de l'utilisateur
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
            "Convertisseur" => "exchange.php",
         ];
         headerCreateElement($_SESSION['username'], $array);
      ?>
      <section class="container">
         <?php
            require('src/backend/side_navigation.php');
            sideNavigationCreateElement(3);
         ?>
         <div class="container-page">
            <div class="wrapper">
               <div class="converter-wrapper">

                  <div class="converter-side">
                     <div class="conversion-input conversion-input-selected">
                        <span>Montant</span>
                        <input id="input-cryptocurrency" class="user-input" type="text" placeholder="0" autofocus>
                        <div class="devise">
                           <h4 id="devise-symbol-first"></h4>
                           <img id="devise-image-first" src="" alt="">
                        </div>
                     </div>
                     <select id="select-cryptocurrency-first"></select>
                  </div>
                  
                  <i class='bi bi-arrow-left-right'></i>
                  
                  <div class="converter-side">
                     <div class="conversion-input">
                        <span>Montant</span>
                        <p id="output-cryptocurrency">0</p>
                        <div class="devise">
                           <h4 id="devise-symbol-second"></h4>
                           <img id="devise-image-second" src="" alt="">
                        </div>
                     </div>
                     <select id="select-cryptocurrency-second">
                        <option value="euro">Euro [EUR]</option>
                        <option value="dollar">Dollar [USD]</option>
                     </select>
                  </div>
                  
               </div>
               <input type="button" value="Convertir" onclick="convertCryptocurrency()">
            </div>
         </div>
      </section>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>
      
      <script src="src/scripts/Exchange.js"></script>
   </body>
</html>