$(document).ready(() => {

  // position != top, to the top button shows
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('#toTheTop').fadeIn();
    } else {
      $('#toTheTop').fadeOut();
    }
  });
  $("#toTheTop").on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });
});