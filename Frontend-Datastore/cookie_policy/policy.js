(function() {
  const cmImage = document.querySelector('.policy__image');
  const controls = document.querySelector('.checkbox__wrapper');
  const message = document.querySelector('.policy__wrapper > h1');
  const checkbox = document.getElementById('accept_policy');
  const acceptBtn = document.querySelector('.button');
  const popup = document.querySelector('.popup');

  let cookies = getCookies();

  if (checkPolicy(cookies)) {
    cmImage.src = 'veggiemonster.png';
    message.innerHTML = 'Aha! Me see you have cookie! Can me trade you?';
    controls.classList.add('--is-hidden');
    acceptBtn.classList.add('--is-hidden');
  } else {
    acceptBtn.addEventListener('click', () => {
      if (checkbox.checked) {
        if (popup.classList.contains('--is-alerting')) {
          popup.classList.remove('--is-alerting')
        }
        setCookie();
        return;
      } else {
        popup.classList.add('--is-alerting');
        return;
      }
    });
  }


  function setCookie() {
    document.cookie = 'only_veggies=true;max-age=90000000';
    message.innerHTML = 'OK! Me think you make good decision. Veggies are better choice.';
    controls.classList.add('--is-hidden');
    acceptBtn.classList.add('--is-hidden');
  }

  function checkPolicy(cookieObj) {
    for (let cookie in cookieObj) {
      if (cookie === 'only_veggies') {
        return true;
      }
      return false;
    }
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
