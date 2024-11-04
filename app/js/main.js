import {setupMobileMenu} from './mobileMenu.js';

setupMobileMenu();

document.querySelectorAll(".desktop").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - 40;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});