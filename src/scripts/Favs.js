import {fetchHistoricData, fetchCryptocurrency} from './FavThumbnail.js';

const allThumbnails = document.getElementsByClassName('thumbnail-currency');


async function requestThumbnail(){
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         // Appeler la fonction qui remplie le tableau
         await fetchHistoricData(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}/market_chart?vs_currency=usd&days=7&interval=daily`, thumbnail);
         await fetchCryptocurrency(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}`, thumbnail)
      }
   }
}


requestThumbnail();