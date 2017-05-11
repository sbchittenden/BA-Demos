var colorBox = document.querySelector('.color-display');
var colorName = document.querySelector('.color-name');

window.addEventListener('storage', function(e) {
  console.log('storage event!', e.key, e.newValue);
  sessionStorage.setItem(e.key, e.newValue);
  colorBox.style.backgroundColor = sessionStorage.getItem('background');
  colorName.innerHTML = sessionStorage.getItem('background');
});
