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
      <section class="container">
         <?php
            require('side_navigation.php');
            sideNavigationCreateElement(1);
         ?>
         <div class="container-page">

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ratione sapiente quibusdam, numquam repellendus sequi saepe quos nihil qui praesentium labore aperiam earum placeat unde nulla molestiae! Ducimus architecto error debitis nesciunt nostrum. Iure itaque accusamus quisquam dolor, dolorem natus illum. Rem assumenda nesciunt, aut hic similique quas eum earum. Quod voluptas quaerat provident ea nihil dicta? Fuga nemo consequatur ducimus provident labore possimus eaque magnam quia odit a eos, quos perferendis! At praesentium saepe eveniet vero, fugit excepturi iste nemo perspiciatis, natus aliquid repudiandae eligendi adipisci laboriosam voluptas debitis dolore atque maxime quibusdam, ab laborum ea eius. Placeat, dolor iste a commodi vel repellat magni nam doloribus ducimus eum est molestiae eligendi incidunt, iure ipsam. Voluptatum fuga obcaecati tempore perferendis saepe maiores, eius autem mollitia deleniti inventore blanditiis hic nesciunt ab earum suscipit nihil dignissimos, exercitationem cupiditate modi commodi quia asperiores nisi possimus? Obcaecati illum non enim quos consequatur nisi fuga nobis quo. Impedit, placeat temporibus? Modi, error! Dignissimos rem id debitis temporibus aut. Tenetur doloremque maxime nobis cupiditate nemo asperiores dignissimos, sequi dolorem, corrupti iusto praesentium? Laborum voluptate similique perspiciatis, natus perferendis ab repellendus eos aperiam dolorem rerum necessitatibus accusantium! Dolor aut nostrum dolorum. Dolores reprehenderit voluptatem suscipit facere cum quod tempora in rerum nostrum cupiditate itaque, odit hic deleniti impedit, nesciunt, labore mollitia est ea enim vitae distinctio a sequi nobis. Quibusdam nostrum et excepturi explicabo praesentium minima assumenda error autem optio! Voluptas quis rerum numquam libero animi. Atque dolor perspiciatis rerum voluptates doloribus commodi illo culpa minus, soluta officiis, tempore delectus maiores? Corrupti sed unde, perferendis dolor ipsum nemo amet ipsa optio magni qui nihil velit accusamus tempore et iste totam nisi blanditiis, dolorem illo facilis veritatis fugit dignissimos ratione. Sapiente enim corrupti voluptatum et voluptatem corporis accusamus adipisci ea animi a cum hic, consequuntur explicabo deserunt molestias quod non quaerat delectus, ducimus quidem ipsam neque! Dolor, numquam. Rerum dolore neque qui voluptate ab fugit, dolores ipsa officiis at sit perspiciatis deleniti maxime corrupti. Ad nostrum dolorem totam sit molestiae iste molestias voluptatum, reiciendis suscipit. Ipsum soluta sit obcaecati laborum minima tempora inventore molestias cumque. Ad, vitae quia. Veniam esse recusandae quae aut. Eos repellat optio ducimus odit, hic quidem nam, libero doloremque distinctio nostrum officiis ab fugit dicta numquam tempore saepe debitis dolor, tenetur quisquam est excepturi quam minus. Perspiciatis deserunt, autem doloribus ratione culpa, atque accusamus illum quidem totam laudantium sunt voluptatem aliquam. Quia enim architecto tenetur doloribus reprehenderit, temporibus at molestiae illum deserunt magni rerum cumque accusamus nam ea nisi veritatis in sapiente nemo laboriosam rem, sit tempora quo. Est possimus sapiente amet. Impedit, doloribus obcaecati ad ipsum reiciendis tempora, beatae sit culpa eos iste mollitia sequi recusandae cumque facere saepe blanditiis placeat neque! Aliquam officia in eos molestiae officiis doloremque non? Quaerat iure architecto earum ratione doloremque ducimus dolores, ex fugiat facere animi nihil nulla cum sequi eum quia et molestias asperiores? Dolorum neque sit magni officia incidunt? Voluptatum incidunt corrupti provident, fuga sit, distinctio, consectetur quia reprehenderit asperiores quasi quos facere?</p>
            
            <div class="popover">
               <i class="bi bi-question-circle">
                  <div class="popover-content-container">
                     <h4>Lorem.</h4>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quae rem laborum ab atque deleniti?</p>
                  </div>
               </i>
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
      
      <script src="src/scripts/Recherche.js"></script>
      <script src="src/scripts/FavThumbnail.js"></script>
      <script src="src/scripts/App.js"></script>


      
   </body>
</html>