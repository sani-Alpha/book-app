$(function () {
  $('.body').load('./pages/library.html');

  $('.nav-item > .library').click(function () {
    $('.body').load('./pages/library.html');
  });

  $('.nav-item > .about').click(function () {
    $('.body').load('./pages/about.html');
  });

  $('.nav-item > .addbook').click(function () {
    $('.body').load('./pages/addBook.html');
  });

  $('.nav-item > .authors').click(function () {
    $('.body').load('./pages/authors.html');
  });

  $('.nav-item').click(function () {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
  });

  $('.home').click(function () {
    window.location.reload();
  });

  $('.login-register').click(function () {
    $('.forModal').load('./pages/auth.html #modalLRForm', function () {
      $('#modalLRForm').modal({
        keyboard: true,
        focus: true
      });
    });
  });
});
