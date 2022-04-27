import {fetchList, favsManager} from './FavsManagerHeart.js';


const periodSelector = document.getElementById('chart-period-selector');
const allPeriod = periodSelector.querySelectorAll('a');

const cryptocurrencyLogo = document.getElementById('cryptocurrency-logo');
const cryptocurrencyName = document.getElementById('cryptocurrency-name');
const cryptocurrencyFavsButton = document.getElementById('cryptocurrency-favs-button');
const cryptocurrencySymbol = document.getElementById('cryptocurrency-symbol');

const cryptocurrencyPrice = document.getElementById('cryptocurrency-price');
const cryptocurrencyChart = document.getElementById('cryptocurrency-chart');

const cryptocurrencyStatistiquesWrapper = document.getElementById('wrapper-statistiques');

const cryptocurrencyDescriptionWrapper = document.getElementById('wrapper-description');



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
               // Retour en arrière après une erreur
               window.history.go(-1);
               console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}]`);
               reject();
               return;
            }
         })
         .catch((error) => {
            // Retour en arrière après une erreur
            window.history.go(-1);
            console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}] : ${error}`);
            reject();
            return;
         });
   });
}





var historicPrice7d = null;
var historicPrice1d = null;



async function cryptocurrencyManager(cryptocurrencyID) {
   var cryptocurrency = await fetchData(cryptocurrencyID);

   if (cryptocurrency != null) {
      cryptocurrencyLogo.src = cryptocurrency['image']['large'];

      cryptocurrencyLogo.alt = cryptocurrency['name'];
      cryptocurrencyName.innerHTML = cryptocurrency['name'];
      if (favsList.includes(`${cryptocurrency['id']},${cryptocurrency['symbol']}`)) {
         cryptocurrencyFavsButton.classList.add('fav-button-selected', 'bi-suit-heart-fill');
      } else {
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

      historicPrice7d = cryptocurrency['market_data']['sparkline_7d']['price'];
      // Créer la légende (nécessaire pour le graphique) et le graphique
      let legende = Object.keys(historicPrice7d);
      createChart(cryptocurrencyChart, historicPrice7d, legende);

      cryptocurrencyDescriptionWrapper.innerHTML = `
         <p>${cryptocurrency['description']['en']}</p>
         <p>Ce texte est traduit automatiquement en français par : </p>
         <input type="button" value="Voir l'original">
      `;

      /* const res = await fetch("https://libretranslate.de/translate", {
	      method: "POST",
	      body: JSON.stringify({
		      q: cryptocurrency['description']['en'],
		      source: "en",
		      target: "fr",
		      format: "text"
	      }),
	      headers: { "Content-Type": "application/json" }
      });

      console.log(await res.json()); */

      
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

var myChart = null;

function createChart(element, data, legende) {
   myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: 'Prix ',
            data: data,
            borderColor: '#E5734A', // Couleur de la ligne
            tension: 0.1,
            pointBackgroundColor: 'transparent', // Couleur des points
            pointBorderColor: 'transparent',
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
               radius: 12
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


var d = new Date(1651090383000);
console.log(d.toISOString());
console.log(d.toDateString());
console.log(d.toLocaleTimeString());
console.log("a");


const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id; 
cryptocurrencyManager(value);





allPeriod.forEach(element => {
   element.addEventListener('click', function() {
      allPeriod.forEach(button => {
         button.classList.remove('period-selected');
      });
      this.classList.add('period-selected');
      updateChart(element.innerHTML);
   });
});

function updateChart(period) {
   period = period.replace(' ', '').toLowerCase();

   
   let price = null;
   let legende = null;

   switch (period) {
      case '1h':
      case '1j':
         price = historicPrice7d.slice(144);
         // Créer la légende (nécessaire pour le graphique) et le graphique
         legende = Object.keys(price);
         console.log(price);
         break;
      case '7j':
         url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=hourly`;
      case '1a':
      case 'max':
         price = historicPrice7d;
         // Créer la légende (nécessaire pour le graphique) et le graphique
         legende = Object.keys(price);
         console.log(price);
         break;
      default:
         break;
   }

   console.log(price);

   // Modifier les données du graphique
   myChart.data.labels = legende;
   myChart.data.datasets[0].data = price;
   // Mettre à jour le graphique
   myChart.update();
}