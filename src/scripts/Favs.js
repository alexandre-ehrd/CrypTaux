import {fetchHistoricData, fetchCryptocurrency, fillThumbnailElement} from './FavThumbnail.js';
import {fetchFavsList} from './FavsManagerHeart.js';
import {fetchCryptoCurrenciesPrices} from './LivePrice.js';

const allThumbnails = document.getElementsByClassName('thumbnail-currency');

var favsList = await fetchFavsList();
var livePrice = await fetchCryptoCurrenciesPrices();

async function requestThumbnail(){
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         // Requêtes pour les données
         var cryptocurrencyResponse = await fetchCryptocurrency(thumbnail);
         var historicDataResponse = await fetchHistoricData(thumbnail);
         // Remplir la thumbnail avec les données récupérées
         fillThumbnailElement(cryptocurrencyResponse, historicDataResponse, livePrice, thumbnail);
         thumbnail.style.visibility = "visible";
      }
   }
}

requestThumbnail();