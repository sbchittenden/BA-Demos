(function() {
  const form = document.getElementById('sign_up_form');
  const firstName = document.getElementById('first_name');
  const lastName = document.getElementById('last_name');
  const email = document.getElementById('email');
  const dob = document.getElementById('date_of_birth');
  const psw = document.getElementById('password');
  const submit = document.getElementById('submit');
  const successDiv = document.querySelector('.success_message');

  form.addEventListener('submit', function(e) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('email', email.value);
    formData.append('DOB', dob.value);
    formData.append('password', psw.value);

    xhr.onload = function() {
      successDiv.innerHTML = JSON.parse(xhr.response).data;
    };

    xhr.open('POST', '/create_account');
    xhr.send(formData);

    e.preventDefault();
  });
})();

