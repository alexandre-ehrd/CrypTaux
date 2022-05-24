const colorThief = new ColorThief();

import {fetchFavsList, favsManager} from './FavsManagerHeart.js';


const periodSelector = document.getElementById('chart-period-selector');
const allPeriod = periodSelector.querySelectorAll('a');

const cryptocurrencyLogo = document.getElementById('cryptocurrency-logo');
const cryptocurrencyName = document.getElementById('cryptocurrency-name');
const cryptocurrencyFavsButton = document.getElementById('cryptocurrency-favs-button');

const dataLastUpdate = document.getElementById('data-last-update');
const refreshButton = document.getElementById('refresh-button');

const cryptocurrencyPrice = document.getElementById('cryptocurrency-price');
const cryptocurrencyFluctuation = document.getElementById('cryptocurrency-fluctuation-price');
const cryptocurrencyChart = document.getElementById('cryptocurrency-chart');


const cryptocurrencyStatistiquesWrapper = document.getElementById('cryptocurrency-statistiques');
const cryptocurrencyCapitalisationBoursiere = document.getElementById('cryptocurrency-capitalisation');
const cryptocurrencyHighPrice = document.getElementById('cryptocurrency-high-price');
const cryptocurrencyFluctuation24h = document.getElementById('cryptocurrency-fluctuation-24h');
const cryptocurrencyFluctuation7d = document.getElementById('cryptocurrency-fluctuation-7d');

const cryptocurrencyCommunityWrapper = document.getElementById('cryptocurrency-community');

const cryptocurrencyHigherPrice = document.getElementById('cryptocurrency-higher-price');
const cryptocurrencyLowerPrice = document.getElementById('cryptocurrency-lower-price');

const cryptocurrencySentimentDown = document.getElementById('sentiment-downvote');



var favsList = await fetchFavsList();

var myChart = null;

var fluctuation1d = null;
var fluctuation7d = null;

var cryptocurrencyLogoColor = null;


allPeriod.forEach(element => {
   element.addEventListener('click', function() {
      allPeriod.forEach(button => {
         button.classList.remove('period-selected');
      });
      this.classList.add('period-selected');
      updateChart(element.innerHTML, false);
   });
});


/* Avoir les paramètres passés dans l'URL */
const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
});
const cryptocurrencyID = params.id; 
cryptocurrencyManager(cryptocurrencyID);


/* Fonction qui retourne les données de la crypto-monnaie */
async function fetchData(cryptocurrencyID) {
   var URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
   return new Promise((resolve, reject) => {
      var cryptocurrencyResponse = null;
      // Les données historiques se trouvent dans le localStorage
      if (sessionStorage.getItem(cryptocurrencyID) != null && 1==2) {
         cryptocurrencyResponse = JSON.parse(localStorage.getItem(cryptocurrencyID));
         resolve(cryptocurrencyResponse);
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               console.log("Requête volontaire pour tester");

               if (response.ok) {
                  response.json().then(response => {
                     cryptocurrencyResponse = response;
                     // Trier les données à sauvegarder dans le localStorage
                     delete cryptocurrencyResponse['description'];
                     // Sauvegarder les données dans le localStorage
                     sessionStorage.setItem(cryptocurrencyID, JSON.stringify(cryptocurrencyResponse));
                     resolve(cryptocurrencyResponse);
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
      }
   });
}


/* Fonction qui s'occupe de remplir la fenêtre avec les données */
async function cryptocurrencyManager(cryptocurrencyID) {
   var cryptocurrency = await fetchData(cryptocurrencyID);

   if (cryptocurrency != null) {
      // Logo de la monnaie
      var googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
      cryptocurrencyLogo.src = googleProxyURL + encodeURIComponent(cryptocurrency['image']['large']);
      cryptocurrencyLogo.alt = cryptocurrency['name'];
      cryptocurrencyLogo.addEventListener('load', function() {
         cryptocurrencyLogoColor = colorThief.getColor(cryptocurrencyLogo);
      });

      // Nom et symbole de la monnaie
      cryptocurrencyName.innerHTML = `${cryptocurrency['name']} <span id="cryptocurrency-symbol" style="font-size: 1.3rem; color: grey; font-weight: 300;">${cryptocurrency['symbol'].toUpperCase()}</span>`;

      // Icone fav's
      if (favsList.includes(`${cryptocurrency['id']},${cryptocurrency['symbol']}`)) {
         cryptocurrencyFavsButton.classList.add('fav-button-selected', 'bi-suit-heart-fill');
      } else {
         cryptocurrencyFavsButton.classList.add('bi-suit-heart');
      }
      cryptocurrencyFavsButton.onclick = function() {
         favsManager(cryptocurrencyFavsButton, cryptocurrency);
      }

      // Dernière mise à jour des données
      var date = new Date(cryptocurrency['last_updated']);
      const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin",
         "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ];
      let day = date.getDate();
      let monthIndex = date.getMonth();
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      dataLastUpdate.innerHTML = `Dernière mise à jour : ${day} ${monthNames[monthIndex]} à ${hours}:${minutes}`;

      // Bouton de raffraichissement
      refreshButton.onclick = function() {
         // Rappeler la fonction qui fetch la data et remplie la fenêtre
         cryptocurrencyManager(cryptocurrencyID);
         // Mettre à jour le graphique
         updateChart('7 j', false);
      }

      // Prix de la monnaie 
      let price = cryptocurrency['market_data']['current_price']['usd'].toString();
      cryptocurrencyPrice.innerHTML = `${price.replace('.', ',')} $`;

      // Fluctuation du prix
      let fluctuation = cryptocurrency['market_data']['price_change_percentage_7d'];   
      if (fluctuation > 0) {
         cryptocurrencyFluctuation.classList.add('positive-pourcentage');
         cryptocurrencyFluctuation.innerHTML = `
            <i class="bi bi-caret-up-fill"></i>
            ${fluctuation.toFixed(2).replace('.', ',')} %
         `;
      } else {
         cryptocurrencyFluctuation.classList.add('negative-pourcentage');
         fluctuation = fluctuation.toFixed(2).replace('.', ',');
         fluctuation = fluctuation.toString().substring(1);
         cryptocurrencyFluctuation.innerHTML = `
            <i class="bi bi-caret-down-fill"></i>
            ${fluctuation} %
         `;
      }

      // Sauvegarder la fluctuation sur 1 jour et 7 jours
      fluctuation1d = cryptocurrency['market_data']['price_change_percentage_24h'];
      fluctuation7d = cryptocurrency['market_data']['price_change_percentage_7d'];

      if (myChart == null) {
         // Création du graphique
         updateChart('7 j', true);
      }
      
      // Statistiques du marché
      cryptocurrencyCapitalisationBoursiere.innerHTML = `${cryptocurrency['market_data']['market_cap']['usd']} $`;
      cryptocurrencyHighPrice.innerHTML = `${cryptocurrency['market_data']['ath']['usd']} $`;
      cryptocurrencyFluctuation24h.innerHTML = `${cryptocurrency['market_data']['price_change_percentage_24h'].toFixed(2)} %`;
      cryptocurrencyFluctuation7d.innerHTML = `${cryptocurrency['market_data']['price_change_percentage_7d'].toFixed(2)} %`;

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

      // On réinitialise les données communautaires
      cryptocurrencyCommunityWrapper.innerHTML = '';

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


/* Fonction qui actualise le graphique quand la période change */
async function updateChart(period, isNew) {
   period = period.replace(' ', '').toLowerCase();
   let price = null;
   let legende = [];
   let URL = null;
   var fluctuationPourcentage = null;

   switch (period) {
      case '1j':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=1&interval=minutely`;
         fluctuationPourcentage = fluctuation1d;
         break;
      case '7j':
         URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=7&interval=hourly`;
         fluctuationPourcentage = fluctuation7d;
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
               for (let i = 0; i < price.length; i++) {
                  // Date
                  let date = new Date(price[i][0]);
                  legende.push(`${date.toLocaleDateString("fr")}, ${date.toLocaleTimeString()}`);
                  // Prix
                  price[i] = price[i][1];
               }

               // Fluctuation
               if (fluctuationPourcentage == null) {
                  fluctuationPourcentage = ((price[price.length - 1] - price[0]) / price[0]) * 100;
               }

               // Fluctuation du prix
               if (fluctuationPourcentage > 0) {
                  cryptocurrencyFluctuation.classList.remove('negative-pourcentage');
                  cryptocurrencyFluctuation.classList.add('positive-pourcentage');
                  cryptocurrencyFluctuation.innerHTML = `
                     <i class="bi bi-caret-up-fill"></i>
                     ${fluctuationPourcentage.toFixed(2).replace('.', ',')} %
                  `;
               } else {
                  cryptocurrencyFluctuation.classList.remove('positive-pourcentage');
                  cryptocurrencyFluctuation.classList.add('negative-pourcentage');
                  fluctuationPourcentage = fluctuationPourcentage.toFixed(2).replace('.', ',');
                  fluctuationPourcentage = fluctuationPourcentage.toString().substring(1);
                  cryptocurrencyFluctuation.innerHTML = `
                     <i class="bi bi-caret-down-fill"></i>
                     ${fluctuationPourcentage} %
                  `;
               }

               if (isNew) {
                  createChart(cryptocurrencyChart, price, legende);
               }
               else {
                  // Modifier les données du graphique
                  myChart.data.labels = legende;
                  myChart.data.datasets[0].data = price;
                  // Mettre à jour le graphique
                  myChart.update();
               }
               
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


/* Fonction qui créer le graphique */
function createChart(element, data, legende) {
   myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: 'Prix ',
            data: data,
            borderColor: `rgb(${cryptocurrencyLogoColor})`, // Couleur de la ligne
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