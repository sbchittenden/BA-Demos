//Create an HTML form that has three checkboxes.
//Add a button that will check or uncheck all of the
//checkboxes depending on whether they are already
//checked or unchecked, for example, if none of the
//checkboxes are checked, clicking the button should
//check them all.

var checkAllBtn = document.querySelector('.button--check-all');
var checkboxes = document.getElementsByTagName('input');
var theForm = document.querySelector('form');

checkAllBtn.addEventListener('click', allOrNone, false);
theForm.addEventListener('change', switchBtnText, false);


function allOrNone(e) {
  e.preventDefault();
  var inputsAreChecked = false;
  var i;
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      inputsAreChecked = true;
    }
  }
  if (inputsAreChecked) {
    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].checked = false;
      checkAllBtn.innerHTML = 'Check all the boxes!';
    }
  } else {
    for (var k = 0; k < checkboxes.length; k++) {
      checkboxes[k].checked = true;
      checkAllBtn.innerHTML = 'Uncheck those boxes!';
    }
  }
}

function switchBtnText(e) {
  var inputsCheckedArray = [];
  if (e.target.nodeName === 'INPUT') {
    for (var i = 0; i < checkboxes.length; i++) {
      inputsCheckedArray.push(checkboxes[i].checked);
    }
  }
  if (inputsCheckedArray.indexOf(true) !== -1) {
    checkAllBtn.innerHTML = 'Uncheck those boxes!';
  } else {
    checkAllBtn.innerHTML = 'Check all the boxes!';
  }
}
