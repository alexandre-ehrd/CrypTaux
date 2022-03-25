const eyeShow = document.getElementById("icon-eye-show");
const eyeHide = document.getElementById("icon-eye-hide");
const passwordInput = document.querySelector("input[type=password]");

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