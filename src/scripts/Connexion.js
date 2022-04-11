const eyeShow = document.getElementById("icon-eye-show");
const eyeHide = document.getElementById("icon-eye-hide");
const passwordInputParent = document.getElementById("password-input");
const passwordInput = document.querySelector("input[type=password]");

console.log(passwordInputParent);

passwordInput.addEventListener("focus", () => {
   passwordInputParent.classList.add("password-input-focus");
});

passwordInput.addEventListener("focusout", () => {
   passwordInputParent.classList.remove("password-input-focus");
});


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