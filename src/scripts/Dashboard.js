import {fetchHistoricData, fetchCryptocurrency} from './FavThumbnail.js';

// Récupérer la grille
const gridElement = document.querySelector(".container-thumbnail-currency");
const gridComputedStyle = window.getComputedStyle(gridElement);

// Récupérer toutes les thumbnails
const allThumbnails = document.getElementsByClassName('thumbnail-currency');

hideThumbnails();
window.addEventListener('resize', hideThumbnails);

async function hideThumbnails() {
   // Compter le nombre de colonne de thumbnails
   var gridColonneCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length-1;
   for (let i = 0; i < allThumbnails.length; i++) {
      var thumbnail = allThumbnails[i];
      // La thumbnail ne se situe pas sur la première ligne
      if (i > (gridColonneCount)) {
         thumbnail.style.display = "none";
      } 
      // La thumbnail se situe sur la première ligne
      else {
         thumbnail.style.display = "block";

         // Contour
         thumbnail.style.border = "solid 1px transparent";
         if (i == (gridColonneCount)) {
            thumbnail.style.border = "solid 1px red";
         }
         
         // La thumbnail n'est pas encore affichée mais elle doit l'être
         if (thumbnail.style.display != "none" && thumbnail.classList.contains("thumbnail-hide")) {
            thumbnail.classList.remove("thumbnail-hide");
         
            // Appeler la fonction qui remplie le tableau
            await fetchHistoricData(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}/market_chart?vs_currency=usd&days=7&interval=daily`, thumbnail);
            await fetchCryptocurrency(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}`, thumbnail)
         }
      }
   }
}