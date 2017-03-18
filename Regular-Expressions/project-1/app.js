(function(harvester) {

  var inputArea = document.getElementById('harvesterTxtArea');
  var harvestButton = document.querySelector('.harvester__button-container');
  var resultsArea = document.querySelector('.harvester__results-container');
  var resultsLinkList = document.querySelector('.harvester__links-list');
  var resultsEmailList = document.querySelector('.harvester__email-list');
  var listHeaders = document.querySelectorAll('.harvester__list-header');
  var go = document.getElementById('go');
  var reset = document.getElementById('reset');
  var files = document.getElementById('file');
  var clearAll = false;

  harvestButton.addEventListener('click', _harvest);

  files.addEventListener('change', function() {
    var fileToHarvest = files.files[0];
    var fileReader = new FileReader();
    fileReader.readAsText(fileToHarvest);
    fileReader.onload = function(){
      var readFile = fileReader.result;
      inputArea.value = readFile;
    };

  });

  function _harvest() {
    if (!clearAll) {
      var results = _getResults();
      var links = results.links;
      var emails = results.emailAddresses;

      emailListItems = emails.map(_makeListItem);
      linkListItems = links.map(_makeListItem);

      _populateList(resultsEmailList, emailListItems);
      _populateList(resultsLinkList, linkListItems);

      setTimeout(_fadeIn, 0, listHeaders[0]);
      setTimeout(_fadeIn, 200, resultsLinkList);
      setTimeout(_fadeIn, 400, listHeaders[1]);
      setTimeout(_fadeIn, 600, resultsEmailList);

      _toggleButtons();

      inputArea.setAttribute('disabled', true);

      clearAll = true;

    } else {
      _toggleButtons();
      _resetHarvester();
    }
  }

  function _fadeIn(el) {
    el.style.opacity = 1;
  }

  function _fadeOut(el) {
    el.style.opacity = 0;
  }

  function _getResults(e) {
    var input = inputArea.value;

    return harvester.harvestExternalLinksAndEmails(input);
  }

  function _makeListItem(item) {
    var listItem = document.createElement('li');
    if (typeof item === 'object') {
      listItem.innerHTML = 'Link: <span class="u--bold">' + item.url + '</span> Link text: <span class="u--bold">' + item.linkText + '</span>';
    } else {
      listItem.innerHTML = '<span class="u--bold">' + item + '</span>';
    }
    return listItem;
  }

  function _populateList(list, listItems) {
    var len = listItems.length;
    var emptyLi = document.createElement('li');
    var i;

    if (len > 0) {
      for (i = 0; i < listItems.length; i++) {
        list.appendChild(listItems[i]);
      }
    } else {
      emptyLi.innerHTML = 'Nothing!';
      list.appendChild(emptyLi);
    }
  }

  function _resetHarvester() {
    
    setTimeout(_fadeOut, 700, listHeaders[0]);
    setTimeout(_fadeOut, 500, resultsLinkList);
    setTimeout(_fadeOut, 300, listHeaders[1]);
    setTimeout(_fadeOut, 0, resultsEmailList);
    setTimeout(function() {
      resultsLinkList.innerHTML = '';
      resultsEmailList.innerHTML = '';
    }, 900);

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

})(harvester);

