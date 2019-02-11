ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [52.225986, 21.052012],
      zoom: 15
    }, {
      searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Nasha adressa tut',
      balloonContent: 'addres: ul. Upalna 99, 15 - 600 Białystok'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'images/fish.svg',
      // Размеры метки.
      iconImageSize: [43, 43],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [55, -148]
    });

  myMap.geoObjects
    .add(myPlacemark);
});