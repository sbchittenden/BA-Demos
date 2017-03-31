(function(){
  var paragraphs;
  var bodyEl;
  var aside;
  var newP;
  var citation;
  var pullText;
  var pullTextContents;

  paragraphs = document.getElementsByTagName('p');
  bodyEl = document.getElementsByTagName('body')[0];
  aside = document.createElement('aside');
  newP = document.createElement('p');
  citation = document.createElement('cite');
  pullText = document.createRange();

  pullText.setStart(paragraphs[paragraphs.length - 1].firstChild, 600);
  pullText.setEnd(paragraphs[paragraphs.length - 1].firstChild, 960);

  pullTextContents = pullText.cloneContents();

  newP.appendChild(pullTextContents);

  aside.appendChild(newP);

  citation.innerHTML = '- Edmund Dantes';

  aside.appendChild(citation);
  bodyEl.appendChild(aside);

})();
