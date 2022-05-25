import {fillThumbnailElement} from './FavThumbnail.js';
import {fetchCryptoCurrenciesPrices} from './LivePrice.js';

const inputParent = document.querySelector(".search-bar-wrapper");
const input = document.getElementById('search-bar');

const searchButton = document.getElementById('search-button');

const searchResult = document.getElementById('search-result');
const cryptocurencySearchTitle = document.getElementById('cryptocurrency-text-result');
const cryptocurencySearchResult = document.getElementById('cryptocurrency-search-result');
const exchangeSearchTitleParent = document.getElementById('exchange-text-result-parent');
const exchangeSearchTitle = document.getElementById('exchange-text-result');
const exchangeSearchResult = document.getElementById('exchange-search-result');


input.addEventListener("focus", () => {
   inputParent.classList.add("search-bar-wrapper-focus");
});

input.addEventListener("focusout", () => {
   inputParent.classList.remove("search-bar-wrapper-focus");
});


input.addEventListener('keyup', function(event) {
   if (event.key == 'Enter') {
      event.preventDefault();
      searchManager();
   }
});

searchButton.addEventListener('click', searchManager);


async function searchManager() {
   // La longueur du texte dans le champs de recherche n'est pas nulle
   if (input.value.length > 0) {
      var URLQuery = `https://api.coingecko.com/api/v3/search?query=${input.value}`;

      // Récupérer les infos de la requête
      fetch(URLQuery).then(response => {
         console.log("Requête");
         if (response.ok) {
            response.json().then(data => {
               var listCrypto = data['coins'];
               var listExchanges = data['exchanges'];
               
               // Cryptomonnaies
               // Titre pour les thumbnails des cryptomonnaies
               if (listCrypto.length > 0) {
                  if (listCrypto.length == 1) {
                     cryptocurencySearchTitle.innerHTML = "Cryptomonnaie";
                  }
                  else {
                     cryptocurencySearchTitle.innerHTML = "Cryptomonnaies";
                  }

                  cryptocurencySearchTitle.style.display = "block";
                  cryptocurencySearchResult.style.display = "grid";
               }
               else {
                  cryptocurencySearchTitle.innerHTML = "";
               }
               // Effacer toutes les thumbnails des cryptomonnaies
               cryptocurencySearchResult.innerHTML = "";

               // Exchanges
               // Titre pour les thumbnails des exchanges
               if (listExchanges.length > 0) {
                  if (listExchanges.length == 1) {
                     exchangeSearchTitle.innerHTML = "Exchange";
                  }
                  else {
                     exchangeSearchTitle.innerHTML = "Exchanges";
                  }

                  exchangeSearchTitleParent.style.display = "block";
                  exchangeSearchResult.style.display = "grid";
               }
               else {
                  exchangeSearchTitleParent.style.display = "none";
                  exchangeSearchTitle.innerHTML = "";
               }
               // Effacer toutes les thumbnails des exchanges
               exchangeSearchResult.innerHTML = "";

               var cryptocurrencyIDs = '';

               // Créer les thumbnails des cryptomonnaies
               for (let i = 0; i < listCrypto.length; i++) {
                  // Garder uniquement les 10 premiers résultats
                  if (i >= 10) {
                     break;
                  }
                  // Créer une thumbnail
                  var thumbnailCryptocurrency = `
                     <div class='thumbnail-currency' id='${listCrypto[i]['id']}' style='visibility: hidden; display: none;'>
                        <div class='info-currency'>
                           <img class='info-currency-image' src='' alt='${listCrypto[i]['name']}' crossorigin='anonymous'>
                           <div>
                              <div class='info-currency-price-wrapper'>
                                 <p class='fav-price'></p>
                                 <div class='fav-taux-wrapper'></div>
                              </div>
                              <div class='fav-name-wrapper'></div>
                           </div>
                        </div>
                        <canvas class='fav-chart'></canvas>
                     </div>
                  `;
                  cryptocurencySearchResult.innerHTML += thumbnailCryptocurrency;

                  cryptocurrencyIDs += listCrypto[i]['id'] + ',';
               }

               // Créer les thumbnails pour le résultat de la recherche
               thumbnailsManager(cryptocurrencyIDs);

               // Créer les vignettes des exchanges
               for (let i = 0; i < listExchanges.length; i++) {
                  if (i >= 6) {
                     break;
                  }
                  // L'image de l'exchange n'est pas disponible
                  if (listExchanges[i]['large'] == 'missing_large.png') {
                     continue;
                  }
                  let URLExchange = `https://api.coingecko.com/api/v3/exchanges/${listExchanges[i]['id']}`;

                  fetch(URLExchange).then(response => {
                     console.log("Requête");
                     if (response.ok) { 
                        response.json().then(data => {
                           var centralizedExchange = data['centralized'];
                           var trustScoreExchange = data['trust_score'];

                           let thumbnailExchange = document.createElement('div');
                           thumbnailExchange.classList.add('thumbnail-exchange');
                           thumbnailExchange.addEventListener('click', () => {
                              window.open(data['url'], '_blank');
                           });
                           
                           thumbnailExchange.innerHTML = `
                              <img src='${listExchanges[i]['large']}' alt='${listExchanges[i]['name']}'>
                              <h4>${listExchanges[i]['name']}</h4>
                           `;

                           let centralizedElement = document.createElement('p');
                           centralizedElement.innerHTML = "";
                           if (centralizedExchange === true) {
                              centralizedElement.innerHTML = "Centralisé";
                           } else if (centralizedExchange == false) {
                              centralizedElement.innerHTML = "Décentralisé";
                           }
                           thumbnailExchange.appendChild(centralizedElement);
                           
                           // Ajouter le trust score seulement s'il n'est pas nul
                           if (trustScoreExchange != null) {
                              // Calculer le pourcentage du trust score (en partant de la droite)
                              var trustScoreExchangePercent = trustScoreExchange * 10;

                              var trustScoreElement = document.createElement('div');
                              trustScoreElement.classList.add('trust-score');
                              trustScoreElement.style.width = `${trustScoreExchangePercent}%`;
                              
                              var trustScoreElementWrapper = document.createElement('div');
                              trustScoreElementWrapper.classList.add('trust-score-wrapper');
                              trustScoreElementWrapper.title = `Score de confiance : ${trustScoreExchange}/10`;
                              trustScoreElementWrapper.appendChild(trustScoreElement);
                              
                              thumbnailExchange.appendChild(trustScoreElementWrapper);
                           }

                           // Ajouter la thumbnail à la page
                           exchangeSearchResult.appendChild(thumbnailExchange);
                        });
                     }
                  });
               }
            })
         }
         else {
            console.error("Erreur : Pas d'accès aux données");
         }
      })
   }
   else {
      searchResult.innerHTML = "";
   }
}


async function thumbnailsManager(cryptocurrencyIDs){
   // Récupérer toutes les informations pour tous les fav's
   var cryptocurenciesData = await fetchCryptoCurrenciesPrices(cryptocurrencyIDs);
   
   var allThumbnails = document.getElementsByClassName('thumbnail-currency');
   
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         thumbnail.style.display = "block";
         console.log(cryptocurenciesData[thumbnail.id])
         // Remplir la thumbnail avec les données récupérées
         fillThumbnailElement(cryptocurenciesData[thumbnail.id], thumbnail);
      }
   }
}