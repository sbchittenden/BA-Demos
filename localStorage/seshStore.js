var colorDisplay = document.querySelector('.color-display');
var redBtn = document.getElementById('red');
var blueBtn = document.getElementById('blue');

redBtn.addEventListener('click', changeColor);
blueBtn.addEventListener('click', changeColor);


if (localStorage.length <= 0) {
  populateStorage();
} else {
  updateColor();
}

function populateStorage() {
  localStorage.setItem('background', colorDisplay.style.backgroundColor);
  updateColor();
}

function updateColor() {
  var color = localStorage.getItem('background');
  colorDisplay.style.backgroundColor = color;
}

function changeColor(e) {
  var color = e.target.id;
  localStorage.setItem('background', color);
  updateColor();
}