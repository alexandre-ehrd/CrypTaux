const ctx = document.getElementById('graphique');
const BODY = document.body; 

const myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: ["1", "2", "3", "4", "5", "6", "7"],
         datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor : "rgba(220, 220, 220, 0.5)", // Si fill=true
            borderColor: 'rgba(20, 20, 20, .3)', // Couleur de la ligne
            tension: 0.3
         }]
      },
      options: {
         scales: {
            x: {
               ticks: {
                  display: false
               },
               grid: {
                  color: 'transparent',
                  borderColor: 'transparent'  // <-- this line is answer to initial question
               }
            },
            y: {
               ticks: {
                  display: false
               },
               beginAtZero: true,
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
              left: -10
            }
         }
      }
   });


console.log("Test")


async function fetch_data(){
   await Fetch_Billboard('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc');

   
    
}

/* fetch_data() */

function Fetch_Billboard(URL) {
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



