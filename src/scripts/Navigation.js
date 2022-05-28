const navigation = document.querySelector(".side-navigation");
const navigationBackground = document.getElementById("aside-mobile-background");

navigationBackground.addEventListener("click", openNavigation);

/* Fonction qui ajoute ou supprime la classe active sur la navigation bar */
function openNavigation() {
   navigation.classList.toggle("aside-mobile-open");
   if (navigation.classList.contains("aside-mobile-open")) {
      navigationBackground.classList.add("aside-mobile-background-active");
   }
   else {
      navigationBackground.classList.remove("aside-mobile-background-active");
   }
}