import {fetchFavsList} from './FavsManagerHeart.js';

/* Fonction qui retourne les prix des crypto-monnaies en direct */
async function fetchCryptoCurrenciesPrices() {
   var favsList = await fetchFavsList();
   var cryptocurrencyIDs = '';
   
   favsList.forEach(fav => {
      fav = fav.split(",");
      let id = fav[0];
      cryptocurrencyIDs += id + ',';
   });
   
   var URL = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrencyIDs}&vs_currencies=usd`;

   return new Promise((resolve, reject) => {
      var cryptocurrencyResponse = sessionStorage.getItem('cryptocurrencies-Prices');
      // La monnaie se trouve dans le localStorage
      if (cryptocurrencyResponse != null) {
         cryptocurrencyResponse = JSON.parse(cryptocurrencyResponse);
         var nameElement = thumbnailElement.querySelector('.fav-symbol');
         nameElement.innerHTML = `${cryptocurrencyResponse['name']} [${cryptocurrencyResponse['symbol'].toUpperCase()}]`;
         resolve(cryptocurrencyResponse);
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               if (response.ok) {
                  response.json().then(response => {
                     cryptocurrencyResponse = response;
                     // Trier les données à sauvegarder dans le localStorage
                     // Sauvegarder les données dans le sessionStorage
                     //localStorage.setItem(cryptocurrencyID, JSON.stringify(cryptocurrencyResponse));
                     resolve(cryptocurrencyResponse);
                  })
               }
               else {
                  console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}]`);
                  reject();
                  return;
               }
            })
            .catch((error) => {
               console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}] : ${error}`);
               reject();
               return;
            });
      }
   })
}


export {fetchCryptoCurrenciesPrices};