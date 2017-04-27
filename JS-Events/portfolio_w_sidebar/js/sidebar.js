(function() {
  var body = document.querySelector('body');
  var sidebar = document.querySelector('.yammy-sidebar');
  var parentOffset = sidebar.offsetParent.offsetHeight
  window.addEventListener('scroll', throttle(_checkSticky, 500), false);

  function _checkSticky() {
    if (parentOffset <= body.scrollTop) {
      console.log('start sticking');
      sidebar.classList.add('--is-stuck');
    } else {
      if (sidebar.classList.contains('--is-stuck')) {
        sidebar.classList.remove('--is-stuck');
      }
    }
  }


function throttle(callback, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      callback();
      time = Date.now();
    }
  }
}





})();
