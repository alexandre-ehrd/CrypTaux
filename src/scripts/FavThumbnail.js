const allThumbnail = document.getElementsByClassName('thumbnail-currency');

const colorThief = new ColorThief();

requestThumbnail();

async function requestThumbnail(){
   for (thumbnail of allThumbnail) {
      // Appeler la fonction qui remplie le tableau
      await fetchHistoricData(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}/market_chart?vs_currency=usd&days=7&interval=daily`, thumbnail);
      await fetchDB(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}`, thumbnail)
   }
}




async function fetchHistoricData(URL, element) {
   return new Promise((resolve, reject) => {
      fetch(URL)
      .then(response => {
         if (response.ok){
            response.json().then(response => {
               var historic_price = response['prices'];
               historic_price = historic_price.map(x => x[1])
               
               var legende = Object.keys(historic_price);
               
               value_depart = historic_price[0];
               value_arrive = historic_price[historic_price.length-1];
               taux = ( (value_arrive-value_depart) / value_depart) * 100;
               
               var taux_element = element.querySelector('.fav-taux');
               if (taux > 0) {
                  taux_element.innerHTML = `+${taux.toFixed(2)}%`;
               }
               else {
                  taux_element.innerHTML = `${taux.toFixed(2)}%`;
               }

               var canvas_element = element.getElementsByTagName('canvas')[0];
               createChart(canvas_element, historic_price, legende)

               var price_element = element.querySelector('.fav-price');
               price_element.innerHTML = `${value_arrive.toFixed(7)}$`;

               resolve();
            })
         }
         else{
            console.error(`Impossible d'accéder à l'Api CoinGecko`);
            reject();
         }
      })
      .catch((error) => {
         console.log("Trop de requetes");
         reject();
      });
   })
}


async function fetchDB(URL, element) {
   return new Promise((resolve, reject) => {
      fetch(URL)
      .then(response => {
         if (response.ok){
            response.json().then(response => {
               // Image
               var img = element.getElementsByTagName('img')[0];
               
               let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
               let imageURL = response['image']['small'];
               img.src = googleProxyURL + encodeURIComponent(imageURL);

               img.addEventListener('load', function() {
                  var color = colorThief.getColor(img);
                  element.style.backgroundColor = `rgba(${color}, 0.3)`;
               });
               
               // Nom et symbole
               var cryptocurrencyName = response['name'];
               var cryptocurrencySymbol = response['symbol'];
               element.style.visibility = 'visible';
               

               element.addEventListener("click", function() {
                  openCryptocurrency(element.id, cryptocurrencySymbol, cryptocurrencyName);
               });

               resolve();
            })
         }
         else{
            console.error(`Impossible d'accéder à l'Api CoinGecko`);
            reject();
         }
      })
      .catch((error) => {
         console.log("Trop de requetes");
         reject();
      });
   })
}


function openCryptocurrency(id, symbol, name) {
   console.log(id);
   window.open(`cryptocurrency.php?name=${name}&symbol=${symbol}&id=${id}`, "_self");
}


function createChart(element, data, legende) {
   const myChart = new Chart(element, {
      type: 'line',
      data: {
         labels: legende,
         datasets: [{
            label: 'My First Dataset',
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
                  borderColor: 'transparent'  // <-- this line is answer to initial question
               }
            },
            y: {
               ticks: {
                  display: false, // Graduation axe
               },
               beginAtZero: false,
               grid: {
                  color: 'transparent',
                  borderColor: 'transparent'  // <-- this line is answer to initial question
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
               left: -10,
               bottom: -10
            }
         }
      }
   });
}