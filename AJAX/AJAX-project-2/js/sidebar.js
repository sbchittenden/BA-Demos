(function() {
  var bodyEl = document.querySelector('body');
  var sidebar = document.querySelector('.yammy-sidebar');
  var navbar = document.querySelector('.main-navigation');
  var aboutH1 = document.querySelector('#about > .section__content > h1');
  var parent = sidebar.offsetParent;
  console.log(parent, aboutH1);

  window.addEventListener('scroll', throttleScroll(_checkSticky, 250), false);
  window.addEventListener('scroll', _checkSticky, false);
  if (!window.matchMedia('(min-width: 796px)').matches) {
    sidebar.addEventListener('touchstart', sidebarControls, false);
    sidebar.classList.add('touch-hidden');
  }

  function _checkSticky() {
    if (window.matchMedia('(min-width: 796px)').matches) {
      if (sidebar.getBoundingClientRect().top <= -document.body.getBoundingClientRect().top - (parent.scrollHeight - aboutH1.scrollHeight)) {
        console.log('start sticking');
        sidebar.classList.add('--is-stuck');
      } else {
        if (sidebar.classList.contains('--is-stuck')) {
          sidebar.classList.remove('--is-stuck');
        }
      }
    }
  }


  function sidebarControls(e) {
    console.log(e, e.target);
    if (!sidebar.classList.contains('touch-expand')) {
      sidebar.classList.add('touch-expand');
    } else {
      sidebar.classList.remove('touch-expand');
    }
  }

  function throttleScroll(callback, throttleTime) {
    var currentTime = Date.now();
    return function() {
      if ((currentTime + throttleTime - Date.now()) < 0) {
        callback();
        currentTime = Date.now();
      }
    };
  }





})();

