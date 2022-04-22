import {fetchHistoricData, fetchCryptocurrency, createThumbnail} from './FavThumbnail.js';

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
      updateValue();
   }
});

searchButton.addEventListener('click', updateValue);



function updateValue(e) {
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

               // Thumbnails
               for (let i = 0; i < listCrypto.length; i++) {
                  // Garder uniquement les 6 premiers résultats
                  if (i >= 6) {
                     break;
                  }
                  var thumbnailCryptocurrency = `
                  <div class='thumbnail-currency' id='${listCrypto[i]['id']}' style='visibility: hidden;'>
                     <div class='info-currency'>
                        <img src='' alt='${listCrypto[i]['name']}' crossorigin='anonymous'>
                        <div>
                           <p class='fav-price'></p>
                           <p class='fav-symbol'>${listCrypto[i]['symbol']}</p>
                        </div>
                        <p class='fav-taux'></p>   
                     </div>
                     <canvas class='fav-chart'></canvas>
                  </div>
               `;
                  cryptocurencySearchResult.innerHTML += thumbnailCryptocurrency;
               }
               // Fetch les données puis afficher les thumbnails
               requestThumbnail();
               
               
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


async function requestThumbnail(){
   var allThumbnails = document.getElementsByClassName('thumbnail-currency');
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