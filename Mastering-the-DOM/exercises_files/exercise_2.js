//Create an HTML page that has a single paragraph of text on it 
//that contains an empty span element with text both before and
//after it. Remove the empty span programmatically; then, 
//convert the text contents into a single text node.

var paragraph = document.querySelector('p');
var span = paragraph.querySelector('span');
paragraph.removeChild(span);
paragraph.normalize();