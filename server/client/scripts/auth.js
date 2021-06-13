const axios = require('axios');
const shajs = require('sha.js');

async function login(data) {
  try {
    const response = await axios.post('/api/login', data);
    $('.errorMessage').val(response);
  } catch (errors) {
    $('.errorMessage').val('Invalid Username or Password');
  }
}

async function register(data) {
  try {
    const response = await axios.post('/api/register', data);
    $('.errorMessage').val(response);
  } catch (errors) {
    $('.errorMessage').val('Failed to register! Please try later');
  }
}

$(function () {
  $('button > .login').submit(function () {
    this.preventDefault();
    const username = $('#modalLRInput10').val();
    const password = shajs('sha256').update($('#modalLRInput11').val()).digest('hex');
    const data = {
      username,
      password
    };
    login(data);
  });

  $('button > .register').submit(function () {
    this.preventDefault();
    const name = $('#modalLRInput12').val();
    const email = $('#modalLRInput13').val();
    const username = $('#modalLRInput14').val();
    const password = shajs('sha256').update($('#modalLRInput15').val()).digest('hex');
    const rePassword = shajs('sha256').update($('#modalLRInput16').val()).digest('hex');
    if (password === rePassword) {
      const data = {
        name,
        email,
        username,
        password
      };
      register(data);
    } else {
      $('.errorMessage').val('Password does not match');
    }
  });
});
