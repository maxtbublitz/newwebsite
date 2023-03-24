const menuBtn = document.querySelector('.menu-btn');
const growNav = document.querySelector('.header');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    growNav.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    growNav.classList.remove('open');
    menuOpen = false;
  }
});