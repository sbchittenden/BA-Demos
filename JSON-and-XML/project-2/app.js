(function(jsonValidator) {

  var inputArea = document.getElementById('validatorTxtArea');
  var validateButton = document.querySelector('.validator__button-container');
  var resultsArea = document.querySelector('.validator__results-container');
  var statusHeader = document.querySelector('.validator__status');
  var go = document.getElementById('go');
  var reset = document.getElementById('reset');
  var files = document.getElementById('file');
  var clearAll = false;

  validateButton.addEventListener('click', _validateInput);

  files.addEventListener('change', function() {

    var fileToHarvest = files.files[0];
    var fileReader = new FileReader();

    fileReader.readAsText(fileToHarvest);

    fileReader.onload = function(){
      var readFile = fileReader.result;
      inputArea.value = readFile;
    };

  });

  function _validateInput() {

    if (!clearAll) {

      var validStatus = _getStatus();

      if (validStatus) {
        statusHeader.innerHTML = 'valid JSON string!';
        statusHeader.style.backgroundColor = 'rgba(186, 218, 85, 0.1)';
        statusHeader.style.border = 'solid 1px #bada55';
        statusHeader.style.color = '#bada55';
      } else {
        statusHeader.innerHTML = 'INVALID JSON string...';
        statusHeader.style.backgroundColor = 'rgba(231, 76, 60, 0.3)';
        statusHeader.style.border = 'solid 1px #e74c3c';
        statusHeader.style.color = '#e74c3c';
      }

      _fadeIn(statusHeader);

      _toggleButtons();

      inputArea.setAttribute('disabled', true);

      clearAll = true;

    } else {
      _toggleButtons();
      _resetValidator();
    }
  }

  function _fadeIn(el) {
    el.style.opacity = 1;
  }

  function _fadeOut(el) {
    el.style.opacity = 0;
  }

  function _getStatus(e) {
    // var input = inputArea.value.replace(/\s/g, '');
    var input = inputArea.value;
    return jsonValidator.patternMatchInput(input);
  }

  function _resetValidator() {
    _fadeOut(statusHeader);
    inputArea.value = '';
    inputArea.removeAttribute('disabled');
    files.files[0] = {};
    clearAll = false;
  }

  function _toggleButtons() {
    go.classList.toggle('btn--hidden');
    go.classList.toggle('btn--active');
    reset.classList.toggle('btn--active');
    reset.classList.toggle('btn--hidden');
  }

})(window.jsonValidator);

