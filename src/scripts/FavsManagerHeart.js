/* Fonction qui retourne la liste des fav's */
async function fetchFavsList() {
   return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var favsList = this.responseText;
            favsList = favsList.split("/");
            resolve(favsList);
         }
         else if (this.readyState == 4 && this.status != 200) {
            reject();
            return;
         }
      };
      xhttp.open("GET", `src/backend/favs_list.php`, true);
      xhttp.send();
   })
}

/* Fonction qui ajoute ou supprime la cryptomonnaie des fav's */
/* Et qui retourne la liste actualisée des fav's */
async function favsManager(button, cryptocurrency) {
   return new Promise((resolve, reject) => {
      // Requête pour ajouter ou supprimer la cryptomonnaie des fav's
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
         // La requête est terminé mais lève une erreur
         if (this.readyState == 4 && this.status != 200) {
            console.log(this.responseText);
            reject();
            return;
         }
      };
      xhttp.open("GET", `src/backend/favs_manager.php?id=${cryptocurrency['id']}&symbol=${cryptocurrency['symbol']}`, true);
      xhttp.send();

      // Changer l'icone du bouton fav's
      // Dislike 
      if (button.classList.contains('fav-button-selected')) {
         button.classList.remove('fav-button-selected');
         button.classList.remove('bi-suit-heart-fill');
         button.classList.add('bi-suit-heart');
      } 
      // Like
      else {
         button.classList.add('fav-button-selected');
         button.classList.add('bi-suit-heart-fill');
         button.classList.remove('bi-suit-heart');
      }
      let Favslist = fetchFavsList();
      resolve(Favslist);
   })
}


export { fetchFavsList, favsManager };