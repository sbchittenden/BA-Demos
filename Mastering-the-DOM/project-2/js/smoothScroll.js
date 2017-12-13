var offCanvasNav = document.querySelector('.nav-off-canvas__main-menu');
var mainNav = document.querySelector('.main-navigation');
var greetingArrow = document.querySelector('.greeting > a[href="#about"]');
var bodyEl = document.querySelector('body');
var toTopBtn = document.querySelector('.toTop');
var scrollInterval;

mainNav.addEventListener('click', smoothScroll, false);
greetingArrow.addEventListener('click', smoothScroll, false);
toTopBtn.addEventListener('click', toTop, false);
window.addEventListener('scroll', checkTop, false);

function checkTop() {
  if (bodyEl.parentElement.scrollTop > 5) {
    toTopBtn.style.pointerEvents = 'auto';
    toTopBtn.style.opacity = 1;
  } else {
    toTopBtn.style.pointerEvents = 'none';
    toTopBtn.style.opacity = 0;
    clearInterval(scrollInterval);
  }
}

function toTop() {
  scrollUp(0);
  toTopBtn.style.pointerEvents = 'none';
  toTopBtn.style.opacity = 0;
}

function smoothScroll(e) {
  if (e.target.nodeName === 'A') {
    e.preventDefault();
    var targetId = e.target.hash.slice(1);
    var scrollTarget = document.getElementById(targetId);
    var offset;
    if (scrollTarget) {
    offset = Math.round(scrollTarget.offsetTop - mainNav.offsetHeight * 0.6);
    console.log('offset in smoothScroll: ', offset);
    }
    if (offset - bodyEl.parentElement.scrollTop > 5) {
      scrollDown(offset);
    } else {
      scrollUp(offset);
    }
  }
}

function scrollDown(offset) {

    scrollInterval = setInterval(() => {
      bodyEl.parentElement.scrollTop += 10;
      if (offset - bodyEl.parentElement.scrollTop <= 5) {
        console.log('interval cleared!');
        clearInterval(scrollInterval);
      }
    }, 1);
}

function scrollUp(offset) {
  scrollInterval = setInterval(() => {
    bodyEl.parentElement.scrollTop -= 10;
    if (offset - bodyEl.parentElement.scrollTop >= 5) {
      clearInterval(scrollInterval);
    }
  }, 1);
}

