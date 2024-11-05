import {setupMobileMenu} from './mobileMenu.js';

setupMobileMenu();

let prevScrollpos = window.scrollY;
let timeout;
const header = document.getElementById("header");

window.onscroll = function () {
  clearTimeout(timeout);

  let currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    header.classList.remove('scroll');
  } else {
    header.classList.add('scroll');
  }

  timeout = setTimeout(() => {
    if (prevScrollpos > currentScrollPos) {
      header.classList.remove('scroll');
    }
  }, 100);

  prevScrollpos = currentScrollPos;
};

document.querySelectorAll(".desktop").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    const header = document.querySelector(".header");

    if (targetSection) {
      const currentScrollPos = window.scrollY;
      const headerHeight = header ? header.offsetHeight : 0;
      const offsetTop = targetSection.getBoundingClientRect().top + currentScrollPos - headerHeight;

      if (offsetTop < currentScrollPos && header) {
        header.classList.remove('scroll');
      }

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});