import {fetchFavsList} from './FavsManagerHeart.js';

/* Fonction qui retourne les prix des crypto-monnaies en direct */
async function fetchCryptoCurrenciesPrices(IDS = null) {
   // Récupérer les données des crypto-monnaies depuis le sessionStorage
   var cryptocurrencyResponse = sessionStorage.getItem('Cryptocurrencies-Data');
   
   var cryptocurrencyIDs = '';
   var newRequest = false;
   
   if (IDS == null) {
      // Récupérer toutes les crypto-monnaies en fav's
      var favsList = await fetchFavsList();

      favsList.forEach(fav => {
         fav = fav.split(",");
         let id = fav[0];
         cryptocurrencyIDs += id + ',';
      });
   }
   else {
      cryptocurrencyIDs = IDS;
   }

   // Rajouter les nouvelles crypto-monnaies dans la requête
   if (cryptocurrencyResponse != null) {
      cryptocurrencyResponse = JSON.parse(cryptocurrencyResponse);
      var keys = Object.keys(cryptocurrencyResponse);
      keys.forEach(key => {
         if (cryptocurrencyIDs.indexOf(key) == -1) {
            cryptocurrencyIDs += key + ',';
            newRequest = true;
         }
      })
   }
   
   var URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptocurrencyIDs}&page=1&sparkline=true&price_change_percentage=1h,24h,7d`;

   return new Promise((resolve, reject) => {
      // La monnaie se trouve dans le localStorage
      if (cryptocurrencyResponse != null && newRequest == false) {
         cryptocurrencyResponse = JSON.parse(cryptocurrencyResponse);
         
         // Calculer le temps depuis la dernière mise à jour
         var timeNow = new Date();
         var timeStampLastRequest = cryptocurrencyResponse['timestamp'];
         var timeDiff = timeNow - timeStampLastRequest;
         var timeDiffMinutes = Math.round(timeDiff / 60000);

         // Si la requête a été effectuée il y a moins de 1 minute, on retourne les données
         if (timeDiffMinutes < 1) {
            resolve(cryptocurrencyResponse);
         }
         else {
            // On supprime les données de la requête précédente
            sessionStorage.removeItem('Cryptocurrencies-Data')
            // On effectue une nouvelle requête
            resolve(fetchCryptoCurrenciesPrices());
         }
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               if (response.ok) {
                  response.json().then(response => {
                     // Transformer le tableau en dictionnaire
                     cryptocurrencyResponse = {};
                     for (var i = 0; i < response.length; i++) {
                        cryptocurrencyResponse[response[i]['id']] = response[i];
                     }
                     // Ajouter un timestamp pour savoir quand les données ont été récupérées
                     cryptocurrencyResponse['timestamp'] = new Date().getTime();
                     // Sauvegarder les données dans le sessionStorage
                     sessionStorage.setItem('Cryptocurrencies-Data', JSON.stringify(cryptocurrencyResponse));
                     
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