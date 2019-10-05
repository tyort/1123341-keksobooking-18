'use strict';

(function () {
  // eslint-disable-next-line object-curly-spacing
  var TYPES_TEXTS_MAP = { 'palace': 'дворец', 'flat': 'квартира', 'house': 'дом', 'bungalo': 'бунгало' };
  var mapCard = document.querySelector('.map__card');

  window.load(successHandler, '');

  function successHandler(houses) {
    for (var i = 0; i < houses.length; i++) {
      addPinClickHandler(window.data.mapPins.children[i + 2], houses[i]);
    }
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
      getFeaturesToDOM(mapCard.children[8], building.offer.features);
      mapCard.children[9].textContent = building.offer.description;
      getPhotosToDOM(mapCard.children[10], building.offer.photos);
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

  function getFeaturesToDOM(list, features) {
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'popup__feature popup__feature--' + features[i];
      list.appendChild(newElement);
    }
  }

  function getPhotosToDOM(list, photos) {
    for (var i = 0; i < photos.length; i++) {
      var newElement = document.createElement('img');
      newElement.setAttribute('src', photos[i]);
      newElement.className = 'popup__photo';
      newElement.setAttribute('width', 45);
      newElement.setAttribute('height', 40);
      newElement.setAttribute('alt', 'Фотография жилья');
      list.appendChild(newElement);
    }
  }
})();

