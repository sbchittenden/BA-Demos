(function() {
  var body = document.querySelector('body');
  var sidebar = document.querySelector('.yammy-sidebar');
  var parent = sidebar.offsetParent;

  window.addEventListener('scroll', throttleScroll(_checkSticky, 500), false);
  if (!window.matchMedia('(min-width: 796px)').matches) {
    sidebar.addEventListener('touchstart', sidebarControls, false);
    sidebar.classList.add('touch-hidden');
  }

  function _checkSticky() {
    if (window.matchMedia('(min-width: 796px)').matches) {
      var parentOffset = parent.offsetHeight;
      if (parentOffset <= body.scrollTop) {
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
    }
  }





})();

