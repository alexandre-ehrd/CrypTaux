const ctx = document.getElementById('graphique1');
const ctx2 = document.getElementById('graphique2');
const ctx3 = document.getElementById('graphique3');
const BODY = document.body;

function graphique(element, data, legende) {
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




async function fetch_data(){
   /* await Fetch_Billboard('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'); */
   await test_data('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily', ctx)
   await test_data('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=7&interval=daily', ctx2)
   // await test_data('https://api.coingecko.com/api/v3/coins/shiba-inu/market_chart?vs_currency=eur&days=7&interval=daily', ctx3)
}
/* fetch_data() */

function test_data(URL, element) {
   return new Promise((resolve, reject) => {
      fetch(URL).then(response => {
         if (response.ok){
            response.json().then(response => {
               console.log(response);
               historic_price = response['prices'];
               legende = Object.keys(historic_price)
               historic_price = historic_price.map(x => x[1])
               console.log(URL, historic_price)
               graphique(element, historic_price, legende)
               resolve();
               
               console.log(historic_price);
               value_depart = historic_price[0];
               value_arrive = historic_price[historic_price.length-1];
               taux = ( (value_arrive-value_depart) / value_depart) * 100;
               console.log(taux);
            })
         }
         else{
            console.error(`Impossible d'accéder à l'Api CoinGecko`);
            reject();
         }
      })
   })
}


function fetch_json() {
   fetch("./src/data.json").then(response => {
      if (response.ok) {
         response.json().then(data => {
            // Changer le nom
            console.log("Accès au json")
         })
      }
      else {
         console.error("Erreur : Pas d'accès aux données");
      }
   })
}


/* fetch_json(); */

function fetch_Billboard(URL) {
   return new Promise((resolve, reject) => {
      fetch(URL).then(response => {
         if (response.ok){
            response.json().then(coin_list => {
               console.log(coin_list.length)
               

               for (let i = 0; i < coin_list.length; i++) {
                  /* console.log(coin_list[i]["image"]) */
                  BODY.innerHTML += (`
                  <div class="container_crypto">
                     <div class="container_image">
                        <img src='${coin_list[i]["image"]}'>
                     </div>
                     <div>
                        <h1>${coin_list[i]["name"]} : ${coin_list[i]["symbol"].toUpperCase()}</h1>
                        <h3>${coin_list[i]["current_price"]}$</h3>
                     </div>
                  </div>
               `);
               }
               resolve();
            })
         }
         else{
            console.error(`L\'Api TMDB renvoie une erreur pour la requête ${Carousel_Request}`);
            reject();
         }
      })
   })
}

