import {fetchHistoricData, fetchCryptocurrency, createThumbnail} from './FavThumbnail.js';

const allThumbnails = document.getElementsByClassName('thumbnail-currency');


async function requestThumbnail(){
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         // Requêtes pour les données
         var cryptocurrencyResponse = await fetchCryptocurrency(thumbnail);
         var historicDataResponse = await fetchHistoricData(thumbnail);
         // Remplir la thumbnail avec les données récupérées
         createThumbnail(cryptocurrencyResponse, historicDataResponse, thumbnail);
      }
   }
}


requestThumbnail();