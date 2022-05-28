import {fillThumbnailElement} from './FavThumbnail.js';
import {fetchCryptoCurrenciesPrices} from './LivePrice.js';

const allThumbnails = document.getElementsByClassName('thumbnail-currency');


function requestThumbnail(favsRequest){
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         // Remplir la thumbnail avec les données
         fillThumbnailElement(favsRequest[thumbnail.id], thumbnail);
         thumbnail.style.visibility = "visible";
      }
   }
}


// Récupérer toutes les informations pour tous les fav's
var favsRequest = await fetchCryptoCurrenciesPrices();

requestThumbnail(favsRequest);