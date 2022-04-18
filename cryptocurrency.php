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

            
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa nostrum harum dolore quasi sunt dignissimos dolorem incidunt sint rerum adipisci quisquam recusandae quidem error repudiandae pariatur id tenetur, officiis eius maiores obcaecati. Tempora, voluptatibus voluptas rem architecto in et. Velit, qui? Sint similique et aperiam nihil alias quas provident repudiandae est laudantium nesciunt, cumque, unde cupiditate illo assumenda perferendis cum enim ad ea neque voluptates. Quaerat rem accusamus aliquam impedit. Facere, neque doloremque distinctio quo iure exercitationem eos, tempore dolores perspiciatis at iste accusantium, excepturi eveniet? Distinctio eaque praesentium ratione, vel accusantium id. Nesciunt aperiam maxime quam officiis vitae nulla!</p>
            
            <p class="popover-text">capitalisation boursière</p>
            <span class="popover">
               <i class="bi bi-question-circle"></i>
               <div class="popover-top popover-content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, quis.</p>
                  <a href="">Lorem, ipsum.</a>
               </div>
            </span>

            <p class="popover-text">capitalisation boursière</p>
            <span class="popover">
               <i class="bi bi-question-circle"></i>
               <div class="popover-bottom popover-content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, quis.</p>
                  <a href="">Lorem, ipsum.</a>
               </div>
            </span>

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