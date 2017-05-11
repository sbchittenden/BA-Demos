var colorBox = document.querySelector('.color-display');
var colorName = document.querySelector('.color-name');

window.addEventListener('storage', function(e) {
  console.log('storage event!', e.key, e.newValue);
  localStorage.setItem(e.key, e.newValue);
  colorBox.style.backgroundColor = localStorage.getItem('background');
  colorName.innerHTML = localStorage.getItem('background');
});
