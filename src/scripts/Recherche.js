const input = document.getElementById('search-bar');
const log = document.getElementById('log');

//input.addEventListener('input', updateValue);

input.addEventListener('keyup', function(event) {
   if (event.key == 'Enter') {
      console.log('enter');
      updateValue();
   }
});


function updateValue(e) {
   // La longueur du texte dans le champs de recherche n'est pas nulle
   if (input.value.length > 0) {
      var URLQuery = `https://api.coingecko.com/api/v3/search?query=${input.value}`;
      // Récupérer les infos de la requête
      fetch(URLQuery).then(response => {
         if (response.ok) { 
            response.json().then(data => {
               
               listCrypto = data['coins'];
               listExchanges = data['exchanges'];
               
               // Vider le texte de log
               log.innerHTML = "";
               for (let i = 0; i < listCrypto.length; i++) {
                  if (i >= 6) {
                     break;
                  }
                  log.innerHTML += listCrypto[i]["name"] + ` [${listCrypto[i]["symbol"]}]`+ "<br>";
               }

               log.innerHTML += "<br>";
               

               for (let i = 0; i < listExchanges.length; i++) {
                  if (i >= 4) {
                     break;
                  }
                  log.innerHTML += listExchanges[i]["name"] + ` [${listExchanges[i]["id"]}]`+ "<br>";
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

