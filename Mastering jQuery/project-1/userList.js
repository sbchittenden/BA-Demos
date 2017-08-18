(function($) {
  'use strict';
  let $userList = $('.user-list');
  let userData;
  $.ajax('data/users.json', {
    success: function(data) {
      data.forEach(obj => {
        let $user = $('<div>').addClass('user');
        let $name = $('<div>').addClass('name');
        let $email = $('<p>').addClass('email');
        $name.text(obj.name).appendTo($user);
        $email.text(obj.email).appendTo($user);
        $user.appendTo($userList);
      });
      setData(data);
      addListeners();
    },
    error: function(status) {
      console.log('error: ', status);
    },
    complete: function() {
      console.log('complete');
      if (userData) {
        userData
        .filter(obj => obj.address)
        .map(obj => obj.name)
        .forEach(name => {
          $(`.name:contains(${name})`).addClass('has-address');
        });
        $('.user > .name')
        .filter('.has-address')
        .parent()
        .remove()
        .prependTo($('.user-list'));
      }
    }
  });
  // setData function
  function setData(data) {
    userData = data;
  }

  // addListeners function
  function addListeners() {
    $userList.on('click', '.name', selectedHandler);
    $('.clear-btn').on('click', clearSelection);
  }

  function selectedHandler(e) {
    let $target = $(e.target);
    $('.highlight').removeClass('highlight');
    if ($target.hasClass('selected')) {
      $target.removeClass('selected');
      $target.trigger('user-deselected');
    } else {
      $('.selected').removeClass('selected');
      $target.addClass('selected');
      $target.parent().addClass('highlight');
      let user = userData.filter(obj => obj.name === $target.text());
      $target.trigger('user-selected', user);
    }
  }

  function clearSelection(e) {
    let $target = $(e.target);
    $target.trigger('user-deselected');
    $('.highlight').removeClass('highlight');
    $('.selected').removeClass('selected');
  }
})(jQuery);

