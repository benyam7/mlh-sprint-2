const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const titles = document.querySelectorAll(".hr-text");

const menuItem = document.querySelector(".nav-item ");
const moveArea = document.querySelector(".move-area");
const eye = document.querySelector(".eye");

const toggle = () => {
  nav.classList.toggle("mobile-nav");
  menuToggle.classList.toggle("is-active");

  titles.forEach((title) => {
    title.classList.toggle("is-hidden");
  });
};
menuToggle.addEventListener("click", () => toggle());

// console.log(menuItem);
menuItem.addEventListener("click", () => toggle());
