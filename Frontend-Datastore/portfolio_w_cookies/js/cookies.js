(function() {
  'use strict';
  let greeting = document.querySelector('.greeting');
  const docCookies = getCookies();

  if (docCookies.previousVisit == undefined) {
  document.cookie = 'previousVisit=true;max-age=5260000';
  } else {
    greeting.innerHTML = 'I know you!<a href="#about"></a>';
  }

  function getCookies() {
    var cookieArray = document.cookie.split(';');
    var cookieObj = {};
    cookieArray.forEach(function(item) {
      var key = item.substring(0, item.indexOf('='));
      var value = item.substring(item.indexOf('=') + 1);
      cookieObj[key] = value;
    });
    return cookieObj;
  }

})();
