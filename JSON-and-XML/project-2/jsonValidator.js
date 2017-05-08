window.jsonValidator = (function() {

  function patternMatchInput(input) {

    input = input.trim();

    var startsWithCurlyBrace = input.indexOf('{') === 0;
    // console.log('starts with curly brace: ', startsWithCurlyBrace);

    var endsWithCurlyBrace = input.lastIndexOf('}') === input.length - 1;
    // console.log('ends with curly brace', endsWithCurlyBrace);

    var stringPattern = /"\w*":\s*"\w*,?(\s*\w*,?)*",?/;
    var booleanPattern = /"\w*":\s*(?:(?:true\b)|(?:false\b)),?/;
    var numberPattern = /"\w*":\s*\d+,?/;
    var arrayPattern = /"\w*"\s*:\s*\[.*\],?/;
    var objectPattern = /"\w*"\s*:\s*\{.*\},?/;

    var inputArray = input.split('\n');
    // console.log('input array: ', inputArray);

    var inputArrayLimit = inputArray.length > 1 ? inputArray.length - 1 : inputArray.length;
    // console.log('inputArray length: ', inputArray.length);
    // console.log('inputArrayLimit: ', inputArrayLimit);

    var testResults = [];
    var currentItem;
    var isString;
    var isBool;
    var isNum;
    var isArr;
    var isObj;
    var validStatus;
    var i;

    for (i = 1; i < inputArrayLimit; i++) {

      isBool = booleanPattern.test(inputArray[i]);
      isNum = numberPattern.test(inputArray[i]);
      isString = stringPattern.test(inputArray[i]);
      isArr = arrayPattern.test(inputArray[i]);
      isObj = objectPattern.test(inputArray[i]);
      hasComma = inputArray[i].charAt(inputArray[i].length - 1) === ',';

      if (i === inputArrayLimit - 1) {
        hasComma = inputArray[i].charAt(inputArray[i].length - 1) !== ',';
      }

      // console.log(i + ' isString = ' + isString);
      // console.log(i + ' isBool = ' + isBool);
      // console.log(i + ' isNum = ' + isNum);
      // console.log(i + ' isArr = ' + isArr);
      // console.log(i + ' isObj = ' + isObj);
      // console.log(i + ' hasComma = ' + hasComma);

      if ((isString || isBool || isNum || isArr || isObj) && hasComma) {
        testResults.push(true);
      } else {
        testResults.push(false);
      }

    }

    if (testResults.indexOf(false) === -1 && startsWithCurlyBrace && endsWithCurlyBrace) {
      validStatus = true;
    } else {
      validStatus = false;
    }


    return validStatus;

  }

  return {
    patternMatchInput: patternMatchInput
  };


})();
