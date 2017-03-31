//Create a function that accepts an array of selected HTML
//elements and appends them all to a new container. When 
//appending the new elements, you may only access the DOM once.

var hOne = document.querySelector('h1');
var pGraphs = document.querySelectorAll('p');
var hTwo = document.querySelector('h2');
var body = document.querySelector('body');

var elementArray = [hOne, pGraphs[0], hTwo, pGraphs[1]];

// appending function
function appendFragment(elements) {
  var newFragment = document.createDocumentFragment();
  var newContainer = document.createElement('div');
  newContainer.className = 'new';

  elements.forEach(function(item){
    newContainer.appendChild(item);
  });

  newFragment.appendChild(newContainer);
  console.log(newFragment);
  body.appendChild(newFragment);
}

// call appendFragment
appendFragment(elementArray);