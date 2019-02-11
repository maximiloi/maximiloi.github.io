$(document).ready(function () {

  var owl = $('.owl-carousel').owlCarousel({
    loop: true,
    dots: false,
    nav: false,
    items: 4,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
  });
  owl.owlCarousel();
  $('.next').click(function () {
    owl.trigger('next.owl.carousel');
  });
  $('.prev').click(function () {
    owl.trigger('prev.owl.carousel', [300]);
  });

});