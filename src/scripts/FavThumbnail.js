const colorThief = new ColorThief();

/* Fonction qui retourne les informations de la crypto-monnaies */
async function fetchCryptocurrency(thumbnailElement) {
   var cryptocurrencyID = thumbnailElement.id;
   var URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

   return new Promise((resolve, reject) => {
      var cryptocurrencyResponse = localStorage.getItem(cryptocurrencyID);
      // La monnaie se trouve dans le localStorage
      if (cryptocurrencyResponse != null) {
         cryptocurrencyResponse = JSON.parse(cryptocurrencyResponse);
         var nameElement = thumbnailElement.querySelector('.fav-symbol');
         nameElement.innerHTML = `${cryptocurrencyResponse['name']} [${cryptocurrencyResponse['symbol'].toUpperCase()}]`;
         resolve(cryptocurrencyResponse);
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               if (response.ok) {
                  response.json().then(response => {
                     cryptocurrencyResponse = response;
                     // Trier les données à sauvegarder dans le localStorage
                     delete cryptocurrencyResponse['description'];
                     // Sauvegarder les données dans le sessionStorage
                     localStorage.setItem(cryptocurrencyID, JSON.stringify(cryptocurrencyResponse));
                     resolve(cryptocurrencyResponse);
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
      }
   })
}

/* Fonction qui retourne un dictionnaire avec les prix sur 7 jours */
async function fetchHistoricData(thumbnailElement) {
   var cryptocurrencyID = thumbnailElement.id;
   var URL = `https://api.coingecko.com/api/v3/coins/${cryptocurrencyID}/market_chart?vs_currency=usd&days=7&interval=daily`;
   return new Promise((resolve, reject) => {
      var historicDataResponse = null;
      // Les données historiques se trouvent dans le sessionStorage
      if (sessionStorage.getItem(`${cryptocurrencyID}-Historic-Date`) != null) {
         historicDataResponse = JSON.parse(sessionStorage.getItem(`${cryptocurrencyID}-Historic-Date`));
         resolve(historicDataResponse);
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               if (response.ok) {
                  response.json().then(response => {
                     historicDataResponse = response;
                     // Sauvegarder les données dans le sessionStorage
                     sessionStorage.setItem(`${cryptocurrencyID}-Historic-Date`, JSON.stringify(response));
                     resolve(historicDataResponse);
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
      }
   });
}


function fillThumbnailElement(cryptocurrencyData, thumbnailElement) {
   // Image
   var img = thumbnailElement.getElementsByTagName('img')[0];
   var googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
   var imageURL = cryptocurrencyData['image'];
   img.src = googleProxyURL + encodeURIComponent(imageURL);
   img.addEventListener('load', function() {
      // Retourne la couleur dominante de l'image
      var color = colorThief.getColor(img);
      thumbnailElement.style.backgroundColor = `rgba(${color}, 0.3)`;
   });

   // Nom et symbole
   var nameElement = thumbnailElement.querySelector('.fav-name-wrapper');
   nameElement.innerHTML = `
      <p class='fav-name'>${cryptocurrencyData['name']}</p>
      <span class='fav-symbol'>${cryptocurrencyData['symbol'].toUpperCase()}</span>
   `;
   var cryptocurrencyName = cryptocurrencyData['name'];
   thumbnailElement.style.visibility = 'visible';
   thumbnailElement.addEventListener("click", function() {
      // Ouvrir la page de la monnaie en personnalisant l'URL
      window.open(`cryptocurrency.php?name=${cryptocurrencyName}&id=${thumbnailElement.id}`, "_self");
   });

   // Prix
   var price_element = thumbnailElement.querySelector('.fav-price');
   var price = cryptocurrencyData['current_price'];
   price_element.innerHTML = `${price.toString().replace('.', ',')} $`;

   // Taux d'évolution sur 7 jours
   var taux = cryptocurrencyData['price_change_percentage_7d_in_currency'];
   var taux_element = thumbnailElement.querySelector('.fav-taux-wrapper');

   if (taux == null) {
      thumbnailElement.style.display = 'none';
      return;
   }
   else if (taux > 0) {
      taux = taux.toFixed(1).toString().replace('.', ',');
      taux_element.innerHTML = `
         <i class="bi bi-caret-up-fill"></i>
         <p class='fav-taux'>${taux} %</p>
      `;
      taux_element.classList.add('fav-taux-wrapper-positive');
   }
   else {
      taux = taux.toFixed(1).toString().replace('.', ',');
      // Enlever le signe négatif
      taux = taux.substring(1);
      taux_element.innerHTML = `
         <i class="bi bi-caret-down-fill"></i>
         <p class='fav-taux'>${taux} %</p>
      `;
      taux_element.classList.add('fav-taux-wrapper-negative');
   }

   // Graphique
   var historicPrice = cryptocurrencyData['sparkline_in_7d']['price'];
   // Créer le tableau de légende (nécessaire pour le graphique)
   var legende = Object.keys(historicPrice);
   var canvas_element = thumbnailElement.getElementsByTagName('canvas')[0];
   
   createChart(canvas_element, historicPrice, legende);
}



function createChart(element, data, legende) {
   const myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: 'Prix ',
            data: data,
            fill: true,
            backgroundColor : 'rgba(20, 20, 20, 0.1)', // Si fill=true
            borderColor: 'rgba(20, 20, 20, 0.3)', // Couleur de la ligne
            tension: 0.3
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
         },
         events: []
      }
   });
}


export {fetchHistoricData, fetchCryptocurrency, fillThumbnailElement};