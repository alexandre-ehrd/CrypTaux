import {requestThumbnail} from './FavThumbnail.js';

const gridElement = document.querySelector(".container-thumbnail-currency");
const gridComputedStyle = window.getComputedStyle(gridElement);

const allThumbnail2 = document.getElementsByClassName('thumbnail-currency');

hideThumbnails();
window.addEventListener('resize', hideThumbnails);

function hideThumbnails() {
   // Compter le nombre de colonne de thumbnails
   var gridColonneCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
   for (let i = 0; i < allThumbnail2.length; i++) {
      if (i > (gridColonneCount-1)) {
         // allThumbnail2[i].style.border = "solid 1px red";
         allThumbnail2[i].style.display = "none";
      } 
      else {
         allThumbnail2[i].style.display = "block";
         console.log(i, allThumbnail2[i].id);
         if (i == (gridColonneCount-1)) {
            allThumbnail2[i].style.border = "solid 1px red";
         }
      }
   }
   requestThumbnail();
}