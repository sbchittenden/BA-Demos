(function() {
  'use strict';
  
  // elements that will change
  const body = document.querySelector('body');
  const message = document.querySelector('h1');

  // message lines object
  const lines = {
    salty: 'Oh. It\'s fancy pants',
    bored: 'I can\'t be bothered',
    peppy: 'Hooray! It\'s so nice to see you'
  };

  // preference elements
  const name = document.getElementById('username');
  const color = document.getElementById('color');
  const mood = document.getElementById('mood');
  const button = document.querySelector('.button');

  // functions
  const getElementValue = element => element.value;
  const clearClassNames = element => element.className = '';
  const addClass = (element, className) => element.classList.add(className);
  const removeClass = (element, className) => element.classList.remove(className);
  const getNewPreferences = () => [`${getElementValue(name)}`, `${getElementValue(color)}`, `${getElementValue(mood)}`];
  const storePreferences = (prefs, keyName) => localStorage.setItem(keyName, JSON.stringify(`${getNewPreferences()}`));
  const retrievePreferences = keyName => [...(JSON.parse(localStorage.getItem(keyName))).split(',')];
  const checkForPrefs = keyName => localStorage.getItem(keyName);
  const displayPreferences = prefs => {
    clearClassNames(body);
    name.value = prefs[0];
    message.innerHTML = `${lines[prefs[2]]} ${prefs[0]}.`;
    addClass(body, `${prefs[1]}`);
  };

  // set preferences event handler
  button.addEventListener('click', () => {
    displayPreferences(getNewPreferences());
    storePreferences(getNewPreferences(), 'userPreferences');
  });

  // load preferences from localStorage if set
  window.onload = () => {
    if (checkForPrefs('userPreferences')) {
      displayPreferences(retrievePreferences('userPreferences'));
    }
  };

})();