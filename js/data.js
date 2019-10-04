/* eslint-disable no-console */
'use strict';

(function () {
  var BUILDINGS = [];
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var ENTER_KEYCODE = 13;
  var cardGlobal = document.querySelector('.map'); // область изображения карты
  var templateWindow = document.querySelector('#card').content.querySelector('article');
  var templateMarker = document.querySelector('#pin').content.querySelector('button');
  var fragmentMarker = document.createDocumentFragment();
  cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));
  window.load(successHandler, errorHandler);

  for (var i = 0; i < BUILDINGS.length; i++) {
    renderMarker(templateMarker.cloneNode(true), BUILDINGS[i]);
  }
  console.log(BUILDINGS);
  console.log(templateMarker);
  console.log(BUILDINGS[3]); //todo
  mapPins.appendChild(fragmentMarker);

  function renderMarker(ObjMarker, apartment) {
    ObjMarker.style = apartment.offer.address;
    ObjMarker.children[0].src = apartment.author.avatar;
    ObjMarker.children[0].alt = apartment.offer.title;
    fragmentMarker.appendChild(ObjMarker);
  }

  function successHandler(houses) {
    for (var j = 0; j < houses.length; j++) {
      BUILDINGS.push(houses[j]);
    }
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.data = {
    BUILDINGS: BUILDINGS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    cardGlobal: cardGlobal,
    adForm: adForm,
    mapPins: mapPins,
    featuresObj: '',
    photosObj: ''
  };
})();


