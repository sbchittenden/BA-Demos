var app = (function() {

  //className must be entered with the leading '.' character
  function removeClass(className) {
    var stylesheets = document.styleSheets;

    var stylesheetsLength = stylesheets.length;

    for (var i = 0; i < stylesheetsLength; i++) {
      for (var x = 0; x < stylesheets[i].cssRules.length; x++) {
        console.log(stylesheets[i].cssRules[x].selectorText);
        if ((stylesheets[i].cssRules[x].selectorText).indexOf(className) !== -1) {
          stylesheets[i].deleteRule(x);
        }
      }
    }
  }

  function addSomeStyle() {
    var stylesheets = document.styleSheets;
    var newStyles = document.createElement('style');

    document.head.appendChild(newStyles);

    var newSheet = newStyles.sheet;

    newSheet.insertRule('section:nth-of-type(2) > h1 {color: magenta;}', newSheet.cssRules.length);
    newSheet.insertRule('section:nth-of-type(1) > p {line-height: 2.5; font-size: 1.3em; width: 24.5em;}', newSheet.cssRules.length);
    newSheet.insertRule('section:nth-of-type(1) > .subheader {color: orange; text-align: right;}', newSheet.cssRules.length);
    newSheet.insertRule('section:nth-of-type(2) > p {padding: 3em; transform: rotate(-15deg);}', newSheet.cssRules.length);
    newSheet.insertRule('main {border: dotted 3px yellow; padding: 1em 2em 5em 2em;}', newSheet.cssRules.length);
    newSheet.insertRule('@keyframes flash {from{opacity: 1;}to{opacity:0}}', newSheet.cssRules.length);
    newSheet.insertRule('section:nth-of-type(1) > h1 {text-align: center; font-size: 8em; animation: flash infinite 2s ease}', newSheet.cssRules.length);

  }


  return {
    removeClass: removeClass,
    addSomeStyle: addSomeStyle
  };

})();

