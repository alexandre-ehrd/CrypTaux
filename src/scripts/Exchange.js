const selectorCryptocurrency_1 = document.getElementById('select-cryptocurrency-first');
const selectorCryptocurrency_2 = document.getElementById('select-cryptocurrency-second');


const symbolCryptocurrency_1 = document.getElementById('devise-symbol-first');
const symbolCryptocurrency_2 = document.getElementById('devise-symbol-second');


const imageCryptocurrency_1 = document.getElementById('devise-image-first');
const imageCryptocurrency_2 = document.getElementById('devise-image-second');

const inputCryptocurrency = document.getElementById('input-cryptocurrency');
const outputCryptocurrency = document.getElementById('output-cryptocurrency');


const swapperCryptocurrency = document.getElementById('cryptocurrency-swapper');

var cryptocurrencyDico = {};

selectorCryptocurrency_1.addEventListener('change', function () {
   // Accéder à l'objet cryptocurrency correspondant à l'option sélectionnée
   let cryptocurrency = cryptocurrencyDico[selectorCryptocurrency_1.value];
   symbolCryptocurrency_1.innerHTML = cryptocurrency.symbol.toUpperCase();
   let URLcryptocurrency = cryptocurrency['image'].replace('large', 'small');
   imageCryptocurrency_1.src = URLcryptocurrency;
   imageCryptocurrency_1.alt = cryptocurrency['name'];
   // Réinitialiser le champ de réponse
   outputCryptocurrency.innerHTML = '0';
});
selectorCryptocurrency_2.addEventListener('change', function () {
   // Accéder à l'objet cryptocurrency correspondant à l'option sélectionnée
   let cryptocurrency = cryptocurrencyDico[selectorCryptocurrency_2.value];
   symbolCryptocurrency_2.innerHTML = cryptocurrency.symbol.toUpperCase();
   let URLcryptocurrency = cryptocurrency['image'].replace('large', 'small');
   imageCryptocurrency_2.src = URLcryptocurrency;
   imageCryptocurrency_2.alt = cryptocurrency['name'];
   // Réinitialiser le champ de réponse
   outputCryptocurrency.innerHTML = '0';
});


swapperCryptocurrency.addEventListener('click', function () {
   let temp = selectorCryptocurrency_1.value;
   selectorCryptocurrency_1.value = selectorCryptocurrency_2.value;
   selectorCryptocurrency_2.value = temp;

   symbolCryptocurrency_1.innerHTML = cryptocurrencyDico[selectorCryptocurrency_1.value]['symbol'].toUpperCase();
   symbolCryptocurrency_2.innerHTML = cryptocurrencyDico[selectorCryptocurrency_2.value]['symbol'].toUpperCase();

   let URLcryptocurrency_1 = cryptocurrencyDico[selectorCryptocurrency_1.value]['image'].replace('large', 'small');
   let URLcryptocurrency_2 = cryptocurrencyDico[selectorCryptocurrency_2.value]['image'].replace('large', 'small');
   imageCryptocurrency_1.src = URLcryptocurrency_1;
   imageCryptocurrency_2.src = URLcryptocurrency_2;

   inputCryptocurrency.value = '';
   outputCryptocurrency.innerHTML = '0';
});

inputCryptocurrency.addEventListener('input', function (event) {
   if (event.inputType == 'deleteContentBackward') {
      return;
   }

   let keyCode = event.data.charCodeAt(event);
   // L'utilisateur a entré un chiffre (ou un point ou une virgule)
   if (keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 44) {
      return;
   }
   // L'utilisateur n'a pas entré un chiffre
   else {
      // Supprimer le dernier caractère entré (caractère non numérique)
      let value = inputCryptocurrency.value;
      inputCryptocurrency.value = value.slice(0, value.length-1);
   }
});

function convertCryptocurrency() {
   let cryptocurrency_1 = cryptocurrencyDico[selectorCryptocurrency_1.value];
   let cryptocurrency_2 = cryptocurrencyDico[selectorCryptocurrency_2.value];

   let URL = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency_1.id}&vs_currencies=${cryptocurrency_2.symbol}`;
   
   fetch(URL)
      .then(response => {
         console.log("Requête");
         if (response.ok) {
            response.json().then(response => {
               // Taux de change
               let taux = response[cryptocurrency_1['id']][cryptocurrency_2['symbol']];
               
               // Prix converti
               let inputValue = inputCryptocurrency.value.replace(',', '.');
               let cryptocurrencyConverted = inputValue * taux;
               // L'output n'est pas un nombre (NaN)
               if (Number.isNaN(cryptocurrencyConverted)) {
                  cryptocurrencyConverted = 'Erreur';
                  console.log('j');
               }

               outputCryptocurrency.innerHTML = cryptocurrencyConverted.toString().replace('.', ',');
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



createSelector();

async function createSelector() {
   var cryptocurrencyList = await fetchTrendingCryptocurrency();

   createOption(selectorCryptocurrency_1, cryptocurrencyList);
   createOption(selectorCryptocurrency_2, cryptocurrencyList);

   // Sélectionner automatiquement la première et deuxième option
   selectorCryptocurrency_1.selectedIndex = 0;
   selectorCryptocurrency_2.selectedIndex = 1;
   
   // Symobole des monnaies sélectionnées automatiquement
   symbolCryptocurrency_1.innerHTML = cryptocurrencyDico[selectorCryptocurrency_1.value]['symbol'].toUpperCase();
   symbolCryptocurrency_2.innerHTML = cryptocurrencyDico[selectorCryptocurrency_2.value]['symbol'].toUpperCase();

   // Images des monnaies sélectionnées automatiquement
   let URLCryptocurrency_1 = cryptocurrencyDico[selectorCryptocurrency_1.value]['image'].replace('large', 'small');
   let URLCryptocurrency_2 = cryptocurrencyDico[selectorCryptocurrency_2.value]['image'].replace('large', 'small');
   imageCryptocurrency_1.src = URLCryptocurrency_1;
   imageCryptocurrency_2.src = URLCryptocurrency_2;
}

function createOption(element, cryptocurrencyList) {
   for (var i = 0; i < cryptocurrencyList.length; i++) {
      let cryptocurrency = cryptocurrencyList[i];

      // Ajouter la monnaie au dictionnaire
      cryptocurrencyDico[cryptocurrency.id] = cryptocurrency;
      
      // Créer l'option
      let option = document.createElement("option");
      // Ajouter la valeur de l'option
      option.value = cryptocurrency.id;

      let cryptocurrencyName = cryptocurrency.name;
      let cryptocurrencySymbol = cryptocurrency.symbol.toUpperCase();
      option.text = `${cryptocurrencyName} [${cryptocurrencySymbol}]`;

      element.appendChild(option);
   }
}

async function fetchCryptocurrency1() {
   var URL = `https://api.coingecko.com/api/v3/coins/list`;
   var URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250`;
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


function fetchTrendingCryptocurrency() {
   var URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h,24h,7d';
   var trendingResponse = null;

   return new Promise((resolve, reject) => {
   
      // Les données historiques se trouvent dans le sessionStorage
      if (sessionStorage.getItem('trendingCryptocurrency') != null) {
         trendingResponse = JSON.parse(sessionStorage.getItem('trendingCryptocurrency'));
         resolve(trendingResponse);
      }
      else {
         fetch(URL)
            .then(response => {
               console.log("Requête");
               if (response.ok) {
                  response.json().then(response => {
                     trendingResponse = response;
                     // Sauvegarder les données dans le sessionStorage
                     sessionStorage.setItem('trendingCryptocurrency', JSON.stringify(response));
                     resolve(trendingResponse);
                  })
               }
               else{
                  console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}]`);
                  reject();
               }
            })
            .catch((error) => {
               console.error(`Impossible d'accéder à l'Api CoinGecko [${URL}] : ${error}`);
               reject();
            });
      }
   });
}

