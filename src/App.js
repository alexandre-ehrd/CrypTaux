const ctx = document.getElementById('graphique');
const BODY = document.body; 





async function fetch_data(){
   await Fetch_Billboard('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc');

   const myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: ["1", "2", "3", "4", "5", "6", "7"],
         datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            backgroundColor : "rgba(220, 220, 220, 0.5)",
            borderColor: 'rgb(75, 192, 192)', // Couleur de la ligne
            tension: 0.3
         }]
      },
      options: {
         scales: {
            x: {
               grid: {
                  color: 'transparent',
                  borderColor: 'rgba(220, 220, 220, 0.5)'  // <-- this line is answer to initial question
               }
            },
            y: {
               beginAtZero: true,
               grid: {
                  color: 'rgba(220, 220, 220, 0.5)',
                  borderColor: 'rgba(220, 220, 220, 0.5)'  // <-- this line is answer to initial question
               }
            }
         },
         elements: {
            point:{
               radius: 0
            }
         },
         yAxes: [{
            gridLines: {
                zeroLineColor: 'rgb(255, 255, 255)'
            }
        }]
      }
   });
    
}

fetch_data()

function Fetch_Billboard(URL) {
   return new Promise((resolve, reject) => {
      fetch(URL).then(response => {
         if (response.ok){
            response.json().then(coin_list => {

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



