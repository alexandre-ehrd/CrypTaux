<?php 
   function sideNavigationCreateElement($selected)
   {
      echo "
      <aside class='side-navigation'>
         <nav>
            <ul id='navigation-list'>
               <li class=".($selected == 0 ? 'navigation-list-item-select' : '').">
                  <a href='index.php'>
                     <i class='bi bi-grid'></i>
                     <p>Tableau de bord</p>
                  </a>
               </li>
               <li class=".($selected == 1 ? 'navigation-list-item-select' : '').">
                  <a href='favs.php'>
                     <i class='bi bi-suit-heart'></i>
                     <p>Fav's</p>
                  </a>
               </li>
               <!-- <li class=".($selected == 2 ? 'navigation-list-item-select' : '').">
                  <a href='wallet.php'>
                     <i class='bi bi-wallet'></i>
                     <p>Mon portefeuille</p>
                  </a>
               </li> -->
               <li class=".($selected == 3 ? 'navigation-list-item-select' : '').">
                  <a href='exchange.php'>
                     <i class='bi bi-arrow-left-right'></i>
                     <p>Convertisseur</p>
                  </a>
               </li> 
            </ul>
         </nav>
         <a href='connexion.php' id='logout-button'>
            <i class='bi bi-box-arrow-left'></i>
            Se déconnecter
         </a>
      </aside>
      <div id='aside-mobile-background'></div>
      ";
   }
?>