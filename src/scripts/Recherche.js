import {fetchHistoricData, fetchCryptocurrency} from './FavThumbnail.js';

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
               

               // Réinitialiser le container des thumbnails
               cryptocurencySearchTitle.style.display = "block";
               cryptocurencySearchTitle.innerHTML = "";
               cryptocurencySearchResult.style.display = "grid";
               cryptocurencySearchResult.innerHTML = "";

               exchangeSearchTitleParent.style.display = "block";
               exchangeSearchTitle.innerHTML = "";
               exchangeSearchResult.style.display = "block";
               exchangeSearchResult.innerHTML = "";
               
               // CRYPTOMONNAIES
               // Title
               if (listCrypto.length >= 2) {
                  cryptocurencySearchTitle.innerHTML = "Cryptomonnaies";
               } else if (listCrypto.length == 1) {
                  cryptocurencySearchTitle.innerHTML = "Cryptomonnaie";
               }
               else {
                  cryptocurencySearchTitle.innerHTML = "";
               }
               // Thumbnails
               for (let i = 0; i < listCrypto.length; i++) {
                  // Garder uniquement les 6 premiers résultats
                  if (i >= 6) {
                     break;
                  }
                  var thumbnail = `
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
                  cryptocurencySearchResult.innerHTML += thumbnail;
               }
               // Fetch les données puis afficher les thumbnails
               requestThumbnail();
               
               // EXCHANGES
               // Title
               if (listExchanges.length >= 2) {
                  exchangeSearchTitle.innerHTML = "Exchanges";
               } else if (listExchanges.length == 1) {
                  exchangeSearchTitle.innerHTML = "Exchange";
               }
               else {
                  exchangeSearchTitle.innerHTML = "";
               }
               
               for (let i = 0; i < listExchanges.length; i++) {
                  if (i >= 4) {
                     break;
                  }
                  exchangeSearchResult.innerHTML += listExchanges[i]["name"] + ` [${listExchanges[i]["id"]}]`+ "<br>";
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
         // Appeler la fonction qui remplie le tableau
         await fetchHistoricData(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}/market_chart?vs_currency=usd&days=7&interval=daily`, thumbnail);
         await fetchCryptocurrency(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}`, thumbnail)
      }
   }
}