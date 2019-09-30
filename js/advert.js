'use strict';

(function () {
  // eslint-disable-next-line object-curly-spacing
  var TYPES_TEXTS_MAP = { 'palace': 'дворец', 'flat': 'квартира', 'house': 'дом', 'bungalo': 'бунгало' };
  var mapCard = document.querySelector('.map__card');

  for (var j = 0; j < window.data.BUILDINGS.length; j++) {
    addPinClickHandler(window.data.mapPins.children[j + 2], window.data.BUILDINGS[j]);
  }

  function addPinClickHandler(pin, building) {
    pin.addEventListener('click', function () {
      mapCard.children[8].innerHTML = '';
      mapCard.children[10].innerHTML = '';
      mapCard.children[0].src = building.author.avatar;
      mapCard.children[2].textContent = building.offer.title;
      mapCard.children[3].textContent = building.offer.address;
      mapCard.children[4].textContent = building.offer.price + ' ₽/ночь';
      mapCard.children[5].textContent = TYPES_TEXTS_MAP[building.offer.type];
      mapCard.children[6].textContent = generateRoomsGuests(building.offer.rooms, building.offer.guests);
      mapCard.children[7].textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
      generateFeatures(mapCard.children[8], building.offer.features.length);
      mapCard.children[9].textContent = building.offer.description;
      generatePhotos(mapCard.children[10], building.offer.photos.length);
    });
  }

  function generateRoomsGuests(rooms, guests) {
    var part = 'а';
    if (rooms > 1 && rooms < 5) {
      part = 'ы';
    }
    if (rooms >= 5) {
      part = '';
    }
    var partTwo = 'я';
    if (guests > 1) {
      partTwo = 'ей';
    }
    return rooms + ' комнат' + part + ' для ' + guests + ' гост' + partTwo;
  }
  // создание тегов li
  function generateFeatures(list, length) {
    for (var k = 0; k < length; k++) {
      var newElement = document.createElement('li');
      newElement.className = 'popup__feature popup__feature--' + window.data.featuresObj[k];
      list.appendChild(newElement);
    }
    return list.children;
  }
  // создание тегов img
  function generatePhotos(list, length) {
    for (var p = 0; p < length; p++) {
      var newElement = document.createElement('img');
      newElement.setAttribute('src', window.data.photosObj[p]);
      newElement.className = 'popup__photo';
      newElement.setAttribute('width', 45);
      newElement.setAttribute('height', 40);
      newElement.setAttribute('alt', 'Фотография жилья');
      list.appendChild(newElement);
    }
    return list.children;
  }
})();

