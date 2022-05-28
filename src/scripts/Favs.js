import {fillThumbnailElement} from './FavThumbnail.js';
import {fetchCryptoCurrenciesPrices} from './LivePrice.js';

const thumbnailsWrapper = document.getElementById('favs-thumbnail-wrapper');
const allThumbnails = thumbnailsWrapper.getElementsByClassName('thumbnail-currency');


function requestThumbnail(favsRequest){
   for (var thumbnail of allThumbnails) {
      // La thumbnail n'est pas encore affichée mais elle doit l'être
      if (thumbnail.style.visibility == "hidden") {
         // Remplir la thumbnail avec les données
         fillThumbnailElement(favsRequest[thumbnail.id], thumbnail);
         thumbnail.style.visibility = "visible";
      }

      thumbnail.addEventListener('dragstart', function(event) {
         event.dataTransfer.setData('text/plain', event.target.id);
      });

      thumbnail.addEventListener('dragenter', function(event) {
         event.target.classList.add('dragover');
         var dragoverParentElement = event.target.parentNode;
         
         // Supprimer toutes les dropIndicator
         var dropzones = thumbnailsWrapper.getElementsByClassName('thumbnail-drop-indicator');
         for (var dropzone of dropzones) {
            thumbnailsWrapper.removeChild(dropzone);
         }

         var dropIndicator = document.createElement('div');
         dropIndicator.classList.add('thumbnail-drop-indicator');
         // Ajouter le dropIndicator à la bonne place
         if (event.target.classList.contains('fav-dropzone-left')) {
            thumbnailsWrapper.insertBefore(dropIndicator, dragoverParentElement);
         } else {
            thumbnailsWrapper.insertBefore(dropIndicator, dragoverParentElement.nextSibling);
         }
      });

      thumbnail.addEventListener('dragend', function(event) {
         event.preventDefault();
         event.stopPropagation();
         var elementDrag = event.target;
         var dropzone = thumbnailsWrapper.getElementsByClassName('thumbnail-drop-indicator')[0];
         thumbnailsWrapper.insertBefore(elementDrag, dropzone);
         thumbnailsWrapper.removeChild(dropzone);
      });
   }
}


// Récupérer toutes les informations pour tous les fav's
var favsRequest = await fetchCryptoCurrenciesPrices();

requestThumbnail(favsRequest);