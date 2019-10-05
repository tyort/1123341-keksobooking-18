/* eslint-disable no-console */
'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var ENTER_KEYCODE = 13;
  var cardGlobal = document.querySelector('.map'); // область изображения карты
  var templateWindow = document.querySelector('#card').content.querySelector('article');
  var templateMarker = document.querySelector('#pin').content.querySelector('button');
  cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));
  window.load(successHandler, errorHandler);

  function renderHouse(houseUnit) {
    var element = templateMarker.cloneNode(true);
    element.style.left = houseUnit.location.x + 'px';
    element.style.top = houseUnit.location.y + 'px';
    element.getElementsByTagName('img')[0].src = houseUnit.author.avatar;
    return element;
  }

  function successHandler(houses) {
    var fragmentMarker = document.createDocumentFragment();
    for (var i = 0; i < houses.length; i++) {
      fragmentMarker.appendChild(renderHouse(houses[i]));
    }
    mapPins.appendChild(fragmentMarker);
  }

  function errorHandler() {
    var templateError = document.querySelector('#error').content.querySelector('div');
    var node = templateError.cloneNode(true);
    document.getElementsByTagName('main')[0].insertAdjacentElement('afterbegin', node);
    return node;
  }

  window.data = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    cardGlobal: cardGlobal,
    adForm: adForm,
    mapPins: mapPins,
  };
})();

