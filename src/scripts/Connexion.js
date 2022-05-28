// Récupérer tous les champs de textes à remplir
const allUserInput = document.getElementsByClassName('user-input');

// Récupérer tous le champs du mot de passe
const passwordInputList = document.querySelectorAll("input[type=password]");
// Récupérer les deux premières icônes d'oeil
const eyeShow = document.getElementById('eye-show');
const eyeHide = document.getElementById('eye-hide');

// Récupérer le bouton pour envoyer le formulaire
const submitButton = document.querySelector("input[type=submit]");


// Premier champ de mot de passe
passwordInputList[0].addEventListener('input', () => {
   if (passwordInputList[0].value.length == 0) {
      eyeShow.style.visibility = "hidden";
      eyeHide.style.visibility = "hidden";
   } else {
      eyeShow.style.visibility = "visible";
      eyeHide.style.visibility = "visible";
   }
})

eyeShow.addEventListener("click", () => {
   eyeShow.style.display = "none";
   eyeHide.style.display = "block";
   passwordInputList[0].type = "text";
});
 
eyeHide.addEventListener("click", () => {
   eyeHide.style.display = "none";
   eyeShow.style.display = "block";
   passwordInputList[0].type = "password";
});

// L'utilisateur est sur la page d'inscription
if (passwordInputList.length > 1) {
   // Récupérer les deux premières icônes d'oeil
   const eyeShowRepeat = document.getElementById('eye-show-repeat');
   const eyeHideRepeat = document.getElementById('eye-hide-repeat');

   // Second champ de mot de passe
   passwordInputList[1].addEventListener('input', () => {
      if (passwordInputList[1].value.length == 0) {
         eyeShowRepeat.style.visibility = "hidden";
         eyeHideRepeat.style.visibility = "hidden";
      } else {
         eyeShowRepeat.style.visibility = "visible";
         eyeHideRepeat.style.visibility = "visible";
      }
   })

   eyeShowRepeat.addEventListener("click", () => {
      eyeShowRepeat.style.display = "none";
      eyeHideRepeat.style.display = "block";
      passwordInputList[1].type = "text";
   });
   
   eyeHideRepeat.addEventListener("click", () => {
      eyeHideRepeat.style.display = "none";
      eyeShowRepeat.style.display = "block";
      passwordInputList[1].type = "password";
   });

}


for (let i = 0; i < allUserInput.length; i++) {
   allUserInput[i].addEventListener('input', () => {
      submitManager();
   });
}


function submitManager() {
   for (let i = 0; i < allUserInput.length; i++) {
      if (allUserInput[i].value.length == 0) {
         submitButton.classList.remove("submit-enabled");
         submitButton.classList.add("submit-disabled");
         return;
      }
   }
   submitButton.classList.add("submit-enabled");
   submitButton.classList.remove("submit-disabled");
}