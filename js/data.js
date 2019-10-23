'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var cardGlobal = document.querySelector('.map');
  var templateWindow = document.querySelector('#card').content.querySelector('article');
  var templateMarker = document.querySelector('#pin').content.querySelector('button');
  cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));
  var TYPES_TEXTS_MAP = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'
  };
  var mapCard = document.querySelector('.map__card');
  var fragmentMarker = document.createDocumentFragment();

  window.data = {
    renderPinHouses: function (houses) {
      window.data.removeAllPins();
      var takeNumber = Math.min(houses.length, 5);
      for (var i = 0; i < takeNumber; i++) {
        renderHouse(houses[i]);
        addPinClickHandler(mapPins.children[i + 2], houses[i]);
      }
    },
    removeAllPins: function () {
      for (var i = mapPins.children.length - 1; i > 1; i--) {
        mapPins.children[i].remove();
      }
    },
    ENTER_KEYCODE: 13,
    ESCAPE_KEYCODE: 27,
    PIN_START_X: 570,
    PIN_START_Y: 315,
    mapPinMain: document.querySelector('.map__pin--main'),
    cardGlobal: cardGlobal,
    adForm: document.querySelector('.ad-form'),
    mapPins: mapPins,
    adds: document.querySelector('#address'),
    mapCard: mapCard,
    templateMarker: templateMarker,
    mapFilters: document.querySelector('.map__filters'),
    advertClose: mapCard.querySelector('.popup__close'),
    previewAvatar: document.querySelector('.ad-form-header__preview img'),
    previewInterior: document.querySelector('.ad-form__photo img'),
    mapFiltersContainer: document.querySelector('.map__filters-container')
  };

  function renderHouse(houseUnit) {
    var element = templateMarker.cloneNode(true);
    element.style.left = houseUnit.location.x + 'px';
    element.style.top = houseUnit.location.y + 'px';
    element.getElementsByTagName('img')[0].src = houseUnit.author.avatar;
    element.className = 'map__pin';
    fragmentMarker.appendChild(element);
    mapPins.appendChild(fragmentMarker);
  }

  function addPinClickHandler(pin, building) {
    pin.addEventListener('click', function () {
      window.deleteClassName('map__card', 0, 'delete_advert');
      mapCard.children[8].innerHTML = '';
      mapCard.children[10].innerHTML = '';
      mapCard.children[0].src = building.author.avatar;
      mapCard.children[2].textContent = building.offer.title;
      mapCard.children[3].textContent = building.offer.address;
      mapCard.children[4].textContent = building.offer.price + ' ₽/ночь';
      mapCard.children[5].textContent = TYPES_TEXTS_MAP[building.offer.type];
      mapCard.children[6].textContent = window.generateRoomsGuests(building.offer.rooms, building.offer.guests);
      mapCard.children[7].textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
      window.getFeaturesToDOM(mapCard.children[8], building.offer.features);
      mapCard.children[9].textContent = building.offer.description;
      window.getPhotosToDOM(mapCard.children[10], building.offer.photos);
    });
  }
})();
