<?php 

function sideNavigationCreate($selected)
{
   echo "
   <aside class='side-navigation'>
      <nav>
         <ul id='navigation-list'>
            <li class=".($selected == 0 ? 'select' : '').">
            
               <i class='bi bi-grid'></i>
               <p>Tableau de bord</p>
            </li>
            <li class=".($selected == 1 ? 'select' : '').">
               <i class='bi bi-suit-heart'></i>
               <p>Fav's</p>
            </li>
            <li class=".($selected == 2 ? 'select' : '').">
               <i class='bi bi-wallet'></i>
               <p>Mon portefeuille</p>
            </li>
            <li class=".($selected == 3 ? 'select' : '').">
               <i class='bi bi-arrow-left-right'></i>
               <p>Échanges</p>
            </li>
         </ul>
      </nav>
      <a href='connexion.php' >
         <i class='bi bi-box-arrow-left'></i>
         Se déconnecter
      </a>
      </aside>
   ";
}

?>