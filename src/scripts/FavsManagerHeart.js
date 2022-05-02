async function fetchList() {
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

function favsManager(button, cryptocurrency) {
   // Ajouter ou supprimer la cryptomonnaie des fav's
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status != 200) {
         console.log(this.responseText);
      }
   };
   xhttp.open("GET", `src/backend/favs_manager.php?id=${cryptocurrency['id']}&symbol=${cryptocurrency['symbol']}`, true);
   xhttp.send();
   // Changer l'icone du bouton fav's
   if (button.classList.contains('bi-suit-heart-fill')) {
      button.classList.remove('bi-suit-heart-fill');
      button.classList.add('bi-suit-heart');
   } else {
      button.classList.remove('bi-suit-heart');
      button.classList.add('bi-suit-heart-fill');
   }
}


export { fetchList, favsManager};


