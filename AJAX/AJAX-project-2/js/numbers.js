(function() {
  'use strict';

  const numberDisplay = document.querySelector('.number-fact__display > h1');
  const triviaDisplay = document.querySelector('.number-fact__display > p');
  const numberBtn = document.querySelector('.number-button');

  numberBtn.addEventListener('click', getNumberFact);

  function getNumberFact() {
    let number = Math.floor(Math.random() * 200);
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.response);
        numberDisplay.innerHTML = data.number;
        triviaDisplay.innerHTML = data.text;
      } else {
        numberDisplay.innerHTML = 'Oops!';
        triviaDisplay.innerHTML = 'Something went horribly wrong. Please try again!';
      }
    };
    xhr.open('GET', `https://numbersapi.p.mashape.com/${number}/trivia?json=true&mashape-key=zFmAAxQF1WmshshXs6YdlJtfUoPSp154SOOjsnFLUn1g5TrPRn`);
    xhr.send();
  }

  // random fact on initial page load
  getNumberFact();
})();

