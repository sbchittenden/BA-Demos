// Create a utility function that allows you to create an element
// and set any attributes on that element. You should be able to
// pass to the function the type of new element to create as the
// first parameter, and an object containing the attributes to add
// as the second parameter.

function makeElement(elementType, attributeObj) {
  var newElement = document.createElement(elementType);

  for (var attr in attributeObj) {
    newElement.setAttribute(attr, attributeObj[attr]);
  }

  return newElement;
}


//====== test of makeElement function ======//
var testAttrObj = {
  class: "amazing-div",
  id: "div1",
  "data-listing": "numberTwo"
};

console.log(makeElement('div', testAttrObj));
//=========================================//
