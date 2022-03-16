var counterCryptocurrency = document.getElementById('cryptocurrency-counter');
var buttonsCryptocurrency = document.getElementsByClassName('cryptocurrency-favs-button');
var listCryptocurrency = []

Favs_Counter();

function Favs_Button_Manager(button) {
   if (button.className.split(" ").slice(-1) != 'favs-button-select') {
      listCryptocurrency.push(button.value);
   }
   else {
      let index = listCryptocurrency.indexOf(button.value);
      if (index > -1) {
         listCryptocurrency.splice(index, 1);
      }
   }
   button.classList.toggle("favs-button-select");
   Favs_Counter();
}

function Favs_Counter() {
   counterCryptocurrency.innerHTML = listCryptocurrency.length;
   if (listCryptocurrency.length >= 2) {
      counterCryptocurrency.innerHTML += `/${buttonsCryptocurrency.length} sélectionnés`
   }
   else {
      counterCryptocurrency.innerHTML += `/${buttonsCryptocurrency.length} sélectionné`
   }
}