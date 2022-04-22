const periodSelector = document.getElementById('chart-period-selector');
const allPeriod = periodSelector.getElementsByTagName('a');

const cryptocurrencyLogo = document.getElementById('cryptocurrency-logo');
const cryptocurrencyName = document.getElementById('cryptocurrency-name');
const cryptocurrencySymbol = document.getElementById('cryptocurrency-symbol');
const cryptocurrencyPrice = document.getElementById('cryptocurrency-price');
const cryptocurrencyStatistiquesWrapper = document.getElementById('wrapper-statistiques');
const cryptocurrencyChart = document.getElementById('cryptocurrency-chart');

function selectPeriod(periodClicked) {
   for (var period of allPeriod) {
      period.classList.remove('period-selected');
   }
   periodClicked.classList.add('period-selected');
}

function favsManager(favButton) {
   if (favButton.classList.contains('bi-suit-heart-fill')) {
      favButton.classList.remove('bi-suit-heart-fill');
      favButton.classList.add('bi-suit-heart');
   } else {
      favButton.classList.remove('bi-suit-heart');
      favButton.classList.add('bi-suit-heart-fill');
   }
}

/* https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false */



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
   var cryptocurrencyResponse = await fetchData(cryptocurrencyID);

   if (cryptocurrencyResponse != null) {
      cryptocurrencyLogo.src = cryptocurrencyResponse['image']['large'];
      cryptocurrencyLogo.alt = cryptocurrencyResponse['name'];
      cryptocurrencyName.innerHTML = cryptocurrencyResponse['name'];
      cryptocurrencySymbol.innerHTML = cryptocurrencyResponse['symbol'].toUpperCase();

      let price = cryptocurrencyResponse['market_data']['current_price']['usd'].toString();
      cryptocurrencyPrice.innerHTML = `${price.replace('.', ',')} $`;

      let fluctuationPourcentage = document.createElement('span');
      fluctuationPourcentage.innerHTML = `${cryptocurrencyResponse['market_data']['price_change_percentage_7d'].toFixed(2)} %`;
      if (cryptocurrencyResponse['market_data']['price_change_percentage_7d'] > 0) {
         fluctuationPourcentage.prepend("+")
         fluctuationPourcentage.classList.add('positive-pourcentage');
      } else {
         fluctuationPourcentage.classList.add('negative-pourcentage');
      }
      cryptocurrencyPrice.appendChild(fluctuationPourcentage);

      let historicPrice = cryptocurrencyResponse['market_data']['sparkline_7d']['price'];

      // Créer le tableau de légende (nécessaire pour le graphique)
      var legende = Object.keys(historicPrice);
      createChart(cryptocurrencyChart, historicPrice, legende);

      
      cryptocurrencyStatistiquesWrapper.innerHTML = `
         <div>
            <p>Capitalisation boursière</p>
            <p>${cryptocurrencyResponse['market_data']['market_cap']['usd']} $</p>
         </div>
         <div>
            <p>Niveau historique</p>
            <p>${cryptocurrencyResponse['market_data']['ath']['usd']} $</p>
         </div>
         <div>
            <p>Fluctuation de prix (en 24 heures)</p>
            <p>${cryptocurrencyResponse['market_data']['price_change_percentage_24h'].toFixed(2)} %</p>
         </div>
         <div>
            <p>Fluctuation de prix (en 7 jours)</p>
            <p>${cryptocurrencyResponse['market_data']['price_change_percentage_7d'].toFixed(2)} %</p>
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




const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.id; 

/* cryptocurrencyManager('bitcoin'); */
//cryptocurrencyManager('bitcoin');
cryptocurrencyManager(value);