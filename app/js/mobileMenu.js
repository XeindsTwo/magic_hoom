export function setupMobileMenu() {
  const html = document.documentElement;
  const menuBtn = document.querySelector('.menu-btn');
  const headerMobile = document.querySelector('.header__mobile');
  const anchors = document.querySelectorAll('a.mobile');
  const header = document.querySelector(".header");

  menuBtn.addEventListener('click', () => {
    menuBtn.blur();
    toggleMenu();
  });

  function toggleMenu() {
    html.classList.toggle('active');
    document.body.classList.toggle('active');
    menuBtn.classList.toggle('active');
    headerMobile.classList.toggle('active');
  }

  function scrollToTarget(link) {
    header.classList.remove('scroll');

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 10;

      toggleMenu();

      setTimeout(() => {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }, 500);
    }
  }

  function handleAnchorClick(event) {
    event.preventDefault();
    scrollToTarget(this);
  }

  function closeMenu() {
    if (html.classList.contains('active')) {
      toggleMenu();
    }
  }

  function handleClickOutside(event) {
    if (!headerMobile.contains(event.target) && !menuBtn.contains(event.target) && !header.contains(event.target)) {
      closeMenu();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }

  for (const anchor of anchors) {
    anchor.addEventListener('click', handleAnchorClick);
    anchor.addEventListener('touchstart', handleAnchorClick, { passive: true });
  }

  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
}