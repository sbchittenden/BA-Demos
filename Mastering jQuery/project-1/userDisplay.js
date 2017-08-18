(function($) {
  'use strict';
  $('body').on('user-deselected', clearUserDetails);
  $('body').on('user-selected', addUserDetails);

  function addUserDetails(e, user) {
    clearUserDetails();
    let fullName = $('<div>').addClass('full-name').html(`<span class="info">Full name:</span> ${user.name}`);
    let userName = $('<div>').addClass('username').html(`<span class="info">Username:</span> ${user.username}`);
    let userEmail = $('<div>').addClass('useremail').html(`<span class="info">Email:</span> ${user.email}`);
    let userPhone = $('<div>').addClass('phone').html(`<span class="info">Phone:</span> ${user.phone}`);
    let userWebsite = $('<div>').addClass('website').html(`<span class="info">Website:</span> ${user.website}`);
    let userCompany = $('<div>').addClass('company-info');
    let userAddress = $('<div>').addClass('address');
    userCompany.html(`<p><span class="info">Company:</span> ${user.company.name}</p>
                  <p>${user.company.catchPhrase}<br>
                  <em>${user.company.bs}</em></p>`);
    if (user.address !== undefined) {
      userAddress.html(`<p><span class="info">Address:</span><br>
        ${user.address.street}<br>
        ${user.address.suite}<br>
        ${user.address.city}<br>
        ${user.address.zipcode}<br>
        latitude: ${user.address.geo.lat}<br>
        longitude: ${user.address.geo.lng}</p>`);
    }
    $('.user-details').append(fullName, userName, userEmail, userPhone, userWebsite, userAddress, userCompany);
  }

  function clearUserDetails() {
    $('.user-details').contents().remove();
  }
})(jQuery);

