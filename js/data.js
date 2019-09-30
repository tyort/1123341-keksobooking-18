/* eslint-disable no-console */
'use strict';

(function () {
  var BUILDINGS = [];
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var TITLES = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
  var typesObj = ['palace', 'flat', 'house', 'bungalo'];
  var featuresObj = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var describObj = ['Проводим вечеринки', 'Здесь тусовался Ельцин', 'Подходит бедным и богатым', 'Работаем круглосуточно, приходи под утро'];
  var photosObj = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ENTER_KEYCODE = 13;
  var cardGlobal = document.querySelector('.map'); // область изображения карты
  var templateWindow = document.querySelector('#card').content.querySelector('article');
  cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));

  for (var i = 0; i < 8; i++) {
    BUILDINGS.push(generateOffer(i));
  }

  function generateOffer(index) {
    var locationX = getRandomNumber(50, 1100);
    var locationY = getRandomNumber(130, 630);
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },
      'offer': {
        'title': TITLES[index],
        'address': '' + locationX + ', ' + locationY + '',
        'price': getRandomNumber(1000, 10000),
        'type': getRandomItem(typesObj),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 3),
        'checkin': getRandomItem(['12:00', '13:00', '14:00']),
        'checkout': getRandomItem(['12:00', '13:00', '14:00']),
        'features': getRandomArray(featuresObj, []),
        'description': getRandomItem(describObj),
        'photos': getRandomArray(photosObj, [])
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomItem(Array) {
    var index = Math.floor(Math.random() * Array.length);
    var randomItem = Array[index];
    return randomItem;
  }

  function getRandomArray(ArrayOne, ArrayTwo) {
    for (var k = 0; k < getRandomNumber(0, ArrayOne.length); k++) {
      ArrayTwo.push(ArrayOne[k]);
    }
    return ArrayTwo;
  }

  window.data = {
    BUILDINGS: BUILDINGS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    cardGlobal: cardGlobal,
    adForm: adForm,
    mapPins: mapPins,
    featuresObj: featuresObj,
    photosObj: photosObj
  };
  // console.log(BUILDINGS);
})();


