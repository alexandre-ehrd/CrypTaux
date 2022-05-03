import {fetchFavsList, favsManager} from './FavsManagerHeart.js';


const periodSelector = document.getElementById('chart-period-selector');
const allPeriod = periodSelector.querySelectorAll('a');

const cryptocurrencyLogo = document.getElementById('cryptocurrency-logo');
const cryptocurrencyName = document.getElementById('cryptocurrency-name');
const cryptocurrencyFavsButton = document.getElementById('cryptocurrency-favs-button');
const cryptocurrencySymbol = document.getElementById('cryptocurrency-symbol');

const cryptocurrencyPrice = document.getElementById('cryptocurrency-price');
const cryptocurrencyChart = document.getElementById('cryptocurrency-chart');

const cryptocurrencyStatistiquesWrapper = document.getElementById('cryptocurrency-statistiques');

const cryptocurrencyCommunityWrapper = document.getElementById('cryptocurrency-community');

const cryptocurrencyHigherPrice = document.getElementById('cryptocurrency-higher-price');
const cryptocurrencyLowerPrice = document.getElementById('cryptocurrency-lower-price');

const cryptocurrencySentimentDown = document.getElementById('sentiment-downvote');


var favsList = await fetchFavsList();

var historicPrice7d = null;




async function fetchData(cryptocurrencyID) {
   var URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
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
      
      // Statistiques du marché
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

      // Cours le plus élevé
      let higherPriceDate = new Date(cryptocurrency['market_data']['ath_date']['usd']);
      cryptocurrencyHigherPrice.innerHTML = `
         ${cryptocurrency['name']} a atteint un prix maximal de ${cryptocurrency['market_data']['ath']['usd']} $ le ${higherPriceDate.toLocaleDateString("fr")}.
      `;
      
      // Cours le plus bas
      let lowerPriceDate = new Date(cryptocurrency['market_data']['atl_date']['usd']);
      cryptocurrencyLowerPrice.innerHTML = `
         ${cryptocurrency['name']} a atteint un prix minimal de ${cryptocurrency['market_data']['atl']['usd']} $ le ${lowerPriceDate.toLocaleDateString("fr")}.
      `;

      let t = new Date('2022-05-03T15:34:50.013Z')
      console.log(t.toLocaleDateString("fr") + " " + t.toLocaleTimeString("fr"));
      
      // Communauté
      // Site web de la crypto-monnaie
      var cryptocurencyURL = cryptocurrency['links']['homepage'];
      if (cryptocurencyURL != null) {
         cryptocurencyURL = cryptocurencyURL[0];
         var cryptocurrencyTitleURL = new URL(cryptocurencyURL);
         cryptocurrencyTitleURL = cryptocurrencyTitleURL.hostname.replace('www.', '');
         cryptocurrencyCommunityWrapper.innerHTML += `
            <a href="${cryptocurencyURL}" target="_blank">
               <i class="bi bi-link-45deg"></i>
               <p>${cryptocurrencyTitleURL}</p>
            </a>
         `;
      }

      // Twitter
      var twitterName = cryptocurrency['links']['twitter_screen_name'];
      if (twitterName != null) {
         var twitterURL = `https://twitter.com/${twitterName}`;
         cryptocurrencyCommunityWrapper.innerHTML += `
            <a href="${twitterURL}" target="_blank">
               <i class="bi bi-twitter"></i>
               <p>Twitter</p>
            </a>
         `;
      }

      // Facebook
      var facebookName = cryptocurrency['links']['facebook_username'];
      if (facebookName != null) {
         var facebookURL = `https://facebook.com/${facebookName}`;
         cryptocurrencyCommunityWrapper.innerHTML += `
            <a href="${facebookURL}" target="_blank">
               <i class="bi bi-facebook"></i>
               <p>Facebook</p>
            </a>
         `;
      }

      // Reddit
      var redditURL = cryptocurrency['links']['subreddit_url'];
      if (redditURL != null) {
         cryptocurrencyCommunityWrapper.innerHTML += `
            <a href="${redditURL}" target="_blank">
            <i class="bi bi-reddit"></i>
               <p>Reddit</p>
            </a>
         `;
      }

      // Github
      var githubUrl = cryptocurrency['links']['repos_url']['github'];
      if (githubUrl != null) {
         cryptocurrencyCommunityWrapper.innerHTML += `
            <a href="${githubUrl[0]}" target="_blank">
               <i class="bi bi-github"></i>
               <p>Github</p>
            </a>
         `;
      }



      // Sentiment de la communauté sur cette crypto-monnaie
      cryptocurrencySentimentDown.style.width = `${cryptocurrency['sentiment_votes_down_percentage']}%`;
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
            borderColor: '#02555B', // Couleur de la ligne
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
                  borderColor: '#CCCCCC'
               }
            },
            y: {
               ticks: {
                  display: true, // Graduation axe
               },
               beginAtZero: false,
               grid: {
                  color: 'transparent',
                  borderColor: '#CCCCCC'  
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


const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});
const cryptocurrencyID = params.id; 
cryptocurrencyManager(cryptocurrencyID);





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
   let legende = [];
   let URL = null;

   switch (period) {
      case '1j':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=1&interval=minutely`;
         break;
      case '7j':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=7&interval=hourly`;
         break;
      case '1a':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=365&interval=daily`;
         break;
      case 'max':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=max&interval=daily`;
         break;
      default:
         break;
   }

   fetch(URL)
      .then(response => {
         console.log("Requête");
         if (response.ok) {
            response.json().then(response => {
               price = response['prices'];
               console.log(price.length);
               for (let i = 0; i < price.length; i++) {
                  // Date
                  let date = new Date(price[i][0]);
                  legende.push(`${date.toLocaleDateString("fr")}, ${date.toLocaleTimeString()}`);
                  // Prix
                  price[i] = price[i][1];
               }
               // Modifier les données du graphique
               myChart.data.labels = legende;
               myChart.data.datasets[0].data = price;
               // Mettre à jour le graphique
               myChart.update();
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