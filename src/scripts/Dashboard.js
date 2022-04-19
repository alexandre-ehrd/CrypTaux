import {fetchHistoricData, fetchCryptocurrency, createThumbnail} from './FavThumbnail.js';

// Récupérer la grille
const gridElement = document.querySelector(".container-thumbnail-currency");
const gridComputedStyle = window.getComputedStyle(gridElement);

// Récupérer toutes les thumbnails
const allThumbnails = document.getElementsByClassName('thumbnail-currency');

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

         // Contour
         thumbnail.style.border = "solid 1px transparent";
         if (i == (gridColonneCount)) {
            thumbnail.style.border = "solid 1px red";
         }
         
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


const cryptocurrencyTrendingTableau = document.getElementById('cryptocurrency-trending');
var trendingURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
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


function createTrendingElement(cryptocurrency) {
   cryptocurrencyTrendingTableau.innerHTML += `
      <td>
         <i class="bi bi-suit-heart-fill" style='color: red;'></i>
         ${cryptocurrency['market_cap_rank']}
      </td>
      <td>
         <img src="${cryptocurrency['image']}" alt="${cryptocurrency['name']}" style="width: 20px; aspect-ratio: 1 / 1;">
         ${cryptocurrency['name']} [${cryptocurrency['symbol'].toUpperCase()}]</td>
      <td>${cryptocurrency['current_price']}$</td>
      <td>${cryptocurrency['price_change_percentage_1h_in_currency'].toFixed(1)}%</td>
      <td>${cryptocurrency['price_change_percentage_24h_in_currency'].toFixed(1)}%</td>
      <td>${cryptocurrency['price_change_percentage_7d_in_currency'].toFixed(1)}%</td>
   `;
}

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d