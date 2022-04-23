import {fetchHistoricData, fetchCryptocurrency, createThumbnail} from './FavThumbnail.js';
import {fetchList, favsManager} from './FavsManagerHeart.js';


// Récupérer la grille
const gridElement = document.querySelector(".container-thumbnail-currency");
const gridComputedStyle = window.getComputedStyle(gridElement);

// Récupérer toutes les thumbnails
const allThumbnails = document.getElementsByClassName('thumbnail-currency');

// Tableau pour les cryptomonnaies célèbres
const cryptocurrencyTrendingTableau = document.getElementById('cryptocurrency-trending-body');

var favsList = await fetchList();

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
         // La thumbnail n'est pas encore affichée mais elle doit l'être
         if (thumbnail.style.display != "none" && thumbnail.classList.contains("thumbnail-hide")) {
            thumbnail.classList.remove("thumbnail-hide");
         
            // Requêtes pour les données
            var cryptocurrencyResponse = await fetchCryptocurrency(thumbnail);
            var historicDataResponse = await fetchHistoricData(thumbnail);
            // Remplir la thumbnail avec les données récupérées
            createThumbnail(cryptocurrencyResponse, historicDataResponse, thumbnail);
         }
      }
   }
}


fetchTrendringCryptocurrency();

function fetchTrendringCryptocurrency() {
   var trendingURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
   fetch(trendingURL)
   .then(response => {
      console.log("Requête");
      if (response.ok) {
         response.json().then(response => {
            response.forEach(element => {
               createTrendingElement(element);
            });
         })
      }
      else {
         console.error(`Impossible d'accéder à l'Api CoinGecko [${trendingURL}]`);
         reject();
         return;
      }
   })
   .catch((error) => {
      console.error(`Impossible d'accéder à l'Api CoinGecko [${trendingURL}] : ${error}`);
      reject();
      return;
   });
}
   

function createTrendingElement(cryptocurrency) {
   let cryptocurrencyTrendingLigne = document.createElement('tr');
   cryptocurrencyTrendingLigne.onclick = function() {
      // Ouvrir la page de la monnaie en personnalisant l'URL
      window.open(`cryptocurrency.php?name=${cryptocurrency['name']}&id=${cryptocurrency['id']}`, "_self");
   }

   let trendingScoreColumn = document.createElement('td');
   let cryptocurrencyFavsButton = document.createElement('i');
   if (favsList.includes(`${cryptocurrency['id']},${cryptocurrency['symbol']}`)) {
      cryptocurrencyFavsButton.classList.add('fav-button', 'bi', 'bi-suit-heart-fill');
   }
   else {
      cryptocurrencyFavsButton.classList.add('fav-button', 'bi', 'bi-suit-heart');
   }

   cryptocurrencyFavsButton.addEventListener('mouseover', function() {
      // Empêcher le clique d'ouvrir la page d'inforamtions sur la cryptomonnaie
      cryptocurrencyTrendingLigne.onclick = null;
   });
   cryptocurrencyFavsButton.addEventListener('mouseout', function() {
      cryptocurrencyTrendingLigne.onclick = function() {
         // Ouvrir la page de la monnaie en personnalisant l'URL
         window.open(`cryptocurrency.php?name=${cryptocurrency['name']}&id=${cryptocurrency['id']}`, "_self");
      }
   });
   cryptocurrencyFavsButton.onclick = function() {
      favsManager(cryptocurrencyFavsButton, cryptocurrency);
   }
   trendingScoreColumn.appendChild(cryptocurrencyFavsButton);
   let trendingScore = document.createElement('span');
   trendingScore.innerHTML = cryptocurrency['market_cap_rank'];
   //trendingScoreColumn.appendChild(trendingScore);
   cryptocurrencyTrendingLigne.appendChild(trendingScoreColumn);

   let trendingNameColumn = document.createElement('td');
   trendingNameColumn.classList.add('trending-name');
   let cryptocurrencyImage = document.createElement('img');
   cryptocurrencyImage.src = cryptocurrency['image'].replace('large', 'small');
   cryptocurrencyImage.alt = cryptocurrency['name'];
   trendingNameColumn.appendChild(cryptocurrencyImage);
   let cryptocurrencyName = document.createElement('p');
   cryptocurrencyName.classList.add('cryptocurrency-name');
   cryptocurrencyName.innerHTML = cryptocurrency['name'];
   trendingNameColumn.appendChild(cryptocurrencyName);
   
   let cryptocurrencySymbol = document.createElement('p');
   cryptocurrencySymbol.classList.add('cryptocurrency-symbol');
   cryptocurrencySymbol.innerHTML = cryptocurrency['symbol'].toUpperCase();
   trendingNameColumn.appendChild(cryptocurrencySymbol);
   
   
   cryptocurrencyTrendingLigne.appendChild(trendingNameColumn);
   
   let trendingPriceColumn = document.createElement('td');
   let cryptocurrencyPrice = cryptocurrency['current_price'].toString().replace('.', ',');
   trendingPriceColumn.innerHTML = `${cryptocurrencyPrice} $`;
   cryptocurrencyTrendingLigne.appendChild(trendingPriceColumn);
   
   let trendingChange1hColumn = document.createElement('td');
   if (cryptocurrency['price_change_percentage_1h_in_currency'] > 0) {
      trendingChange1hColumn.innerHTML = "+";
      trendingChange1hColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange1hColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange1h = cryptocurrency['price_change_percentage_1h_in_currency'].toFixed(2).replace('.', ',');
   trendingChange1hColumn.innerHTML += `${cryptocurrencyChange1h} %`;
   cryptocurrencyTrendingLigne.appendChild(trendingChange1hColumn);

   let trendingChange24hColumn = document.createElement('td');
   if (cryptocurrency['price_change_percentage_24h_in_currency'] > 0) {
      trendingChange24hColumn.innerHTML = "+";
      trendingChange24hColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange24hColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange24h = cryptocurrency['price_change_percentage_24h_in_currency'].toFixed(2).replace('.', ',');
   trendingChange24hColumn.innerHTML += `${cryptocurrencyChange24h} %`;
   cryptocurrencyTrendingLigne.appendChild(trendingChange24hColumn);

   let trendingChange7dColumn = document.createElement('td');
   if (cryptocurrency['price_change_percentage_7d_in_currency'] > 0) {
      trendingChange7dColumn.innerHTML = "+";
      trendingChange7dColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange7dColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange7d = cryptocurrency['price_change_percentage_7d_in_currency'].toFixed(2).replace('.', ',');
   trendingChange7dColumn.innerHTML += `${cryptocurrencyChange7d} %`;
   cryptocurrencyTrendingLigne.appendChild(trendingChange7dColumn);

   cryptocurrencyTrendingTableau.appendChild(cryptocurrencyTrendingLigne);
}