
 // Dark Mode

 const sideMenu = document.querySelector("aside");
 const menuBtn = document.querySelector("#menu-btn");
 const closeBtn = document.querySelector("#close-btn");
 const themeToggler = document.querySelector(".theme-toggler");
 const body = document.body;
 
 // Cargar el modo de tema almacenado al cargar la página
 const savedTheme = localStorage.getItem("theme");
 if (savedTheme) {
   body.classList.add(savedTheme);
 }
 
 menuBtn.addEventListener("click", () => {
   sideMenu.style.display = "block";
 });
 
 closeBtn.addEventListener("click", () => {
   sideMenu.style.display = "none";
 });
 
 themeToggler.addEventListener("click", () => {
   body.classList.toggle("dark-theme-variables");
 
   // Guardar el tema actual en localStorage
   const currentTheme = body.classList.contains("dark-theme-variables")
     ? "dark-theme-variables"
     : "";
   localStorage.setItem("theme", currentTheme);
 
   themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
   themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
 });
