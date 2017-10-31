'use strict';

function layOutDay(events) {
  events.sort(function (a, b) {
    return a.start - b.start;
  });
  var context = { 'events': addWidths(groupTimes(events)).reduce(function (a, b) {
      return a.concat(b);
    }) };
  var eventContainer = $('#cal__event-container');
  var eventTemplate = $('#event-template').html();
  var compiledTemplate = Handlebars.compile(eventTemplate);
  var calendarEvents = compiledTemplate(context);
  eventContainer.html(calendarEvents);
}

var setLeft = 0;

Handlebars.registerHelper('setEvent', function (context, options) {
  this.height = this.end - this.start + 'px';
  this.top = this.start + 'px';
  if (this.groupSize > 1) {
    this.left = this.width / 100 * 600 * setLeft + 10 + 'px';
    this.last ? setLeft = 0 : setLeft++;
  } else {
    this.left = 10 + 'px';
    setLeft = 0;
  }
  this.width = this.width / 100 * 600 + 'px';
});

function groupTimes(array) {
  var groupArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (array.length < 1) {
    return groupArr;
  }
  var counter = 1;
  for (var i = 0; i < array.length; i++) {
    if (array[i + 1] && array[i].end > array[i + 1].start) {
      counter++;
    } else {
      array[counter - 1].last = true;
      groupArr.push(array.splice(0, counter));
      return groupTimes(array, groupArr);
    }
  }
}

function addWidths(array) {
  array.forEach(function (itemArr) {
    itemArr.forEach(function (item, idx, array) {
      item.width = (100 / array.length).toFixed(4);
      item.groupSize = array.length;
    });
  });
  return array;
}