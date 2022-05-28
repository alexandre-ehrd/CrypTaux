const selectorCryptocurrency_1 = document.getElementById('select-cryptocurrency-first');
const selectorCryptocurrency_2 = document.getElementById('select-cryptocurrency-second');


const symbolCryptocurrency_1 = document.getElementById('devise-symbol-first');
const symbolCryptocurrency_2 = document.getElementById('devise-symbol-second');


const imageCryptocurrency_1 = document.getElementById('devise-image-first');
const imageCryptocurrency_2 = document.getElementById('devise-image-second');

const inputCryptocurrency = document.getElementById('input-cryptocurrency');
const outputCryptocurrency = document.getElementById('output-cryptocurrency');

var cryptocurrencyDico = {};

selectorCryptocurrency_1.addEventListener('change', selectValueChange_1);
selectorCryptocurrency_2.addEventListener('change', selectValueChange_2);

function selectValueChange_1() {
   // Accéder à l'objet cryptocurrency correspondant à l'option sélectionnée
   let cryptocurrency = cryptocurrencyDico[selectorCryptocurrency_1.value];
   symbolCryptocurrency_1.innerHTML = cryptocurrency.symbol.toUpperCase();
   let URLcryptocurrency = cryptocurrency['image'];
   imageCryptocurrency_1.src = URLcryptocurrency;
   imageCryptocurrency_1.alt = cryptocurrency['name'];
   imageCryptocurrency_1.addEventListener("click", function() {
      // Ouvrir la page de la monnaie en personnalisant l'URL
      window.open(`cryptocurrency.php?name=${cryptocurrency['name']}&id=${cryptocurrency['id']}`, "_self");
   });

   // Réinitialiser le champ de réponse
   outputCryptocurrency.innerHTML = '0';
};

function selectValueChange_2() {
   // Afficher le symbole de la devise sélectionnée
   imageCryptocurrency_2.style.visibility = 'visible';
   // L'utilisateur ne clique pas sur l'euro ou le dollar
   if (selectorCryptocurrency_2.value != 'euro' && selectorCryptocurrency_2.value != 'dollar') {
      // Accéder à l'objet cryptocurrency correspondant à l'option sélectionnée
      let cryptocurrency = cryptocurrencyDico[selectorCryptocurrency_2.value];
      symbolCryptocurrency_2.innerHTML = cryptocurrency.symbol.toUpperCase();
      let URLcryptocurrency = cryptocurrency['image'];
      imageCryptocurrency_2.src = URLcryptocurrency;
      imageCryptocurrency_2.alt = cryptocurrency['name'];
      imageCryptocurrency_2.addEventListener("click", function() {
         // Ouvrir la page de la monnaie en personnalisant l'URL
         window.open(`cryptocurrency.php?name=${cryptocurrency['name']}&id=${cryptocurrency['id']}`, "_self");
      });
   }
   else {
      if (selectorCryptocurrency_2.value == 'euro') {
         symbolCryptocurrency_2.innerHTML = '€';
      }
      else {
         symbolCryptocurrency_2.innerHTML = '$';
      }
      imageCryptocurrency_2.style.visibility = 'hidden';
      imageCryptocurrency_2.alt = '';
   }
   // Réinitialiser le champ de réponse
   outputCryptocurrency.innerHTML = '0';
};


inputCryptocurrency.addEventListener('input', function (event) {
   // L'utilisateur appuie sur la touche supprimer
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
   if (inputCryptocurrency.value == '') {
      return;
   }

   let cryptocurrency_1 = cryptocurrencyDico[selectorCryptocurrency_1.value];
   let cryptocurrency_2 = null;
   
   // L'utilisateur ne souhaite avoir des euros ou des dollars en sortie
   if (selectorCryptocurrency_2.value != 'euro' && selectorCryptocurrency_2.value != 'dollar') {
      cryptocurrency_2 = cryptocurrencyDico[selectorCryptocurrency_2.value];
   }
   else {
      if (selectorCryptocurrency_2.value == 'euro') {
         cryptocurrency_2 = {
            'symbol': 'eur',
         };
      }
      else {
         cryptocurrency_2 = {
            'symbol': 'usd',
         };
      }
   }

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


/* Fonction qui retourne les 250 premières crypto-monnaies en fonction de leurs capitalisation boursière */
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

/* Fonction qui gère la création des élements SELECT */
async function createSelector() {
   var cryptocurrencyList = await fetchTrendingCryptocurrency();

   createOptionsInSelect(selectorCryptocurrency_1, cryptocurrencyList, false);
   createOptionsInSelect(selectorCryptocurrency_2, cryptocurrencyList, true);

   // Sélectionner automatiquement la première et deuxième option
   selectorCryptocurrency_1.selectedIndex = 0;
   selectorCryptocurrency_2.selectedIndex = 0;

   // Changer les symboles et images affichés
   selectValueChange_1();
   selectValueChange_2();
}

/* Fonction qui créer les options dans les deux SELECT */
function createOptionsInSelect(element, cryptocurrencyList, isOutput) {
   for (var i = 0; i < cryptocurrencyList.length; i++) {
      let cryptocurrency = cryptocurrencyList[i];
      
      // On trie les monnaies qu'on peut convertir dans la partie output
      if (isOutput == false || isOutput == true && MonnaieListOutput.indexOf(cryptocurrency['symbol']) != -1) {
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
}

// Listes des monnaies supportées en sortie par CoinGecko
var MonnaieListOutput =
[
   "btc",
   "eth",
   "ltc",
   "bch",
   "bnb",
   "eos",
   "xrp",
   "xlm",
   "link",
   "dot",
   "yfi",
   "usd",
   "aed",
   "ars",
   "aud",
   "bdt",
   "bhd",
   "bmd",
   "brl",
   "cad",
   "chf",
   "clp",
   "cny",
   "czk",
   "dkk",
   "eur",
   "gbp",
   "hkd",
   "huf",
   "idr",
   "ils",
   "inr",
   "jpy",
   "krw",
   "kwd",
   "lkr",
   "mmk",
   "mxn",
   "myr",
   "ngn",
   "nok",
   "nzd",
   "php",
   "pkr",
   "pln",
   "rub",
   "sar",
   "sek",
   "sgd",
   "thb",
   "try",
   "twd",
   "uah",
   "vef",
   "vnd",
   "zar",
   "xdr",
   "xag",
   "xau",
   "bits",
   "sats"
]

createSelector();