$('body').on('click', '.fa-bars', function() {
  console.log('button clicked');
  if ($('.form').hasClass('showBar')) {
    $('.form').removeClass('showBar');
  } else {
    $('.form').addClass('showBar');
  }
});
