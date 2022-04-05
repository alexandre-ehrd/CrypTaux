const allThumbnail = document.getElementsByClassName('container');

console.log(allThumbnail);


async function requestThumbnail(){
   for (thumbnail of allThumbnail) {
      // Appeler la fonction qui remplie le tableau
      await fetchData(`https://api.coingecko.com/api/v3/coins/${thumbnail.id}/market_chart?vs_currency=usd&days=7&interval=daily`, thumbnail);
   }
}


function fetchData(URL, element) {
   return new Promise((resolve, reject) => {
      fetch(URL).then(response => {
         if (response.ok){
            response.json().then(response => {
               historic_price = response['prices'];
               legende = Object.keys(historic_price)
               historic_price = historic_price.map(x => x[1])
               var canvas_element = element.getElementsByTagName('canvas')[0];
               createChart(canvas_element, historic_price, legende)
               
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

               var price_element = element.querySelector('.fav-price');
               price_element.innerHTML = `${value_arrive.toFixed(7)}$`;



               // Ajouter le logo dans la thumbnail
               var logoURL = `https://api.coingecko.com/api/v3/coins/${element.id}`;
               fetch(logoURL).then(response => {
                  if (response.ok){
                     response.json().then(response => {
                        var img = element.getElementsByTagName('img')[0];
                        img.src = response['image']['small'];
                     })
                  }
               })

               


               resolve();
            })
         }
         else{
            console.error(`Impossible d'accéder à l'Api CoinGecko`);
            reject();
         }
      })
   })
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



requestThumbnail();