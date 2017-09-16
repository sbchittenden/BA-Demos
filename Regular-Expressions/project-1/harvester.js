window.harvester = (function() {

  function harvestExternalLinksAndEmails(input) {

    var linkPattern;
    var emailPattern;
    var linksArray;
    var emailArray;
    var trimmedLinks;
    var linkInner;
    var trimmedEmail;
    var linkCombo;
    var i;

    linkPattern = /(?:(?:\bhref=(?:"|')(?:(?:http:\/\/)|(?:https:\/\/))(?:\w*)\.(?:(?:\w{2,4})|(?:\w{2}\.\w{2}))(?:"|'))>(?:(?:\w*)|(?:(?:(?:\w*\s)*){1,}\w*))<\/a>)/g;
    emailPattern = /(?:href=("|')mailto:)((\w+@\w+\.\w{2,4})("|'))/g;

    linksArray = input.match(linkPattern);
    console.log(linksArray);
    emailArray = input.match(emailPattern);
    console.log(emailArray);

    trimmedLinks = linksArray ? linksArray.map(_getHref) : [];
    linkInner = linksArray ? linksArray.map(_getLinkText) : [];
    trimmedEmail = emailArray ? emailArray.map(_trimEmail) : [];

    linkCombo = [];

    for (i = 0; i < trimmedLinks.length; i++) {
      linkCombo.push(_makeLinkObj(linkInner[i], trimmedLinks[i]));
    }

    return {
      links: linkCombo,
      emailAddresses: trimmedEmail
    };

  }

  function _getHref(item) {
    let pattern = /('|")>/;
    let end = item.search(pattern);
    return item.substring(6, end);
  }

  function _getLinkText(item) {
    var start = item.indexOf('>') + 1;
    var end = item.indexOf('<');
    return item.substring(start, end);
  }

  function _trimEmail(item) {
    var end = item.length - 1;
    return item.substring(13, end);
  }

  function _makeLinkObj(inner, link) {
    return {
      linkText: inner,
      url: link
    };
  }


  return {
    harvestExternalLinksAndEmails: harvestExternalLinksAndEmails
  };

})();

