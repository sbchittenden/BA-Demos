(function() {
  'use strict';

  const goBtn = document.getElementById('go');
  const cautionBtn = document.getElementById('caution');
  const stopBtn = document.getElementById('stop');
  const buttons = document.querySelector('.buttons');
  let bulbs = document.querySelectorAll('.bulb');


  buttons.addEventListener('click', activateLight);
  window.addEventListener('storage', function(e) {
    console.log('change detected');
    localStorage.setItem(e.key, e.newValue);
    syncLights();
  });

  if (localStorage.length <= 0) {
    setStorage();
  } else {
    console.log("Yay");
    syncLights();
  }

  function setStorage() {
    localStorage.setItem('go', bulbs[0].style.backgroundColor);
    localStorage.setItem('caution', bulbs[1].style.backgroundColor);
    localStorage.setItem('stop', bulbs[2].style.backgroundColor);
  }

  function activateLight(e) {
    var id = e.target.id;
    switch (id) {
      case 'go':
        localStorage.setItem(id, 'green');
        break;
      case 'caution':
        localStorage.setItem(id, 'yellow');
        break;
      case 'stop':
        localStorage.setItem(id, 'red');
        break;
    }
    syncLights();
  }

  function syncLights() {
    console.log('syncLights called');
    bulbs[0].style.backgroundColor = localStorage.getItem('go');
    bulbs[1].style.backgroundColor = localStorage.getItem('caution');
    bulbs[2].style.backgroundColor = localStorage.getItem('stop');
  }

})();
