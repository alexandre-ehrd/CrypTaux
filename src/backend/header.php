<?php 
   function headerCreateElement($username, $path)
   {
      $pathElement = "";
      foreach ($path as $key => $value) {
         $pathElement .= "<p>></p>";
         $pathElement .= "<a href='$value'>$key</a>";
      }

      echo "
      <header>
         <div class='header-left-side'>
            <a href='index.php' title='Accueil CrypTaux'>
               <h1 id='logo'>Cryp<span id='logo-orange'>Taux</span></h1>
            </a>
         </div>
         <div class='header-right-side'>
            <div class='path'>
               <h2 id='path-username'>$username</h2>
               $pathElement
            </div>
         </div>
         <i id='header-burger-mobile-bouton' class='bi bi-list' onclick='openNavigation()'></i>
      </header>
      ";
   }
?>