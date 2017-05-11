var colorDisplay = document.querySelector('.color-display');
var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');

redBtn.addEventListener('click', changeColor);
blueBtn.addEventListener('click', changeColor);


if (sessionStorage.length <= 0) {
  populateStorage();
} else {
  updateColor();
}

function populateStorage() {
  sessionStorage.setItem('background', colorDisplay.style.backgroundColor);
  updateColor();
}

function updateColor() {
  var color = sessionStorage.getItem('background');
  colorDisplay.style.backgroundColor = color;
}

function changeColor(e) {
  var color = e.target.id;
  sessionStorage.setItem('background', color);
  updateColor();
}