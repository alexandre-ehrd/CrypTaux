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

document.onresize = hideThumbnails;
/* 
window.addEventListener('resize', function() {
   hideThumbnails();
   console.log("resize");
}); */

async function hideThumbnails() {
   console.log("hideThumbnails");
   // Compter le nombre de colonne de thumbnails
   var gridColonneCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length-1;
   for (let i = 0; i < allThumbnails.length; i++) {
      var thumbnail = allThumbnails[i];
      // La thumbnail se situe sur la première ligne
      if (i <= (gridColonneCount)) {
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


fetchTrendingCryptocurrency();


function fetchTrendingCryptocurrency() {
   var URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h,24h,7d';
   var trendingResponse = null;
   // Les données historiques se trouvent dans le sessionStorage
   if (sessionStorage.getItem('trendingCryptocurrency') != null) {
      trendingResponse = JSON.parse(sessionStorage.getItem('trendingCryptocurrency'));
      trendingResponse.forEach(element => {
         createTrendingElement(element);
      });
   }
   else {
      fetch(URL)
         .then(response => {
            console.log("Requête");
            if (response.ok) {
               response.json().then(response => {
                  trendingResponse = response;
                  // Sauvegarder les données dans le sessionStorage
                  sessionStorage.setItem('trendingCryptocurrency', JSON.stringify(response));
                  trendingResponse.forEach(element => {
                     createTrendingElement(element);
                  });
               })
            }
            else{
               console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}]`);
               return;
            }
         })
         .catch((error) => {
            console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}] : ${error}`);
            return;
         });
   }
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
      cryptocurrencyFavsButton.classList.add('fav-button', 'fav-button-selected', 'bi', 'bi-suit-heart-fill');
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
   
   /* let trendingCourbeColumn = document.createElement('td');
   let trendingCourbeCanvas = document.createElement('canvas');
   let historicPrice = cryptocurrency['sparkline_in_7d']['price'];
   let legende = Object.keys(historicPrice);
   createChart(trendingCourbeCanvas, historicPrice, legende);
   trendingCourbeColumn.appendChild(trendingCourbeCanvas);
   cryptocurrencyTrendingLigne.appendChild(trendingCourbeColumn); */
   
   let trendingPriceColumn = document.createElement('td');
   let cryptocurrencyPrice = cryptocurrency['current_price'].toString().replace('.', ',');
   trendingPriceColumn.innerHTML = `${cryptocurrencyPrice} $`;
   cryptocurrencyTrendingLigne.appendChild(trendingPriceColumn);
   
   let trendingChange1hColumnWrapper = document.createElement('td');
   let trendingChange1hColumn = document.createElement('div');
   trendingChange1hColumn.classList.add('trending-change-column');
   if (cryptocurrency['price_change_percentage_1h_in_currency'] > 0) {
      trendingChange1hColumn.innerHTML = "<i class='bi bi-arrow-up-right'></i>";
      trendingChange1hColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange1hColumn.innerHTML = "<i class='bi bi-arrow-down-left'></i>";
      trendingChange1hColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange1h = cryptocurrency['price_change_percentage_1h_in_currency'].toFixed(2).replace('.', ',').replace('-', '');
   trendingChange1hColumn.innerHTML += `<p>${cryptocurrencyChange1h} %</p>`;
   trendingChange1hColumnWrapper.appendChild(trendingChange1hColumn);
   cryptocurrencyTrendingLigne.appendChild(trendingChange1hColumnWrapper);

   let trendingChange24hColumnWrapper = document.createElement('td');
   let trendingChange24hColumn = document.createElement('div');
   trendingChange24hColumn.classList.add('trending-change-column');
   if (cryptocurrency['price_change_percentage_24h_in_currency'] > 0) {
      trendingChange24hColumn.innerHTML = "<i class='bi bi-arrow-up-right'></i>";
      trendingChange24hColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange24hColumn.innerHTML = "<i class='bi bi-arrow-down-left'></i>";
      trendingChange24hColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange24h = cryptocurrency['price_change_percentage_24h_in_currency'].toFixed(2).replace('.', ',').replace('-', '');
   trendingChange24hColumn.innerHTML += `<p>${cryptocurrencyChange24h} %</p>`;
   trendingChange24hColumnWrapper.appendChild(trendingChange24hColumn);
   cryptocurrencyTrendingLigne.appendChild(trendingChange24hColumnWrapper);

   let trendingChange7dColumnWrapper = document.createElement('td');
   let trendingChange7dColumn = document.createElement('div');
   trendingChange7dColumn.classList.add('trending-change-column');
   if (cryptocurrency['price_change_percentage_7d_in_currency'] > 0) {
      trendingChange7dColumn.innerHTML = "<i class='bi bi-arrow-up-right'></i>";
      trendingChange7dColumn.classList.add('positive-pourcentage');
   } else {
      trendingChange7dColumn.innerHTML = "<i class='bi bi-arrow-down-left'></i>";
      trendingChange7dColumn.classList.add('negative-pourcentage');
   }
   let cryptocurrencyChange7d = cryptocurrency['price_change_percentage_7d_in_currency'].toFixed(2).replace('.', ',').replace('-', '');
   trendingChange7dColumn.innerHTML += `<p>${cryptocurrencyChange7d} %</p>`;
   trendingChange7dColumnWrapper.appendChild(trendingChange7dColumn);
   cryptocurrencyTrendingLigne.appendChild(trendingChange7dColumnWrapper);

   cryptocurrencyTrendingTableau.appendChild(cryptocurrencyTrendingLigne);
}


function createChart(element, data, legende) {
   const myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: '',
            data: data,
            fill: false,
            backgroundColor : 'rgba(20, 20, 20, 0.1)', // Si fill=true
            borderColor: 'rgba(20, 20, 20, 0.3)', // Couleur de la ligne
            tension: 0.3
         }]
      },
      options: {
         maintainAspectRatio: false,
         scales: {
            x: {
               ticks: {
                  display: false // Graduation axe
               },
               grid: {
                  color: 'transparent',
                  borderColor: 'transparent'
               }
            },
            y: {
               ticks: {
                  display: false, // Graduation axe
               },
               beginAtZero: false,
               grid: {
                  color: 'transparent',
                  borderColor: 'transparent'
               }
            }
         },
         elements: {
            point:{
               radius: 0
            }
         },
         plugins: {
            legend: {
               display: false 
            }
         },
         layout: {
            padding: {
               top: 10,
               left: -10,
               bottom: -10
            }
         }
      }
   });
}