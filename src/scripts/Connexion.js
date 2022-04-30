const passwordInput = document.querySelector("input[type=password]");

const eyeShow = document.getElementById("icon-eye-show");
const eyeHide = document.getElementById("icon-eye-hide");

// Récupérer tous les champs de textes à remplir
const allUserInput = document.getElementsByClassName('user-input');
// Récupérer le bouton pour envoyer le formulaire
const submitButton = document.querySelector("input[type=submit]");
console.log(submitButton)

passwordInput.addEventListener('input', () => {
   if (passwordInput.value.length == 0) {
      eyeShow.style.visibility = "hidden";
      eyeHide.style.visibility = "hidden";
   } else {
      eyeShow.style.visibility = "visible";
      eyeHide.style.visibility = "visible";
   }
});

eyeShow.addEventListener("click", () => {
   eyeShow.style.display = "none";
   eyeHide.style.display = "block";
   passwordInput.type = "text";
});
 
eyeHide.addEventListener("click", () => {
   eyeHide.style.display = "none";
   eyeShow.style.display = "block";
   passwordInput.type = "password";
});

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