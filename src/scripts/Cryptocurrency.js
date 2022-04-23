import {fetchList, favsManager} from './FavsManagerHeart.js';


const periodSelector = document.getElementById('chart-period-selector');
const allPeriod = periodSelector.getElementsByTagName('a');

const cryptocurrencyLogo = document.getElementById('cryptocurrency-logo');
const cryptocurrencyName = document.getElementById('cryptocurrency-name');
const cryptocurrencyFavsButton = document.getElementById('cryptocurrency-favs-button');
const cryptocurrencySymbol = document.getElementById('cryptocurrency-symbol');
const cryptocurrencyPrice = document.getElementById('cryptocurrency-price');
const cryptocurrencyStatistiquesWrapper = document.getElementById('wrapper-statistiques');
const cryptocurrencyChart = document.getElementById('cryptocurrency-chart');

var favsList = await fetchList();






async function fetchData(cryptocurrencyID) {
   var URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`;
   return new Promise((resolve, reject) => {
      fetch(URL)
         .then(response => {
            console.log("Requête");
            if (response.ok) {
               response.json().then(response => {
                  resolve(response);
               })
            }
            else{
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
   });
}









async function cryptocurrencyManager(cryptocurrencyID) {
   var cryptocurrency = await fetchData(cryptocurrencyID);

   if (cryptocurrency != null) {
      cryptocurrencyLogo.src = cryptocurrency['image']['large'];

      cryptocurrencyLogo.alt = cryptocurrency['name'];
      cryptocurrencyName.innerHTML = cryptocurrency['name'];
      if (favsList.includes(`${cryptocurrency['id']},${cryptocurrency['symbol']}`)) {
         cryptocurrencyFavsButton.classList.add('bi-suit-heart-fill');
      }
      else {
         cryptocurrencyFavsButton.classList.add('bi-suit-heart');
      }
      cryptocurrencyFavsButton.onclick = function() {
         favsManager(cryptocurrencyFavsButton, cryptocurrency);
      }

      cryptocurrencySymbol.innerHTML = cryptocurrency['symbol'].toUpperCase();

      let price = cryptocurrency['market_data']['current_price']['usd'].toString();
      cryptocurrencyPrice.innerHTML = `${price.replace('.', ',')} $`;

      let fluctuationPourcentage = document.createElement('span');
      fluctuationPourcentage.innerHTML = `${cryptocurrency['market_data']['price_change_percentage_7d'].toFixed(2)} %`;
      if (cryptocurrency['market_data']['price_change_percentage_7d'] > 0) {
         fluctuationPourcentage.prepend("+")
         fluctuationPourcentage.classList.add('positive-pourcentage');
      } else {
         fluctuationPourcentage.classList.add('negative-pourcentage');
      }
      cryptocurrencyPrice.appendChild(fluctuationPourcentage);

      let historicPrice = cryptocurrency['market_data']['sparkline_7d']['price'];

      // Créer le tableau de légende (nécessaire pour le graphique)
      var legende = Object.keys(historicPrice);
      createChart(cryptocurrencyChart, historicPrice, legende);

      
      cryptocurrencyStatistiquesWrapper.innerHTML = `
         <div>
            <p>Capitalisation boursière</p>
            <p>${cryptocurrency['market_data']['market_cap']['usd']} $</p>
         </div>
         <div>
            <p>Niveau historique</p>
            <p>${cryptocurrency['market_data']['ath']['usd']} $</p>
         </div>
         <div>
            <p>Fluctuation de prix (en 24 heures)</p>
            <p>${cryptocurrency['market_data']['price_change_percentage_24h'].toFixed(2)} %</p>
         </div>
         <div>
            <p>Fluctuation de prix (en 7 jours)</p>
            <p>${cryptocurrency['market_data']['price_change_percentage_7d'].toFixed(2)} %</p>
         </div>
      `;
   }
}

function createChart(element, data, legende) {
   const myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: 'Prix ',
            data: data,
            borderColor: '#E5734A', // Couleur de la ligne
            tension: 0.1
         }]
      },
      options: {
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
                  color: '#CCCCCC',
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
         }
      }
   });
}


function selectPeriod(periodClicked) {
   for (var period of allPeriod) {
      period.classList.remove('period-selected');
   }
   periodClicked.classList.add('period-selected');
}



const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id; 
cryptocurrencyManager(value);