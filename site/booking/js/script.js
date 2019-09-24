
var typed = new Typed('.header__title', {
  strings: ["Проведите луший отпуск в нашем отеле.", "Забронируйте номер прямо сейчас."],
  typeSpeed: 50,
  loop: true,
  showCursor: false
});

$.validate({
  lang: 'ru',
  modules: 'location'
});