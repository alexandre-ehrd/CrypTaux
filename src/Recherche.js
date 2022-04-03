const input = document.getElementById('search-bar');
const log = document.getElementById('log');

console.log("Recherche....");

input.addEventListener('input', updateValue);

function updateValue(e) {
   // L'utilisateur cherche uune monnaie
   if (e.target.value.length > 0) {
      var URLQuery = `https://api.coingecko.com/api/v3/search?query=${e.target.value}`;
      fetch(URLQuery).then(response => {
         if (response.ok) { 
            response.json().then(data => {
               listCrypto = data['coins']
               console.log(listCrypto);
               console.log(listCrypto.length);
               console.log("");
               log.innerHTML = ""; // On vide le log
               for (let i = 0; i < listCrypto.length; i++) {
                  log.innerHTML += listCrypto[i]["name"] + ` [${listCrypto[i]["symbol"]}]`+ "<br>";
               }
            })
         }
         else {
            console.error("Erreur : Pas d'accès aux données");
         }
      })
   }
   else {
      log.innerHTML = "";
   }
}